import{r as i,j as e,$ as m,aL as h,h as p,i as j,k as g,aF as y,aG as b,aI as v,bY as k,l as w,cf as M}from"./index-6462efb5.js";import{G as x}from"./timeUtils-368e2f9b.js";function N(a){return x({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"}}]})(a)}const F=({title:a,isOpen:l,onClose:s,children:r,closeButton:n})=>{const c=i.useRef(null),[t,d]=i.useState(!1);i.useEffect(()=>{var o;if(l)d(!0);else{(o=c.current)==null||o.classList.add("fade-out");const u=setTimeout(()=>{d(!1),s()},300);return()=>clearTimeout(u)}},[l,s]);const f=l?"animate-fade-in":"animate-fade-out";return e.jsx(e.Fragment,{children:t&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{ref:c,className:`modal-content ${f} absolute left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 transform flex-col gap-5 rounded-md bg-slate-50 stroke-1 p-5`,children:[!a&&e.jsx("div",{className:"modal-header flex justify-center"}),n&&e.jsx("div",{className:"modal-header flex justify-center",children:e.jsxs("div",{className:"flex w-full justify-between",children:[e.jsx("span",{}),e.jsx("span",{className:"text-lg font-bold uppercase",children:a}),e.jsx("span",{className:"close-button relative right-0 top-0 flex-none cursor-pointer justify-end p-1",onClick:s,children:e.jsx(N,{})})]})}),r]}),e.jsx("div",{className:"modal-overlay fixed left-0 top-0 z-30 h-full w-full bg-black bg-opacity-50",onClick:s})]})})};/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=m("Ban",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m4.9 4.9 14.2 14.2",key:"1m5liu"}]]);/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=m("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);function L(a){return x({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"}}]})(a)}const B=({title:a,children:l,description:s,tooltip:r,footer:n,bgClassName:c,textColorClassName:t})=>e.jsx(e.Fragment,{children:e.jsx(h,{children:e.jsxs(p,{className:`w-full max-w-[460px] ${c||"bg-white"} ${t||"text-slate-800"} rounded-md border-0 shadow-none`,children:[e.jsxs(j,{className:"px-5 pt-4",children:[e.jsx(g,{className:`text-sm font-semibold tracking-normal ${!s&&"mb-5"}`,children:e.jsxs("span",{className:"flex flex-row items-center justify-between gap-1",children:[a," ",r&&e.jsxs(y,{children:[e.jsx(b,{children:e.jsx(z,{size:18,strokeWidth:2,className:`${t||"text-slate-800"} opacity-60`})}),e.jsx(v,{className:"max-w-[40ch] font-medium",children:r})]})]})}),s&&e.jsx(k,{className:`text-sm font-medium opacity-70 ${t||"text-slate-800"}`,children:s})]}),e.jsx(w,{className:"px-5 pb-4",children:l}),n&&e.jsx(M,{children:n})]})})});export{$ as B,L as F,F as M,B as R};