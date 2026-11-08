import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// React and react-dom go in a chunk of their own: it changes only when they are upgraded, so with the immutable cache
// headers for /assets/ (vercel.json) a returning visitor keeps it across deploys, and index.html preloads it next to
// the entry. The Radix controls are a separate chunk too (src/components/ui-radix.jsx, loaded by the lazy pages and,
// after first paint, by the results page through src/components/deferred.jsx).
const VENDOR=/node_modules\/(react|react-dom|scheduler)\//;
export default defineConfig({
 plugins:[react(),tailwindcss()],
 server:{port:5173,strictPort:true},
 preview:{port:4173,strictPort:true},
 build:{
  target:'es2022',
  // Every browser that runs es2022 modules supports modulepreload or ignores it harmlessly; no polyfill needed.
  modulePreload:{polyfill:false},
  // app.css is the only stylesheet and the main chunk imports it; any CSS a lazy page imports would load with it.
  cssCodeSplit:true,
  rollupOptions:{output:{manualChunks:id=>VENDOR.test(id)?'react':undefined}}
 }
});
