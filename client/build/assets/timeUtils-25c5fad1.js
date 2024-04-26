var F=(s,t,e)=>{if(!t.has(s))throw TypeError("Cannot "+e)};var i=(s,t,e)=>(F(s,t,"read from private field"),e?e.call(s):t.get(s)),w=(s,t,e)=>{if(t.has(s))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(s):t.set(s,e)},k=(s,t,e,n)=>(F(s,t,"write to private field"),n?n.call(s,e):t.set(s,e),e);var N=(s,t,e)=>(F(s,t,"access private method"),e);import{aH as y,j as r,c as V,B as W,a as ne,ci as re,cj as ae,ck as Y,cl as oe,cm as X,k as le,r as p,cn as ie,co as ce,Q as C,a5 as $,bs as ue,bt as de,bu as R,bv as he,bw as me,bx as T,aj as ge}from"./index-1b724ed0.js";import{u as xe,f as B,g as fe,a as pe,b as be,c as ve}from"./index-0590bddd.js";var Z={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},q=y.createContext&&y.createContext(Z),j=globalThis&&globalThis.__assign||function(){return j=Object.assign||function(s){for(var t,e=1,n=arguments.length;e<n;e++){t=arguments[e];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(s[a]=t[a])}return s},j.apply(this,arguments)},ye=globalThis&&globalThis.__rest||function(s,t){var e={};for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&t.indexOf(n)<0&&(e[n]=s[n]);if(s!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(s);a<n.length;a++)t.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(s,n[a])&&(e[n[a]]=s[n[a]]);return e};function ee(s){return s&&s.map(function(t,e){return y.createElement(t.tag,j({key:e},t.attr),ee(t.child))})}function je(s){return function(t){return y.createElement(we,j({attr:j({},s.attr)},t),ee(s.child))}}function we(s){var t=function(e){var n=s.attr,a=s.size,c=s.title,l=ye(s,["attr","size","title"]),o=a||e.size||"1em",d;return e.className&&(d=e.className),s.className&&(d=(d?d+" ":"")+s.className),y.createElement("svg",j({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},e.attr,n,l,{className:d,style:j(j({color:s.color||e.color},e.style),s.style),height:o,width:o,xmlns:"http://www.w3.org/2000/svg"}),c&&y.createElement("title",null,c),s.children)};return q!==void 0?y.createElement(q.Consumer,null,function(e){return t(e)}):t(Z)}function K(s){return je({tag:"svg",attr:{fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",d:"M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"}}]})(s)}const G=ne("inputbox",{variants:{variant:{default:"rounded-lg border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent focus:shadow-lg placeholder:text-gray-400 placeholder:font-lg",searchbar:"searchbar w-2/5 self-center"},buttonIcon:{default:"flex w-full items-center rounded-full bg-slate-100 pl-5 p-2",outside:"flex w-full items-center justify-between rounded-full bg-slate-100"}},defaultVariants:{variant:"default"}}),Ce=({className:s,variant:t,buttonIcon:e,...n})=>r.jsx(r.Fragment,{children:t==="searchbar"?r.jsxs("div",{className:V(G({variant:t,buttonIcon:e,className:s})),children:[e==="default"&&r.jsxs(r.Fragment,{children:[r.jsx(K,{className:"searchbar-icon text-2xl"}),r.jsx("input",{className:"searchbar-input ml-3 mr-4 w-full focus-visible:outline-none bg-slate-100 ",...n})]}),e==="outside"&&r.jsxs(r.Fragment,{children:[r.jsx("input",{className:"searchbar-input ml-3 mr-4 w-full focus-visible:outline-none bg-slate-100 ",...n}),r.jsx(W,{variant:"empty",className:"rounded-r-full",type:"submit",children:r.jsx(K,{className:"searchbar-icon bg-primary-gray/50 rounded-br-full rounded-tr-full p-2 text-4xl"})})]})]}):r.jsx("input",{className:V(G({variant:t,className:s})),...n})});var b,v,u,g,P,D,S,z,Q,Me=(Q=class extends re{constructor(t,e){super();w(this,P);w(this,S);w(this,b,void 0);w(this,v,void 0);w(this,u,void 0);w(this,g,void 0);k(this,b,t),this.setOptions(e),this.bindMethods(),N(this,P,D).call(this)}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(t){var n;const e=this.options;this.options=i(this,b).defaultMutationOptions(t),ae(this.options,e)||i(this,b).getMutationCache().notify({type:"observerOptionsUpdated",mutation:i(this,u),observer:this}),e!=null&&e.mutationKey&&this.options.mutationKey&&Y(e.mutationKey)!==Y(this.options.mutationKey)?this.reset():((n=i(this,u))==null?void 0:n.state.status)==="pending"&&i(this,u).setOptions(this.options)}onUnsubscribe(){var t;this.hasListeners()||(t=i(this,u))==null||t.removeObserver(this)}onMutationUpdate(t){N(this,P,D).call(this),N(this,S,z).call(this,t)}getCurrentResult(){return i(this,v)}reset(){var t;(t=i(this,u))==null||t.removeObserver(this),k(this,u,void 0),N(this,P,D).call(this),N(this,S,z).call(this)}mutate(t,e){var n;return k(this,g,e),(n=i(this,u))==null||n.removeObserver(this),k(this,u,i(this,b).getMutationCache().build(i(this,b),this.options)),i(this,u).addObserver(this),i(this,u).execute(t)}},b=new WeakMap,v=new WeakMap,u=new WeakMap,g=new WeakMap,P=new WeakSet,D=function(){var e;const t=((e=i(this,u))==null?void 0:e.state)??oe();k(this,v,{...t,isPending:t.status==="pending",isSuccess:t.status==="success",isError:t.status==="error",isIdle:t.status==="idle",mutate:this.mutate,reset:this.reset})},S=new WeakSet,z=function(t){X.batch(()=>{var e,n,a,c,l,o,d,O;if(i(this,g)&&this.hasListeners()){const x=i(this,v).variables,M=i(this,v).context;(t==null?void 0:t.type)==="success"?((n=(e=i(this,g)).onSuccess)==null||n.call(e,t.data,x,M),(c=(a=i(this,g)).onSettled)==null||c.call(a,t.data,null,x,M)):(t==null?void 0:t.type)==="error"&&((o=(l=i(this,g)).onError)==null||o.call(l,t.error,x,M),(O=(d=i(this,g)).onSettled)==null||O.call(d,void 0,t.error,x,M))}this.listeners.forEach(x=>{x(i(this,v))})})},Q);function Fe(s,t){const e=le(t),[n]=p.useState(()=>new Me(e,s));p.useEffect(()=>{n.setOptions(s)},[n,s]);const a=p.useSyncExternalStore(p.useCallback(l=>n.subscribe(X.batchCalls(l)),[n]),()=>n.getCurrentResult(),()=>n.getCurrentResult()),c=p.useCallback((l,o)=>{n.mutate(l,o).catch(ie)},[n]);if(a.error&&ce(n.options.throwOnError,[a.error]))throw a.error;return{...a,mutate:c,mutateAsync:a.mutate}}/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Te=C("ArrowDown",[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]]);/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ze=C("ArrowUpDown",[["path",{d:"m21 16-4 4-4-4",key:"f6ql7i"}],["path",{d:"M17 20V4",key:"1ejh1v"}],["path",{d:"m3 8 4-4 4 4",key:"11wl7u"}],["path",{d:"M7 4v16",key:"1glfcx"}]]);/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ee=C("ArrowUp",[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]]);/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ke=C("ChevronsLeft",[["path",{d:"m11 17-5-5 5-5",key:"13zhaf"}],["path",{d:"m18 17-5-5 5-5",key:"h8a8et"}]]);/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ne=C("ChevronsRight",[["path",{d:"m6 17 5-5-5-5",key:"xnjwq"}],["path",{d:"m13 17 5-5-5-5",key:"17xmmf"}]]);/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=C("MoreHorizontal",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]);/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pe=C("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]),Oe=({onClickPrev:s,onClickNext:t,table:e})=>{const n=e.getState().pagination.pageIndex+1,a=e.getPageCount();e.getCanPreviousPage();const c=e.getCanNextPage(),l=[...Array(a+1).keys()].slice(1);return r.jsx("nav",{children:r.jsxs("ul",{className:"flex flex-row gap-1",children:[r.jsx("li",{children:r.jsxs($,{variant:"ghost",className:`gap-1 px-3 ${n<3&&"hidden"}`,onClick:()=>e.setPageIndex(0),children:[r.jsx(ke,{size:16,strokeWidth:2},"chevrons-left")," ",r.jsx("span",{children:"First"})]},"to-first-button")},"to-first"),l.length>3&&n>2&&r.jsx("li",{className:"flex items-center p-2",children:r.jsx(J,{size:16,strokeWidth:1.5},"ellipsis-left-icon")},"ellipsis-left"),l.map(o=>l.length>2?r.jsx(y.Fragment,{children:n==o||n-1==o||n+1==o||n==1&&o==n+2||n==e.getPageCount()&&o==n-2?r.jsx("li",{children:r.jsx($,{variant:n==o?"default":"ghost",onClick:()=>e.setPageIndex(o-1),children:r.jsx("span",{children:o})},`to-${o}-button`)},`to-${o}`):""},`frag-${o}`):r.jsx("li",{children:r.jsx($,{variant:n==o?"default":"ghost",onClick:()=>e.setPageIndex(o-1),children:o},`to-${o}-button`)},`to-${o}`)),l.length>3&&c&&n!=e.getPageCount()-1?r.jsx("li",{className:"flex items-center p-2",children:r.jsx(J,{size:16,strokeWidth:1.5},"ellipsis-right-icon")},"ellipsis-right"):r.jsx("li",{className:"hidden"},"ellipsisNone2"),r.jsx("li",{children:r.jsxs($,{variant:"ghost",className:`gap-1 px-3
						${(e.getPageCount()<3||e.getPageCount()-n<2)&&"hidden"}`,onClick:()=>e.setPageIndex(e.getPageCount()-1),children:[r.jsx("span",{children:"Last"})," ",r.jsx(Ne,{size:16,strokeWidth:2},"chevrons-right")]},"to-last-button")},"to-last")]})},"pagination-nav")};function Ae({columns:s,data:t,filterWhat:e,dataType:n,openModal:a,isLoading:c,hidePagination:l,hideFilter:o,autoResetPageIndex:d=!1}){var E,A,I,_,H,L,U;const[O,x]=p.useState([]),[M,te]=p.useState([]),h=xe({data:t,columns:s,getCoreRowModel:fe(),onSortingChange:x,getSortedRowModel:pe(),onColumnFiltersChange:te,getFilteredRowModel:be(),getPaginationRowModel:ve(),enableSortingRemoval:!1,state:{sorting:O,columnFilters:M},autoResetPageIndex:d}),se=`Filter ${((e.split("_")[0]==="or"?"OR":e.split("_")[0])+" "+(e.split("_")[1]==="no"?"number":e.split("_")[1]?e.split("_")[1]:"")).trim()}...`;return r.jsxs("div",{className:"flex max-h-full flex-col divide-y",children:[!o&&r.jsxs("div",{className:"flex flex-none justify-between p-4",children:[o?null:r.jsx("div",{className:"w-1/2",children:r.jsx(Ce,{placeholder:se,value:((E=h.getColumn(e))==null?void 0:E.getFilterValue())??"",onChange:f=>{var m;return(m=h.getColumn(e))==null?void 0:m.setFilterValue(f.target.value)},variant:"searchbar",buttonIcon:"outside"})}),a&&r.jsx("div",{className:"flex flex-row-reverse",children:r.jsxs(W,{fill:"green",onClick:a,disabled:c,className:"flex h-8 flex-row items-center pl-2 pr-3 disabled:cursor-not-allowed disabled:opacity-40",children:[r.jsx(Pe,{size:26,strokeWidth:2})," ",`Add ${n}`]})})]}),r.jsxs(ue,{className:"flex-1 overflow-auto",children:[r.jsx(de,{className:"z-10 bg-slate-50 hover:bg-slate-50",children:h.getHeaderGroups().map(f=>r.jsx(R,{children:f.headers.map(m=>r.jsx(he,{className:"text-xs font-bold uppercase text-slate-800",children:m.isPlaceholder?null:B(m.column.columnDef.header,m.getContext())},m.id))},f.id))}),r.jsx(me,{children:(A=h.getRowModel().rows)!=null&&A.length?h.getRowModel().rows.map(f=>r.jsx(R,{"data-state":f.getIsSelected()&&"selected",className:"text-xs font-medium text-slate-950",children:f.getVisibleCells().map(m=>r.jsx(T,{className:"py-3",children:B(m.column.columnDef.cell,m.getContext())},m.id))},f.id)):c?r.jsx(R,{className:"hover:bg-white",children:r.jsx(T,{colSpan:s.length,className:"h-24 items-center justify-center space-y-0 px-20 text-center",children:r.jsx("div",{className:"flex items-center justify-center text-slate-800/60",children:r.jsx(ge,{size:28,strokeWidth:2,className:"animate-spin"})})})}):r.jsx(R,{children:r.jsx(T,{colSpan:s.length,className:"h-24 text-center font-medium hover:bg-white",children:"No results."})})})]}),l?null:r.jsxs("div",{className:"flex flex-none flex-row items-center justify-between p-4",children:[r.jsx("div",{className:"text-sm font-semibold",children:((I=h.getFilteredSelectedRowModel().rows)==null?void 0:I.length)>0?r.jsxs(r.Fragment,{children:[(_=h.getFilteredSelectedRowModel().rows)==null?void 0:_.length," of"," ",(H=h.getFilteredRowModel().rows)==null?void 0:H.length," row(s) selected"]}):r.jsxs(r.Fragment,{children:[(L=h.getFilteredRowModel().rows)==null?void 0:L.length," ",((U=h.getFilteredRowModel().rows)==null?void 0:U.length)!==1?"rows":"row"]})}),r.jsx("div",{children:r.jsx(Oe,{onClickPrev:()=>h.previousPage(),onClickNext:()=>h.nextPage(),table:h})})]})]})}const Ie=()=>{const[s,t]=p.useState(!1);return{isOpen:s,openModal:()=>{t(!0)},closeModal:()=>{t(!1)}}},_e=()=>{const s=new Date,t=s.getFullYear(),e=s.getMonth()+1,n=s.getDate(),a=s.getHours()+":"+s.getMinutes()+":"+s.getSeconds();return`${t}-${e}-${n} at ${a}`},He=s=>{const t=new Date(s),e=t.getFullYear(),n=t.getMonth()+1,a=t.getDate();let c=t.getHours();const l=t.getMinutes(),o=c>=12?"PM":"AM";return c=c%12,c=c||12,`${e}-${n<10?"0":""}${n}-${a<10?"0":""}${a} ${c}:${l<10?"0":""}${l} ${o}`},Le=s=>{const t=["January","February","March","April","May","June","July","August","September","October","November","December"],e=new Date(s),n=e.getFullYear(),a=t[e.getMonth()],c=e.getDate();let l=e.getHours();const o=l>=12?"PM":"AM";l=l%12||12;const d=e.getMinutes().toString().padStart(2,"0");return`${a} ${c<10?"0":""}${c}, ${n} at ${l}:${d} ${o}`};export{Ee as A,Ae as D,je as G,Ce as I,Pe as P,Fe as a,Te as b,ze as c,He as d,Le as f,_e as g,Ie as u};
