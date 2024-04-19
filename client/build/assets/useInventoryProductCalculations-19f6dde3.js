import{k as F,r as h,bY as L,bZ as T,b_ as R,b$ as V,c0 as q,O as m,j as e,at as B,B as b,aG as g,aj as x,aH as y,bb as K,ax as C,ar as N,as as w,aD as I,au as k,e as D,c1 as $,R as O,c2 as Z,c3 as E,ah as v,c4 as W,c5 as U,c6 as Y,c7 as P,ba as Q,c8 as G,c9 as H,ca as X}from"./index-a53f4910.js";import{a as j,A as S,b as M,c as z,f as J,l as ee}from"./FormatCurrency-429c7877.js";const ue=()=>{const t=F(),[s,r]=h.useState({}),i=(n,d)=>{r(l=>({...l,[n]:d}))},u=async n=>{if(console.log("Submitting: ",n),n.action==="add")return await c(n.data);if(n.action==="batch-add")return await p(n.data);if(n.action==="update")return await a({id:n.id,data:n.data});{const d="No data to submit. Function requires at least one parameter.";return console.error(d),{status:400,data:d}}},o={onSuccess:async()=>{await t.invalidateQueries({queryKey:["inventoryProductById"]})},onError:n=>{console.error("Inventory Product Data failed",n)}},{mutateAsync:c}=j({mutationKey:["addInventoryProduct"],mutationFn:L,...o}),{mutateAsync:p}=j({mutationKey:["addInventoryProducts"],mutationFn:T,...o}),{mutateAsync:a}=j({mutationKey:["patchInventoryProduct"],mutationFn:R,...o});return{value:s,setValue:r,handleChange:i,handleSubmit:u}},ae=()=>{const t=F(),[s,r]=h.useState({}),i=(a,n)=>{r(d=>({...d,[a]:n}))},u=async a=>{if(console.log("Submitting: ",a),a.action==="add")return await c(a.data);if(a.action==="update")return await p({id:a.id,data:a.data});{const n="No data to submit. Function requires at least one parameter.";return console.error(n),{status:400,data:n}}},o={onSuccess:async()=>{await t.invalidateQueries({queryKey:["products"]})},onError:a=>{console.error("Product Data failed",a)}},{mutateAsync:c}=j({mutationKey:["addProduct"],mutationFn:V,...o}),{mutateAsync:p}=j({mutationKey:["patchProduct"],mutationFn:q,...o});return{value:s,setValue:r,handleChange:i,handleSubmit:u,addProductMutation:c}};/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=m("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const he=m("ChevronsUpDown",[["path",{d:"m7 15 5 5 5-5",key:"1hf1tw"}],["path",{d:"m7 9 5-5 5 5",key:"sgt6xg"}]]);/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const te=m("DatabaseBackup",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 12a9 3 0 0 0 5 2.69",key:"1ui2ym"}],["path",{d:"M21 9.3V5",key:"6k6cib"}],["path",{d:"M3 5v14a9 3 0 0 0 6.47 2.88",key:"i62tjy"}],["path",{d:"M12 12v4h4",key:"1bxaet"}],["path",{d:"M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16",key:"1f4ei9"}]]);/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const se=m("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me=m("MoreVertical",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"12",cy:"5",r:"1",key:"gxeob9"}],["circle",{cx:"12",cy:"19",r:"1",key:"lyex9k"}]]);/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe=m("PackageMinus",[["path",{d:"M16 16h6",key:"100bgy"}],["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",key:"e7tb2h"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12",key:"a4e8g8"}]]);/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const re=m("PackagePlus",[["path",{d:"M16 16h6",key:"100bgy"}],["path",{d:"M19 13v6",key:"85cyf1"}],["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",key:"e7tb2h"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12",key:"a4e8g8"}]]);/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye=m("Pencil",[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",key:"5qss01"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]),fe=({children:t,title:s,isOpen:r,onClose:i,closeOnOverlayClick:u})=>{const o=h.useRef(null),[c,p]=h.useState(!1),a=r?"animate-fade-in":"animate-fade-out";return h.useEffect(()=>{var n;if(r)p(!0);else{(n=o.current)==null||n.classList.add("fade-out");const d=setTimeout(()=>{p(!1),i()},300);return()=>clearTimeout(d)}},[r,i]),e.jsx(e.Fragment,{children:c&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{ref:o,className:`modal-content ${a} absolute left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 transform flex-col gap-5 rounded-md bg-white stroke-1 p-5 pb-10 shadow-2xl`,children:[e.jsxs("div",{className:"flex w-full justify-between",children:[e.jsx("span",{className:"text-lg font-bold uppercase tracking-tight text-gray-800",children:s}),e.jsx("span",{className:"close-button relative right-0 top-0 flex-none cursor-pointer justify-end",onClick:i,children:e.jsx(B,{strokeWidth:2,size:28})})]}),t]}),e.jsx("div",{className:`modal-overlay fixed left-0 top-0 z-30 h-full w-full bg-black bg-opacity-70 ${a}`,onClick:u?i:()=>{}})]})})},ge=[{accessorKey:"serial_no",sortingFn:"text",enableSorting:!0,header:({column:t})=>e.jsx("div",{children:e.jsxs(b,{onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),className:"ml-auto mr-auto flex flex-row items-center bg-transparent uppercase text-slate-700",children:["Serial Number"," ",t.getIsSorted()==="asc"?e.jsx(S,{size:18,strokeWidth:2}):t.getIsSorted()==="desc"?e.jsx(M,{size:18,strokeWidth:2}):e.jsx(z,{size:18,strokeWidth:2})]})})},{id:"name",accessorKey:"name",sortingFn:"text",enableSorting:!0,header:({column:t})=>e.jsx("div",{children:e.jsxs(b,{onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),className:"ml-auto mr-auto flex flex-row items-center bg-transparent uppercase text-slate-700",children:["Name"," ",t.getIsSorted()==="asc"?e.jsx(S,{size:18,strokeWidth:2}):t.getIsSorted()==="desc"?e.jsx(M,{size:18,strokeWidth:2}):e.jsx(z,{size:18,strokeWidth:2})]})})},{accessorKey:"brand",header:()=>e.jsx("div",{className:"justify-center uppercase",children:"Brand"})},{accessorKey:"size",header:()=>e.jsx("div",{className:"justify-center uppercase",children:"Size"})},{accessorKey:"color",header:()=>e.jsx("div",{className:"justify-center uppercase",children:"Color"})},{accessorKey:"notes",header:()=>e.jsx("div",{className:"justify-center uppercase",children:"Notes"})}],je=({onClose:t})=>{const{value:s,handleChange:r,handleSubmit:i}=ae(),[u,o]=h.useState(!1),[c,p]=h.useState(null),[a,n]=h.useState(),d=(l,f,A,_)=>{A.test(l.target.value)?(l.target.value=l.target.value,r(f,l.target.value),n(void 0)):n({type:f,error:_})};return e.jsx(e.Fragment,{children:e.jsx("form",{onSubmit:async l=>{o(!u),l.preventDefault(),i({action:"add",data:s}).then(()=>{o(!1),g.success("Product added successfully."),t()}).catch(f=>{o(!1),f.response.data.message?g.error(f.response.data.message):g.error("Failed to submit product.")})},children:e.jsxs("div",{className:"flex max-w-2xl flex-col gap-3",children:[e.jsxs("div",{className:"mt-3 grid w-full grid-flow-row grid-cols-12 gap-3",children:[e.jsxs("div",{className:"col-span-12 flex flex-col justify-start gap-1",children:[e.jsx(x,{htmlFor:"serial_no",className:"text-sm font-bold text-gray-600",children:"Serial number"}),e.jsx(y,{id:"serial_no",name:"serial_no",type:"text",maxLength:100,required:!0,placeholder:"Serial number...",value:s.serial_no||"",onChange:l=>{d(l,"serial_no",/^[a-zA-Z0-9-]{0,100}$/,"Must only contain A-Z, 0-9, and -")}}),e.jsx("span",{hidden:!(a&&a.type==="serial_no"),className:"text-xs font-bold text-red-600",children:a==null?void 0:a.error})]}),e.jsxs("div",{className:"col-span-6 flex flex-col justify-start gap-1",children:[e.jsx(x,{htmlFor:"name",className:"text-sm font-bold text-gray-600",children:"Name"}),e.jsx(y,{id:"name",name:"name",type:"text",maxLength:100,required:!0,placeholder:"Product name...",value:s.name||"",onChange:l=>{d(l,"name",/^[0-9a-zA-Z\s\-.,/+:_=]{0,100}$/,"Must only contain alphanumeric and limited special characters")}}),e.jsx("span",{hidden:!(a&&a.type==="name"),className:"max-w-[225px] text-xs font-bold text-red-600",children:a==null?void 0:a.error})]}),e.jsxs("div",{className:"col-span-6 flex flex-col justify-start gap-1",children:[e.jsx(x,{htmlFor:"brand",className:"text-sm font-bold text-gray-600",children:"Brand"}),e.jsx(y,{id:"brand",name:"brand",type:"text",maxLength:100,required:!0,placeholder:"Brand...",value:s.brand||"",onChange:l=>{d(l,"brand",/^[0-9a-zA-Z\s\-.,/+:_=]{0,100}$/,"Must only contain alphanumeric and limited special characters")}}),e.jsx("span",{hidden:!(a&&a.type==="brand"),className:"max-w-[225px] text-xs font-bold text-red-600",children:a==null?void 0:a.error})]}),e.jsx("hr",{className:"col-span-12 my-3 border-t border-slate-200"}),e.jsxs("div",{className:"col-span-6 flex flex-col justify-start gap-1",children:[e.jsx(x,{htmlFor:"size",className:"text-sm font-bold text-gray-600",children:"Size"}),e.jsx(y,{id:"size",name:"size",type:"text",maxLength:100,required:!0,placeholder:"e.g. medium...",value:s.size||"",onChange:l=>{d(l,"size",/^[0-9a-zA-Z\s\-.,/+:_="']{0,100}$/,"Must only contain alphanumeric and limited special characters")}}),e.jsx("span",{hidden:!(a&&a.type==="size"),className:"max-w-[225px] text-xs font-bold text-red-600",children:a==null?void 0:a.error})]}),e.jsxs("div",{className:"col-span-6 flex flex-col justify-start gap-1",children:[e.jsx(x,{htmlFor:"color",className:"text-sm font-bold text-gray-600",children:"Color"}),e.jsx(y,{id:"color",name:"color",type:"text",maxLength:40,required:!0,placeholder:"e.g. white...",value:s.color||"",onChange:l=>{d(l,"color",/^[0-9a-zA-Z\s\-.,/+:_="']{0,40}$/,"Must only contain alphanumeric and limited special characters")}})," ",e.jsx("span",{hidden:!(a&&a.type==="color"),className:"max-w-[225px] text-xs font-bold text-red-600",children:a==null?void 0:a.error})]}),e.jsxs("div",{className:"col-span-12 flex flex-col justify-start gap-1",children:[e.jsx(x,{htmlFor:"notes",className:"text-sm font-bold text-gray-600",children:"Notes"}),e.jsx(y,{id:"notes",name:"notes",type:"text",placeholder:"Type product notes here...",onBlur:l=>r("notes",l.target.value)})]})]}),e.jsxs("div",{className:"ml-auto flex flex-row gap-4 whitespace-nowrap",children:[e.jsx(b,{type:"reset",fill:"default",className:"flex-1 py-2 text-sm font-bold text-gray-700 hover:text-white",onClick:t,children:"Cancel"}),e.jsx(b,{type:"submit",fill:"green",disabled:u||Object.keys(s).length===0||a!==void 0||s.name===""||s.serial_no==="",className:"flex-1 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50",children:u?"Submitting...":"Add product"})]}),c&&e.jsx("div",{className:"flex w-full flex-row justify-center gap-4",children:e.jsx("p",{className:"text-sm text-red-600",children:c})})]})})})},ne=[{allowedRoles:["super_admin","admin","manager"],navbarProps:{displayText:"Dashboard",icon:e.jsx(se,{className:"h-10 w-10 text-[#CCCCCC]"})},path:"/dashbard"},{allowedRoles:["super_admin","admin","manager","encoder","sales_person"],navbarProps:{displayText:"Add Order",icon:e.jsx(K,{className:"h-10 w-10 text-[#CCCCCC]"})},path:"/pos/add-order"},{allowedRoles:["super_admin","admin","manager","encoder","sales_person"],navbarProps:{displayText:"Add Product",icon:e.jsx(re,{className:"h-10 w-10 text-[#CCCCCC]"})},path:"/pos/add-product"}],oe=({item:t})=>t.navbarProps&&t.path?e.jsx(e.Fragment,{children:e.jsx(C,{children:e.jsxs(N,{children:[e.jsx(w,{asChild:!0,children:e.jsx(I,{to:t.path,className:`flex w-full cursor-pointer flex-row justify-center  ${location.pathname===t.path?"bg-primary-background hover:bg-white":"hover:bg-white/5"}`,children:e.jsx("div",{className:"item-center flex justify-center gap-5 p-4",children:t.navbarProps.icon?e.jsx("div",{className:"flex items-center",children:t.navbarProps.icon}):null})})}),location.pathname===t.path?"":e.jsx(e.Fragment,{children:e.jsx(k,{align:"center",className:"bg-pos-primary-background",side:"right",sideOffset:0,children:e.jsx("span",{className:"p-2 text-white",children:t.navbarProps.displayText})})})]})})}):null,le=()=>{const{logout:t}=D();return e.jsx(C,{children:e.jsxs(N,{children:[e.jsx(w,{asChild:!0,children:e.jsx("div",{onClick:()=>t(),className:"flex w-full cursor-pointer flex-row justify-center p-4 hover:bg-white/5",children:e.jsx($,{size:40,className:"text-[#CCCCCC]"})})}),e.jsx(k,{align:"center",className:"bg-pos-primary-background",side:"right",sideOffset:0,children:e.jsx("span",{className:"p-2 text-white",children:"Log out"})})]})})},ce=()=>{const[t,s]=h.useState(""),{selectedInvoiceCode:r,setSelectedInvoiceCode:i}=O();async function u(){return await H(t).then(c=>(Object.keys(c).length>1&&(g.success("Invoice found"),i(c)),console.log(c),c)).catch(c=>{i(void 0),g.error(c.message)})}return e.jsx(e.Fragment,{children:e.jsx(C,{children:e.jsxs(N,{children:[e.jsx(w,{asChild:!0,children:e.jsx("div",{className:"",children:e.jsxs(Z,{children:[e.jsx(E,{asChild:!0,children:e.jsx(v,{onClick:()=>{},variant:"ghost",className:" h-[72px] w-[72px] rounded-none hover:bg-white/5",children:e.jsx(te,{className:" text-[#CCCCCC]",size:32})})}),e.jsxs(W,{className:"rounded-sm",onPointerDownOutside:o=>o.preventDefault(),children:[e.jsxs(U,{className:"items-start",children:[e.jsx(Y,{children:"Search Invoice Code"}),e.jsx(P,{children:"Search for an invoice code to return items"})]}),e.jsxs("form",{className:"flex flex-row gap-2",onSubmit:o=>{o.preventDefault()},children:[e.jsx(y,{placeholder:"IVC-123123",onChange:o=>s(o.target.value),defaultValue:"IVC-",autoFocus:!0,pattern:"IVC-[0-9]*"}),e.jsx(v,{type:"submit",onClick:()=>{u()},children:e.jsx(Q,{})})]}),r&&Object.keys(r).length>1&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsxs(x,{children:["Customer:"," ",r.customer.firstname+" "+r.customer.lastname]}),e.jsxs(x,{children:["Paid Amount:"," ",J(r.paid_amount)]}),e.jsxs(x,{children:["Created at:"," ",ee(r.created_at)]})]}),e.jsxs(G,{className:"flex flex-row items-center justify-between",children:[e.jsx("div",{className:"flex flex-col",children:e.jsx(P,{className:"text-sm",children:"Requires admin to confirm return items"})}),e.jsx(I,{to:`/pos/return/${r.code}`,state:{invoice:r},children:e.jsx(v,{children:"Proceed Return"})})]})]})]})]})})}),e.jsx(k,{align:"center",className:"bg-pos-primary-background",side:"right",sideOffset:0,children:e.jsx("span",{className:"p-2 text-white",children:"Return Items"})})]})})})},be=({})=>{const{auth:t}=D();return e.jsx(e.Fragment,{children:e.jsxs("nav",{id:"navbar",className:"bg-pos-primary-background flex h-screen min-w-[52px] max-w-[80px] flex-col",children:[e.jsx("div",{children:e.jsxs("ul",{className:"flex flex-col items-center justify-center",children:[e.jsx("div",{className:"flex justify-center p-3",children:e.jsx("img",{src:X,alt:"RoyalGlassSupply-Logo",className:"h-11 w-11 rounded-full bg-white p-1"})}),ne.map((s,r)=>{if(t.role&&s.navbarProps){if(s.allowedRoles.find(i=>i.includes(t.role.split("_")[0])))return e.jsx(oe,{item:s},r)}else return null}),e.jsx(ce,{})]})}),e.jsx("div",{className:"mt-auto",children:e.jsx(le,{})})]})})},ve=(t,s)=>t-s;export{je as A,xe as C,fe as M,be as N,ye as P,me as a,ge as b,he as c,ue as d,pe as e,ve as g,ae as u};
