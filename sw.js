if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let o={};const t=e=>n(e,c),d={module:{uri:c},exports:o,require:t};i[c]=Promise.all(s.map((e=>d[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-1616146e"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-58384e00.js",revision:null},{url:"assets/index-8362553b.css",revision:null},{url:"index.html",revision:"0d55986585e8df463b80fcdef5bc94c2"},{url:"registerSW.js",revision:"d4713c23acdf2f50cfeb140adcb3c75f"},{url:"favicon.ico",revision:"df7700616b500967e2c0f2c2a725d2d8"},{url:"icon.png",revision:"083553530041d487c43298064c832aa4"},{url:"icon-512x512.png",revision:"076cc83bcc5511060ea1b1b32a944c77"},{url:"manifest.webmanifest",revision:"bbcd3d254449fa7bb6b69fd8f0a8e6c8"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
//# sourceMappingURL=sw.js.map
