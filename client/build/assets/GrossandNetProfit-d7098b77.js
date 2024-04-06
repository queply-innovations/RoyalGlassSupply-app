import{j as e,c as u,a as g,m as v,G as A,r as c,bH as F}from"./index-657ef32a.js";const h=g("selectbox",{variants:{variant:{default:"rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent focus:shadow-mg placeholder:text-gray-400 placeholder:font-lg"}},defaultVariants:{variant:"default"}}),T=({className:r,variant:l,options:a,placeholder:d,hasFrequency:i,frequencyOptions:n,...o})=>e.jsxs(e.Fragment,{children:[e.jsxs("select",{defaultValue:"DEFAULT",className:u(h({variant:l,className:r})),...o,children:[e.jsx("option",{value:"DEFAULT",hidden:!0,children:d}),a.length>1?a.map((t,s)=>e.jsx("option",{className:"hover:bg-primary-red flex cursor-pointer rounded-none border-none",value:t,children:t.charAt(0).toUpperCase()+t.slice(1)},s)):a]}),i&&e.jsxs("select",{defaultValue:"DEFAULT",className:u(h({variant:l,className:r})),...o,children:[e.jsx("option",{value:"DEFAULT",hidden:!0,children:"Sort By"}),n==null?void 0:n.map((t,s)=>e.jsx("option",{className:"hover:bg-primary-red flex cursor-pointer rounded-none border-none",value:t,children:t},s))]})]});/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=v("Ban",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m4.9 4.9 14.2 14.2",key:"1m5liu"}]]);function N(r){return A({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"}}]})(r)}const j=g("graph",{variants:{variant:{default:"flex h-full w-full rounded-md border border-black/10 bg-black p-5 bg-white flex-col"}},defaultVariants:{variant:"default"}}),S=({className:r,variant:l})=>{const a=c.useRef(null),[d,i]=c.useState(0),[n,o]=c.useState(0);return c.useEffect(()=>{if(a.current){const t=window.getComputedStyle(a.current),s=parseFloat(t.paddingTop),p=parseFloat(t.paddingBottom),f=parseFloat(t.paddingLeft),x=parseFloat(t.paddingRight),m=a.current.clientWidth-f-x,b=a.current.clientHeight-s-p;i(m),o(b)}},[]),e.jsx(e.Fragment,{children:e.jsxs("div",{className:u(j({variant:l,className:r})),ref:a,children:[e.jsx("h2",{className:"gross-and-netprofit-title text-base font-bold uppercase text-black",children:"Gross And Net Profit"}),e.jsx(F,{type:"line",height:n-50,width:d,series:[{name:"GROSS INCOME",data:[234,45,67,987,345,123,500,346,234,123,564,341]},{name:"NET PROFIT",data:[432,54,76,789,543,321,231,642,432,321,465,143]},{name:"TOTAL CAPITAL",data:[925,860,487,199,726,482,70,838,328,98,74,706]}],options:{xaxis:{categories:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},legend:{position:"top",horizontalAlign:"right"},chart:{toolbar:{show:!1}}}})]})})};export{y as B,N as F,S as G,T as S};