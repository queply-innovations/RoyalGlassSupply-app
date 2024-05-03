import{r as x,E as oe,j as e,ab as b,k as $,at as C,aT as F,aU as T,aV as R,bu as M,b3 as W,ap as V,b5 as O,as as z,bC as L,b6 as q,aJ as k,B as ne,bH as X,bm as xe,bo as me,bp as Z,bq as ue,br as pe,bs as N,a0 as he,a1 as fe,a2 as je,a3 as ve,a4 as ge,a5 as ee,aI as se,O as be,bI as Ne,ac as w,bJ as ye,bK as te,bz as _e,c5 as Ie,aF as Ce,$ as K,aK as ke,c6 as Se,ba as Pe,b1 as ze,bk as ae,c7 as Ae,bl as Fe}from"./index-f76a421f.js";import{C as B,c as le,g as Te,a as Re,P as Me,d as We,b as Oe,M as Le,A as qe,N as Q,f as D}from"./useInventoryProductCalculations-45f57c74.js";import{P as Be,D as ie,u as De,f as Ee}from"./timeUtils-b5da4687.js";import"./index-b11a2117.js";const ce=x.createContext(void 0),$e=({children:t})=>{const[n,r]=x.useState("main"),[c,i]=x.useState(),{data:h,isLoading:m}=oe(),j={inventories:h,isInventoriesLoading:m,selectedInventory:c,setSelectedInventory:i,activeTab:n,setActiveTab:r};return e.jsx(ce.Provider,{value:j,children:t})};function A(){const t=x.useContext(ce);if(!t)throw new Error("useAddProductPos hook must be used within AddProductPosProvider");return t}const E=({title:t,subtitle:n,icon:r,onClick:c})=>e.jsxs(b,{className:"flex h-fit flex-1 flex-col gap-8 rounded-xl bg-gray-300 p-16 pb-12 text-slate-800 hover:text-white",onClick:c||(()=>{}),children:[r&&r,e.jsxs("span",{children:[e.jsx("p",{className:"text-lg font-bold",children:t}),n&&e.jsx("p",{className:"text-sm opacity-70",children:n})]})]}),we=()=>{const{auth:t}=$(),{inventories:n,isInventoriesLoading:r,selectedInventory:c,setSelectedInventory:i}=A(),m=n.filter(u=>{var p;return(t==null?void 0:t.role)!=="admin"&&(t==null?void 0:t.role)!=="super_admin"?u.warehouse.code.includes(((p=t==null?void 0:t.role)==null?void 0:p.split("_")[1])??""):n}).sort((u,p)=>new Date(p.updated_at??p.created_at).getTime()-new Date(u.updated_at??u.created_at).getTime()),[j,o]=x.useState(!1);return e.jsxs("div",{className:"flex flex-col justify-center gap-1",children:[e.jsx(C,{htmlFor:"inventory",className:"text-sm font-bold text-gray-600",children:"Inventory"}),e.jsxs(F,{open:j,onOpenChange:o,children:[e.jsx(T,{id:"inventory",name:"inventory",className:"relative w-full",asChild:!0,children:e.jsxs(b,{role:"combobox",className:"justify-between truncate bg-white text-sm font-bold text-slate-600",variant:"outline",children:[c?e.jsxs("div",{className:"flex items-center font-bold text-slate-600",children:[c.code,e.jsx("span",{className:"ml-1 text-xs opacity-80",children:" • "+c.type+" • "+c.date_received})]}):e.jsx("span",{children:"Select an inventory..."}),e.jsx(B,{size:14,strokeWidth:2,className:"h-4 w-4 opacity-70"})]})}),e.jsx(R,{className:"w-[calc(100vw-170px)] max-w-[974px] p-0 text-sm font-medium text-slate-700",children:e.jsxs(M,{defaultValue:(c==null?void 0:c.code)||"",children:[e.jsx(W,{placeholder:"Inventory code..."}),r&&e.jsx("div",{className:"flex h-16 w-full items-center justify-center",children:e.jsx(V,{size:22,strokeWidth:2.5,className:"animate-spin text-slate-700/50"})}),e.jsx(O,{children:"No results found"}),e.jsx(z,{className:"max-h-[200px] overflow-y-scroll",children:e.jsx(L,{children:m&&m.map(u=>e.jsxs(q,{className:"cursor-pointer justify-between rounded-sm",value:u.code,onSelect:()=>{i(u),o(!1)},children:[e.jsx("span",{children:u.code}),e.jsx("span",{className:"text-xs font-semibold text-slate-600",children:u.type+" • "+u.date_received})]},u.id))})})]})})]})]})},He=({setInventoryProductsQueue:t,inventoryId:n,products:r,productsLoading:c,suppliers:i,suppliersLoading:h,currentId:m,handleNavigation:j,selectedProduct:o})=>{var U,Y,G,J;const{auth:u}=$(),p=(U=u.role)==null?void 0:U.includes("admin"),{value:l,handleChange:d}=le(),[s,g]=x.useState(!1),[f,v]=x.useState(!1),[I,S]=x.useState(null);x.useEffect(()=>{d("inventory_id",n),d("unit","pcs"),p&&d("status",1),o&&(d("product_id",o.data.product_id),d("status",o.data.status),d("supplier_id",o.data.supplier_id),d("capital_price",o.data.capital_price),d("unit",o.data.unit),d("stocks_count",o.data.stocks_count),d("damage_count",o.data.damage_count),d("total_count",o.data.total_count)),!o&&!p&&d("capital_price",0)},[]);const[P,y]=x.useState();return x.useEffect(()=>{const a=Te(l.stocks_count||0,l.damage_count||0);y(a),d("total_count",a)},[l.damage_count,l.stocks_count,P]),e.jsx(e.Fragment,{children:e.jsx("form",{onSubmit:a=>{a.preventDefault(),l.product_id===void 0?S("Please select a product first."):l.supplier_id===void 0?S("Please select a supplier first."):(t(o?_=>[..._.filter(de=>de.id!==o.id),{id:o.id,data:l}]:_=>[..._,{id:m+1,data:l}]),j())},children:e.jsxs("div",{className:"flex w-full flex-col gap-3",children:[e.jsxs("div",{className:"mt-3 grid w-full grid-flow-row grid-cols-12 gap-3",children:[e.jsxs("div",{className:"col-span-8 flex flex-col justify-center gap-1",children:[e.jsx(C,{htmlFor:"product_id",className:"text-sm font-bold text-gray-600",children:"Product"}),e.jsxs(F,{open:s,onOpenChange:g,children:[e.jsx(T,{id:"product_id",className:"relative w-full",asChild:!0,autoFocus:!0,children:e.jsxs(b,{role:"combobox",className:"w-full justify-between text-sm font-bold text-slate-700",variant:"outline",children:[l.product_id?e.jsx(e.Fragment,{children:(()=>{const a=r.find(_=>_.id===l.product_id);return e.jsxs("div",{className:"flex w-full flex-row items-baseline gap-4",children:[e.jsx("span",{children:a==null?void 0:a.name}),e.jsxs("div",{className:"flex gap-4 truncate text-xs font-semibold",children:[(a==null?void 0:a.brand)&&e.jsx("span",{children:`Brand: ${a==null?void 0:a.brand}`}),(a==null?void 0:a.size)&&e.jsx("span",{children:`Size: ${a==null?void 0:a.size}`}),(a==null?void 0:a.color)&&e.jsx("span",{children:`Color: ${a==null?void 0:a.color}`})]})]})})()}):e.jsx("span",{children:"Select a product..."}),e.jsx(B,{size:14,strokeWidth:2,className:"h-4 w-4 opacity-70"})]})}),e.jsx(R,{className:`${p?"max-w-[966px]":"max-w-[640px]"} w-[calc(100vw-170px)] p-0 text-sm font-medium text-slate-700`,children:e.jsxs(M,{children:[e.jsx(W,{placeholder:"Product name or serial number..."}),c&&e.jsx("div",{className:"flex h-16 w-full items-center justify-center",children:e.jsx(V,{size:22,strokeWidth:2.5,className:"animate-spin text-slate-700/50"})}),e.jsx(O,{children:"No match found"}),e.jsx(z,{className:"max-h-[200px] overflow-y-scroll",children:e.jsx(L,{children:r.map((a,_)=>e.jsx(q,{className:"cursor-pointer justify-between rounded-sm border-b",value:a.id+"_"+a.name+"_"+a.serial_no,onSelect:()=>{d("product_id",a.id),g(!1)},children:`${a.name} • ${a.brand} • ${a.size} • ${a.color}`},_))})})]})})]})]}),e.jsxs("div",{className:"col-span-4 flex flex-col justify-center gap-1",children:[e.jsx(C,{htmlFor:"supplier_id",className:"text-sm font-bold text-gray-600",children:"Supplier"}),e.jsxs(F,{open:f,onOpenChange:v,children:[e.jsx(T,{id:"supplier_id",className:"relative w-full",asChild:!0,children:e.jsxs(b,{role:"combobox",className:"w-full justify-between text-sm font-bold text-slate-700",variant:"outline",children:[l.supplier_id?e.jsx(e.Fragment,{children:(()=>{const a=i.find(_=>_.id===l.supplier_id);return e.jsxs("div",{className:"flex w-full items-baseline gap-4 capitalize",children:[e.jsx("span",{className:"max-w-full truncate",children:a==null?void 0:a.name}),e.jsx("span",{className:"font-baseline text-xs text-slate-700/50",children:a==null?void 0:a.address})]})})()}):e.jsx("span",{children:"Select a supplier..."}),e.jsx(B,{size:14,strokeWidth:2,className:"h-4 w-4 opacity-70"})]})}),e.jsx(R,{className:"min-w-[477px] p-0 text-sm font-medium text-slate-700",children:e.jsxs(M,{children:[e.jsx(W,{placeholder:"Supplier name or address..."}),h&&e.jsx("div",{className:"flex h-16 w-full items-center justify-center",children:e.jsx(V,{size:22,strokeWidth:2.5,className:"animate-spin text-slate-700/50"})}),e.jsx(O,{children:"No match found"}),e.jsx(z,{className:"max-h-[200px] overflow-y-scroll",children:e.jsx(L,{children:i.map((a,_)=>e.jsxs(q,{className:"cursor-pointer justify-between rounded-sm",onSelect:()=>{d("supplier_id",a.id),v(!1)},children:[e.jsx("span",{children:a.name}),e.jsx("span",{className:"text-xs font-semibold text-slate-700/50",children:a.address})]},_))})})]})})]})]})]}),e.jsx("hr",{className:"my-2 h-px w-full border-0 bg-gray-200"}),e.jsxs("div",{className:"grid w-full grid-flow-row grid-cols-12 gap-3",children:[e.jsxs("div",{className:`relative flex flex-col justify-center gap-1 ${p?"col-span-6":"hidden"}`,children:[e.jsx(C,{htmlFor:"capital_price",className:"text-sm font-bold text-gray-600",children:"Capital price"}),e.jsx(k,{id:"capital_price",name:"capital_price",type:"number",min:0,step:.01,required:!0,className:"pl-8",placeholder:"0.00",disabled:!p,value:l.capital_price||"",onBlur:a=>{l.capital_price!==void 0&&(a.target.value=Number(a.target.value).toFixed(2))},onChange:a=>{d("capital_price",Number(Number(a.target.value).toFixed(2)))}}),e.jsx("span",{className:"absolute bottom-0 left-0 pb-[0.65rem] pl-3 text-sm font-semibold text-gray-500",children:"₱"})]}),e.jsxs("div",{className:`flex flex-col justify-center gap-1 ${p?"col-span-6":"col-span-3"}`,children:[e.jsx(C,{htmlFor:"unit",className:"text-sm font-bold text-gray-600",children:"Unit"}),e.jsx(k,{id:"unit",name:"unit",type:"text",maxLength:40,required:!0,value:l.unit||"",onChange:a=>d("unit",a.target.value)})]}),e.jsxs("div",{className:"col-span-3 flex flex-col justify-center gap-1",children:[e.jsx(C,{htmlFor:"stocks_count",className:"text-sm font-bold text-gray-600",children:"Stocks count"}),e.jsx(k,{id:"stocks_count",name:"stocks_count",type:"number",min:0,max:9999999,step:1,value:(Y=l.stocks_count)==null?void 0:Y.toFixed(0),required:!0,onChange:a=>{d("stocks_count",Number(Number(a.target.value).toFixed(0)))}})]}),e.jsxs("div",{className:"col-span-3 flex flex-col justify-center gap-1",children:[e.jsx(C,{htmlFor:"damage_count",className:"text-sm font-bold text-gray-600",children:"Damage count"}),e.jsx(k,{id:"damage_count",name:"damage_count",type:"number",min:0,max:l.stocks_count??0,step:1,required:!0,value:(G=l.damage_count)==null?void 0:G.toFixed(0),onChange:a=>d("damage_count",Number(Number(a.target.value).toFixed(0)))})]}),e.jsxs("div",{className:"col-span-3 flex flex-col justify-center gap-1",children:[e.jsx(C,{htmlFor:"total_count",className:"text-sm font-bold text-gray-600",children:"Total count"}),e.jsx(k,{id:"total_count",name:"total_count",type:"number",min:0,max:9999999,step:1,readOnly:!0,value:P??"0",className:`${P&&P<0&&"text-red-600"}`})]}),((J=u.role)==null?void 0:J.includes("admin"))&&e.jsxs("div",{className:"col-span-3 flex flex-col justify-center gap-1",children:[e.jsx(C,{htmlFor:"total_count",className:"text-sm font-bold text-gray-600",children:"Approve stocks"}),e.jsx(k,{id:"total_count",name:"total_count",type:"number",min:0,max:l.stocks_count??0,step:1,value:l.approved_stocks!==void 0?String(l.approved_stocks):"",onChange:a=>d("approved_stocks",a.target.value),onBlur:a=>{d("approved_stocks",Number(a.target.value))}})]})]}),e.jsx("div",{className:"flex w-full justify-between whitespace-nowrap pt-6",children:e.jsx("div",{className:"ml-auto flex flex-row gap-4",children:e.jsx(ne,{type:"submit",fill:"green",disabled:l.product_id===void 0||l.supplier_id===void 0,className:"max-w-fit flex-1 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50",children:o?"Save changes":"Add item to queue"})})}),I&&e.jsx("div",{className:"flex w-full flex-row justify-center gap-4",children:e.jsx("p",{className:"text-sm font-bold text-red-600",children:I})})]})})})},Ve=["","Name","Brand","Size","Color","Supplier","Capital price","Unit","Stocks","Damaged","Total","Approved"],Ke=({data:t,products:n,suppliers:r,handleEditItem:c,handleRemoveItem:i,handleSubmit:h})=>{const{auth:m}=$(),{setSelectedInventory:j}=A(),[o,u]=x.useState(!1),[p,l]=x.useState(null),d=async()=>{u(!0);const s=await h({action:"batch-add",data:t.map(f=>f==null?void 0:f.data)}).then(f=>{Array.isArray(f)&&f.length>0&&(se.success("Items added to inventory",{autoClose:5e3,closeButton:!0}),j(void 0))}).catch(()=>{se.error("Error adding items to inventory",{autoClose:5e3,closeButton:!0})});(Array.isArray(s)?s.filter(f=>f!==201):[]).length>0?l("Error adding items to inventory"):u(!1)};return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"relative flex h-full flex-col",children:[e.jsxs(z,{type:"always",className:"flex-1 rounded-md border border-gray-200 bg-white",style:{"--border":"216 12% 84%"},children:[t.length<=0&&e.jsx("div",{className:"absolute z-10 flex h-full w-full items-center justify-center",children:e.jsx("p",{className:"text-lg font-medium text-gray-500/50",children:"No items in queue"})}),e.jsx(X,{orientation:"horizontal",className:"z-50 h-3"}),e.jsx(X,{orientation:"vertical",className:"z-50 h-3",style:{"--border":"216 12% 84%"},asChild:!0}),e.jsxs(xe,{children:[e.jsx(me,{children:e.jsx(Z,{id:"tHeaderRow",className:"hover:bg-white",children:Ve.map(s=>{var g;if(s!=="Capital price"||(g=m==null?void 0:m.role)!=null&&g.includes("admin"))return e.jsx(ue,{className:"whitespace-nowrap px-5 py-3 text-xs font-bold uppercase",children:s},s+"_head")})},"tHeaderRow")}),e.jsx(pe,{className:"[&>*:nth-child(even)]:bg-white [&>*:nth-child(odd)]:bg-gray-50",children:t.length>0&&t.map(s=>{var g,f,v,I,S,P;return e.jsxs(Z,{className:"text-sm font-medium text-gray-700",children:[e.jsx(N,{className:"p-3 pr-0",children:e.jsx("div",{className:"flex flex-row justify-center text-xs font-normal uppercase",children:e.jsxs(he,{children:[e.jsx(fe,{className:"overflow-clip rounded-full bg-gray-200/70 p-1.5 hover:bg-gray-300",children:e.jsx(Re,{size:16,strokeWidth:2.25})}),e.jsxs(je,{className:"relative z-50 w-44 bg-white font-medium",children:[e.jsx(ve,{children:"Actions"}),e.jsx(ge,{className:"bg-gray-200"}),e.jsxs(ee,{onClick:()=>{s!=null&&s.id&&c(s)},className:"flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200",children:[e.jsx("span",{className:"flex w-6 items-center justify-center",children:e.jsx(Me,{size:16,strokeWidth:2})}),e.jsx("span",{children:"Edit"})]},(s==null?void 0:s.id)+"edit"),e.jsxs(ee,{onClick:()=>{s!=null&&s.id&&i(s.id)},className:"flex flex-row items-center gap-3 rounded-md p-2 focus:bg-red-50 focus:text-red-700",children:[e.jsx("span",{className:"flex w-6 items-center justify-center",children:e.jsx(We,{size:16,strokeWidth:2})}),e.jsx("span",{children:"Remove"})]},(s==null?void 0:s.id)+"remove")]})]})})},(s==null?void 0:s.id)+"action"),e.jsx(N,{className:"max-w-[200px] truncate px-5 py-3",children:s!=null&&s.data.product_id?(g=n.find(y=>y.id===s.data.product_id))==null?void 0:g.name:s==null?void 0:s.data.product_id},(s==null?void 0:s.id)+"product_id"),e.jsx(N,{className:"max-w-[200px] truncate px-5 py-3",children:s!=null&&s.data.product_id?(f=n.find(y=>y.id===s.data.product_id))==null?void 0:f.brand:"No brand"},(s==null?void 0:s.id)+"product_brand"),e.jsx(N,{className:"max-w-[200px] truncate px-5 py-3",children:s!=null&&s.data.product_id?(v=n.find(y=>y.id===s.data.product_id))==null?void 0:v.size:"No data"},(s==null?void 0:s.id)+"product_size"),e.jsx(N,{className:"max-w-[200px] truncate px-5 py-3",children:s!=null&&s.data.product_id?(I=n.find(y=>y.id===s.data.product_id))==null?void 0:I.color:"No data"},(s==null?void 0:s.id)+"product_color"),e.jsx(N,{className:"max-w-[200px] truncate px-5 py-3",children:s!=null&&s.data.supplier_id?(S=r.find(y=>y.id===s.data.supplier_id))==null?void 0:S.name:s==null?void 0:s.data.supplier_id},(s==null?void 0:s.id)+"supplier_id"),((P=m==null?void 0:m.role)==null?void 0:P.includes("admin"))&&e.jsx(N,{className:"px-5 py-3",children:Intl.NumberFormat("en-US",{style:"currency",currency:"PHP"}).format((s==null?void 0:s.data.capital_price)||0)},(s==null?void 0:s.id)+"capital_price"),e.jsx(N,{className:"px-5 py-3",children:s==null?void 0:s.data.unit},(s==null?void 0:s.id)+"unit"),e.jsx(N,{className:"px-5 py-3",children:s==null?void 0:s.data.stocks_count},(s==null?void 0:s.id)+"stocks_count"),e.jsx(N,{className:"px-5 py-3",children:s==null?void 0:s.data.damage_count},(s==null?void 0:s.id)+"damage_count"),e.jsx(N,{className:"px-5 py-3",children:s==null?void 0:s.data.total_count},(s==null?void 0:s.id)+"total_count"),e.jsx(N,{className:"px-5 py-3",children:s==null?void 0:s.data.approved_stocks},(s==null?void 0:s.id)+"approved_stocks")]},(s==null?void 0:s.id)+"row")})})]})]}),e.jsxs("div",{className:"flex w-full justify-between whitespace-nowrap pt-6",children:[p&&e.jsx("div",{className:"flex w-full flex-row items-center justify-start gap-4",children:e.jsx("p",{className:"text-sm font-bold text-red-600",children:p})}),e.jsx("div",{className:"ml-auto flex flex-row gap-4",children:e.jsx(ne,{type:"submit",fill:"green",disabled:t.length<=0||o,className:"max-w-fit flex-1 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50",onClick:s=>{s.preventDefault(),d()},children:t.length<=1?"Add item to inventory":`Add ${t.length} items to inventory`})})]})]})})},Qe={hidden:{opacity:0,x:"-100%"},animate:{opacity:1,x:"0%",transition:{duration:.3,ease:"easeInOut"}},exit:{opacity:0,x:"-100%",transition:{duration:.3,ease:"easeInOut"}}},Ue={hidden:{opacity:0,x:"100%"},animate:{opacity:1,x:"0%",transition:{duration:.3,ease:"easeInOut"}},exit:{opacity:0,x:"100%",transition:{duration:.3,ease:"easeInOut"}}},Ye=({inventoryId:t})=>{const{auth:n}=$(),{data:r,isLoading:c}=be(),{suppliers:i,isFetching:h}=Ne(),{handleSubmit:m}=le(),[j,o]=x.useState([]),[u,p]=x.useState({});x.useEffect(()=>{o([])},[t]);const[l,d]=x.useState("main"),s=()=>{p({}),d(l==="main"?"form":"main")},g=v=>{p(v),d("form")},f=v=>{o(I=>I.filter(S=>S.id!==v))};return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx("div",{className:l==="main"?"ml-auto":"",children:e.jsx(b,{className:"flex flex-row items-center gap-2 bg-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-300 hover:text-gray-700",onClick:()=>{s()},children:e.jsxs(e.Fragment,{children:[l==="main"?e.jsx(Be,{size:20,strokeWidth:2.5}):e.jsx(w,{size:20,strokeWidth:2.5}),l==="main"?"Add an item":"Back"]})})}),e.jsx("div",{className:`relative max-h-[65vh] min-w-[650px] overflow-x-clip transition-all duration-300 
					${l==="form"?n.role==="admin"||n.role==="super_admin"?"h-[340px] min-h-[340px]":"h-[260px] min-h-[260px]":"h-[65vh] min-h-[415px]"}`,children:e.jsx(ye,{initial:!1,children:l==="main"?e.jsx(te.div,{variants:Qe,initial:"hidden",animate:"animate",exit:"exit",className:"absolute h-full w-full overflow-x-auto antialiased",children:e.jsx(Ke,{data:j,products:r,suppliers:i,handleEditItem:g,handleRemoveItem:f,handleSubmit:m})},"main"):e.jsx(te.div,{variants:Ue,initial:"hidden",animate:"animate",exit:"exit",className:"absolute max-h-[642px] w-full p-1",children:e.jsx(He,{setInventoryProductsQueue:o,inventoryId:t,products:r,productsLoading:c,suppliers:i,suppliersLoading:h,currentId:j.reduce((v,I)=>I.id>v?I.id:v,0),handleNavigation:s,selectedProduct:Object.keys(u).length?u:void 0})},"form")})})]})})},Ge=()=>{const{selectedInventory:t}=A();return e.jsxs("div",{className:"w-full space-y-4 rounded-lg border bg-white p-6",children:[e.jsx(we,{}),t&&e.jsx(Ye,{inventoryId:t.id})]})},Je=()=>{const{setActiveTab:t}=A();return e.jsxs("div",{className:"mx-auto flex w-full flex-row items-center gap-4",children:[e.jsx(E,{title:"Register Product Item",subtitle:"Create new unique product...",icon:e.jsx(_e,{size:20,strokeWidth:1.5,className:"h-16 w-16"}),onClick:()=>t("add_product")}),e.jsx(E,{title:"Inventory Product",subtitle:"Add existing products to inventory...",icon:e.jsx(Ie,{size:20,strokeWidth:1.5,className:"h-16 w-16"}),onClick:()=>t("select_inventory")})]})},Xe=({openModal:t})=>{const{data:n,isLoading:r}=Ce(),c=()=>{t({},"add")};return e.jsx("div",{className:"max-h-full w-full flex-1 rounded-lg border border-black/10 bg-white",children:e.jsx(ie,{columns:Oe,data:n.sort((i,h)=>h.id-i.id),filterWhat:"name",dataType:"Product",openModal:c,isLoading:r})})},Ze=()=>{const{activeTab:t,setActiveTab:n}=A(),r=K(),{isOpen:c,openModal:i,closeModal:h}=De(),[m,j]=x.useState(""),o=(u,p)=>{i(),j(p)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex w-full flex-row items-start justify-between",children:[e.jsx("h1",{className:"text-3xl font-bold",children:"Add Product"}),e.jsxs(b,{className:"flex flex-row items-center gap-2 bg-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-300 hover:text-gray-700",onClick:()=>{t==="main"?r("/pos/add-order"):n("main")},children:[e.jsx(w,{size:20,strokeWidth:2.5}),t==="main"?"Go back":"Main menu"]})]}),(t==="main"||t===void 0)&&e.jsx(Je,{}),t==="select_inventory"&&e.jsx(Ge,{})," ",t==="add_product"&&e.jsx(Xe,{openModal:o}),e.jsx("div",{children:e.jsx(Le,{isOpen:c,onClose:h,title:m==="add"?"Add Product":"Edit Product",children:e.jsx(e.Fragment,{children:m==="add"&&e.jsx(qe,{onClose:h})})})})]})},xs=()=>e.jsxs("div",{className:"flex h-screen w-screen flex-row",children:[e.jsx(Q,{}),e.jsx($e,{children:e.jsxs(ke,{children:[e.jsx("div",{className:"max-h-full w-full overflow-y-auto p-6 pt-12 text-slate-700",children:e.jsx("div",{className:"mx-auto max-w-[1024px] space-y-6",children:e.jsx(Ze,{})})}),e.jsx(Se,{})]})})]}),ms=()=>{const{setSearchFilterItems:t}=Pe(),{currentInvoicePos:n,setCurrentInvoicePos:r}=ze(),c=K();return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex h-screen w-screen flex-row",children:[e.jsx(Q,{}),e.jsx("div",{className:"max-h-full w-full overflow-y-auto p-6 pt-12 text-slate-700",children:e.jsxs("div",{className:"mx-auto max-w-[1024px] space-y-6",children:[e.jsxs("div",{className:"flex w-full flex-row items-start justify-between",children:[e.jsx("h1",{className:"text-3xl font-bold",children:"Select Warehouse to start selling"}),e.jsxs(b,{className:"flex flex-row items-center gap-2 bg-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-300 hover:text-gray-700",onClick:()=>{c(-3)},children:[e.jsx(w,{size:20,strokeWidth:2.5}),"Go Back"]})]}),e.jsxs("div",{className:"mx-auto flex w-full flex-row items-center gap-4",children:[e.jsx(E,{title:"Select CDO Warehouse",subtitle:"Cdo available products",icon:e.jsx(ae,{size:20,strokeWidth:1.5,className:"h-16 w-16"}),onClick:()=>{t({warehouse_id:1}),r({...n,warehouse_id:1}),c("/pos/add-order")}}),e.jsx(E,{title:"Select Iligan Warehouse",subtitle:"Iligan available products",icon:e.jsx(ae,{size:20,strokeWidth:1.5,className:"h-16 w-16"}),onClick:()=>{t({warehouse_id:2}),r({...n,warehouse_id:2}),c("/pos/add-order")}})]})]})})]})})},re=x.createContext(void 0),es=({children:t})=>{const[n,r]=x.useState(""),[c,i]=x.useState({}),[h,m]=x.useState(void 0),[j,o]=x.useState([]);function u(l,d,s){d>=s&&o(g=>g.map((f,v)=>v===l?{...f,quantity:d}:f))}x.useEffect(()=>{n!=""&&Ae(n).then(l=>{i(l),m(void 0)}).catch(l=>{m(l.message),i({})})},[n]);const p={returnInvoiceItems:c,invoiceCode:n,setInvoiceCode:r,toastMessage:h,selectedReturnItems:j,setSelectedReturnItems:o,quantityHandler:u};return e.jsx(re.Provider,{value:p,children:t})};function H(){const t=x.useContext(re);if(!t)throw new Error("useReturnInvoiceItemsPos hook must be used within ReturnInvoiceItemsPosProvider");return t}const ss=()=>{const{returnInvoiceItems:t}=H();return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex flex-row gap-4",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsxs("div",{children:[e.jsx("span",{className:"font-bold",children:"Customer: "}),e.jsxs("span",{className:"font-medium capitalize",children:[t.customer.firstname," ",t.customer.lastname]})]}),e.jsxs("div",{children:[e.jsx("span",{className:"font-bold",children:"Created at: "}),e.jsx("span",{className:"font-medium capitalize",children:Ee(t.created_at)})]})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsxs("div",{children:[e.jsx("span",{className:"font-bold",children:"Paid Amount: "}),e.jsx("span",{className:"font-medium capitalize",children:D(t.paid_amount)})]}),e.jsxs("div",{children:[e.jsx("span",{className:"font-bold",children:"Total Amount: "}),e.jsx("span",{className:"font-medium capitalize",children:D(t.total_amount_due)})]})]}),e.jsx("div",{className:"flex flex-col",children:e.jsxs("div",{children:[e.jsx("span",{className:"font-bold",children:"Total Items: "}),e.jsx("span",{className:"font-medium capitalize",children:t.invoice_items.length})]})})]})})},ts=({isOpen:t})=>{const{returnInvoiceItems:n,selectedReturnItems:r,setSelectedReturnItems:c}=H();return console.log("Return Invoice Items:",r),e.jsx(e.Fragment,{children:n.invoice_items.map((i,h)=>e.jsx(q,{value:i.product.id+"_"+i.product.name+"_"+i.product.serial_no,className:`${r.includes(i)?"hidden":""}`,onSelect:()=>{c([...r,i]),t(!1)},children:e.jsxs("div",{className:"flex w-full flex-row justify-between",children:[e.jsxs("div",{className:"flex flex-row items-center gap-2",children:[i.product.brand&&e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"text-sm text-slate-500",children:["(",i.product.brand,")"]}),"•"]}),e.jsx("span",{className:"text-base font-bold",children:i.product.name}),"•",e.jsx("span",{className:"text-sm capitalize text-slate-500",children:i.product.size}),"•",e.jsx("span",{className:"text-sm capitalize text-slate-700",children:i.product.color})]}),e.jsxs("div",{className:"flex flex-row gap-3",children:[i.quantity>1?e.jsxs("span",{children:[i.quantity," pcs"]}):e.jsxs("span",{children:[i.quantity," pc"]}),e.jsx("span",{className:"font-bold",children:D(i.product_price)})]})]})},h))})},as=({})=>{const[t,n]=x.useState(!1);return e.jsxs(F,{open:t,onOpenChange:n,children:[e.jsx(T,{asChild:!0,children:e.jsxs(b,{variant:"outline",role:"combobox","aria-expanded":t,className:"w-full justify-between",children:["Select Items...",e.jsx(B,{className:"ml-2 h-4 w-4 shrink-0 opacity-50"})]})}),e.jsx(R,{className:"w-full min-w-[1024px] p-0 text-sm font-medium text-slate-700",children:e.jsxs(M,{children:[e.jsx(W,{placeholder:"Search Items..."}),e.jsx(O,{children:"No match found"}),e.jsx(z,{className:"max-h-[300px] overflow-y-scroll",children:e.jsx(L,{children:e.jsx(ts,{isOpen:n})})})]})})]})},ns=()=>{const[t,n]=x.useState("IVC01-"),{setInvoiceCode:r,toastMessage:c,returnInvoiceItems:i}=H(),h=m=>{m.preventDefault(),r(t)};return e.jsx(e.Fragment,{children:e.jsxs("form",{onSubmit:h,className:"flex flex-col gap-2",children:[e.jsxs("div",{className:"flex w-full flex-row justify-between gap-4",children:[e.jsx(k,{value:t,maxLength:15,onChange:m=>n(m.target.value)}),e.jsxs(b,{type:"submit",className:"bg-primary flex items-center gap-2 text-white",children:[e.jsx(Fe,{size:16,strokeWidth:2.5}),"Search Invoice Code"]})]}),Object.keys(i).length>0&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex w-full flex-row items-center justify-between",children:[e.jsx(ss,{}),e.jsx(b,{children:"Initiate Return"})]}),e.jsx(as,{})]}),c&&e.jsx("div",{className:"p-2",children:e.jsx("span",{children:c})})]})})},ls=[{id:"itemNumber",accessorKey:"id",header:()=>e.jsx("div",{className:"flex justify-center",children:"Item #"}),cell:({row:t})=>e.jsx("div",{className:"flex justify-center",children:t.index+1}),size:100},{accessorKey:"quantityPurchased",header:()=>e.jsx("div",{className:"flex justify-center",children:"QTY Purchased"}),size:50,cell:({row:t})=>e.jsx("div",{className:"flex ",children:t.original.quantity})},{accessorKey:"quantityReturn",header:()=>e.jsx("div",{className:"flex justify-center",children:"QTY To Return"}),size:100,cell:({row:t})=>e.jsxs("div",{className:"flex flex-row justify-center w-full ",children:[e.jsx(b,{className:"bg-red-300 rounded-sm hover:bg-red-500 disabled:opacity-100",onClick:()=>{},disabled:t.original.quantity>=1,children:e.jsx("span",{children:"-"})}),e.jsx(k,{type:"number",min:1,max:t.original.quantity,className:"max-w-[100px]",defaultValue:1}),e.jsx(b,{className:"rounded-sm bg-slate-500 hover:bg-slate-700 disabled:bg-slate-200",onClick:()=>{},disabled:t.original.quantity<=1,children:e.jsx("span",{children:"+"})})]})},{accessorKey:"product.name",size:100,header:()=>e.jsx("div",{className:"justify-center",children:"Product"}),cell:({row:t})=>e.jsx("div",{className:"flex flex-col",children:e.jsxs("div",{className:"flex flex-row items-center gap-2",children:[t.original.product.brand&&e.jsxs("span",{className:"text-sm font-light",children:["(",t.original.product.brand,")"]}),e.jsx("span",{className:"text-sm font-bold",children:t.original.product.name}),"•",e.jsx("span",{className:"text-sm font-medium capitalize",children:t.original.product.size}),"•",e.jsx("span",{className:"text-sm font-bold uppercase",children:t.original.product.color})]})})},{accessorKey:"product_price",size:100,header:()=>e.jsx("div",{className:"justify-center",children:"Price"}),cell:({row:t})=>e.jsx("div",{className:"flex flex-col",children:e.jsx("div",{className:"flex flex-row gap-2",children:e.jsx("span",{className:"text-sm font-bold",children:D(t.original.product_price)})})})}],is=({})=>{const{returnInvoiceItems:t,selectedReturnItems:n}=H();return e.jsx(e.Fragment,{children:Object.keys(t).length>0&&e.jsx("div",{children:e.jsx(ie,{columns:ls,data:n,filterWhat:"id",hideFilter:!0,hidePagination:t.invoice_items.length<10,dataType:"returnItems"})})})},us=()=>{const t=K();return e.jsx(e.Fragment,{children:e.jsx(es,{children:e.jsxs("div",{className:"flex h-screen w-screen flex-row",children:[e.jsx(Q,{}),e.jsxs("div",{className:"flex max-h-full w-full flex-col gap-4 overflow-y-auto p-6 pt-12 text-slate-700",children:[e.jsxs("div",{className:"mx-auto w-full max-w-[1024px] space-y-6",children:[e.jsxs("div",{className:"flex w-full flex-row items-start justify-between",children:[e.jsx("h1",{className:"text-3xl font-bold",children:"Search Invoice Code to return items"}),e.jsxs(b,{className:"flex flex-row items-center gap-2 bg-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-300 hover:text-gray-700",onClick:()=>{t(-1)},children:[e.jsx(w,{size:20,strokeWidth:2.5}),"Go Back"]})]}),e.jsx("div",{children:e.jsx(ns,{})})]}),e.jsx(is,{})]})]})})})};export{xs as AddProductPOSPage,us as ReturnItemsPosPage,ms as SelectWarehousePos};