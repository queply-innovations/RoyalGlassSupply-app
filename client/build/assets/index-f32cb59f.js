import{r as m,y as ie,j as e,a6 as A,f as T,ap as k,aP as W,aQ as M,aR as L,bf as O,a$ as B,ak as D,b1 as $,ao as F,bn as E,b2 as R,aF as I,B as ee,bs as J,bt as de,bu as ce,bv as X,bw as re,bx as oe,by as g,V as xe,X as ue,Y as me,Z as pe,$ as he,a0 as Y,aE as Z,J as fe,bz as je,a7 as H,bA as ve,bB as K,bk as ge,c0 as be,aB as ye,g as se,aG as Ne,c1 as _e,bc as ke,be as w}from"./index-b37f3cdf.js";import{C as q,c as te,g as Ce,a as Se,P as Ae,d as Ie,b as Pe,M as Fe,A as ze,N as ae}from"./useInventoryProductCalculations-0205155e.js";import{P as Te,D as We,u as Me}from"./timeUtils-3867b2bc.js";import"./index-2daf1427.js";const ne=m.createContext(void 0),Le=({children:a})=>{const[c,r]=m.useState("main"),[l,p]=m.useState(),{data:f,isLoading:u}=ie(),j={inventories:f,isInventoriesLoading:u,selectedInventory:l,setSelectedInventory:p,activeTab:c,setActiveTab:r};return e.jsx(ne.Provider,{value:j,children:a})};function P(){const a=m.useContext(ne);if(!a)throw new Error("useAddProductPos hook must be used within AddProductPosProvider");return a}const z=({title:a,subtitle:c,icon:r,onClick:l})=>e.jsxs(A,{className:"flex h-fit flex-1 flex-col gap-8 rounded-xl bg-gray-300 p-16 pb-12 text-slate-800 hover:text-white",onClick:l||(()=>{}),children:[r&&r,e.jsxs("span",{children:[e.jsx("p",{className:"text-lg font-bold",children:a}),c&&e.jsx("p",{className:"text-sm opacity-70",children:c})]})]}),Oe=()=>{const{auth:a}=T(),{inventories:c,isInventoriesLoading:r,selectedInventory:l,setSelectedInventory:p}=P(),u=c.filter(o=>{var x;return(a==null?void 0:a.role)!=="admin"&&(a==null?void 0:a.role)!=="super_admin"?o.warehouse.code.includes(((x=a==null?void 0:a.role)==null?void 0:x.split("_")[1])??""):c}).sort((o,x)=>new Date(x.updated_at??x.created_at).getTime()-new Date(o.updated_at??o.created_at).getTime()),[j,d]=m.useState(!1);return e.jsxs("div",{className:"flex flex-col justify-center gap-1",children:[e.jsx(k,{htmlFor:"inventory",className:"text-sm font-bold text-gray-600",children:"Inventory"}),e.jsxs(W,{open:j,onOpenChange:d,children:[e.jsx(M,{id:"inventory",name:"inventory",className:"relative w-full",asChild:!0,children:e.jsxs(A,{role:"combobox",className:"justify-between truncate bg-white text-sm font-bold text-slate-600",variant:"outline",children:[l?e.jsxs("div",{className:"flex items-center font-bold text-slate-600",children:[l.code,e.jsx("span",{className:"ml-1 text-xs opacity-80",children:" • "+l.type+" • "+l.date_received})]}):e.jsx("span",{children:"Select an inventory..."}),e.jsx(q,{size:14,strokeWidth:2,className:"h-4 w-4 opacity-70"})]})}),e.jsx(L,{className:"w-[calc(100vw-170px)] max-w-[974px] p-0 text-sm font-medium text-slate-700",children:e.jsxs(O,{defaultValue:(l==null?void 0:l.code)||"",children:[e.jsx(B,{placeholder:"Inventory code..."}),r&&e.jsx("div",{className:"flex h-16 w-full items-center justify-center",children:e.jsx(D,{size:22,strokeWidth:2.5,className:"animate-spin text-slate-700/50"})}),e.jsx($,{children:"No results found"}),e.jsx(F,{className:"max-h-[200px] overflow-y-scroll",children:e.jsx(E,{children:u&&u.map(o=>e.jsxs(R,{className:"cursor-pointer justify-between rounded-sm",value:o.code,onSelect:()=>{p(o),d(!1)},children:[e.jsx("span",{children:o.code}),e.jsx("span",{className:"text-xs font-semibold text-slate-600",children:o.type+" • "+o.date_received})]},o.id))})})]})})]})]})},Be=({setInventoryProductsQueue:a,inventoryId:c,products:r,productsLoading:l,suppliers:p,suppliersLoading:f,currentId:u,handleNavigation:j,selectedProduct:d})=>{var Q,G,U,V;const{auth:o}=T(),x=(Q=o.role)==null?void 0:Q.includes("admin"),{value:n,handleChange:i}=te(),[s,b]=m.useState(!1),[h,v]=m.useState(!1),[_,C]=m.useState(null);m.useEffect(()=>{i("inventory_id",c),i("unit","pcs"),x&&i("status",1),d&&(i("product_id",d.data.product_id),i("status",d.data.status),i("supplier_id",d.data.supplier_id),i("capital_price",d.data.capital_price),i("unit",d.data.unit),i("stocks_count",d.data.stocks_count),i("damage_count",d.data.damage_count),i("total_count",d.data.total_count)),!d&&!x&&i("capital_price",0)},[]);const[S,y]=m.useState();return m.useEffect(()=>{const t=Ce(n.stocks_count||0,n.damage_count||0);y(t),i("total_count",t)},[n.damage_count,n.stocks_count,S]),e.jsx(e.Fragment,{children:e.jsx("form",{onSubmit:t=>{t.preventDefault(),n.product_id===void 0?C("Please select a product first."):n.supplier_id===void 0?C("Please select a supplier first."):(a(d?N=>[...N.filter(le=>le.id!==d.id),{id:d.id,data:n}]:N=>[...N,{id:u+1,data:n}]),j())},children:e.jsxs("div",{className:"flex w-full flex-col gap-3",children:[e.jsxs("div",{className:"mt-3 grid w-full grid-flow-row grid-cols-12 gap-3",children:[e.jsxs("div",{className:"col-span-8 flex flex-col justify-center gap-1",children:[e.jsx(k,{htmlFor:"product_id",className:"text-sm font-bold text-gray-600",children:"Product"}),e.jsxs(W,{open:s,onOpenChange:b,children:[e.jsx(M,{id:"product_id",className:"relative w-full",asChild:!0,autoFocus:!0,children:e.jsxs(A,{role:"combobox",className:"w-full justify-between text-sm font-bold text-slate-700",variant:"outline",children:[n.product_id?e.jsx(e.Fragment,{children:(()=>{const t=r.find(N=>N.id===n.product_id);return e.jsxs("div",{className:"flex w-full flex-row items-baseline gap-4",children:[e.jsx("span",{children:t==null?void 0:t.name}),e.jsxs("div",{className:"flex gap-4 truncate text-xs font-semibold",children:[(t==null?void 0:t.brand)&&e.jsx("span",{children:`Brand: ${t==null?void 0:t.brand}`}),(t==null?void 0:t.size)&&e.jsx("span",{children:`Size: ${t==null?void 0:t.size}`}),(t==null?void 0:t.color)&&e.jsx("span",{children:`Color: ${t==null?void 0:t.color}`})]})]})})()}):e.jsx("span",{children:"Select a product..."}),e.jsx(q,{size:14,strokeWidth:2,className:"h-4 w-4 opacity-70"})]})}),e.jsx(L,{className:`${x?"max-w-[966px]":"max-w-[640px]"} w-[calc(100vw-170px)] p-0 text-sm font-medium text-slate-700`,children:e.jsxs(O,{children:[e.jsx(B,{placeholder:"Product name or serial number..."}),l&&e.jsx("div",{className:"flex h-16 w-full items-center justify-center",children:e.jsx(D,{size:22,strokeWidth:2.5,className:"animate-spin text-slate-700/50"})}),e.jsx($,{children:"No match found"}),e.jsx(F,{className:"max-h-[200px] overflow-y-scroll",children:e.jsx(E,{children:r.map((t,N)=>e.jsx(R,{className:"cursor-pointer justify-between rounded-sm border-b",value:t.id+"_"+t.name+"_"+t.serial_no,onSelect:()=>{i("product_id",t.id),b(!1)},children:`${t.name} • ${t.brand} • ${t.size} • ${t.color}`},N))})})]})})]})]}),e.jsxs("div",{className:"col-span-4 flex flex-col justify-center gap-1",children:[e.jsx(k,{htmlFor:"supplier_id",className:"text-sm font-bold text-gray-600",children:"Supplier"}),e.jsxs(W,{open:h,onOpenChange:v,children:[e.jsx(M,{id:"supplier_id",className:"relative w-full",asChild:!0,children:e.jsxs(A,{role:"combobox",className:"w-full justify-between text-sm font-bold text-slate-700",variant:"outline",children:[n.supplier_id?e.jsx(e.Fragment,{children:(()=>{const t=p.find(N=>N.id===n.supplier_id);return e.jsxs("div",{className:"flex w-full items-baseline gap-4 capitalize",children:[e.jsx("span",{className:"max-w-full truncate",children:t==null?void 0:t.name}),e.jsx("span",{className:"font-baseline text-xs text-slate-700/50",children:t==null?void 0:t.address})]})})()}):e.jsx("span",{children:"Select a supplier..."}),e.jsx(q,{size:14,strokeWidth:2,className:"h-4 w-4 opacity-70"})]})}),e.jsx(L,{className:"min-w-[477px] p-0 text-sm font-medium text-slate-700",children:e.jsxs(O,{children:[e.jsx(B,{placeholder:"Supplier name or address..."}),f&&e.jsx("div",{className:"flex h-16 w-full items-center justify-center",children:e.jsx(D,{size:22,strokeWidth:2.5,className:"animate-spin text-slate-700/50"})}),e.jsx($,{children:"No match found"}),e.jsx(F,{className:"max-h-[200px] overflow-y-scroll",children:e.jsx(E,{children:p.map((t,N)=>e.jsxs(R,{className:"cursor-pointer justify-between rounded-sm",onSelect:()=>{i("supplier_id",t.id),v(!1)},children:[e.jsx("span",{children:t.name}),e.jsx("span",{className:"text-xs font-semibold text-slate-700/50",children:t.address})]},N))})})]})})]})]})]}),e.jsx("hr",{className:"my-2 h-px w-full border-0 bg-gray-200"}),e.jsxs("div",{className:"grid w-full grid-flow-row grid-cols-12 gap-3",children:[e.jsxs("div",{className:`relative flex flex-col justify-center gap-1 ${x?"col-span-6":"hidden"}`,children:[e.jsx(k,{htmlFor:"capital_price",className:"text-sm font-bold text-gray-600",children:"Capital price"}),e.jsx(I,{id:"capital_price",name:"capital_price",type:"number",min:0,step:.01,required:!0,className:"pl-8",placeholder:"0.00",disabled:!x,value:n.capital_price||"",onBlur:t=>{n.capital_price!==void 0&&(t.target.value=Number(t.target.value).toFixed(2))},onChange:t=>{i("capital_price",Number(Number(t.target.value).toFixed(2)))}}),e.jsx("span",{className:"absolute bottom-0 left-0 pb-[0.65rem] pl-3 text-sm font-semibold text-gray-500",children:"₱"})]}),e.jsxs("div",{className:`flex flex-col justify-center gap-1 ${x?"col-span-6":"col-span-3"}`,children:[e.jsx(k,{htmlFor:"unit",className:"text-sm font-bold text-gray-600",children:"Unit"}),e.jsx(I,{id:"unit",name:"unit",type:"text",maxLength:40,required:!0,value:n.unit||"",onChange:t=>i("unit",t.target.value)})]}),e.jsxs("div",{className:"col-span-3 flex flex-col justify-center gap-1",children:[e.jsx(k,{htmlFor:"stocks_count",className:"text-sm font-bold text-gray-600",children:"Stocks count"}),e.jsx(I,{id:"stocks_count",name:"stocks_count",type:"number",min:0,max:9999999,step:1,value:(G=n.stocks_count)==null?void 0:G.toFixed(0),required:!0,onChange:t=>{i("stocks_count",Number(Number(t.target.value).toFixed(0)))}})]}),e.jsxs("div",{className:"col-span-3 flex flex-col justify-center gap-1",children:[e.jsx(k,{htmlFor:"damage_count",className:"text-sm font-bold text-gray-600",children:"Damage count"}),e.jsx(I,{id:"damage_count",name:"damage_count",type:"number",min:0,max:n.stocks_count??0,step:1,required:!0,value:(U=n.damage_count)==null?void 0:U.toFixed(0),onChange:t=>i("damage_count",Number(Number(t.target.value).toFixed(0)))})]}),e.jsxs("div",{className:"col-span-3 flex flex-col justify-center gap-1",children:[e.jsx(k,{htmlFor:"total_count",className:"text-sm font-bold text-gray-600",children:"Total count"}),e.jsx(I,{id:"total_count",name:"total_count",type:"number",min:0,max:9999999,step:1,readOnly:!0,value:S??"0",className:`${S&&S<0&&"text-red-600"}`})]}),((V=o.role)==null?void 0:V.includes("admin"))&&e.jsxs("div",{className:"col-span-3 flex flex-col justify-center gap-1",children:[e.jsx(k,{htmlFor:"total_count",className:"text-sm font-bold text-gray-600",children:"Approve stocks"}),e.jsx(I,{id:"total_count",name:"total_count",type:"number",min:0,max:n.stocks_count??0,step:1,value:n.approved_stocks!==void 0?String(n.approved_stocks):"",onChange:t=>i("approved_stocks",t.target.value),onBlur:t=>{i("approved_stocks",Number(t.target.value))}})]})]}),e.jsx("div",{className:"flex w-full justify-between whitespace-nowrap pt-6",children:e.jsx("div",{className:"ml-auto flex flex-row gap-4",children:e.jsx(ee,{type:"submit",fill:"green",disabled:n.product_id===void 0||n.supplier_id===void 0,className:"max-w-fit flex-1 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50",children:d?"Save changes":"Add item to queue"})})}),_&&e.jsx("div",{className:"flex w-full flex-row justify-center gap-4",children:e.jsx("p",{className:"text-sm font-bold text-red-600",children:_})})]})})})},De=["","Name","Brand","Size","Color","Supplier","Capital price","Unit","Stocks","Damaged","Total","Approved"],$e=({data:a,products:c,suppliers:r,handleEditItem:l,handleRemoveItem:p,handleSubmit:f})=>{const{auth:u}=T(),{setSelectedInventory:j}=P(),[d,o]=m.useState(!1),[x,n]=m.useState(null),i=async()=>{o(!0);const s=await f({action:"batch-add",data:a.map(h=>h==null?void 0:h.data)}).then(h=>{Array.isArray(h)&&h.length>0&&(Z.success("Items added to inventory",{autoClose:5e3,closeButton:!0}),j(void 0))}).catch(()=>{Z.error("Error adding items to inventory",{autoClose:5e3,closeButton:!0})});(Array.isArray(s)?s.filter(h=>h!==201):[]).length>0?n("Error adding items to inventory"):o(!1)};return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"relative flex h-full flex-col",children:[e.jsxs(F,{type:"always",className:"flex-1 rounded-md border border-gray-200 bg-white",style:{"--border":"216 12% 84%"},children:[a.length<=0&&e.jsx("div",{className:"absolute z-10 flex h-full w-full items-center justify-center",children:e.jsx("p",{className:"text-lg font-medium text-gray-500/50",children:"No items in queue"})}),e.jsx(J,{orientation:"horizontal",className:"z-50 h-3"}),e.jsx(J,{orientation:"vertical",className:"z-50 h-3",style:{"--border":"216 12% 84%"},asChild:!0}),e.jsxs(de,{children:[e.jsx(ce,{children:e.jsx(X,{id:"tHeaderRow",className:"hover:bg-white",children:De.map(s=>{var b;if(s!=="Capital price"||(b=u==null?void 0:u.role)!=null&&b.includes("admin"))return e.jsx(re,{className:"whitespace-nowrap px-5 py-3 text-xs font-bold uppercase",children:s},s+"_head")})},"tHeaderRow")}),e.jsx(oe,{className:"[&>*:nth-child(even)]:bg-white [&>*:nth-child(odd)]:bg-gray-50",children:a.length>0&&a.map(s=>{var b,h,v,_,C,S;return e.jsxs(X,{className:"text-sm font-medium text-gray-700",children:[e.jsx(g,{className:"p-3 pr-0",children:e.jsx("div",{className:"flex flex-row justify-center text-xs font-normal uppercase",children:e.jsxs(xe,{children:[e.jsx(ue,{className:"overflow-clip rounded-full bg-gray-200/70 p-1.5 hover:bg-gray-300",children:e.jsx(Se,{size:16,strokeWidth:2.25})}),e.jsxs(me,{className:"relative z-50 w-44 bg-white font-medium",children:[e.jsx(pe,{children:"Actions"}),e.jsx(he,{className:"bg-gray-200"}),e.jsxs(Y,{onClick:()=>{s!=null&&s.id&&l(s)},className:"flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200",children:[e.jsx("span",{className:"flex w-6 items-center justify-center",children:e.jsx(Ae,{size:16,strokeWidth:2})}),e.jsx("span",{children:"Edit"})]},(s==null?void 0:s.id)+"edit"),e.jsxs(Y,{onClick:()=>{s!=null&&s.id&&p(s.id)},className:"flex flex-row items-center gap-3 rounded-md p-2 focus:bg-red-50 focus:text-red-700",children:[e.jsx("span",{className:"flex w-6 items-center justify-center",children:e.jsx(Ie,{size:16,strokeWidth:2})}),e.jsx("span",{children:"Remove"})]},(s==null?void 0:s.id)+"remove")]})]})})},(s==null?void 0:s.id)+"action"),e.jsx(g,{className:"max-w-[200px] truncate px-5 py-3",children:s!=null&&s.data.product_id?(b=c.find(y=>y.id===s.data.product_id))==null?void 0:b.name:s==null?void 0:s.data.product_id},(s==null?void 0:s.id)+"product_id"),e.jsx(g,{className:"max-w-[200px] truncate px-5 py-3",children:s!=null&&s.data.product_id?(h=c.find(y=>y.id===s.data.product_id))==null?void 0:h.brand:"No brand"},(s==null?void 0:s.id)+"product_brand"),e.jsx(g,{className:"max-w-[200px] truncate px-5 py-3",children:s!=null&&s.data.product_id?(v=c.find(y=>y.id===s.data.product_id))==null?void 0:v.size:"No data"},(s==null?void 0:s.id)+"product_size"),e.jsx(g,{className:"max-w-[200px] truncate px-5 py-3",children:s!=null&&s.data.product_id?(_=c.find(y=>y.id===s.data.product_id))==null?void 0:_.color:"No data"},(s==null?void 0:s.id)+"product_color"),e.jsx(g,{className:"max-w-[200px] truncate px-5 py-3",children:s!=null&&s.data.supplier_id?(C=r.find(y=>y.id===s.data.supplier_id))==null?void 0:C.name:s==null?void 0:s.data.supplier_id},(s==null?void 0:s.id)+"supplier_id"),((S=u==null?void 0:u.role)==null?void 0:S.includes("admin"))&&e.jsx(g,{className:"px-5 py-3",children:Intl.NumberFormat("en-US",{style:"currency",currency:"PHP"}).format((s==null?void 0:s.data.capital_price)||0)},(s==null?void 0:s.id)+"capital_price"),e.jsx(g,{className:"px-5 py-3",children:s==null?void 0:s.data.unit},(s==null?void 0:s.id)+"unit"),e.jsx(g,{className:"px-5 py-3",children:s==null?void 0:s.data.stocks_count},(s==null?void 0:s.id)+"stocks_count"),e.jsx(g,{className:"px-5 py-3",children:s==null?void 0:s.data.damage_count},(s==null?void 0:s.id)+"damage_count"),e.jsx(g,{className:"px-5 py-3",children:s==null?void 0:s.data.total_count},(s==null?void 0:s.id)+"total_count"),e.jsx(g,{className:"px-5 py-3",children:s==null?void 0:s.data.approved_stocks},(s==null?void 0:s.id)+"approved_stocks")]},(s==null?void 0:s.id)+"row")})})]})]}),e.jsxs("div",{className:"flex w-full justify-between whitespace-nowrap pt-6",children:[x&&e.jsx("div",{className:"flex w-full flex-row items-center justify-start gap-4",children:e.jsx("p",{className:"text-sm font-bold text-red-600",children:x})}),e.jsx("div",{className:"ml-auto flex flex-row gap-4",children:e.jsx(ee,{type:"submit",fill:"green",disabled:a.length<=0||d,className:"max-w-fit flex-1 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50",onClick:s=>{s.preventDefault(),i()},children:a.length<=1?"Add item to inventory":`Add ${a.length} items to inventory`})})]})]})})},Ee={hidden:{opacity:0,x:"-100%"},animate:{opacity:1,x:"0%",transition:{duration:.3,ease:"easeInOut"}},exit:{opacity:0,x:"-100%",transition:{duration:.3,ease:"easeInOut"}}},Re={hidden:{opacity:0,x:"100%"},animate:{opacity:1,x:"0%",transition:{duration:.3,ease:"easeInOut"}},exit:{opacity:0,x:"100%",transition:{duration:.3,ease:"easeInOut"}}},qe=({inventoryId:a})=>{const{auth:c}=T(),{data:r,isLoading:l}=fe(),{suppliers:p,isFetching:f}=je(),{handleSubmit:u}=te(),[j,d]=m.useState([]),[o,x]=m.useState({});m.useEffect(()=>{d([])},[a]);const[n,i]=m.useState("main"),s=()=>{x({}),i(n==="main"?"form":"main")},b=v=>{x(v),i("form")},h=v=>{d(_=>_.filter(C=>C.id!==v))};return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx("div",{className:n==="main"?"ml-auto":"",children:e.jsx(A,{className:"flex flex-row items-center gap-2 bg-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-300 hover:text-gray-700",onClick:()=>{s()},children:e.jsxs(e.Fragment,{children:[n==="main"?e.jsx(Te,{size:20,strokeWidth:2.5}):e.jsx(H,{size:20,strokeWidth:2.5}),n==="main"?"Add an item":"Back"]})})}),e.jsx("div",{className:`relative max-h-[65vh] min-w-[650px] overflow-x-clip transition-all duration-300 
					${n==="form"?c.role==="admin"||c.role==="super_admin"?"h-[340px] min-h-[340px]":"h-[260px] min-h-[260px]":"h-[65vh] min-h-[415px]"}`,children:e.jsx(ve,{initial:!1,children:n==="main"?e.jsx(K.div,{variants:Ee,initial:"hidden",animate:"animate",exit:"exit",className:"absolute h-full w-full overflow-x-auto antialiased",children:e.jsx($e,{data:j,products:r,suppliers:p,handleEditItem:b,handleRemoveItem:h,handleSubmit:u})},"main"):e.jsx(K.div,{variants:Re,initial:"hidden",animate:"animate",exit:"exit",className:"absolute max-h-[642px] w-full p-1",children:e.jsx(Be,{setInventoryProductsQueue:d,inventoryId:a,products:r,productsLoading:l,suppliers:p,suppliersLoading:f,currentId:j.reduce((v,_)=>_.id>v?_.id:v,0),handleNavigation:s,selectedProduct:Object.keys(o).length?o:void 0})},"form")})})]})})},He=()=>{const{selectedInventory:a}=P();return e.jsxs("div",{className:"w-full space-y-4 rounded-lg border bg-white p-6",children:[e.jsx(Oe,{}),a&&e.jsx(qe,{inventoryId:a.id})]})},Qe=()=>{const{setActiveTab:a}=P();return e.jsxs("div",{className:"mx-auto flex w-full flex-row items-center gap-4",children:[e.jsx(z,{title:"Register Product Item",subtitle:"Create new unique product...",icon:e.jsx(ge,{size:20,strokeWidth:1.5,className:"h-16 w-16"}),onClick:()=>a("add_product")}),e.jsx(z,{title:"Inventory Product",subtitle:"Add existing products to inventory...",icon:e.jsx(be,{size:20,strokeWidth:1.5,className:"h-16 w-16"}),onClick:()=>a("select_inventory")})]})},Ge=({openModal:a})=>{const{data:c,isLoading:r}=ye(),l=()=>{a({},"add")};return e.jsx("div",{className:"max-h-full w-full flex-1 rounded-lg border border-black/10 bg-white",children:e.jsx(We,{columns:Pe,data:c.sort((p,f)=>f.id-p.id),filterWhat:"name",dataType:"Product",openModal:l,isLoading:r})})},Ue=()=>{const{activeTab:a,setActiveTab:c}=P(),r=se(),{isOpen:l,openModal:p,closeModal:f}=Me(),[u,j]=m.useState(""),d=(o,x)=>{p(),j(x)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex w-full flex-row items-start justify-between",children:[e.jsx("h1",{className:"text-3xl font-bold",children:"Add Product"}),e.jsxs(A,{className:"flex flex-row items-center gap-2 bg-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-300 hover:text-gray-700",onClick:()=>{a==="main"?r("/pos/add-order"):c("main")},children:[e.jsx(H,{size:20,strokeWidth:2.5}),a==="main"?"Go back":"Main menu"]})]}),(a==="main"||a===void 0)&&e.jsx(Qe,{}),a==="select_inventory"&&e.jsx(He,{})," ",a==="add_product"&&e.jsx(Ge,{openModal:d}),e.jsx("div",{children:e.jsx(Fe,{isOpen:l,onClose:f,title:u==="add"?"Add Product":"Edit Product",children:e.jsx(e.Fragment,{children:u==="add"&&e.jsx(ze,{onClose:f})})})})]})},Ze=()=>e.jsxs("div",{className:"flex h-screen w-screen flex-row",children:[e.jsx(ae,{}),e.jsx(Le,{children:e.jsxs(Ne,{children:[e.jsx("div",{className:"max-h-full w-full overflow-y-auto p-6 pt-12 text-slate-700",children:e.jsx("div",{className:"mx-auto max-w-[1024px] space-y-6",children:e.jsx(Ue,{})})}),e.jsx(_e,{})]})})]}),Ke=()=>{const{selectedWarehouse:a,setFilter:c,setSelectedWarehouse:r}=ke(),l=se();return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex h-screen w-screen flex-row",children:[e.jsx(ae,{}),e.jsx("div",{className:"max-h-full w-full overflow-y-auto p-6 pt-12 text-slate-700",children:e.jsxs("div",{className:"mx-auto max-w-[1024px] space-y-6",children:[e.jsxs("div",{className:"flex w-full flex-row items-start justify-between",children:[e.jsx("h1",{className:"text-3xl font-bold",children:"Select Warehouse to start selling"}),e.jsxs(A,{className:"flex flex-row items-center gap-2 bg-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-300 hover:text-gray-700",onClick:()=>{l(-3)},children:[e.jsx(H,{size:20,strokeWidth:2.5}),"Go Back"]})]}),e.jsxs("div",{className:"mx-auto flex w-full flex-row items-center gap-4",children:[e.jsx(z,{title:"Select CDO Warehouse",subtitle:"Cdo available products",icon:e.jsx(w,{size:20,strokeWidth:1.5,className:"h-16 w-16"}),onClick:()=>{r("CDO"),c({approval_status:"approved",active_status:"active",warehouse_id:1}),l("/pos/add-order")}}),e.jsx(z,{title:"Select Iligan Warehouse",subtitle:"Iligan available products",icon:e.jsx(w,{size:20,strokeWidth:1.5,className:"h-16 w-16"}),onClick:()=>{r("Iligan"),c({approval_status:"approved",active_status:"active",warehouse_id:2}),l("/pos/add-order")}})]})]})})]})})};export{Ze as AddProductPOSPage,Ke as SelectWarehousePos};
