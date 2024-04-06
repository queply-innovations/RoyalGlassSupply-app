import{r,y as ie,j as e,e as A,a0 as p,ay as z,az as B,am as I,aA as L,aB as O,aC as T,al as E,b5 as W,an as F,aE as D,aF as M,a1 as de,a2 as ce,a3 as re,a4 as oe,a5 as Y,a6 as _,B as se,br as Z,aW as ue,aX as xe,aY as J,aZ as me,a_ as pe,a$ as m,af as he,ag as fe,ah as je,ai as be,aj as ve,ak as K,b as ge,$ as w,M as ye,bs as Ne,bt as _e,bu as Ce,bv as ee,bL as Se}from"./index-b59160e3.js";import{a as $,u as te,M as ke,P as Ie,b as Fe,C as Ae,N as qe}from"./Navbar-c302c40b.js";import{P as ze}from"./FormatCurrency-b45af7d0.js";import"apexcharts";const ae=r.createContext(void 0),Be=({children:i})=>{const[h,f]=r.useState(),[u,j]=r.useState(),{data:g,isLoading:x}=ie(),b={inventories:g,isInventoriesLoading:x,selectedInventory:u,setSelectedInventory:j,activeTab:h,setActiveTab:f};return e.jsx(ae.Provider,{value:b,children:i})};function P(){const i=r.useContext(ae);if(!i)throw new Error("useAddProductPos hook must be used within AddProductPosProvider");return i}const Le=()=>{const{auth:i}=A(),{inventories:h,isInventoriesLoading:f,selectedInventory:u,setSelectedInventory:j}=P(),g=h.filter(a=>{var d;return(i==null?void 0:i.role)!=="admin"&&(i==null?void 0:i.role)!=="super_admin"?a.warehouse.code.includes(((d=i==null?void 0:i.role)==null?void 0:d.split("_")[1])??""):h}),[x,b]=r.useState(!1);return e.jsxs("div",{className:"flex flex-col justify-center gap-1",children:[e.jsx(p,{htmlFor:"inventory",className:"text-sm font-bold text-gray-600",children:"Inventory"}),e.jsxs(z,{open:x,onOpenChange:b,children:[e.jsx(B,{id:"inventory",name:"inventory",className:"relative w-full",asChild:!0,children:e.jsxs(I,{role:"combobox",className:"justify-between truncate bg-white text-sm font-bold text-slate-600",variant:"outline",children:[u?e.jsxs("div",{className:"flex items-center font-bold text-slate-600",children:[u.code,e.jsx("span",{className:"ml-1 text-xs opacity-80",children:" • "+u.type+" • "+u.date_received})]}):e.jsx("span",{children:"Select an inventory..."}),e.jsx($,{size:14,strokeWidth:2,className:"h-4 w-4 opacity-70"})]})}),e.jsx(L,{className:"w-[calc(100vw-170px)] max-w-[974px] p-0 text-sm font-medium text-slate-700",children:e.jsxs(O,{defaultValue:(u==null?void 0:u.code)||"",children:[e.jsx(T,{placeholder:"Inventory code..."}),f&&e.jsx("div",{className:"flex h-16 w-full items-center justify-center",children:e.jsx(E,{size:22,strokeWidth:2.5,className:"animate-spin text-slate-700/50"})}),e.jsx(W,{children:"No results found"}),e.jsx(F,{className:"max-h-[200px] overflow-y-scroll",children:e.jsx(D,{children:g&&g.map(a=>e.jsxs(M,{className:"cursor-pointer justify-between rounded-sm",value:a.code,onSelect:()=>{j(a),b(!1)},children:[e.jsx("span",{children:a.code}),e.jsx("span",{className:"text-xs font-semibold text-slate-700/50",children:a.type+" • "+a.date_received})]},a.id))})})]})})]})]})},Oe=({setInventoryProductsQueue:i,inventoryId:h,products:f,productsLoading:u,suppliers:j,suppliersLoading:g,currentId:x,handleNavigation:b,selectedProduct:a})=>{var Q,R,V,H,U,G,X;const{auth:d}=A(),{value:n,handleChange:l}=te(),[k,C]=r.useState(!1),[s,v]=r.useState(!1),[c,y]=r.useState(null);r.useEffect(()=>{var t,o;l("inventory_id",h),(t=d.role)!=null&&t.includes("admin")&&l("status",1),a&&(l("product_id",a.data.product_id),l("status",a.data.status),l("supplier_id",a.data.supplier_id),l("capital_price",a.data.capital_price),l("unit",a.data.unit),l("bundles_count",a.data.bundles_count),l("bundles_unit",a.data.bundles_unit),l("quantity_per_bundle",a.data.quantity_per_bundle),l("stocks_count",a.data.stocks_count),l("damage_count",a.data.damage_count),l("total_count",a.data.total_count)),!a&&!((o=d.role)!=null&&o.includes("admin"))&&l("capital_price",0)},[]);const[N,ne]=r.useState();r.useEffect(()=>{const t=n.bundles_count!==void 0?n.bundles_count:(a==null?void 0:a.data.bundles_count)||0,o=n.quantity_per_bundle!==void 0?n.quantity_per_bundle:(a==null?void 0:a.data.quantity_per_bundle)||0,S=t*o;ne(S),l("stocks_count",S)},[n.bundles_count,n.quantity_per_bundle]);const[q,le]=r.useState();return r.useEffect(()=>{const t=n.damage_count!==void 0?n.damage_count:(a==null?void 0:a.data.damage_count)||0,S=(n.stocks_count!==void 0?n.stocks_count:(a==null?void 0:a.data.stocks_count)||0)-t;le(S),l("total_count",S)},[n.damage_count,n.stocks_count,q]),e.jsx(e.Fragment,{children:e.jsx("form",{onSubmit:t=>{t.preventDefault(),n.product_id===void 0?y("Please select a product first."):n.supplier_id===void 0?y("Please select a supplier first."):(i(a?o=>[...o.filter(S=>S.id!==a.id),{id:a.id,data:n}]:o=>[...o,{id:x+1,data:n}]),b())},children:e.jsxs("div",{className:"flex w-full flex-col gap-3",children:[e.jsxs("div",{className:"mt-3 grid w-full grid-flow-row grid-cols-12 gap-3",children:[e.jsxs("div",{className:`${d.role==="admin"||d.role==="super_admin"?"col-span-12":"col-span-6"} flex flex-col justify-center gap-1`,children:[e.jsx(p,{htmlFor:"product_id",className:"text-sm font-bold text-gray-600",children:"Product"}),e.jsxs(z,{open:k,onOpenChange:C,children:[e.jsx(B,{id:"product_id",className:"relative w-full",asChild:!0,children:e.jsxs(I,{role:"combobox",className:"w-full justify-between text-sm font-bold text-slate-700",variant:"outline",children:[n.product_id?e.jsx(e.Fragment,{children:(()=>{const t=f.find(o=>o.id===n.product_id);return e.jsxs("div",{className:"flex w-full items-baseline gap-4 capitalize",children:[e.jsx("span",{className:"max-w-full truncate",children:t==null?void 0:t.name}),e.jsx("span",{className:"font-baseline text-xs text-slate-700/50",children:t==null?void 0:t.serial_no})]})})()}):e.jsx("span",{children:"Select a product..."}),e.jsx($,{size:14,strokeWidth:2,className:"h-4 w-4 opacity-70"})]})}),e.jsx(L,{className:`${d.role==="admin"||d.role==="super_admin"?"max-w-[966px]":"max-w-[477px]"} w-[calc(100vw-170px)] p-0 text-sm font-medium text-slate-700`,children:e.jsxs(O,{children:[e.jsx(T,{placeholder:"Product name or serial number..."}),u&&e.jsx("div",{className:"flex h-16 w-full items-center justify-center",children:e.jsx(E,{size:22,strokeWidth:2.5,className:"animate-spin text-slate-700/50"})}),e.jsx(W,{children:"No match found"}),e.jsx(F,{className:"max-h-[200px] overflow-y-scroll",children:e.jsx(D,{children:f.map((t,o)=>e.jsxs(M,{className:"cursor-pointer justify-between rounded-sm",onSelect:()=>{l("product_id",t.id),C(!1)},children:[e.jsx("span",{children:t.name}),e.jsx("span",{className:"text-xs font-semibold text-slate-700/50",children:t.serial_no})]},o))})})]})})]})]}),e.jsxs("div",{className:"col-span-6 flex flex-col justify-center gap-1",children:[e.jsx(p,{htmlFor:"supplier_id",className:"text-sm font-bold text-gray-600",children:"Supplier"}),e.jsxs(z,{open:s,onOpenChange:v,children:[e.jsx(B,{id:"supplier_id",className:"relative w-full",asChild:!0,children:e.jsxs(I,{role:"combobox",className:"w-full justify-between text-sm font-bold text-slate-700",variant:"outline",children:[n.supplier_id?e.jsx(e.Fragment,{children:(()=>{const t=j.find(o=>o.id===n.supplier_id);return e.jsxs("div",{className:"flex w-full items-baseline gap-4 capitalize",children:[e.jsx("span",{className:"max-w-full truncate",children:t==null?void 0:t.name}),e.jsx("span",{className:"font-baseline text-xs text-slate-700/50",children:t==null?void 0:t.address})]})})()}):e.jsx("span",{children:"Select a supplier..."}),e.jsx($,{size:14,strokeWidth:2,className:"h-4 w-4 opacity-70"})]})}),e.jsx(L,{className:"min-w-[477px] p-0 text-sm font-medium text-slate-700",children:e.jsxs(O,{children:[e.jsx(T,{placeholder:"Supplier name or address..."}),g&&e.jsx("div",{className:"flex h-16 w-full items-center justify-center",children:e.jsx(E,{size:22,strokeWidth:2.5,className:"animate-spin text-slate-700/50"})}),e.jsx(W,{children:"No match found"}),e.jsx(F,{className:"max-h-[200px] overflow-y-scroll",children:e.jsx(D,{children:j.map((t,o)=>e.jsxs(M,{className:"cursor-pointer justify-between rounded-sm",onSelect:()=>{l("supplier_id",t.id),v(!1)},children:[e.jsx("span",{children:t.name}),e.jsx("span",{className:"text-xs font-semibold text-slate-700/50",children:t.address})]},o))})})]})})]})]}),(d.role==="admin"||d.role==="super_admin")&&e.jsxs("div",{className:"col-span-6 flex flex-col justify-center gap-1",children:[e.jsx(p,{htmlFor:"status",className:"text-sm font-bold text-gray-600",children:"Status"}),e.jsxs(de,{value:((Q=n.status)==null?void 0:Q.toString())||"",required:!0,onValueChange:t=>l("status",Number(t)),children:[e.jsx(ce,{name:"status",id:"status",className:"w-full px-4 text-sm font-bold text-slate-700",children:e.jsx(re,{placeholder:"Select status..."})}),e.jsxs(oe,{className:"text-sm font-medium",children:[e.jsx(Y,{value:"1",children:"Approved"}),e.jsx(Y,{value:"0",children:"Pending"})]})]})]})]}),e.jsx("hr",{className:"my-2 h-px w-full border-0 bg-gray-200"}),e.jsxs("div",{className:"grid w-full grid-flow-row grid-cols-12 gap-3",children:[e.jsxs("div",{className:`relative col-span-3 flex flex-col justify-center gap-1 ${!((R=d.role)!=null&&R.includes("admin"))&&"hidden"}`,children:[e.jsx(p,{htmlFor:"capital_price",className:"text-sm font-bold text-gray-600",children:"Capital price"}),e.jsx(_,{id:"capital_price",name:"capital_price",type:"number",min:0,step:.01,required:!0,className:"pl-8",placeholder:"0.00",disabled:!((V=d.role)!=null&&V.includes("admin")),defaultValue:((H=n.capital_price)==null?void 0:H.toFixed(2))||"",onBlur:t=>{n.capital_price!==void 0&&(t.target.value=Number(t.target.value).toFixed(2))},onChange:t=>{l("capital_price",Number(Number(t.target.value).toFixed(2)))}}),e.jsx("span",{className:"absolute bottom-0 left-0 pb-[0.65rem] pl-3 text-sm font-semibold text-gray-500",children:"₱"})]}),e.jsxs("div",{className:"col-span-3 flex flex-col justify-center gap-1",children:[e.jsx(p,{htmlFor:"unit",className:"text-sm font-bold text-gray-600",children:"Unit"}),e.jsx(_,{id:"unit",name:"unit",type:"text",maxLength:40,required:!0,value:n.unit||"",onChange:t=>l("unit",t.target.value)})]}),e.jsxs("div",{className:"col-span-3 flex flex-col justify-center gap-1",children:[e.jsx(p,{htmlFor:"bundles_count",className:"text-sm font-bold text-gray-600",children:"Bundles count"}),e.jsx(_,{id:"bundles_count",name:"bundles_count",type:"number",min:0,max:9999999,step:1,required:!0,value:n.bundles_count!==void 0?n.bundles_count:"",onBlur:t=>{t.target.value!==""&&(t.target.value=Number(t.target.value).toFixed(0))},onChange:t=>{l("bundles_count",Number(Number(t.target.value).toFixed(0)))}})]}),e.jsxs("div",{className:"col-span-3 flex flex-col justify-center gap-1",children:[e.jsx(p,{htmlFor:"bundles_unit",className:"text-sm font-bold text-gray-600",children:"Bundles unit"}),e.jsx(_,{id:"bundles_unit",name:"bundles_unit",type:"text",maxLength:40,required:!0,value:n.bundles_unit||"",onChange:t=>l("bundles_unit",t.target.value)})]}),e.jsxs("div",{className:"col-span-3 flex flex-col justify-center gap-1",children:[e.jsx(p,{htmlFor:"quantity_per_bundle",className:"text-sm font-bold text-gray-600",children:"Quantity per bundle"}),e.jsx(_,{id:"quantity_per_bundle",name:"quantity_per_bundle",type:"number",min:0,max:9999999,step:1,required:!0,value:n.quantity_per_bundle!==void 0?n.quantity_per_bundle:"",onBlur:t=>{t.target.value!==""&&(t.target.value=Number(t.target.value).toFixed(0))},onChange:t=>l("quantity_per_bundle",Number(Number(t.target.value).toFixed(0)))})]}),e.jsxs("div",{className:`flex flex-col justify-center gap-1 ${(U=d.role)!=null&&U.includes("admin")?"col-span-3":"col-span-4"}`,children:[e.jsx(p,{htmlFor:"stocks_count",className:"text-sm font-bold text-gray-600",children:"Stocks count"}),e.jsx(_,{id:"stocks_count",name:"stocks_count",type:"number",min:0,max:9999999,step:1,value:N||"0",readOnly:!0})]}),e.jsxs("div",{className:`flex flex-col justify-center gap-1 ${(G=d.role)!=null&&G.includes("admin")?"col-span-3":"col-span-4"}`,children:[e.jsx(p,{htmlFor:"damage_count",className:"text-sm font-bold text-gray-600",children:"Damage count"}),e.jsx(_,{id:"damage_count",name:"damage_count",type:"number",min:0,max:N||9999999,step:1,required:!0,value:n.damage_count!==void 0?n.damage_count:"",onBlur:t=>{n.damage_count!==void 0&&(t.target.value=Number(n.damage_count).toFixed(0))},onChange:t=>l("damage_count",Number(Number(t.target.value).toFixed(0)))})]}),e.jsxs("div",{className:`flex flex-col justify-center gap-1 ${(X=d.role)!=null&&X.includes("admin")?"col-span-3":"col-span-4"}`,children:[e.jsx(p,{htmlFor:"total_count",className:"text-sm font-bold text-gray-600",children:"Total count"}),e.jsx(_,{id:"total_count",name:"total_count",type:"number",min:0,max:9999999,step:1,readOnly:!0,value:q||"0"})]})]}),e.jsx("div",{className:"flex w-full justify-between whitespace-nowrap pt-6",children:e.jsx("div",{className:"ml-auto flex flex-row gap-4",children:e.jsx(se,{type:"submit",fill:"green",disabled:n.product_id===void 0||n.supplier_id===void 0,className:"max-w-fit flex-1 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50",children:a?"Save changes":"Add item to queue"})})}),c&&e.jsx("div",{className:"flex w-full flex-row justify-center gap-4",children:e.jsx("p",{className:"text-sm font-bold text-red-600",children:c})})]})})})},Te=["","Product name","Supplier","Status","Capital price","Unit","Bundles count","Bundles unit","Qty/bundle","Stocks","Damaged","Total"],Ee=({data:i,products:h,suppliers:f,handleEditItem:u,handleRemoveItem:j,handleSubmit:g})=>{const{auth:x}=A(),{setActiveTab:b,setSelectedInventory:a}=P(),[d,n]=r.useState(!1),[l,k]=r.useState(null),C=async()=>{n(!0);const s=await g({action:"batch-add",data:i.map(c=>c==null?void 0:c.data)}).then(c=>{Array.isArray(c)&&c.length>0&&(w.success("Items added to inventory",{autoClose:5e3,closeButton:!0}),a(void 0),b(void 0))}).catch(()=>{w.error("Error adding items to inventory",{autoClose:5e3,closeButton:!0})});(Array.isArray(s)?s.filter(c=>c!==201):[]).length>0?k("Error adding items to inventory"):n(!1)};return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"relative flex h-full flex-col",children:[e.jsxs(F,{type:"always",className:"flex-1 rounded-md border border-gray-200 bg-white",style:{"--border":"216 12% 84%"},children:[i.length<=0&&e.jsx("div",{className:"absolute z-10 flex h-full w-full items-center justify-center",children:e.jsx("p",{className:"text-lg font-medium text-gray-500/50",children:"No items in queue"})}),e.jsx(Z,{orientation:"horizontal",className:"z-50 h-3"}),e.jsx(Z,{orientation:"vertical",className:"z-50 h-3",style:{"--border":"216 12% 84%"},asChild:!0}),e.jsxs(ue,{children:[e.jsx(xe,{children:e.jsx(J,{id:"tHeaderRow",className:"hover:bg-white",children:Te.map(s=>{var v;if(s!=="Capital price"||(v=x==null?void 0:x.role)!=null&&v.includes("admin"))return e.jsx(me,{className:"whitespace-nowrap px-5 py-3 text-center text-xs font-bold uppercase",children:s},s+"_head")})},"tHeaderRow")}),e.jsx(pe,{className:"[&>*:nth-child(even)]:bg-white [&>*:nth-child(odd)]:bg-gray-50",children:i.length>0&&i.map(s=>{var v,c,y;return e.jsxs(J,{className:"text-sm font-medium text-gray-700",children:[e.jsx(m,{className:"p-3 pr-0",children:e.jsx("div",{className:"flex flex-row justify-center text-xs font-normal uppercase",children:e.jsxs(he,{children:[e.jsx(fe,{className:"overflow-clip rounded-full bg-gray-200/70 p-1.5 hover:bg-gray-300",children:e.jsx(ke,{size:16,strokeWidth:2.25})}),e.jsxs(je,{className:"relative z-50 w-44 bg-white font-medium",children:[e.jsx(be,{children:"Actions"}),e.jsx(ve,{className:"bg-gray-200"}),e.jsxs(K,{onClick:()=>{s!=null&&s.id&&u(s)},className:"flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200",children:[e.jsx("span",{className:"flex w-6 items-center justify-center",children:e.jsx(Ie,{size:16,strokeWidth:2})}),e.jsx("span",{children:"Edit"})]},(s==null?void 0:s.id)+"edit"),e.jsxs(K,{onClick:()=>{s!=null&&s.id&&j(s.id)},className:"flex flex-row items-center gap-3 rounded-md p-2 focus:bg-red-50 focus:text-red-700",children:[e.jsx("span",{className:"flex w-6 items-center justify-center",children:e.jsx(Fe,{size:16,strokeWidth:2})}),e.jsx("span",{children:"Remove"})]},(s==null?void 0:s.id)+"remove")]})]})})},(s==null?void 0:s.id)+"action"),e.jsx(m,{className:"max-w-[200px] truncate px-5 py-3",children:s!=null&&s.data.product_id?(v=h.find(N=>N.id===s.data.product_id))==null?void 0:v.name:s==null?void 0:s.data.product_id},(s==null?void 0:s.id)+"product_id"),e.jsx(m,{className:"max-w-[200px] truncate px-5 py-3",children:s!=null&&s.data.supplier_id?(c=f.find(N=>N.id===s.data.supplier_id))==null?void 0:c.name:s==null?void 0:s.data.supplier_id},(s==null?void 0:s.id)+"supplier_id"),e.jsx(m,{className:"px-5 py-3",children:s!=null&&s.data.status?e.jsx(Ae,{size:20,strokeWidth:2,className:"text-green-600"}):e.jsx(ge,{size:20,strokeWidth:2,className:"text-gray-600"})},(s==null?void 0:s.id)+"status"),((y=x==null?void 0:x.role)==null?void 0:y.includes("admin"))&&e.jsx(m,{className:"px-5 py-3",children:Intl.NumberFormat("en-US",{style:"currency",currency:"PHP"}).format((s==null?void 0:s.data.capital_price)||0)},(s==null?void 0:s.id)+"capital_price"),e.jsx(m,{className:"px-5 py-3",children:s==null?void 0:s.data.unit},(s==null?void 0:s.id)+"unit"),e.jsx(m,{className:"px-5 py-3",children:s==null?void 0:s.data.bundles_count},(s==null?void 0:s.id)+"bundles_count"),e.jsx(m,{className:"px-5 py-3",children:s==null?void 0:s.data.bundles_unit},(s==null?void 0:s.id)+"bundles_unit"),e.jsx(m,{className:"px-5 py-3",children:s==null?void 0:s.data.quantity_per_bundle},(s==null?void 0:s.id)+"quantity_per_bundle"),e.jsx(m,{className:"px-5 py-3",children:s==null?void 0:s.data.stocks_count},(s==null?void 0:s.id)+"stocks_count"),e.jsx(m,{className:"px-5 py-3",children:s==null?void 0:s.data.damage_count},(s==null?void 0:s.id)+"damage_count"),e.jsx(m,{className:"px-5 py-3",children:s==null?void 0:s.data.total_count},(s==null?void 0:s.id)+"total_count")]},(s==null?void 0:s.id)+"row")})})]})]}),e.jsxs("div",{className:"flex w-full justify-between whitespace-nowrap pt-6",children:[l&&e.jsx("div",{className:"flex w-full flex-row items-center justify-start gap-4",children:e.jsx("p",{className:"text-sm font-bold text-red-600",children:l})}),e.jsx("div",{className:"ml-auto flex flex-row gap-4",children:e.jsx(se,{type:"submit",fill:"green",disabled:i.length<=0||d,className:"max-w-fit flex-1 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50",onClick:s=>{s.preventDefault(),C()},children:i.length<=1?"Add item to inventory":`Add ${i.length} items to inventory`})})]})]})})},We={hidden:{opacity:0,x:"-100%"},animate:{opacity:1,x:"0%",transition:{duration:.3,ease:"easeInOut"}},exit:{opacity:0,x:"-100%",transition:{duration:.3,ease:"easeInOut"}}},De={hidden:{opacity:0,x:"100%"},animate:{opacity:1,x:"0%",transition:{duration:.3,ease:"easeInOut"}},exit:{opacity:0,x:"100%",transition:{duration:.3,ease:"easeInOut"}}},Me=({inventoryId:i})=>{const{auth:h}=A(),{data:f,isLoading:u}=ye(),{suppliers:j,isFetching:g}=Ne(),{handleSubmit:x}=te(),[b,a]=r.useState([]),[d,n]=r.useState({});r.useEffect(()=>{a([])},[i]);const[l,k]=r.useState("main"),C=()=>{n({}),k(l==="main"?"form":"main")},s=c=>{n(c),k("form")},v=c=>{a(y=>y.filter(N=>N.id!==c))};return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx("div",{className:l==="main"?"ml-auto":"",children:e.jsx(I,{className:"flex flex-row items-center gap-2 bg-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-300 hover:text-gray-700",onClick:()=>{C()},children:e.jsxs(e.Fragment,{children:[l==="main"?e.jsx(ze,{size:20,strokeWidth:2.5}):e.jsx(_e,{size:20,strokeWidth:2.5}),l==="main"?"Add an item":"Back"]})})}),e.jsx("div",{className:`relative max-h-[65vh] min-w-[650px] overflow-x-clip transition-all duration-300 
					${l==="form"?h.role==="admin"||h.role==="super_admin"?"h-[415px] min-h-[415px]":"h-[346px] min-h-[346px]":"h-[65vh] min-h-[415px]"}`,children:e.jsx(Ce,{initial:!1,children:l==="main"?e.jsx(ee.div,{variants:We,initial:"hidden",animate:"animate",exit:"exit",className:"absolute h-full w-full overflow-x-auto antialiased",children:e.jsx(Ee,{data:b,products:f,suppliers:j,handleEditItem:s,handleRemoveItem:v,handleSubmit:x})},"main"):e.jsx(ee.div,{variants:De,initial:"hidden",animate:"animate",exit:"exit",className:"absolute max-h-[642px] w-full p-1",children:e.jsx(Oe,{setInventoryProductsQueue:a,inventoryId:i,products:f,productsLoading:u,suppliers:j,suppliersLoading:g,currentId:b.reduce((c,y)=>y.id>c?y.id:c,0),handleNavigation:C,selectedProduct:Object.keys(d).length?d:void 0})},"form")})})]})})},$e=()=>{const{selectedInventory:i}=P();return e.jsxs("div",{className:"w-full space-y-4 rounded-lg border bg-white p-6",children:[e.jsx(Le,{}),i&&e.jsx(Me,{inventoryId:i.id})]})},He=()=>e.jsxs("div",{className:"flex h-screen w-screen flex-row",children:[e.jsx(qe,{}),e.jsxs(Be,{children:[e.jsx("div",{className:"max-h-full w-full overflow-y-auto p-6 pt-12 text-slate-700",children:e.jsxs("div",{className:"mx-auto max-w-[1024px] space-y-6",children:[e.jsx("h1",{className:"text-3xl font-bold",children:"Add Product"}),e.jsx($e,{})]})}),e.jsx(Se,{})]})]});export{He as AddProductPOSPage};
