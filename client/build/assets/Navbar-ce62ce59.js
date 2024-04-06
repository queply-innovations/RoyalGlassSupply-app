import{m as t,k,r as y,bM as f,bN as w,bO as P,j as e,b7 as N,b9 as d,ba as h,bb as u,aD as M,bc as p,e as m,bP as I,bQ as D,bR as S,am as x,bS as L,bT as T,bU as R,bV as V,a6 as A,b6 as F,bW as B,bX as O}from"./index-aca70248.js";import{u as l}from"./useMutation-709d063c.js";/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=t("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=t("ChevronsUpDown",[["path",{d:"m7 15 5 5 5-5",key:"1hf1tw"}],["path",{d:"m7 9 5-5 5 5",key:"sgt6xg"}]]);/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=t("DatabaseBackup",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 12a9 3 0 0 0 5 2.69",key:"1ui2ym"}],["path",{d:"M21 9.3V5",key:"6k6cib"}],["path",{d:"M3 5v14a9 3 0 0 0 6.47 2.88",key:"i62tjy"}],["path",{d:"M12 12v4h4",key:"1bxaet"}],["path",{d:"M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16",key:"1f4ei9"}]]);/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=t("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=t("MoreVertical",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"12",cy:"5",r:"1",key:"gxeob9"}],["circle",{cx:"12",cy:"19",r:"1",key:"lyex9k"}]]);/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=t("PackageMinus",[["path",{d:"M16 16h6",key:"100bgy"}],["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",key:"e7tb2h"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12",key:"a4e8g8"}]]);/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=t("PackagePlus",[["path",{d:"M16 16h6",key:"100bgy"}],["path",{d:"M19 13v6",key:"85cyf1"}],["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",key:"e7tb2h"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12",key:"a4e8g8"}]]);/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=t("Pencil",[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",key:"5qss01"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]),Y=()=>{const a=k(),[n,o]=y.useState({}),r=(s,c)=>{o(C=>({...C,[s]:c}))},g=async s=>{if(console.log("Submitting: ",s),s.action==="add")return await b(s.data);if(s.action==="batch-add")return await v(s.data);if(s.action==="update")return await j({id:s.id,data:s.data});{const c="No data to submit. Function requires at least one parameter.";return console.error(c),{status:400,data:c}}},i={onSuccess:async()=>{await a.invalidateQueries({queryKey:["inventoryProductById"]})},onError:s=>{console.error("Inventory Product Data failed",s)}},{mutateAsync:b}=l({mutationKey:["addInventoryProduct"],mutationFn:f,...i}),{mutateAsync:v}=l({mutationKey:["addInventoryProducts"],mutationFn:w,...i}),{mutateAsync:j}=l({mutationKey:["patchInventoryProduct"],mutationFn:P,...i});return{value:n,setValue:o,handleChange:r,handleSubmit:g}},K=[{allowedRoles:["super_admin","admin","manager"],navbarProps:{displayText:"Dashboard",icon:e.jsx(q,{className:"h-10 w-10 text-[#CCCCCC]"})},path:"/dashbard"},{allowedRoles:["super_admin","admin","manager","encoder","sales_person"],navbarProps:{displayText:"Add Order",icon:e.jsx(N,{className:"h-10 w-10 text-[#CCCCCC]"})},path:"/pos/add-order"},{allowedRoles:["super_admin","admin","manager","encoder","sales_person"],navbarProps:{displayText:"Add Product",icon:e.jsx(z,{className:"h-10 w-10 text-[#CCCCCC]"})},path:"/pos/add-product"}],E=({item:a})=>a.navbarProps&&a.path?e.jsx(e.Fragment,{children:e.jsx(d,{children:e.jsxs(h,{children:[e.jsx(u,{asChild:!0,children:e.jsx(M,{to:a.path,className:`flex w-full cursor-pointer flex-row justify-center  ${location.pathname===a.path?"bg-primary-background hover:bg-white":"hover:bg-white/5"}`,children:e.jsx("div",{className:"item-center flex justify-center gap-5 p-4",children:a.navbarProps.icon?e.jsx("div",{className:"flex items-center",children:a.navbarProps.icon}):null})})}),location.pathname===a.path?"":e.jsx(e.Fragment,{children:e.jsx(p,{align:"center",className:"bg-pos-primary-background",side:"right",sideOffset:0,children:e.jsx("span",{className:"p-2 text-white",children:a.navbarProps.displayText})})})]})})}):null,Q=()=>{const{logout:a}=m();return e.jsx(d,{children:e.jsxs(h,{children:[e.jsx(u,{asChild:!0,children:e.jsx("div",{onClick:()=>a(),className:"flex w-full cursor-pointer flex-row justify-center p-4 hover:bg-white/5",children:e.jsx(I,{size:40,className:"text-[#CCCCCC]"})})}),e.jsx(p,{align:"center",className:"bg-pos-primary-background",side:"right",sideOffset:0,children:e.jsx("span",{className:"p-2 text-white",children:"Log out"})})]})})},U=()=>{const[a,n]=y.useState("");async function o(){const r=await B(a);console.log(r)}return e.jsx(e.Fragment,{children:e.jsx(d,{children:e.jsxs(h,{children:[e.jsx(u,{asChild:!0,children:e.jsx("div",{className:"",children:e.jsxs(D,{children:[e.jsx(S,{asChild:!0,children:e.jsx(x,{onClick:()=>{},variant:"ghost",className:"p-4 hover:bg-white/5",children:e.jsx(_,{className:" text-[#CCCCCC]"})})}),e.jsxs(L,{className:"rounded-sm",children:[e.jsxs(T,{className:"items-start",children:[e.jsx(R,{children:"Search Invoice Code"}),e.jsx(V,{children:"Search for an invoice code to return items"})]}),e.jsxs("div",{className:"flex flex-row gap-2",children:[e.jsx(A,{placeholder:"IVC-123123",onChange:r=>n(r.target.value)}),e.jsx(x,{onClick:()=>{o()},children:e.jsx(F,{})})]})]})]})})}),e.jsx(p,{align:"center",className:"bg-pos-primary-background",side:"right",sideOffset:0,children:e.jsx("span",{className:"p-2 text-white",children:"Return Items"})})]})})})},ee=({})=>{const{auth:a}=m();return console.log(a.role),e.jsx(e.Fragment,{children:e.jsxs("nav",{id:"navbar",className:"bg-pos-primary-background flex h-screen min-w-[52px] max-w-[80px] flex-col",children:[e.jsx("div",{children:e.jsxs("ul",{className:"flex flex-col items-center justify-center",children:[e.jsx("div",{className:"flex justify-center p-3",children:e.jsx("img",{src:O,alt:"RoyalGlassSupply-Logo",className:"h-11 w-11 rounded-full bg-white p-1"})}),K.map((n,o)=>{if(a.role&&n.navbarProps){if(n.allowedRoles.find(r=>r.includes(a.role.split("_")[0])))return e.jsx(E,{item:n},o)}else return null}),e.jsx(U,{})]})}),e.jsx("div",{className:"mt-auto",children:e.jsx(Q,{})})]})})};export{W as C,Z as M,ee as N,J as P,X as a,$ as b,Y as u};
