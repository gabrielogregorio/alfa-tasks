if(!self.define){let e,i={};const n=(n,c)=>(n=new URL(n+".js",c).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(c,s)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let o={};const t=e=>n(e,r),d={module:{uri:r},exports:o,require:t};i[r]=Promise.all(c.map((e=>d[e]||t(e)))).then((e=>(s(...e),o)))}}define(["./workbox-f3e6b16a"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-DgObM1Zc.js",revision:null},{url:"assets/index-S1tTaXyY.css",revision:null},{url:"index.html",revision:"843ea83614cbe217b917cd713e241672"},{url:"registerSW.js",revision:"c0e21c0ee054b10bda239b57b9ec6b63"},{url:"favicon.ico",revision:"353c88885cc741600f1ded5cace31da6"},{url:"icon.png",revision:"d3a8d133dfcec76ac856aae00b33a79b"},{url:"icon-512x512.png",revision:"65e12ca19c5ddcd7f2b8ac3a44f3f51f"},{url:"manifest.webmanifest",revision:"9e286f09440d44c5b04b9cef0c50188c"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
//# sourceMappingURL=sw.js.map
