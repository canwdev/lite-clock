if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let c=Promise.resolve();return s[e]||(c=new Promise(async c=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=c}else importScripts(e),c()})),c.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},c=(c,s)=>{Promise.all(c.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(c)};self.define=(c,r,i)=>{s[c]||(s[c]=Promise.resolve().then(()=>{let s={};const t={uri:location.origin+c.slice(1)};return Promise.all(r.map(c=>{switch(c){case"exports":return s;case"module":return t;default:return e(c)}})).then(e=>{const c=i(...e);return s.default||(s.default=c),s})}))}}define("./service-worker.js",["./workbox-468c4d03"],(function(e){"use strict";e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"./favicon.png",revision:"728cabda15de8ca51c6d713a4a839c3b"},{url:"./index.html",revision:"86904a939e88d96cbc6e736369f156b4"},{url:"./manifest.json",revision:"c7f815e96b2a37abbf9ad5a81ed88f73"},{url:"./static/css/main.4e6c46b043de889cb8a4.css",revision:"c1e0651311be55471e26e10953f8d711"},{url:"./static/js/0.baf74265c87b72bd9148.js",revision:"1b56b5ca42fda17ca289716b2747ddf2"},{url:"./static/js/0.baf74265c87b72bd9148.js.LICENSE.txt",revision:"af4701217085bd911d03758fa1b02cc0"},{url:"./static/js/1.410dcf0b73d9647a7e5c.js",revision:"595f823e8e4c5ce712906d78fe5da549"},{url:"./static/js/1.410dcf0b73d9647a7e5c.js.LICENSE.txt",revision:"4e230d017ca1e1e1cdf42b987636e3ca"},{url:"./static/js/3.5c3af617ead8fc401461.js",revision:"2fb4f8cd9a8b391df2af9ce7c6bb73ec"},{url:"./static/js/runtime.c96ad1e23ad63da4d304.js",revision:"0358997880c41faa6ba2c6d73904d67c"}],{})}));
//# sourceMappingURL=service-worker.js.map