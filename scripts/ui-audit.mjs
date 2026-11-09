// Exhaustive layout audit of the built site, in headless Chrome over CDP. Where scripts/browser-check.mjs asserts a few
// invariants (no sideways scroll, no console errors), this scanner measures geometry on every page x width x theme and
// reports every defect it can find, so a reviewer does not have to spot them by eye. Page text is treated purely as layout
// data. Needs a running build (`bun run build && bun --bun vite preview --host 127.0.0.1 --port 4205 --strictPort`) and
// Google Chrome.
//
//   bun scripts/ui-audit.mjs [base-url] [--quick] [--out=DIR] [--workers=N] [--only=a,b] [--no-shots] [--report]
//
//   base-url   default http://127.0.0.1:4205
//   --quick    sample scenarios (40 at 375 px, 20 at the other widths) and only 5 runs; the full audit scans every scenario
//              at 375 px, a stratified 60 at 768/1024/1440, and every run in data/experiences.json
//   --out=DIR  where findings.json, findings.md and shots/ go (default: .ui-audit/ in the repository; override with --out=DIR)
//   --workers  parallel Chrome windows (default 8)
//   --only     restrict the job kinds: plain, models, runtabs, report, research, scenario
//   --widths=375,768 / --themes=dark   restrict the matrix (debugging)
//   --no-shots skip the screenshot stage
//   --shots-only [--all] [--only-cat=tap]   retake screenshots for the groups of an existing findings.json
//   --report   do not scan; rebuild findings.md from DIR/findings.json, dropping groups listed in DIR/dropped.json
//              ([{"cat","selectorIncludes","reason"}], written by hand after looking at the screenshots)
//
// What it measures, after scrolling each page so everything renders (the page text itself is never interpreted):
//   shattered  text nodes whose line boxes outnumber their words, that break a word mid-word, or that have a non-final
//              line box narrower than three characters (hash-like tokens of 25+ characters may break anywhere)
//   overlap    text-bearing leaf elements whose rendered text boxes intersect by more than 2 px (not ancestor/descendant;
//              tooltips, badges, fixed/sticky bars against scrolled content and the node panel over its chart are exempt)
//   tiny       visible text with an effective font size under 11 px (SVG text is scaled by its screen transform)
//   tap        (375 px only) buttons, links, summaries, radios, tabs, inputs and flowchart nodes under 40 x 40 px, unless
//              inside a larger target; inline links in running text are flagged "inline" and rank lower
//   clip       overflow hidden/clip boxes whose content exceeds them by more than 2 px without text-overflow ellipsis or a
//              line clamp ("textCut" when text is actually cut off), and elements that stick out past the viewport edge
//   hscroll    the document scrolling sideways
// Pages: #/runs (with the Models panel and every chart tab), every run report (chapters 1, 4, 6, 9, 11, 17, 24, 30, 32, each
// with a taken and an untaken node panel open), #/research with every character and chapter filter (and the open pickers),
// every scenario with its first option chosen so the feedback card shows, #/sources and #/how.
// Findings are deduplicated by (category, selector pattern, text pattern) so a component defect appears once with every
// page it was seen on, then mapped to the source file that most likely renders it (best class-name and text match in src/).
import {spawn} from 'node:child_process';
import {mkdirSync, writeFileSync, readFileSync, readdirSync, statSync, existsSync} from 'node:fs';
import {join} from 'node:path';

const args = process.argv.slice(2), flag = n => args.find(a => a === '--' + n || a.startsWith('--' + n + '='));
const opt = (n, d) => { const a = flag(n); return a && a.includes('=') ? a.split('=').slice(1).join('=') : a ? true : d };
const base = (args.find(a => !a.startsWith('--')) ?? 'http://127.0.0.1:4205').replace(/\/$/, '');
const QUICK = !!flag('quick'), WORKERS = +opt('workers', 8), NOSHOTS = !!flag('no-shots');
const OUT = opt('out', new URL('../.ui-audit/', import.meta.url).pathname);
const ONLY = opt('only', '') ? String(opt('only', '')).split(',') : null;
const ROOT = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const CHROME = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', sleep = ms => new Promise(r => setTimeout(r, ms));
const WIDTHS = opt('widths', '') ? String(opt('widths', '')).split(',').map(Number) : [375, 768, 1024, 1440], THEMES = opt('themes', '') ? String(opt('themes', '')).split(',') : ['dark', 'light'], CHAPTERS = [1, 4, 6, 9, 11, 17, 24, 30, 32];
mkdirSync(OUT + '/shots', {recursive: true});

/* ------------------------------------------------------------------------------------------------------------------ */
/* In-page code. `probe` and `helpers` are serialised with toString() and run inside the page.                         */
/* ------------------------------------------------------------------------------------------------------------------ */
function helpers() {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  window.__ua = {
    sleep,
    async waitFor(fn, ms = 4000) { const t0 = Date.now(); while (Date.now() - t0 < ms) { try { if (fn()) return true } catch {} await sleep(60) } return false },
    async waitIdle(ms = 5000) {
      await this.waitFor(() => document.readyState === 'complete' && document.querySelector('main') && !document.querySelector('main [aria-busy="true"]') && document.querySelector('main').textContent.length > 20, ms);
      try { await document.fonts.ready } catch {}
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    },
    async scrollAll() {
      const h = innerHeight; for (let y = 0, n = 0; y < document.documentElement.scrollHeight && n < 60; y += Math.round(h * 0.9), n++) { scrollTo(0, y); await sleep(45) }
      scrollTo(0, 0); await sleep(120);
    },
    center(sel, text) {
      let el = null;
      for (const c of document.querySelectorAll(sel)) { if (!text || (c.textContent || '').trim().toLowerCase().startsWith(text.toLowerCase()) || (c.getAttribute('aria-label') || '').toLowerCase().startsWith(text.toLowerCase())) { el = c; break } }
      if (!el) return null; el.scrollIntoView({block: 'center', inline: 'center'}); const r = el.getBoundingClientRect(); return {x: r.left + r.width / 2, y: r.top + r.height / 2};
    },
  };
}

function probe(o) {
  const root = (o.scope && document.querySelector(o.scope)) || document.querySelector('[role=dialog][data-state=open]') || document.body;
  const VW = document.documentElement.clientWidth, skipSel = o.skip || null, unclipSel = o.unclip || null;
  const out = {shattered: [], overlap: [], tiny: [], tap: [], clip: [], hscroll: null, stats: {}};
  const R = n => Math.round(n * 10) / 10, csCache = new WeakMap();
  const cs = el => { let c = csCache.get(el); if (!c) { c = getComputedStyle(el); csCache.set(el, c) } return c };
  const clsOf = el => (typeof el.className === 'string' ? el.className : el.getAttribute('class')) || '';
  let stampN = 0;
  const stamp = el => { if (!o.stamp) return 0; if (!el.dataset.ua) el.dataset.ua = String(++stampN) + 'x'; return el.dataset.ua };
  const visible = el => { try { return el.checkVisibility({checkOpacity: true, checkVisibilityCSS: true}) } catch { return cs(el).display !== 'none' && cs(el).visibility !== 'hidden' } };
  const tinyBox = r => r.width <= 1.5 && r.height <= 1.5;
  const inSkip = el => skipSel && el.closest(skipSel);
  const fixedCache = new WeakMap();
  const fixedAnc = el => { if (fixedCache.has(el)) return fixedCache.get(el); let f = false; for (let a = el; a && a !== document.documentElement; a = a.parentElement) { const p = cs(a).position; if (p === 'fixed' || p === 'sticky') { f = true; break } } fixedCache.set(el, f); return f };
  const inter = (a, b) => ({l: Math.max(a.l, b.l), t: Math.max(a.t, b.t), r: Math.min(a.r, b.r), b: Math.min(a.b, b.b)});
  const toBox = r => ({l: r.left, t: r.top, r: r.right, b: r.bottom});
  // The visible box of `el` after the overflow clipping of its ancestors, optionally stopping below `stop`.
  const clipBox = (el, stop, real) => {
    let box = null, pos = cs(el).position;
    for (let a = el.parentElement; a && a !== stop; a = a.parentElement) {
      const ca = cs(a);
      if (pos === 'fixed') break;
      if (pos === 'absolute' && ca.position === 'static') continue;
      if (unclipSel && !real && a.matches(unclipSel)) break;
      if (ca.overflowX !== 'visible' || ca.overflowY !== 'visible') { const b = toBox(a.getBoundingClientRect()); box = box ? inter(box, b) : b }
      pos = ca.position;
    }
    return box;
  };
  const sel = el => {
    let s = el.tagName.toLowerCase(); if (el.id && !/[:«]/.test(el.id)) s += '#' + el.id;
    const c = clsOf(el).trim().split(/\s+/).filter(Boolean).slice(0, 3); if (c.length) s += '.' + c.join('.');
    const lab = el.closest('[aria-label]'), lm = el.closest('section,article,aside,nav,[role=region],[role=dialog],[role=group],header'); let tag = '';
    if (lab) tag = lab.getAttribute('aria-label').slice(0, 40);
    else if (lm) { const h = lm.querySelector('h1,h2,h3,h4'); if (h) tag = (h.textContent || '').trim().slice(0, 40) }
    return s + (tag ? ' [' + tag + ']' : '');
  };
  const label = el => ((el.getAttribute('aria-label') || el.getAttribute('title') || el.textContent || '').replace(/\s+/g, ' ').trim()).slice(0, 60);
  const docRect = r => ({x: R(r.left), y: R(r.top), w: R(r.width), h: R(r.height)});
  const unionRect = (a, b) => { const l = Math.min(a.left, b.left), t = Math.min(a.top, b.top), r = Math.max(a.right, b.right), bt = Math.max(a.bottom, b.bottom); return {x: R(l), y: R(t), w: R(r - l), h: R(bt - t)} };
  const push = (cat, el, text, measure, rect, extra = {}) => out[cat].push({sel: sel(el), text: String(text).replace(/\s+/g, ' ').trim().slice(0, 60), measure, classes: clsOf(el), rect, ua: stamp(el), ...extra });

  // Text nodes with rendered line boxes.
  const nodes = [], tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let n; (n = tw.nextNode());) {
    if (!/\S/.test(n.nodeValue)) continue; const el = n.parentElement; if (!el || /^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE|TITLE|OPTION)$/.test(el.tagName) || inSkip(el)) continue;
    if (!visible(el)) continue; const eb = el.getBoundingClientRect(); if (tinyBox(eb) && !(el instanceof SVGElement)) continue;
    nodes.push({n, el});
  }
  out.stats.textNodes = nodes.length;
  const range = document.createRange(), lineBoxes = n => {
    range.selectNodeContents(n); const rs = [...range.getClientRects()].filter(r => r.width > 0.5 && r.height > 0.5).sort((a, b) => a.top - b.top || a.left - b.left), lines = [];
    for (const r of rs) { const l = lines.find(L => Math.abs(L.t - r.top) <= Math.max(3, r.height * 0.4)); if (l) { l.l = Math.min(l.l, r.left); l.r = Math.max(l.r, r.right); l.b = Math.max(l.b, r.bottom) } else lines.push({l: r.left, r: r.right, t: r.top, b: r.bottom}) }
    return lines;
  };
  const HASHY = /^[\w\-./:#@=+%~]{25,}$/;
  const items = [], tinySeen = new Set();
  for (const {n, el} of nodes) {
    const fs = parseFloat(cs(el).fontSize) || 16, lines = lineBoxes(n);
    if (!lines.length) continue;
    // c. tiny text
    let eff = fs; if (el instanceof SVGElement && el.getScreenCTM) { const m = el.getScreenCTM(); if (m) eff = fs * Math.sqrt(Math.abs(m.a * m.d - m.b * m.c)) }
    if (eff < 11 && !tinySeen.has(el)) { tinySeen.add(el); push('tiny', el, n.nodeValue, 'font-size ' + R(eff) + 'px', docRect({left: lines[0].l, top: lines[0].t, width: lines[0].r - lines[0].l, height: lines[0].b - lines[0].t})) }
    // a. shattered text
    const raw = n.nodeValue, words = raw.trim().split(/\s+/).filter(Boolean);
    if (lines.length >= 2 && !(el instanceof SVGElement)) {
      const reasons = [], charW = fs * 0.5;
      if (lines.length > words.length && !(words.length === 1 && HASHY.test(words[0]))) reasons.push(lines.length + ' line boxes for ' + words.length + ' word' + (words.length > 1 ? 's' : ''));
      const narrow = lines.slice(1, -1).filter(l => l.r - l.l < 3 * charW * 0.9);
      if (narrow.length && words.some(w => w.length >= 4)) reasons.push(narrow.length + ' line box' + (narrow.length > 1 ? 'es' : '') + ' under 3 characters wide (' + R(Math.min(...narrow.map(l => l.r - l.l))) + 'px)');
      if (raw.trim().length >= 12 && lines.length >= 4 && raw.trim().length / lines.length < 4) reasons.push('under 4 characters per line');
      // A word split across line boxes (hyphenated or slash-joined words may wrap at the separator, so test the parts).
      const broken = []; const tokRe = /\S+/g; let tm, seen = 0;
      while ((tm = tokRe.exec(raw)) && seen < 80 && broken.length < 3) {
        const tok = tm[0]; if (tok.length >= 25 || HASHY.test(tok) || /:\/\//.test(tok)) continue; // long ids and URLs may break anywhere
        const re = /[^\-\u2013\u2014\/]+/g; let m; // hyphenated or slash-joined words may wrap at the separator, so test the parts
        while ((m = re.exec(tok))) { const w = m[0]; if (w.length < 3) continue; seen++; const at = tm.index + m.index; range.setStart(n, at); range.setEnd(n, at + w.length); const ls = []; for (const r of range.getClientRects()) { if (r.width < 0.5) continue; if (!ls.some(t => Math.abs(t - r.top) <= Math.max(3, r.height * 0.4))) ls.push(r.top) } if (ls.length > 1) broken.push(w) }
      }
      if (broken.length) reasons.push('word broken mid-word: ' + broken.join(', '));
      if (reasons.length) { const l = Math.min(...lines.map(x => x.l)), r = Math.max(...lines.map(x => x.r)), t = lines[0].t, b = lines[lines.length - 1].b; push('shattered', el, raw, reasons.join('; ') + ' | box ' + R(el.getBoundingClientRect().width) + 'px wide, font ' + R(fs) + 'px', docRect({left: l, top: t, width: r - l, height: b - t}), {lines: lines.length, words: words.length, width: R(el.getBoundingClientRect().width)}) }
    }
    // b. overlap candidates: each line box, shrunk vertically 15%, clipped to the ancestors' visible area.
    const cb = clipBox(el);
    for (const L of lines) {
      let b = {l: L.l, t: L.t + (L.b - L.t) * 0.15, r: L.r, b: L.b - (L.b - L.t) * 0.15};
      if (cb) b = inter(b, cb); if (b.r - b.l <= 1 || b.b - b.t <= 1) continue;
      items.push({el, b, text: raw});
    }
  }
  out.stats.lineBoxes = items.length;
  const exempt = el => !!el.closest('[role=tooltip],[class*=tooltip],[class*=Tooltip],[data-radix-popper-content-wrapper]') || (cs(el).position === 'absolute' && (el.textContent || '').trim().length <= 3);
  items.sort((a, b) => a.b.t - b.b.t);
  const seenPair = new Set(), nodeAside = el => el.closest('aside[aria-label="Selected node"]');
  for (let i = 0; i < items.length && out.overlap.length < 60; i++) {
    const A = items[i];
    for (let j = i + 1; j < items.length && items[j].b.t < A.b.b - 2; j++) {
      const B = items[j]; if (A.el === B.el) continue;
      const ix = Math.min(A.b.r, B.b.r) - Math.max(A.b.l, B.b.l), iy = Math.min(A.b.b, B.b.b) - Math.max(A.b.t, B.b.t);
      if (ix <= 2 || iy <= 2) continue;
      if (A.el.contains(B.el) || B.el.contains(A.el)) continue;
      if (fixedAnc(A.el) !== fixedAnc(B.el)) continue;
      if (!!nodeAside(A.el) !== !!nodeAside(B.el)) continue;
      if (unclipSel && !!A.el.closest(unclipSel) !== !!B.el.closest(unclipSel)) continue; // the chart is a clipped scroller: only compare inside it
      if (exempt(A.el) || exempt(B.el)) continue;
      const key = i + ':' + j; if (seenPair.has(key)) continue; seenPair.add(key);
      const ra = A.el.getBoundingClientRect(), rb = B.el.getBoundingClientRect(), sa = sel(A.el), sb = sel(B.el);
      out.overlap.push({sel: sa + '  X  ' + sb, text: (A.text.replace(/\s+/g, ' ').trim().slice(0, 28) + '  X  ' + B.text.replace(/\s+/g, ' ').trim().slice(0, 28)), measure: R(ix) + ' x ' + R(iy) + ' px overlap', classes: clsOf(A.el), classes2: clsOf(B.el), rect: unionRect({left: A.b.l, top: A.b.t, right: A.b.r, bottom: A.b.b}, {left: B.b.l, top: B.b.t, right: B.b.r, bottom: B.b.b}), ua: stamp(A.el), ua2: stamp(B.el)});
    }
  }

  // d. tap targets at phone width
  if (o.phone) {
    const TS = 'button,a[href],summary,[role=button],[role=radio],[role=tab],[role=combobox],[role=option],[role=menuitem],input:not([type=hidden]),select,textarea,[data-node]';
    const big = el => { const r = el.getBoundingClientRect(); return r.width >= 40 && r.height >= 40 };
    for (const el of root.querySelectorAll(TS)) {
      if (inSkip(el) || !visible(el)) continue; const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1 || (r.width >= 40 && r.height >= 40)) continue;
      if (tinyBox(r)) continue;
      let inner = false; for (let a = el.parentElement; a && a !== root.parentElement; a = a.parentElement) { if (a.matches(TS) && big(a)) { inner = true; break } }
      if (inner) continue; const lab = el.closest('label'); if (lab && big(lab)) continue;
      const inline = cs(el).display === 'inline' && !!el.parentElement && ((el.parentElement.textContent || '').trim().length > (el.textContent || '').trim().length + 12);
      push('tap', el, label(el), R(r.width) + ' x ' + R(r.height) + ' px' + (inline ? ' (inline link)' : ''), docRect(r), {inline});
    }
  }

  // e. clipping
  const all = root.querySelectorAll('*'); let offenders = new Set();
  for (const el of all) {
    if (el instanceof SVGElement && el.tagName.toLowerCase() !== 'svg') continue; const c = cs(el); if (c.display === 'none') continue;
    if (inSkip(el)) continue;
    const ox = c.overflowX, oy = c.overflowY, hidX = ox === 'hidden' || ox === 'clip', hidY = oy === 'hidden' || oy === 'clip';
    if ((hidX || hidY) && !tinyBox(el.getBoundingClientRect()) && c.display !== 'inline' && c.display !== 'contents' && el !== document.body && el !== document.documentElement && visible(el)) {
      const dx = hidX ? el.scrollWidth - el.clientWidth : 0, dy = hidY ? el.scrollHeight - el.clientHeight : 0;
      const clamp = c.getPropertyValue('-webkit-line-clamp'); const isClamp = clamp && clamp !== 'none', ell = c.textOverflow === 'ellipsis';
      if ((dx > 2 || dy > 2) && !ell && !isClamp && el.clientWidth > 0) {
        const r = el.getBoundingClientRect(), cut = [], tw2 = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        for (let n; (n = tw2.nextNode()) && cut.length < 3;) {
          if (!/\S/.test(n.nodeValue) || !n.parentElement || !visible(n.parentElement)) continue; range.selectNodeContents(n); const inner = clipBox(n.parentElement, el, true);
          for (const q of range.getClientRects()) { if (q.width < 1) continue; let b = toBox(q); if (inner) b = inter(b, inner); if (b.r - b.l <= 1 || b.b - b.t <= 1) continue; if ((hidX && (b.r > r.right + 2 || b.l < r.left - 2)) || (hidY && (b.b > r.bottom + 2 || b.t < r.top - 2))) { cut.push((n.nodeValue || '').trim().slice(0, 30)); break } }
        }
        push('clip', el, cut.join(' | ') || label(el), (dx > 2 ? 'scrollWidth ' + el.scrollWidth + ' > ' + el.clientWidth + ' ' : '') + (dy > 2 ? 'scrollHeight ' + el.scrollHeight + ' > ' + el.clientHeight : '') + (cut.length ? ' [text cut]' : ' [no text cut]'), docRect(r), {textCut: cut.length > 0, kind: 'overflow'});
      }
    }
    // sticking out past the viewport edge
    if (el === root || !visible(el)) continue; const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) continue;
    if (r.right > VW + 1 || r.left < -1) { let b = toBox(r); const cb2 = clipBox(el, null, true); if (cb2) b = inter(b, cb2); if (b.r > b.l && b.b > b.t && (b.r > VW + 1 || b.l < -1)) offenders.add(el) }
  }
  for (const el of offenders) { let p = el.parentElement, nested = false; while (p) { if (offenders.has(p)) { nested = true; break } p = p.parentElement } if (nested) continue; const r = el.getBoundingClientRect(); push('clip', el, label(el), 'extends ' + R(Math.max(r.right - VW, -r.left)) + ' px past the viewport edge (right ' + R(r.right) + ', left ' + R(r.left) + ', viewport ' + VW + ')', docRect(r), {textCut: true, kind: 'offscreen'}) }
  // f. horizontal page scroll
  const de = document.documentElement;
  if (de.scrollWidth > de.clientWidth || document.body.scrollWidth > de.clientWidth + 1) out.hscroll = {sel: 'document', text: '', measure: 'scrollWidth ' + Math.max(de.scrollWidth, document.body.scrollWidth) + ' > clientWidth ' + de.clientWidth, classes: '', rect: {x: 0, y: 0, w: de.clientWidth, h: innerHeight}, ua: ''};
  for (const k of ['shattered', 'overlap', 'tiny', 'tap', 'clip']) out[k] = out[k].slice(0, 80);
  return out;
}

/* ------------------------------------------------------------------------------------------------------------------ */
/* CDP plumbing                                                                                                        */
/* ------------------------------------------------------------------------------------------------------------------ */
const dir = '/tmp/ui-audit-' + process.pid + '-' + Date.now();
const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=0', '--user-data-dir=' + dir, '--no-first-run', '--hide-scrollbars', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows', 'about:blank'], {stdio: 'ignore'});
let port;
async function connectBrowser() {
  let ver; for (let i = 0; i < 100; i++) { try { port ??= (await Bun.file(dir + '/DevToolsActivePort').text()).split('\n')[0]; ver = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json(); break } catch {} await sleep(200) }
  if (!ver) throw new Error('Chrome did not start');
  const ws = new WebSocket(ver.webSocketDebuggerUrl); await new Promise(r => ws.onopen = r); return ws;
}
class Conn {
  constructor(ws) { this.ws = ws; this.id = 0; this.pending = new Map; ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && this.pending.has(m.id)) { this.pending.get(m.id)(m); this.pending.delete(m.id) } } }
  send(method, params = {}, ms = 30000) { return new Promise((res, rej) => { const i = ++this.id; const t = setTimeout(() => { this.pending.delete(i); rej(new Error('CDP timeout: ' + method)) }, ms); this.pending.set(i, m => { clearTimeout(t); res(m) }); this.ws.send(JSON.stringify({id: i, method, params})) }) }
}
let browser; const tabs = [];
async function newTab() {
  const t = (await browser.send('Target.createTarget', {url: 'about:blank', newWindow: true})).result.targetId;
  const ws = new WebSocket(`ws://127.0.0.1:${port}/devtools/page/${t}`); await new Promise(r => ws.onopen = r);
  const tab = new Conn(ws); tab.targetId = t; tab.cfg = null; tab.errors = [];
  await tab.send('Page.enable'); await tab.send('Runtime.enable');
  await tab.send('Page.addScriptToEvaluateOnNewDocument', {source: `(${helpers})()`});
  await tab.send('Emulation.setFocusEmulationEnabled', {enabled: true}).catch(() => {});
  tabs.push(tab); return tab;
}
async function ev(tab, expression, ms = 30000) {
  const r = await tab.send('Runtime.evaluate', {expression, returnByValue: true, awaitPromise: true}, ms);
  if (r.result?.exceptionDetails) throw new Error('page error: ' + (r.result.exceptionDetails.exception?.description ?? r.result.exceptionDetails.text).slice(0, 300));
  return r.result?.result?.value;
}
async function setConfig(tab, cfg) {
  if (tab.cfg?.key === cfg.key) return;
  const mobile = cfg.w === 375;
  await tab.send('Emulation.setDeviceMetricsOverride', {width: cfg.w, height: mobile ? 800 : 900, deviceScaleFactor: mobile ? 2 : 1, mobile});
  await tab.send('Emulation.setTouchEmulationEnabled', {enabled: mobile});
  await tab.send('Emulation.setEmulatedMedia', {features: [{name: 'prefers-color-scheme', value: cfg.theme}]});
  await tab.send('Page.navigate', {url: base + '/icon.svg'}); await sleep(250);
  await ev(tab, `try{localStorage.setItem('detroitbench.theme',${JSON.stringify(cfg.theme)})}catch(e){}`);
  await tab.send('Page.navigate', {url: base + '/?theme=' + cfg.theme + '#/runs'}); await sleep(600);
  await ev(tab, `__ua.waitIdle(8000)`);
  const t = await ev(tab, `({t:document.documentElement.dataset.theme,bg:(()=>{for(let e=document.elementFromPoint(4,innerHeight-4);e;e=e.parentElement){const b=getComputedStyle(e).backgroundColor,m=b.match(/[0-9.]+/g)||[];if(m.length<4||+m[3]>0.5)return b}return 'rgb(255, 255, 255)'})(),w:innerWidth})`);
  const nums = (t.bg.match(/-?[\d.]+/g) || [0, 0, 0]).map(Number), lum = /^ok(lab|lch)/.test(t.bg) ? nums[0] * 255 : nums.slice(0, 3).reduce((s, v) => s + v, 0) / 3;
  if (t.t !== cfg.theme || (cfg.theme === 'dark') !== (lum < 128)) console.log(`  ! theme mismatch at ${cfg.key}: data-theme=${t.t} background=${t.bg}`);
  if (Math.abs(t.w - cfg.w) > 20) console.log(`  ! viewport ${t.w} != ${cfg.w}`);
  tab.cfg = cfg;
}
const key = c => c.w + '/' + c.theme;
async function go(tab, hash) {
  const changed = await ev(tab, `(()=>{const c=location.hash!==${JSON.stringify(hash)};if(c)location.hash=${JSON.stringify(hash)};return c})()`);
  await sleep(120); await ev(tab, `__ua.waitIdle(6000)`); return changed;
}
async function key_(tab, k, code) { for (const type of ['keyDown', 'keyUp']) await tab.send('Input.dispatchKeyEvent', {type, key: k, code: k, windowsVirtualKeyCode: code}) }
async function mouseClick(tab, selector, text) {
  const p = await ev(tab, `__ua.center(${JSON.stringify(selector)},${JSON.stringify(text ?? '')})`); if (!p) return false;
  await sleep(60); const q = await ev(tab, `__ua.center(${JSON.stringify(selector)},${JSON.stringify(text ?? '')})`); const pt = q || p;
  await tab.send('Input.dispatchMouseEvent', {type: 'mouseMoved', x: pt.x, y: pt.y});
  await tab.send('Input.dispatchMouseEvent', {type: 'mousePressed', x: pt.x, y: pt.y, button: 'left', clickCount: 1});
  await tab.send('Input.dispatchMouseEvent', {type: 'mouseReleased', x: pt.x, y: pt.y, button: 'left', clickCount: 1});
  return true;
}
async function runProbe(tab, extra = {}) {
  const o = {phone: tab.cfg.w === 375, ...extra};
  return ev(tab, `(${probe})(${JSON.stringify(o)})`, 60000);
}

/* ------------------------------------------------------------------------------------------------------------------ */
/* Contexts: every probe is tied to a ctx that `enter` can reproduce, so the screenshot stage can return to the page.  */
/* ------------------------------------------------------------------------------------------------------------------ */
async function enter(tab, ctx) {
  switch (ctx.kind) {
    case 'plain': await go(tab, ctx.hash); await ev(tab, `__ua.scrollAll()`); return {};
    case 'models': {
      await go(tab, '#/runs');
      const clicked = tab.cfg.w < 768 ? await ev(tab, `(()=>{const b=document.querySelector('button[aria-label^="Models,"]');if(!b)return false;b.click();return true})()`)
        : await ev(tab, `(()=>{const b=[...document.querySelectorAll('main button[aria-haspopup=dialog]')].find(b=>/^models/i.test(b.textContent.trim()));if(!b)return false;b.click();return true})()`);
      if (!clicked) return {skip: 'no Models button at this width'}; await sleep(600); return {};
    }
    case 'runtab': {
      await go(tab, '#/runs'); await ev(tab, `__ua.scrollAll()`);
      const ok = await ev(tab, `(()=>{const t=[...document.querySelectorAll('main [role=tab]')][${ctx.i}];if(!t)return false;t.click();return true})()`);
      if (!ok) return {skip: 'no such tab'}; await sleep(500); await ev(tab, `__ua.scrollAll()`); return {scope: 'main'};
    }
    case 'report': {
      const fresh = await go(tab, `#/runs/${ctx.id}/report`); await ev(tab, `__ua.waitFor(()=>document.querySelector('.flowchart svg'),8000)`);
      await ev(tab, fresh ? `__ua.scrollAll()` : `(async()=>{document.getElementById('flowchart')?.scrollIntoView();await __ua.sleep(120);scrollTo(0,0);await __ua.sleep(60)})()`);
      if (ctx.chapter) {
        const ok = await ev(tab, `(()=>{const b=[...document.querySelectorAll('nav[aria-label=Chapter] button')].find(b=>(b.getAttribute('aria-label')||'').startsWith('Chapter ${ctx.chapter}:'));if(!b)return false;b.click();return true})()`);
        if (!ok) return {skip: 'chapter button missing'}; await sleep(250);
        if (ctx.node) {
          const opened = await ev(tab, `(()=>{const ns=[...document.querySelectorAll('.flowchart [data-node]')];const taken=ns.filter(n=>n.classList.contains('is-taken')),un=ns.filter(n=>n.classList.contains('fc-node')&&!n.classList.contains('is-taken'));const pool=${JSON.stringify(ctx.node)}==='taken'?taken:un;const n=pool[Math.floor(pool.length/2)];if(!n)return false;n.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true}));return true})()`);
          if (!opened) return {skip: 'no ' + ctx.node + ' node in chapter ' + ctx.chapter}; await sleep(500);
          return tab.cfg.w < 768 ? {} : {scope: '#flowchart', unclip: '.flowchart'};
        }
      }
      return {scope: ctx.chapter ? '#flowchart' : null, unclip: '.flowchart'};
    }
    case 'research': {
      await go(tab, '#/research/scenarios'); await ev(tab, `__ua.waitFor(()=>document.querySelector('[data-filters]'),8000)`);
      await ev(tab, `(()=>{const b=[...document.querySelectorAll('[data-filters] button')].find(b=>/^reset filters/i.test(b.textContent.trim()));if(b)b.click();return 1})()`); await sleep(250);
      const trig = lab => ev(tab, `(()=>{for(const e of document.querySelectorAll('[data-ua-trig]'))delete e.dataset.uaTrig;const l=[...document.querySelectorAll('[data-filters] label')].find(l=>l.textContent.trim()===${JSON.stringify(lab)});const b=l&&document.getElementById(l.htmlFor);if(b)b.dataset.uaTrig='1';return !!b})()`);
      if (ctx.character || ctx.open === 'character') { await trig('Character'); await mouseClick(tab, '[data-ua-trig]', ''); await sleep(350); if (ctx.character) { await mouseClick(tab, '[role=option]', ctx.character); await sleep(300) } }
      if (ctx.chapter || ctx.open === 'chapter') { await trig('Chapter'); await mouseClick(tab, '[data-ua-trig]', ''); await sleep(300); if (ctx.chapter) { await mouseClick(tab, 'li[role=option]', ctx.chapter); await sleep(300) } }
      await ev(tab, `__ua.waitIdle(4000)`);
      if (ctx.open) return {scope: '[role=listbox]'};
      await ev(tab, `__ua.scrollAll()`); return {scope: 'main'};
    }
    case 'scenario': {
      await go(tab, '#/research/scenarios/' + ctx.id);
      const okTitle = await ev(tab, `__ua.waitFor(()=>document.querySelector('article h2')&&document.querySelector('article h2').textContent===${JSON.stringify(ctx.title)},6000)`);
      if (!okTitle) return {skip: 'scenario page did not render ' + ctx.id};
      await ev(tab, `(()=>{const r=document.querySelector('article [role=radio]');if(r)r.click();return 1})()`);
      await ev(tab, `__ua.waitFor(()=>{const s=document.querySelector('section[aria-label="What the benchmark told the model"]');return s&&!s.querySelector('.animate-pulse')},4000)`);
      await ev(tab, `(()=>{for(const s of document.querySelectorAll('section[aria-label="What the benchmark told the model"] summary'))s.click();return 1})()`);
      await sleep(120); await ev(tab, `__ua.scrollAll()`);
      return {scope: 'main', skip: null, skipSel: 'aside[aria-label="Scenario list"]'};
    }
  }
  throw new Error('unknown ctx ' + ctx.kind);
}
const ctxHash = ctx => ctx.kind + ':' + (ctx.hash || ctx.id || ctx.i || '') + (ctx.chapter ? ':c' + ctx.chapter : '') + (ctx.node ? ':' + ctx.node : '') + (ctx.character ? ':' + ctx.character : '') + (ctx.open ? ':open-' + ctx.open : '');
const pageName = ctx => ctx.kind === 'plain' ? ctx.hash : ctx.kind === 'models' ? '#/runs (Models panel)' : ctx.kind === 'runtab' ? '#/runs (chart tab ' + ctx.i + ')'
  : ctx.kind === 'report' ? `#/runs/${ctx.id.slice(0, 8)}/report` + (ctx.chapter ? ` ch${ctx.chapter}` : '') + (ctx.node ? ` ${ctx.node}-node` : '')
  : ctx.kind === 'research' ? '#/research' + (ctx.character ? ` ${ctx.character}` : '') + (ctx.chapter ? ` ch${ctx.chapter}` : '') + (ctx.open ? ` (${ctx.open} picker open)` : '') : '#/research/scenarios/' + ctx.id + ' (feedback open)';

/* ------------------------------------------------------------------------------------------------------------------ */
/* Aggregation                                                                                                         */
/* ------------------------------------------------------------------------------------------------------------------ */
const SEV = {shattered: 6, overlap: 5, hscroll: 4, clipText: 4, clip: 1, tap: 2, tapInline: 1, tiny: 1};
const groups = new Map, totals = {shattered: 0, overlap: 0, tiny: 0, tap: 0, clip: 0, hscroll: 0}, occurrences = {shattered: 0, overlap: 0, tiny: 0, tap: 0, clip: 0, hscroll: 0};
const norm = s => s.replace(/\d+/g, '#').replace(/\s+/g, ' ');
const selPattern = s => norm(s).replace(/\[[^\]]*\]/g, m => '[' + m.slice(1, 30) + ']');
function addFinding(cat, f, cfg, ctx) {
  occurrences[cat]++;
  const sp = selPattern(f.sel), tp = cat === 'tap' && (f.text || '').length <= 12 ? norm(f.text || '') : '', k = cat + '|' + sp + '|' + tp;
  let g = groups.get(k);
  if (!g) { g = {key: k, cat, sev: 0, selector: f.sel, selectorPattern: sp, textPattern: tp, classes: f.classes, classes2: f.classes2 ?? '', count: 0, pages: new Map, widths: new Set, themes: new Set, examples: [], worst: null, repro: null}; groups.set(k, g); totals[cat]++ }
  g.count++; const pg = pageName(ctx); g.pages.set(pg, (g.pages.get(pg) ?? 0) + 1); g.widths.add(cfg.w); g.themes.add(cfg.theme);
  const sevKey = cat === 'clip' ? (f.textCut ? 'clipText' : 'clip') : cat === 'tap' ? (f.inline ? 'tapInline' : 'tap') : cat; g.sev = Math.max(g.sev, SEV[sevKey]);
  if (g.examples.length < 6 && !g.examples.some(e => e.text === f.text && e.page === pg)) g.examples.push({text: f.text, measure: f.measure, page: pg, width: cfg.w, theme: cfg.theme});
  const num = parseFloat((f.measure.match(/[\d.]+/) || [0])[0]);
  if (!g.repro || (cat === 'tiny' ? num < g.repro.num : cat === 'tap' ? num < g.repro.num : false) || (cat === 'overlap' && num > g.repro.num)) g.repro = {ctx, cfg, num, text: f.text, sel: f.sel, rect: f.rect, ua: f.ua, ua2: f.ua2 ?? '', measure: f.measure};
}

/* ------------------------------------------------------------------------------------------------------------------ */
/* Source mapping: the file and line of src/ whose class string and text best match a group                            */
/* ------------------------------------------------------------------------------------------------------------------ */
let srcLines = null;
function loadSrc() {
  srcLines = [];
  const walk = d => { for (const n of readdirSync(d)) { const p = join(d, n), s = statSync(p); if (s.isDirectory()) walk(p); else if (/\.(jsx?|css|mjs)$/.test(n)) srcLines.push({file: p.slice(ROOT.length + 1), lines: readFileSync(p, 'utf8').split('\n').map(l => ' ' + l.replace(/[`'"{}()\[\],;<>=]/g, ' ').replace(/\s+/g, ' ') + ' ')}) } };
  walk(ROOT + '/src'); if (existsSync(ROOT + '/scripts/prepare.mjs')) { /* scripts render no DOM */ }
}
let idf = null;
const srcCache = new Map;
function mapSource(g) {
  if (!srcLines) loadSrc();
  if (!idf) { idf = new Map; let N = 0; for (const f of srcLines) for (const l of f.lines) { N++; for (const t of new Set(l.split(' '))) if (t) idf.set(t, (idf.get(t) ?? 0) + 1) } idf.N = N }
  const w = t => Math.log(1 + idf.N / (1 + (idf.get(t) ?? 0)));
  const toks = [...new Set(((g.classes || '') + ' ' + (g.classes2 || '')).split(/\s+/).filter(t => t.length > 1))];
  const text = (g.examples[0]?.text || '').split('  X  ')[0].replace(/[^\w ]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 24).trim();
  const land = [...g.selector.matchAll(/\[([^\]]{4,})\]/g)].map(m => m[1].replace(/[^\w ]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 24).trim());
  const ck = toks.join(' ') + '|' + text + '|' + land.join(','); if (srcCache.has(ck)) return srcCache.get(ck);
  let best = {score: 0, file: '', line: 0};
  for (const f of srcLines) {
    const body = f.lines.join('\n'), bonus = (text.length >= 5 && body.includes(text) ? 1.5 : 0) + land.filter(x => x.length >= 5 && body.includes(x)).length * 1.5;
    f.lines.forEach((l, i) => {
      let sc = 0; for (const t of toks) if (l.includes(' ' + t + ' ') || (t.includes('[') && l.includes(t))) sc += w(t);
      if (text.length >= 5 && l.includes(text)) sc += 3;
      if (sc > 0 && sc + bonus > best.score) best = {score: sc + bonus, file: f.file, line: i + 1};
    });
  }
  const r = best.score >= 5 ? best : {score: best.score, file: best.file || 'unknown', line: best.line, weak: true}; srcCache.set(ck, r); return r;
}

/* ------------------------------------------------------------------------------------------------------------------ */
/* Job list                                                                                                            */
/* ------------------------------------------------------------------------------------------------------------------ */
function rng(seed) { let s = seed >>> 0; return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296 }
function sampleScenarios(qs, n, seed) {
  const r = rng(seed), picked = new Map, byCh = new Map;
  for (const q of qs) (byCh.get(q.chapter) ?? byCh.set(q.chapter, []).get(q.chapter)).push(q);
  for (const [, list] of byCh) { const q = list[Math.floor(r() * list.length)]; picked.set(q.id, q) }
  for (const kind of ['decision', 'event', 'media', 'forced']) { const l = qs.filter(q => (q.kind || 'decision') === kind); for (let i = 0; i < 3 && l.length; i++) { const q = l[Math.floor(r() * l.length)]; picked.set(q.id, q) } }
  const rest = qs.filter(q => !picked.has(q.id)); while (picked.size < n && rest.length) picked.set(...(q => [q.id, q])(rest.splice(Math.floor(r() * rest.length), 1)[0]));
  return [...picked.values()].sort((a, b) => qs.indexOf(a) - qs.indexOf(b));
}
async function buildJobs() {
  const exps = await (await fetch(base + '/data/experiences.json')).json(), ds = await (await fetch(base + '/data/dataset.json')).json();
  let runIds = exps.runs.map(r => r.id); if (QUICK) runIds = runIds.filter((_, i) => i % Math.ceil(runIds.length / 5) === 0).slice(0, 5);
  const qs = ds.questions, jobs = [], cfgs = []; for (const w of WIDTHS) for (const theme of THEMES) cfgs.push({w, theme, key: key({w, theme})});
  const want = k => !ONLY || ONLY.includes(k);
  for (const cfg of cfgs) {
    if (want('plain')) for (const hash of ['#/runs', '#/sources', '#/how', '#/research/runs']) jobs.push({cfg, ctx: {kind: 'plain', hash}});
    if (want('models') && cfg.w <= 900) jobs.push({cfg, ctx: {kind: 'models'}});
    if (want('runtabs')) for (let i = 0; i < 6; i++) jobs.push({cfg, ctx: {kind: 'runtab', i}, optional: true});
    if (want('research')) {
      jobs.push({cfg, ctx: {kind: 'research', open: 'character'}}, {cfg, ctx: {kind: 'research', open: 'chapter'}});
      for (const c of ['Connor', 'Kara', 'Markus', 'Player']) jobs.push({cfg, ctx: {kind: 'research', character: c}});
      for (let n = 1; n <= 33; n++) jobs.push({cfg, ctx: {kind: 'research', chapter: String(n).padStart(2, '0') + ' '}});
    }
    if (want('report')) runIds.forEach((id, i) => jobs.push({cfg, ctx: {kind: 'report', id}, chapters: true, firstRuns: i < 4}));
    if (want('scenario')) {
      const list = cfg.w === 375 ? (QUICK ? sampleScenarios(qs, 40, 7) : qs) : sampleScenarios(qs, QUICK ? 20 : 60, 11);
      for (const q of list) jobs.push({cfg, ctx: {kind: 'scenario', id: q.id, title: q.title}});
    }
  }
  return {jobs: jobs.filter(Boolean), runIds, nScenarios: qs.length};
}

/* ------------------------------------------------------------------------------------------------------------------ */
/* Running                                                                                                             */
/* ------------------------------------------------------------------------------------------------------------------ */
const errors = [], skipped = [];
let done = 0, total = 0, t0 = Date.now();
function record(res, cfg, ctx) {
  for (const cat of ['shattered', 'overlap', 'tiny', 'tap', 'clip']) for (const f of res[cat] ?? []) addFinding(cat, f, cfg, ctx);
  if (res.hscroll) addFinding('hscroll', res.hscroll, cfg, ctx);
}
async function probeCtx(tab, cfg, ctx, extra = {}) {
  const st = await enter(tab, ctx);
  if (st?.skip) { skipped.push({page: pageName(ctx), width: cfg.w, theme: cfg.theme, reason: st.skip}); return null }
  const opts = {...extra}; if (st?.scope) opts.scope = st.scope; if (st?.unclip) opts.unclip = st.unclip; if (st?.skipSel) opts.skip = st.skipSel;
  const res = await runProbe(tab, opts); record(res, cfg, ctx); return res;
}
async function runJob(tab, job) {
  const {cfg, ctx} = job; await setConfig(tab, cfg);
  if (ctx.kind === 'report' && job.chapters) {
    await probeCtx(tab, cfg, ctx);
    for (const ch of CHAPTERS) {
      await probeCtx(tab, cfg, {...ctx, chapter: ch});
      for (const node of (QUICK || (cfg.w !== 375 && !job.firstRuns) ? ['taken'] : ['taken', 'untaken'])) { await probeCtx(tab, cfg, {...ctx, chapter: ch, node}); await key_(tab, 'Escape', 27); await sleep(150) }
    }
    return;
  }
  await probeCtx(tab, cfg, ctx);
  if (ctx.kind === 'models' || ctx.kind === 'research') { await key_(tab, 'Escape', 27); await key_(tab, 'Escape', 27); await sleep(150) }
}
async function worker(tab, queue) {
  while (queue.length) {
    const job = queue.shift();
    try { await runJob(tab, job) } catch (e) {
      errors.push({page: pageName(job.ctx), cfg: job.cfg.key, error: String(e.message).slice(0, 200)});
      tab.cfg = null; // force a clean page next time
    }
    done++; if (done % 25 === 0 || done === total) { const s = (Date.now() - t0) / 1000; console.log(`  [${done}/${total}] ${Math.round(s)}s elapsed, ~${Math.round(s / done * (total - done))}s left; ${[...groups.values()].length} groups, ${errors.length} errors`) }
    if (done % 300 === 0) savePartial();
  }
}
const plain = g => ({id: g.id, cat: g.cat, severity: g.sev, source: g.source, selector: g.selector, selectorPattern: g.selectorPattern, textPattern: g.textPattern, occurrences: g.count, pagesSeen: [...g.pages.keys()].length, pages: [...g.pages.entries()].slice(0, 40).map(([p, n]) => p + (n > 1 ? ' x' + n : '')), widths: [...g.widths].sort((a, b) => a - b), themes: [...g.themes], examples: g.examples, repro: g.repro && {page: pageName(g.repro.ctx), width: g.repro.cfg.w, theme: g.repro.cfg.theme, measure: g.repro.measure, sel: g.repro.sel, text: g.repro.text, ctx: g.repro.ctx}, shot: g.shot});
// Merge groups that differ only in a page-specific landmark heading but come from the same source line, then rank.
function finalize() {
  const merged = new Map, baseOf = g => g.selectorPattern.replace(/ \[[^\]]*\]/g, '');
  for (const g0 of groups.values()) {
    const src = mapSource(g0), k = g0.cat + '|' + baseOf(g0) + '|' + g0.textPattern + '|' + (src.weak ? 'weak' : src.file + ':' + src.line);
    let m = merged.get(k);
    if (!m) { merged.set(k, {...g0, source: src, pages: new Map(g0.pages), widths: new Set(g0.widths), themes: new Set(g0.themes), examples: [...g0.examples], landmarks: new Set([g0.selector.match(/\[([^\]]*)\]/)?.[1] ?? '']) }); continue }
    m.count += g0.count; for (const [p, n] of g0.pages) m.pages.set(p, (m.pages.get(p) ?? 0) + n); g0.widths.forEach(x => m.widths.add(x)); g0.themes.forEach(x => m.themes.add(x)); m.sev = Math.max(m.sev, g0.sev);
    for (const e of g0.examples) if (m.examples.length < 6 && !m.examples.some(x => x.page === e.page && x.text === e.text)) m.examples.push(e);
    if (g0.repro && (!m.repro || ((g0.cat === 'tiny' || g0.cat === 'tap') && g0.repro.num < m.repro.num) || (g0.cat === 'overlap' && g0.repro.num > m.repro.num))) m.repro = g0.repro;
  }
  const order = [...merged.values()].sort((a, b) => b.sev - a.sev || b.pages.size - a.pages.size || b.count - a.count);
  order.forEach((g, i) => g.id = 'g' + String(i + 1).padStart(3, '0'));
  for (const c of Object.keys(totals)) totals[c] = order.filter(g => g.cat === c).length;
  return order;
}
function savePartial() { try { writeFileSync(OUT + '/findings.partial.json', JSON.stringify({done, total, occurrences, groups: finalize().map(plain)}, null, 1)) } catch {} }

/* ------------------------------------------------------------------------------------------------------------------ */
/* Screenshot stage: re-enter the page, scroll the offending element into view and capture a framed crop               */
/* ------------------------------------------------------------------------------------------------------------------ */
async function shoot(tab, g) {
  const r = g.repro, {cfg, ctx} = r; await setConfig(tab, cfg);
  const st = await enter(tab, ctx); if (st?.skip) return false;
  const opts = {stamp: true, ...(st?.scope ? {scope: st.scope} : {}), ...(st?.unclip ? {unclip: st.unclip} : {}), ...(st?.skipSel ? {skip: st.skipSel} : {})};
  const res = await runProbe(tab, opts), list = res[g.cat === 'hscroll' ? 'hscroll' : g.cat] ?? [], f = (Array.isArray(list) ? list : [list]).find(x => x && x.sel === r.sel && x.text === r.text);
  if (!f && g.cat !== 'hscroll') return false;
  await sleep(250);
  const ids = f ? [f.ua, f.ua2].filter(Boolean) : [];
  const box = await ev(tab, `(()=>{const ids=${JSON.stringify(ids)};const els=ids.map(i=>document.querySelector('[data-ua="'+i+'"]')).filter(Boolean);if(!els.length)return {x:scrollX,y:scrollY,w:innerWidth,h:Math.min(innerHeight,700)};
    els[0].scrollIntoView({block:'center',inline:'center'});for(const e of els){e.style.outline='2px solid #ff00dd';e.style.outlineOffset='3px'}
    const rs=els.map(e=>e.getBoundingClientRect()),l=Math.min(...rs.map(r=>r.left)),t=Math.min(...rs.map(r=>r.top)),rr=Math.max(...rs.map(r=>r.right)),b=Math.max(...rs.map(r=>r.bottom));
    return {x:l+scrollX,y:t+scrollY,w:rr-l,h:b-t}})()`);
  await sleep(200);
  const vw = cfg.w, vh = await ev(tab, 'innerHeight'), pad = 36; if (process.env.UA_DEBUG) console.log('  box', g.id, JSON.stringify(box), vw, vh);
  const x = Math.max(0, Math.min(box.x - pad, vw - 40)), y = Math.max(0, box.y - pad), w = Math.min(Math.max(box.w + 2 * pad, 200), vw - x), h = Math.min(Math.max(box.h + 2 * pad, 120), 520);
  const shot = (await tab.send('Page.captureScreenshot', {format: 'png', captureBeyondViewport: true, clip: {x, y, width: w, height: h, scale: 1}})).result;
  tab.cfg = null;
  const file = `shots/${g.id}-${g.cat}-${cfg.w}-${cfg.theme}.png`; writeFileSync(OUT + '/' + file, Buffer.from(shot.data, 'base64')); g.shot = file; return true;
}

/* ------------------------------------------------------------------------------------------------------------------ */
/* Report                                                                                                              */
/* ------------------------------------------------------------------------------------------------------------------ */
function writeReport(order, meta) {
  const dropped = existsSync(OUT + '/dropped.json') ? JSON.parse(readFileSync(OUT + '/dropped.json', 'utf8')) : [];
  const isDropped = g => dropped.find(d => (!d.cat || d.cat === g.cat) && (!d.selectorIncludes || g.selector.includes(d.selectorIncludes) || g.selectorPattern.includes(d.selectorIncludes)));
  const kept = order.filter(g => !isDropped(g)), drops = order.filter(g => isDropped(g));
  const cats = ['shattered', 'overlap', 'clip', 'hscroll', 'tap', 'tiny'], catName = {shattered: 'Shattered text', overlap: 'Overlaps', clip: 'Clipping / past the viewport', hscroll: 'Horizontal page scroll', tap: 'Small tap targets (375 px)', tiny: 'Tiny text (< 11 px)'};
  const md = [`# UI layout audit`, ``, `Base ${meta.base}; ${meta.jobs} page states probed in ${meta.minutes} min${meta.quick ? ' (--quick)' : ''}; ${meta.errors} job errors, ${meta.skipped} skipped states (see findings.json). Widths 375 (mobile emulation, dpr 2), 768, 1024, 1440; dark and light. Every finding below is a measured fact from the DOM; each group was deduplicated by (category, selector pattern, short text) across pages.`, ``,
    `| Category | Raw occurrences | Groups (deduplicated) | Groups kept after review |`, `|---|---|---|---|`, ...cats.map(c => `| ${catName[c]} | ${occurrences[c]} | ${totals[c]} | ${kept.filter(g => g.cat === c).length} |`), ``];
  if (drops.length) { md.push(`## Dropped after looking at the screenshots`, ''); for (const g of drops) md.push(`- ${g.cat} \`${g.selector}\` (${g.count} occurrences): ${isDropped(g).reason}`); md.push('') }
  const bySrc = new Map; for (const g of kept) { const f = g.source.file || 'unknown'; if (!bySrc.has(f)) bySrc.set(f, []); bySrc.get(f).push(g) }
  const files = [...bySrc.entries()].sort((a, b) => Math.max(...b[1].map(g => g.sev)) - Math.max(...a[1].map(g => g.sev)) || b[1].length - a[1].length);
  md.push(`## Groups by source file (worst severity first)`, '');
  for (const [file, gs] of files) {
    md.push(`### \`${file}\``, '');
    for (const g of gs.sort((a, b) => b.sev - a.sev || b.pages.size - a.pages.size)) {
      const rp = g.repro;
      md.push(`#### ${g.id} · ${catName[g.cat]} · severity ${g.sev}${g.source.line ? ` · ${g.source.file}:${g.source.line}${g.source.weak ? ' (weak match)' : ''}` : ''}`, '',
        `- Element: \`${g.selector}\``, `- Seen ${g.count} times on ${g.pages.size} page state${g.pages.size === 1 ? '' : 's'}; widths ${[...g.widths].sort((a, b) => a - b).join(', ')}; themes ${[...g.themes].join(', ')}`,
        ...g.examples.slice(0, 3).map(e => `- Example: "${e.text}": ${e.measure} (${e.page}, ${e.width}px, ${e.theme})`),
        `- Pages: ${[...g.pages.keys()].slice(0, 8).join('; ')}${g.pages.size > 8 ? `; +${g.pages.size - 8} more` : ''}`);
      if (rp) md.push(`- Reproduce: ${rp.cfg.w}px ${rp.cfg.theme}, ${pageName(rp.ctx)}`);
      if (g.shot) md.push('', `![${g.id}](${g.shot})`); md.push('');
    }
  }
  if (errors.length) { md.push('## Job errors', ''); for (const e of errors.slice(0, 40)) md.push(`- ${e.page} @ ${e.cfg}: ${e.error}`); md.push('') }
  writeFileSync(OUT + '/findings.md', md.join('\n'));
}

/* ------------------------------------------------------------------------------------------------------------------ */
async function main() {
  if (flag('report')) {
    const d = JSON.parse(readFileSync(OUT + '/findings.json', 'utf8'));
    Object.assign(occurrences, d.occurrences); for (const c of Object.keys(totals)) totals[c] = d.groups.filter(g => g.cat === c).length;
    const order = d.groups.map(g => ({...g, count: g.occurrences, pages: new Map(g.pages.map(p => [p, 1])), widths: new Set(g.widths), themes: new Set(g.themes), repro: g.repro && {...g.repro, cfg: {w: g.repro.width, theme: g.repro.theme}, ctx: g.repro.ctx}}));
    writeReport(order, d.meta); console.log('wrote', OUT + '/findings.md'); chrome.kill(); process.exit(0);
  }
  browser = new Conn(await connectBrowser());
  if (flag('shots-only')) { // retake the screenshots of an existing findings.json
    const d = JSON.parse(readFileSync(OUT + '/findings.json', 'utf8')), tab = await newTab(); let n = 0;
    for (const g of d.groups) { if (!g.repro) continue; if (g.shot && !flag('all')) continue; const gg = {...g, repro: {...g.repro, cfg: {w: g.repro.width, theme: g.repro.theme, key: g.repro.width + '/' + g.repro.theme}}}; if (!(opt('only-cat', '') === '' || gg.cat === opt('only-cat', ''))) continue; try { if (await shoot(tab, gg)) g.shot = gg.shot; else console.log('  no shot for', g.id) } catch (e) { console.log('  shot failed', g.id, e.message); tab.cfg = null } if (++n % 5 === 0) console.log('  shots', n) }
    writeFileSync(OUT + '/findings.json', JSON.stringify(d, null, 1)); console.log('wrote shots'); chrome.kill(); process.exit(0);
  }
  const {jobs, runIds, nScenarios} = await buildJobs(); total = jobs.length;
  console.log(`ui-audit: ${jobs.length} page states (${runIds.length} runs, ${nScenarios} scenarios in the bank), ${WORKERS} workers${QUICK ? ', --quick' : ''}`);
  const queue = [...jobs]; t0 = Date.now();
  const pool = []; for (let i = 0; i < Math.min(WORKERS, jobs.length); i++) pool.push(await newTab());
  await Promise.all(pool.map(t => worker(t, queue)));
  const minutes = Math.round((Date.now() - t0) / 6000) / 10;
  const order = finalize();
  console.log(`scan done in ${minutes} min. Raw occurrences:`, JSON.stringify(occurrences), 'groups:', JSON.stringify(totals));
  if (!NOSHOTS) {
    const shotTab = pool[0], want = [], seenCat = {};
    for (const g of order) { if (!g.repro) continue; const lim = g.cat === 'tiny' || g.cat === 'tap' ? 8 : 30; seenCat[g.cat] = (seenCat[g.cat] ?? 0) + 1; if (seenCat[g.cat] <= lim) want.push(g) }
    console.log(`screenshots for ${want.length} groups`); let n = 0;
    for (const g of want) { try { await shoot(shotTab, g) } catch (e) { errors.push({page: 'screenshot ' + g.id, cfg: '', error: String(e.message).slice(0, 160)}); shotTab.cfg = null } if (++n % 10 === 0) console.log(`  shots ${n}/${want.length}`) }
  }
  const meta = {base, quick: QUICK, jobs: jobs.length, minutes, errors: errors.length, skipped: skipped.length, widths: WIDTHS, themes: THEMES, runs: runIds.length, scenarios: nScenarios};
  writeFileSync(OUT + '/findings.json', JSON.stringify({meta, occurrences, totals, errors, skipped: skipped.slice(0, 200), groups: order.map(plain)}, null, 1));
  writeReport(order, meta); console.log('wrote', OUT + '/findings.json and findings.md');
  chrome.kill(); process.exit(0);
}
main().catch(e => { console.error(e); try { chrome.kill() } catch {} process.exit(1) });
