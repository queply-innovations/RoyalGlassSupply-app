import{o as k,r as h,c8 as _,c9 as I,ca as L,cb as D,cc as T,cd as K,W as p,j as e,aD as B,B as j,aI as b,at as y,aJ as f,ce as q,aH as C,aB as P,aC as S,cf as R,aE as M,k as z,cg as V,ch as E}from"./index-f76a421f.js";import{a as g,A as v,b as w,c as N}from"./timeUtils-b5da4687.js";const X=()=>{const t=k(),[o,l]=h.useState({}),c=(n,s)=>{l(r=>({...r,[n]:s}))},u=async n=>{if(console.log("Submitting: ",n),n.action==="add")return await d(n.data);if(n.action==="batch-add")return await x(n.data);if(n.action==="update")return await a({id:n.id,data:n.data});{const s="No data to submit. Function requires at least one parameter.";return console.error(s),{status:400,data:s}}},i={onSuccess:async()=>{await t.invalidateQueries({predicate:n=>["inventory","inventoryProducts","inventoryProductById"].includes(n.queryKey[0])})},onError:n=>{console.error("Inventory Product Data failed",n)}},{mutateAsync:d}=g({mutationKey:["addInventoryProduct"],mutationFn:_,...i}),{mutateAsync:x}=g({mutationKey:["addInventoryProducts"],mutationFn:I,...i}),{mutateAsync:a}=g({mutationKey:["patchInventoryProduct"],mutationFn:L,...i});return{value:o,setValue:l,handleChange:c,handleSubmit:u}},W=()=>{const t=k(),[o,l]=h.useState({}),c=(s,r)=>{l(m=>({...m,[s]:r}))},u=async s=>{if(console.log("Submitting: ",s),s.action==="add")return await x(s.data);if(s.action==="update")return await a({id:s.id,data:s.data});{const r="No data to submit. Function requires at least one parameter.";return console.error(r),{status:400,data:r}}},i=async s=>(console.log("Deleting product with id: ",s),await n(s)),d={onSuccess:async()=>{await t.invalidateQueries({queryKey:["products"]})},onError:s=>{console.error("Product Data failed",s)}},{mutateAsync:x}=g({mutationKey:["addProduct"],mutationFn:D,...d}),{mutateAsync:a}=g({mutationKey:["patchProduct"],mutationFn:T,...d}),{mutateAsync:n}=g({mutationKey:["deleteProduct"],mutationFn:K,...d});return{value:o,setValue:l,handleChange:c,handleSubmit:u,handleDeleteProduct:i,addProductMutation:x}};/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y=p("ChevronsUpDown",[["path",{d:"m7 15 5 5 5-5",key:"1hf1tw"}],["path",{d:"m7 9 5-5 5 5",key:"sgt6xg"}]]);/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=p("DatabaseBackup",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 12a9 3 0 0 0 5 2.69",key:"1ui2ym"}],["path",{d:"M21 9.3V5",key:"6k6cib"}],["path",{d:"M3 5v14a9 3 0 0 0 6.47 2.88",key:"i62tjy"}],["path",{d:"M12 12v4h4",key:"1bxaet"}],["path",{d:"M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16",key:"1f4ei9"}]]);/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=p("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=p("MoreVertical",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"12",cy:"5",r:"1",key:"gxeob9"}],["circle",{cx:"12",cy:"19",r:"1",key:"lyex9k"}]]);/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const te=p("PackageMinus",[["path",{d:"M16 16h6",key:"100bgy"}],["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",key:"e7tb2h"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12",key:"a4e8g8"}]]);/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=p("PackagePlus",[["path",{d:"M16 16h6",key:"100bgy"}],["path",{d:"M19 13v6",key:"85cyf1"}],["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",key:"e7tb2h"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12",key:"a4e8g8"}]]);/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae=p("Pencil",[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",key:"5qss01"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]),se=({children:t,title:o,isOpen:l,onClose:c,closeOnOverlayClick:u})=>{const i=h.useRef(null),[d,x]=h.useState(!1),a=l?"animate-fade-in":"animate-fade-out";return h.useEffect(()=>{var n;if(l)x(!0);else{(n=i.current)==null||n.classList.add("fade-out");const s=setTimeout(()=>{x(!1),c()},300);return()=>clearTimeout(s)}},[l,c]),e.jsx(e.Fragment,{children:d&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{ref:i,className:`modal-content ${a} absolute left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 transform flex-col gap-5 rounded-md bg-white stroke-1 p-5 pb-10 shadow-2xl`,children:[e.jsxs("div",{className:"flex w-full justify-between",children:[e.jsx("span",{className:"text-lg font-bold uppercase tracking-tight text-gray-800",children:o}),e.jsx("span",{className:"close-button relative right-0 top-0 flex-none cursor-pointer justify-end",onClick:c,children:e.jsx(B,{strokeWidth:2,size:28})})]}),t]}),e.jsx("div",{className:`modal-overlay fixed left-0 top-0 z-30 h-full w-full bg-black bg-opacity-70 ${a}`,onClick:u?c:()=>{}})]})})};function re(t){return new Intl.NumberFormat("en-US",{style:"currency",currency:"PHP"}).format(t)}const ne=[{accessorKey:"serial_no",sortingFn:"text",enableSorting:!0,header:({column:t})=>e.jsx("div",{children:e.jsxs(j,{onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),className:"ml-auto mr-auto flex flex-row items-center bg-transparent uppercase text-slate-700",children:["Serial Number"," ",t.getIsSorted()==="asc"?e.jsx(v,{size:18,strokeWidth:2}):t.getIsSorted()==="desc"?e.jsx(w,{size:18,strokeWidth:2}):e.jsx(N,{size:18,strokeWidth:2})]})})},{id:"name",accessorKey:"name",sortingFn:"text",enableSorting:!0,header:({column:t})=>e.jsx("div",{children:e.jsxs(j,{onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),className:"ml-auto mr-auto flex flex-row items-center bg-transparent uppercase text-slate-700",children:["Name"," ",t.getIsSorted()==="asc"?e.jsx(v,{size:18,strokeWidth:2}):t.getIsSorted()==="desc"?e.jsx(w,{size:18,strokeWidth:2}):e.jsx(N,{size:18,strokeWidth:2})]})})},{accessorKey:"brand",header:()=>e.jsx("div",{className:"justify-center uppercase",children:"Brand"})},{accessorKey:"size",header:()=>e.jsx("div",{className:"justify-center uppercase",children:"Size"})},{accessorKey:"color",header:()=>e.jsx("div",{className:"justify-center uppercase",children:"Color"})},{accessorKey:"notes",header:()=>e.jsx("div",{className:"justify-center uppercase",children:"Notes"})}],oe=({onClose:t})=>{const{value:o,handleChange:l,handleSubmit:c}=W(),[u,i]=h.useState(!1),[d,x]=h.useState(null),[a,n]=h.useState(),s=(r,m,F,A)=>{F.test(r.target.value)?(r.target.value=r.target.value,l(m,r.target.value),n(void 0)):n({type:m,error:A})};return e.jsx(e.Fragment,{children:e.jsx("form",{onSubmit:async r=>{i(!u),r.preventDefault(),c({action:"add",data:o}).then(()=>{i(!1),b.success("Product added successfully."),t()}).catch(m=>{i(!1),m.response.data.message?b.error(m.response.data.message):b.error("Failed to add product.")})},children:e.jsxs("div",{className:"flex max-w-2xl flex-col gap-3",children:[e.jsxs("div",{className:"mt-3 grid w-full grid-flow-row grid-cols-12 gap-3",children:[e.jsxs("div",{className:"col-span-12 flex flex-col justify-start gap-1",children:[e.jsx(y,{htmlFor:"serial_no",className:"text-sm font-bold text-gray-600",children:"Serial number"}),e.jsx(f,{id:"serial_no",name:"serial_no",type:"text",maxLength:100,required:!0,placeholder:"Serial number...",value:o.serial_no||"",onChange:r=>{s(r,"serial_no",/^[a-zA-Z0-9-]{0,100}$/,"Must only contain A-Z, 0-9, and -")}}),e.jsx("span",{hidden:!(a&&a.type==="serial_no"),className:"text-xs font-bold text-red-600",children:a==null?void 0:a.error})]}),e.jsxs("div",{className:"col-span-6 flex flex-col justify-start gap-1",children:[e.jsx(y,{htmlFor:"name",className:"text-sm font-bold text-gray-600",children:"Name"}),e.jsx(f,{id:"name",name:"name",type:"text",maxLength:100,required:!0,placeholder:"Product name...",value:o.name||"",onChange:r=>{s(r,"name",/^[0-9a-zA-Z\s\-.,/+:_=]{0,100}$/,"Must only contain alphanumeric and limited special characters")}}),e.jsx("span",{hidden:!(a&&a.type==="name"),className:"max-w-[225px] text-xs font-bold text-red-600",children:a==null?void 0:a.error})]}),e.jsxs("div",{className:"col-span-6 flex flex-col justify-start gap-1",children:[e.jsx(y,{htmlFor:"brand",className:"text-sm font-bold text-gray-600",children:"Brand"}),e.jsx(f,{id:"brand",name:"brand",type:"text",maxLength:100,required:!0,placeholder:"Brand...",value:o.brand||"",onChange:r=>{s(r,"brand",/^[0-9a-zA-Z\s\-.,/+:_=]{0,100}$/,"Must only contain alphanumeric and limited special characters")}}),e.jsx("span",{hidden:!(a&&a.type==="brand"),className:"max-w-[225px] text-xs font-bold text-red-600",children:a==null?void 0:a.error})]}),e.jsx("hr",{className:"col-span-12 my-3 border-t border-slate-200"}),e.jsxs("div",{className:"col-span-6 flex flex-col justify-start gap-1",children:[e.jsx(y,{htmlFor:"size",className:"text-sm font-bold text-gray-600",children:"Size"}),e.jsx(f,{id:"size",name:"size",type:"text",maxLength:100,required:!0,placeholder:"e.g. medium...",value:o.size||"",onChange:r=>{s(r,"size",/^[0-9a-zA-Z\s\-.,/+:_="']{0,100}$/,"Must only contain alphanumeric and limited special characters")}}),e.jsx("span",{hidden:!(a&&a.type==="size"),className:"max-w-[225px] text-xs font-bold text-red-600",children:a==null?void 0:a.error})]}),e.jsxs("div",{className:"col-span-6 flex flex-col justify-start gap-1",children:[e.jsx(y,{htmlFor:"color",className:"text-sm font-bold text-gray-600",children:"Color"}),e.jsx(f,{id:"color",name:"color",type:"text",maxLength:40,required:!0,placeholder:"e.g. white...",value:o.color||"",onChange:r=>{s(r,"color",/^[0-9a-zA-Z\s\-.,/+:_="']{0,40}$/,"Must only contain alphanumeric and limited special characters")}})," ",e.jsx("span",{hidden:!(a&&a.type==="color"),className:"max-w-[225px] text-xs font-bold text-red-600",children:a==null?void 0:a.error})]}),e.jsxs("div",{className:"col-span-12 flex flex-col justify-start gap-1",children:[e.jsx(y,{htmlFor:"notes",className:"text-sm font-bold text-gray-600",children:"Notes"}),e.jsx(f,{id:"notes",name:"notes",type:"text",placeholder:"Type product notes here...",onBlur:r=>l("notes",r.target.value)})]})]}),e.jsxs("div",{className:"ml-auto flex flex-row gap-4 whitespace-nowrap",children:[e.jsx(j,{type:"reset",fill:"default",className:"flex-1 py-2 text-sm font-bold text-gray-700 hover:text-white",onClick:t,children:"Cancel"}),e.jsx(j,{type:"submit",fill:"green",disabled:u||Object.keys(o).length===0||a!==void 0||o.name===""||o.serial_no==="",className:"flex-1 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50",children:u?"Submitting...":"Add product"})]}),d&&e.jsx("div",{className:"flex w-full flex-row justify-center gap-4",children:e.jsx("p",{className:"text-sm text-red-600",children:d})})]})})})},O=[{allowedRoles:["super_admin","admin","manager"],navbarProps:{displayText:"Dashboard",icon:e.jsx(Z,{className:"h-10 w-10 text-[#CCCCCC]"})},path:"/dashbard"},{allowedRoles:["super_admin","admin","manager","encoder","sales_person"],navbarProps:{displayText:"Add Order",icon:e.jsx(q,{className:"h-10 w-10 text-[#CCCCCC]"})},path:"/pos/add-order"},{allowedRoles:["super_admin","admin","manager","encoder","sales_person"],navbarProps:{displayText:"Add Product",icon:e.jsx(U,{className:"h-10 w-10 text-[#CCCCCC]"})},path:"/pos/add-product"},{allowedRoles:["super_admin","admin","manager","encoder","sales_person"],navbarProps:{displayText:"Return Items",icon:e.jsx($,{className:"h-10 w-10 text-[#CCCCCC]"})},path:"/pos/return-items"}],Q=({item:t})=>t.navbarProps&&t.path?e.jsx(e.Fragment,{children:e.jsx(C,{children:e.jsxs(P,{children:[e.jsx(S,{asChild:!0,children:e.jsx(R,{to:t.path,className:`flex w-full cursor-pointer flex-row justify-center  ${location.pathname===t.path?"bg-primary-background hover:bg-white":"hover:bg-white/5"}`,children:e.jsx("div",{className:"item-center flex justify-center gap-5 p-4",children:t.navbarProps.icon?e.jsx("div",{className:"flex items-center",children:t.navbarProps.icon}):null})})}),location.pathname===t.path?"":e.jsx(e.Fragment,{children:e.jsx(M,{align:"center",className:"bg-pos-primary-background",side:"right",sideOffset:0,children:e.jsx("span",{className:"p-2 text-white",children:t.navbarProps.displayText})})})]})})}):null,H=()=>{const{logout:t}=z();return e.jsx(C,{children:e.jsxs(P,{children:[e.jsx(S,{asChild:!0,children:e.jsx("div",{onClick:()=>t(),className:"flex w-full cursor-pointer flex-row justify-center p-4 hover:bg-white/5",children:e.jsx(V,{size:40,className:"text-[#CCCCCC]"})})}),e.jsx(M,{align:"center",className:"bg-pos-primary-background",side:"right",sideOffset:0,children:e.jsx("span",{className:"p-2 text-white",children:"Log out"})})]})})},le=({})=>{const{auth:t}=z();return e.jsx(e.Fragment,{children:e.jsxs("nav",{id:"navbar",className:"bg-pos-primary-background flex h-screen min-w-[52px] max-w-[80px] flex-col",children:[e.jsx("div",{children:e.jsxs("ul",{className:"flex flex-col items-center justify-center",children:[e.jsx("div",{className:"flex justify-center p-3",children:e.jsx("img",{src:E,alt:"RoyalGlassSupply-Logo",className:"h-11 w-11 rounded-full bg-white p-1"})}),O.map((o,l)=>{if(t.role&&o.navbarProps){if(o.allowedRoles.find(c=>c.includes(t.role.split("_")[0])))return e.jsx(Q,{item:o},l)}else return null})]})}),e.jsx("div",{className:"mt-auto",children:e.jsx(H,{})})]})})},ce=(t,o)=>t-o;export{oe as A,Y as C,se as M,le as N,ae as P,ee as a,ne as b,X as c,te as d,re as f,ce as g,W as u};