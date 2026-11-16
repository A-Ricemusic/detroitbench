// Administration metadata, separate from immutable participant evidence.
export const reasonRuleLabel=rule=>({
 'full-600':'Extended explanations (up to 600 words)',
 'brief-600':'Brief explanations (a few sentences)',
 'short-160':'Short explanations (up to 160 words)',
}[rule]??(rule||'Not recorded'));
