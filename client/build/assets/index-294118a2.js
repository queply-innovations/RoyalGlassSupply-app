import{r as x,x as ne,j as e,ad as C,e as F,af as _,au as T,av as z,aw as M,ax as L,ay as O,ac as W,b0 as B,ae as I,aA as D,aB as E,a7 as le,a8 as ie,a9 as de,aa as ce,ab as Q,aD as S,B as K,bm as U,aR as re,aS as oe,aT as G,aU as xe,aV as me,aW as N,Q as ue,U as pe,V as he,X as fe,Y as je,Z as X,b as ve,aC as Y,I as ge,bo as be,bp as w,bq as ye,br as Z,ba as Ne,bL as _e,ar as Ce,f as Se,aI as ke,bM as Pe}from"./index-0960822e.js";import{c as $,d as ee,g as Ae,a as Ie,P as Fe,e as Te,C as ze,b as Me,M as Le,A as Oe,N as We}from"./useInventoryProductCalculations-0cffd962.js";import{P as Be,D as De,u as Ee}from"./FormatCurrency-9342c788.js";const se=x.createContext(void 0),$e=({children:a})=>{const[r,o]=x.useState("main"),[d,p]=x.useState(),{data:h,isLoading:m}=ne(),f={inventories:h,isInventoriesLoading:m,selectedInventory:d,setSelectedInventory:p,activeTab:r,setActiveTab:o};return e.jsx(se.Provider,{value:f,children:a})};function k(){const a=x.useContext(se);if(!a)throw new Error("useAddProductPos hook must be used within AddProductPosProvider");return a}const J=({title:a,subtitle:r,icon:o,onClick:d})=>e.jsxs(C,{className:"flex h-fit flex-1 flex-col gap-8 rounded-xl bg-gray-300 p-16 pb-12 text-slate-800 hover:text-white",onClick:d||(()=>{}),children:[o&&o,e.jsxs("span",{children:[e.jsx("p",{className:"text-lg font-bold",children:a}),r&&e.jsx("p",{className:"text-sm opacity-70",children:r})]})]}),qe=()=>{const{auth:a}=F(),{inventories:r,isInventoriesLoading:o,selectedInventory:d,setSelectedInventory:p}=k(),h=r.filter(n=>{var v;return(a==null?void 0:a.role)!=="admin"&&(a==null?void 0:a.role)!=="super_admin"?n.warehouse.code.includes(((v=a==null?void 0:a.role)==null?void 0:v.split("_")[1])??""):r}),[m,f]=x.useState(!1);return e.jsxs("div",{className:"flex flex-col justify-center gap-1",children:[e.jsx(_,{htmlFor:"inventory",className:"text-sm font-bold text-gray-600",children:"Inventory"}),e.jsxs(T,{open:m,onOpenChange:f,children:[e.jsx(z,{id:"inventory",name:"inventory",className:"relative w-full",asChild:!0,children:e.jsxs(C,{role:"combobox",className:"justify-between truncate bg-white text-sm font-bold text-slate-600",variant:"outline",children:[d?e.jsxs("div",{className:"flex items-center font-bold text-slate-600",children:[d.code,e.jsx("span",{className:"ml-1 text-xs opacity-80",children:" • "+d.type+" • "+d.date_received})]}):e.jsx("span",{children:"Select an inventory..."}),e.jsx($,{size:14,strokeWidth:2,className:"h-4 w-4 opacity-70"})]})}),e.jsx(M,{className:"w-[calc(100vw-170px)] max-w-[974px] p-0 text-sm font-medium text-slate-700",children:e.jsxs(L,{defaultValue:(d==null?void 0:d.code)||"",children:[e.jsx(O,{placeholder:"Inventory code..."}),o&&e.jsx("div",{className:"flex h-16 w-full items-center justify-center",children:e.jsx(W,{size:22,strokeWidth:2.5,className:"animate-spin text-slate-700/50"})}),e.jsx(B,{children:"No results found"}),e.jsx(I,{className:"max-h-[200px] overflow-y-scroll",children:e.jsx(D,{children:h&&h.map(n=>e.jsxs(E,{className:"cursor-pointer justify-between rounded-sm",value:n.code,onSelect:()=>{p(n),f(!1)},children:[e.jsx("span",{children:n.code}),e.jsx("span",{className:"text-xs font-semibold text-slate-700/50",children:n.type+" • "+n.date_received})]},n.id))})})]})})]})]})},Re=({setInventoryProductsQueue:a,inventoryId:r,products:o,productsLoading:d,suppliers:p,suppliersLoading:h,currentId:m,handleNavigation:f,selectedProduct:n})=>{var q,R,V,H;const{auth:v}=F(),c=(q=v.role)==null?void 0:q.includes("admin"),{value:l,handleChange:i}=ee(),[s,g]=x.useState(!1),[u,j]=x.useState(!1),[b,P]=x.useState(null);x.useEffect(()=>{i("inventory_id",r),i("unit","pcs"),c&&i("status",1),n&&(i("product_id",n.data.product_id),i("status",n.data.status),i("supplier_id",n.data.supplier_id),i("capital_price",n.data.capital_price),i("unit",n.data.unit),i("stocks_count",n.data.stocks_count),i("damage_count",n.data.damage_count),i("total_count",n.data.total_count)),!n&&!c&&i("capital_price",0)},[]);const[A,te]=x.useState();return x.useEffect(()=>{const t=Ae(l.stocks_count||0,l.damage_count||0);te(t),i("total_count",t)},[l.damage_count,l.stocks_count,A]),e.jsx(e.Fragment,{children:e.jsx("form",{onSubmit:t=>{t.preventDefault(),l.product_id===void 0?P("Please select a product first."):l.supplier_id===void 0?P("Please select a supplier first."):(a(n?y=>[...y.filter(ae=>ae.id!==n.id),{id:n.id,data:l}]:y=>[...y,{id:m+1,data:l}]),f())},children:e.jsxs("div",{className:"flex w-full flex-col gap-3",children:[e.jsxs("div",{className:"mt-3 grid w-full grid-flow-row grid-cols-12 gap-3",children:[e.jsxs("div",{className:`${c?"col-span-12":"col-span-6"} flex flex-col justify-center gap-1`,children:[e.jsx(_,{htmlFor:"product_id",className:"text-sm font-bold text-gray-600",children:"Product"}),e.jsxs(T,{open:s,onOpenChange:g,children:[e.jsx(z,{id:"product_id",className:"relative w-full",asChild:!0,autoFocus:!0,children:e.jsxs(C,{role:"combobox",className:"w-full justify-between text-sm font-bold text-slate-700",variant:"outline",children:[l.product_id?e.jsx(e.Fragment,{children:(()=>{const t=o.find(y=>y.id===l.product_id);return e.jsxs("div",{className:"flex w-full items-baseline gap-4 capitalize",children:[e.jsxs("span",{className:"max-w-full truncate",children:[t==null?void 0:t.name," ",(t==null?void 0:t.brand)&&`(${t.brand})`]}),e.jsx("span",{className:"font-baseline text-xs text-slate-700/50",children:t==null?void 0:t.serial_no})]})})()}):e.jsx("span",{children:"Select a product..."}),e.jsx($,{size:14,strokeWidth:2,className:"h-4 w-4 opacity-70"})]})}),e.jsx(M,{className:`${c?"max-w-[966px]":"max-w-[477px]"} w-[calc(100vw-170px)] p-0 text-sm font-medium text-slate-700`,children:e.jsxs(L,{children:[e.jsx(O,{placeholder:"Product name or serial number..."}),d&&e.jsx("div",{className:"flex h-16 w-full items-center justify-center",children:e.jsx(W,{size:22,strokeWidth:2.5,className:"animate-spin text-slate-700/50"})}),e.jsx(B,{children:"No match found"}),e.jsx(I,{className:"max-h-[200px] overflow-y-scroll",children:e.jsx(D,{children:o.map((t,y)=>e.jsxs(E,{className:"cursor-pointer justify-between rounded-sm",value:t.name+t.serial_no+t.brand,onSelect:()=>{i("product_id",t.id),g(!1)},children:[e.jsxs("span",{className:"max-w-[50%] truncate",children:[t.name," ",t.brand&&`(${t.brand})`]}),e.jsx("span",{className:"max-w-[49%] truncate text-xs font-semibold text-slate-700/50",children:t.serial_no+" • "+t.size+" • "+t.color})]},y))})})]})})]})]}),e.jsxs("div",{className:"col-span-6 flex flex-col justify-center gap-1",children:[e.jsx(_,{htmlFor:"supplier_id",className:"text-sm font-bold text-gray-600",children:"Supplier"}),e.jsxs(T,{open:u,onOpenChange:j,children:[e.jsx(z,{id:"supplier_id",className:"relative w-full",asChild:!0,children:e.jsxs(C,{role:"combobox",className:"w-full justify-between text-sm font-bold text-slate-700",variant:"outline",children:[l.supplier_id?e.jsx(e.Fragment,{children:(()=>{const t=p.find(y=>y.id===l.supplier_id);return e.jsxs("div",{className:"flex w-full items-baseline gap-4 capitalize",children:[e.jsx("span",{className:"max-w-full truncate",children:t==null?void 0:t.name}),e.jsx("span",{className:"font-baseline text-xs text-slate-700/50",children:t==null?void 0:t.address})]})})()}):e.jsx("span",{children:"Select a supplier..."}),e.jsx($,{size:14,strokeWidth:2,className:"h-4 w-4 opacity-70"})]})}),e.jsx(M,{className:"min-w-[477px] p-0 text-sm font-medium text-slate-700",children:e.jsxs(L,{children:[e.jsx(O,{placeholder:"Supplier name or address..."}),h&&e.jsx("div",{className:"flex h-16 w-full items-center justify-center",children:e.jsx(W,{size:22,strokeWidth:2.5,className:"animate-spin text-slate-700/50"})}),e.jsx(B,{children:"No match found"}),e.jsx(I,{className:"max-h-[200px] overflow-y-scroll",children:e.jsx(D,{children:p.map((t,y)=>e.jsxs(E,{className:"cursor-pointer justify-between rounded-sm",onSelect:()=>{i("supplier_id",t.id),j(!1)},children:[e.jsx("span",{children:t.name}),e.jsx("span",{className:"text-xs font-semibold text-slate-700/50",children:t.address})]},y))})})]})})]})]}),c&&e.jsxs("div",{className:"col-span-6 flex flex-col justify-center gap-1",children:[e.jsx(_,{htmlFor:"status",className:"text-sm font-bold text-gray-600",children:"Status"}),e.jsxs(le,{value:(R=l.status)==null?void 0:R.toString(),required:!0,onValueChange:t=>i("status",Number(t)),children:[e.jsx(ie,{name:"status",id:"status",className:"w-full px-4 text-sm font-bold text-slate-700",children:e.jsx(de,{placeholder:"Select status..."})}),e.jsxs(ce,{className:"text-sm font-medium",children:[e.jsx(Q,{value:"1",children:"Approved"}),e.jsx(Q,{value:"0",children:"Pending"})]})]})]})]}),e.jsx("hr",{className:"my-2 h-px w-full border-0 bg-gray-200"}),e.jsxs("div",{className:"grid w-full grid-flow-row grid-cols-12 gap-3",children:[e.jsxs("div",{className:`relative flex flex-col justify-center gap-1 ${c?"col-span-6":"hidden"}`,children:[e.jsx(_,{htmlFor:"capital_price",className:"text-sm font-bold text-gray-600",children:"Capital price"}),e.jsx(S,{id:"capital_price",name:"capital_price",type:"number",min:0,step:.01,required:!0,className:"pl-8",placeholder:"0.00",disabled:!c,value:l.capital_price||"",onBlur:t=>{l.capital_price!==void 0&&(t.target.value=Number(t.target.value).toFixed(2))},onChange:t=>{i("capital_price",Number(Number(t.target.value).toFixed(2)))}}),e.jsx("span",{className:"absolute bottom-0 left-0 pb-[0.65rem] pl-3 text-sm font-semibold text-gray-500",children:"₱"})]}),e.jsxs("div",{className:`flex flex-col justify-center gap-1 ${c?"col-span-6":"col-span-3"}`,children:[e.jsx(_,{htmlFor:"unit",className:"text-sm font-bold text-gray-600",children:"Unit"}),e.jsx(S,{id:"unit",name:"unit",type:"text",maxLength:40,required:!0,value:l.unit||"",onChange:t=>i("unit",t.target.value)})]}),e.jsxs("div",{className:`flex flex-col justify-center gap-1 ${c?"col-span-4":"col-span-3"}`,children:[e.jsx(_,{htmlFor:"stocks_count",className:"text-sm font-bold text-gray-600",children:"Stocks count"}),e.jsx(S,{id:"stocks_count",name:"stocks_count",type:"number",min:0,max:9999999,step:1,value:(V=l.stocks_count)==null?void 0:V.toFixed(0),required:!0,onChange:t=>{i("stocks_count",Number(Number(t.target.value).toFixed(0)))}})]}),e.jsxs("div",{className:`flex flex-col justify-center gap-1 ${c?"col-span-4":"col-span-3"}`,children:[e.jsx(_,{htmlFor:"damage_count",className:"text-sm font-bold text-gray-600",children:"Damage count"}),e.jsx(S,{id:"damage_count",name:"damage_count",type:"number",min:0,max:l.stocks_count??0,step:1,required:!0,value:(H=l.damage_count)==null?void 0:H.toFixed(0),onChange:t=>i("damage_count",Number(Number(t.target.value).toFixed(0)))})]}),e.jsxs("div",{className:`flex flex-col justify-center gap-1 ${c?"col-span-4":"col-span-3"}`,children:[e.jsx(_,{htmlFor:"total_count",className:"text-sm font-bold text-gray-600",children:"Total count"}),e.jsx(S,{id:"total_count",name:"total_count",type:"number",min:0,max:9999999,step:1,readOnly:!0,value:A??"0",className:`${A&&A<0&&"text-red-600"}`})]})]}),e.jsx("div",{className:"flex w-full justify-between whitespace-nowrap pt-6",children:e.jsx("div",{className:"ml-auto flex flex-row gap-4",children:e.jsx(K,{type:"submit",fill:"green",disabled:l.product_id===void 0||l.supplier_id===void 0,className:"max-w-fit flex-1 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50",children:n?"Save changes":"Add item to queue"})})}),b&&e.jsx("div",{className:"flex w-full flex-row justify-center gap-4",children:e.jsx("p",{className:"text-sm font-bold text-red-600",children:b})})]})})})},Ve=["","Product name","Supplier","Status","Capital price","Unit","Stocks","Damaged","Total"],He=({data:a,products:r,suppliers:o,handleEditItem:d,handleRemoveItem:p,handleSubmit:h})=>{const{auth:m}=F(),{setSelectedInventory:f}=k(),[n,v]=x.useState(!1),[c,l]=x.useState(null),i=async()=>{v(!0);const s=await h({action:"batch-add",data:a.map(u=>u==null?void 0:u.data)}).then(u=>{Array.isArray(u)&&u.length>0&&(Y.success("Items added to inventory",{autoClose:5e3,closeButton:!0}),f(void 0))}).catch(()=>{Y.error("Error adding items to inventory",{autoClose:5e3,closeButton:!0})});(Array.isArray(s)?s.filter(u=>u!==201):[]).length>0?l("Error adding items to inventory"):v(!1)};return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"relative flex h-full flex-col",children:[e.jsxs(I,{type:"always",className:"flex-1 rounded-md border border-gray-200 bg-white",style:{"--border":"216 12% 84%"},children:[a.length<=0&&e.jsx("div",{className:"absolute z-10 flex h-full w-full items-center justify-center",children:e.jsx("p",{className:"text-lg font-medium text-gray-500/50",children:"No items in queue"})}),e.jsx(U,{orientation:"horizontal",className:"z-50 h-3"}),e.jsx(U,{orientation:"vertical",className:"z-50 h-3",style:{"--border":"216 12% 84%"},asChild:!0}),e.jsxs(re,{children:[e.jsx(oe,{children:e.jsx(G,{id:"tHeaderRow",className:"hover:bg-white",children:Ve.map(s=>{var g;if(s!=="Capital price"||(g=m==null?void 0:m.role)!=null&&g.includes("admin"))return e.jsx(xe,{className:"whitespace-nowrap px-5 py-3 text-center text-xs font-bold uppercase",children:s},s+"_head")})},"tHeaderRow")}),e.jsx(me,{className:"[&>*:nth-child(even)]:bg-white [&>*:nth-child(odd)]:bg-gray-50",children:a.length>0&&a.map(s=>{var g,u,j;return e.jsxs(G,{className:"text-sm font-medium text-gray-700",children:[e.jsx(N,{className:"p-3 pr-0",children:e.jsx("div",{className:"flex flex-row justify-center text-xs font-normal uppercase",children:e.jsxs(ue,{children:[e.jsx(pe,{className:"overflow-clip rounded-full bg-gray-200/70 p-1.5 hover:bg-gray-300",children:e.jsx(Ie,{size:16,strokeWidth:2.25})}),e.jsxs(he,{className:"relative z-50 w-44 bg-white font-medium",children:[e.jsx(fe,{children:"Actions"}),e.jsx(je,{className:"bg-gray-200"}),e.jsxs(X,{onClick:()=>{s!=null&&s.id&&d(s)},className:"flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200",children:[e.jsx("span",{className:"flex w-6 items-center justify-center",children:e.jsx(Fe,{size:16,strokeWidth:2})}),e.jsx("span",{children:"Edit"})]},(s==null?void 0:s.id)+"edit"),e.jsxs(X,{onClick:()=>{s!=null&&s.id&&p(s.id)},className:"flex flex-row items-center gap-3 rounded-md p-2 focus:bg-red-50 focus:text-red-700",children:[e.jsx("span",{className:"flex w-6 items-center justify-center",children:e.jsx(Te,{size:16,strokeWidth:2})}),e.jsx("span",{children:"Remove"})]},(s==null?void 0:s.id)+"remove")]})]})})},(s==null?void 0:s.id)+"action"),e.jsx(N,{className:"max-w-[200px] truncate px-5 py-3",children:s!=null&&s.data.product_id?(g=r.find(b=>b.id===s.data.product_id))==null?void 0:g.name:s==null?void 0:s.data.product_id},(s==null?void 0:s.id)+"product_id"),e.jsx(N,{className:"max-w-[200px] truncate px-5 py-3",children:s!=null&&s.data.supplier_id?(u=o.find(b=>b.id===s.data.supplier_id))==null?void 0:u.name:s==null?void 0:s.data.supplier_id},(s==null?void 0:s.id)+"supplier_id"),e.jsx(N,{className:"px-5 py-3",children:s!=null&&s.data.status?e.jsx(ze,{size:20,strokeWidth:2,className:"text-green-600"}):e.jsx(ve,{size:20,strokeWidth:2,className:"text-gray-600"})},(s==null?void 0:s.id)+"status"),((j=m==null?void 0:m.role)==null?void 0:j.includes("admin"))&&e.jsx(N,{className:"px-5 py-3",children:Intl.NumberFormat("en-US",{style:"currency",currency:"PHP"}).format((s==null?void 0:s.data.capital_price)||0)},(s==null?void 0:s.id)+"capital_price"),e.jsx(N,{className:"px-5 py-3",children:s==null?void 0:s.data.unit},(s==null?void 0:s.id)+"unit"),e.jsx(N,{className:"px-5 py-3",children:s==null?void 0:s.data.stocks_count},(s==null?void 0:s.id)+"stocks_count"),e.jsx(N,{className:"px-5 py-3",children:s==null?void 0:s.data.damage_count},(s==null?void 0:s.id)+"damage_count"),e.jsx(N,{className:"px-5 py-3",children:s==null?void 0:s.data.total_count},(s==null?void 0:s.id)+"total_count")]},(s==null?void 0:s.id)+"row")})})]})]}),e.jsxs("div",{className:"flex w-full justify-between whitespace-nowrap pt-6",children:[c&&e.jsx("div",{className:"flex w-full flex-row items-center justify-start gap-4",children:e.jsx("p",{className:"text-sm font-bold text-red-600",children:c})}),e.jsx("div",{className:"ml-auto flex flex-row gap-4",children:e.jsx(K,{type:"submit",fill:"green",disabled:a.length<=0||n,className:"max-w-fit flex-1 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50",onClick:s=>{s.preventDefault(),i()},children:a.length<=1?"Add item to inventory":`Add ${a.length} items to inventory`})})]})]})})},Qe={hidden:{opacity:0,x:"-100%"},animate:{opacity:1,x:"0%",transition:{duration:.3,ease:"easeInOut"}},exit:{opacity:0,x:"-100%",transition:{duration:.3,ease:"easeInOut"}}},Ue={hidden:{opacity:0,x:"100%"},animate:{opacity:1,x:"0%",transition:{duration:.3,ease:"easeInOut"}},exit:{opacity:0,x:"100%",transition:{duration:.3,ease:"easeInOut"}}},Ge=({inventoryId:a})=>{const{auth:r}=F(),{data:o,isLoading:d}=ge(),{suppliers:p,isFetching:h}=be(),{handleSubmit:m}=ee(),[f,n]=x.useState([]),[v,c]=x.useState({});x.useEffect(()=>{n([])},[a]);const[l,i]=x.useState("main"),s=()=>{c({}),i(l==="main"?"form":"main")},g=j=>{c(j),i("form")},u=j=>{n(b=>b.filter(P=>P.id!==j))};return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx("div",{className:l==="main"?"ml-auto":"",children:e.jsx(C,{className:"flex flex-row items-center gap-2 bg-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-300 hover:text-gray-700",onClick:()=>{s()},children:e.jsxs(e.Fragment,{children:[l==="main"?e.jsx(Be,{size:20,strokeWidth:2.5}):e.jsx(w,{size:20,strokeWidth:2.5}),l==="main"?"Add an item":"Back"]})})}),e.jsx("div",{className:`relative max-h-[65vh] min-w-[650px] overflow-x-clip transition-all duration-300 
					${l==="form"?r.role==="admin"||r.role==="super_admin"?"h-[415px] min-h-[415px]":"h-[260px] min-h-[260px]":"h-[65vh] min-h-[415px]"}`,children:e.jsx(ye,{initial:!1,children:l==="main"?e.jsx(Z.div,{variants:Qe,initial:"hidden",animate:"animate",exit:"exit",className:"absolute h-full w-full overflow-x-auto antialiased",children:e.jsx(He,{data:f,products:o,suppliers:p,handleEditItem:g,handleRemoveItem:u,handleSubmit:m})},"main"):e.jsx(Z.div,{variants:Ue,initial:"hidden",animate:"animate",exit:"exit",className:"absolute max-h-[642px] w-full p-1",children:e.jsx(Re,{setInventoryProductsQueue:n,inventoryId:a,products:o,productsLoading:d,suppliers:p,suppliersLoading:h,currentId:f.reduce((j,b)=>b.id>j?b.id:j,0),handleNavigation:s,selectedProduct:Object.keys(v).length?v:void 0})},"form")})})]})})},Xe=()=>{const{selectedInventory:a}=k();return e.jsxs("div",{className:"w-full space-y-4 rounded-lg border bg-white p-6",children:[e.jsx(qe,{}),a&&e.jsx(Ge,{inventoryId:a.id})]})},Ye=()=>{const{setActiveTab:a}=k();return e.jsxs("div",{className:"mx-auto flex w-full flex-row items-center gap-4",children:[e.jsx(J,{title:"Product Item",subtitle:"Create new unique product...",icon:e.jsx(Ne,{size:20,strokeWidth:1.5,className:"h-16 w-16"}),onClick:()=>a("add_product")}),e.jsx(J,{title:"Inventory Product",subtitle:"Add existing products to inventory...",icon:e.jsx(_e,{size:20,strokeWidth:1.5,className:"h-16 w-16"}),onClick:()=>a("select_inventory")})]})},Ze=({openModal:a})=>{const{data:r,isLoading:o}=Ce(),d=()=>{a({},"add")};return e.jsx("div",{className:"rounded-lg border bg-white p-4",children:e.jsx(De,{columns:Me,data:r,filterWhat:"name",dataType:"Product",openModal:d,isLoading:o})})},Je=()=>{const{activeTab:a,setActiveTab:r}=k(),o=Se(),{isOpen:d,openModal:p,closeModal:h}=Ee(),[m,f]=x.useState(""),n=(v,c)=>{p(),f(c)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex w-full flex-row items-start justify-between",children:[e.jsx("h1",{className:"text-3xl font-bold",children:"Add Product"}),e.jsxs(C,{className:"flex flex-row items-center gap-2 bg-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-300 hover:text-gray-700",onClick:()=>{a==="main"?o("/pos/add-order"):r("main")},children:[e.jsx(w,{size:20,strokeWidth:2.5}),a==="main"?"Go back":"Main menu"]})]}),(a==="main"||a===void 0)&&e.jsx(Ye,{}),a==="select_inventory"&&e.jsx(Xe,{})," ",a==="add_product"&&e.jsx(Ze,{openModal:n}),e.jsx("div",{children:e.jsx(Le,{isOpen:d,onClose:h,title:m==="add"?"Add Product":"Edit Product",children:e.jsx(e.Fragment,{children:m==="add"&&e.jsx(Oe,{onClose:h})})})})]})},ss=()=>e.jsxs("div",{className:"flex h-screen w-screen flex-row",children:[e.jsx(We,{}),e.jsx($e,{children:e.jsxs(ke,{children:[e.jsx("div",{className:"max-h-full w-full overflow-y-auto p-6 pt-12 text-slate-700",children:e.jsx("div",{className:"mx-auto max-w-[1024px] space-y-6",children:e.jsx(Je,{})})}),e.jsx(Pe,{})]})})]});export{ss as AddProductPOSPage};