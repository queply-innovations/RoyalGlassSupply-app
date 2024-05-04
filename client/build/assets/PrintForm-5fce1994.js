import{cG as f,j as e,r as i}from"./index-8efc810c.js";import{P as p}from"./PosTable-7064da4b.js";import"./index-04af4c37.js";const h=({queue:n,itemsDatabase:l})=>{const{data:c,isLoading:x}=f();function o(s){return new Intl.NumberFormat("en-US",{style:"currency",currency:"PHP"}).format(s)}const u=[{accessorKey:"quantity",header:()=>e.jsx("div",{className:"flex justify-center",children:"Quantity"}),cell:({row:s})=>{const a=s.original.id,r=l.find(t=>t.product_price_id===a);return e.jsx("div",{className:"flex justify-center ",children:e.jsx("div",{className:"flex flex-row border drop-shadow-sm",children:r.quantity})})}},{accessorKey:"name",header:()=>e.jsx("div",{className:"justify-center",children:"Product Name"}),cell:({row:s})=>e.jsxs("div",{className:"flex flex-row gap-2",children:[e.jsx("span",{className:"text-sm font-bold",children:s.original.product.name}),s.original.product.brand?e.jsxs("span",{className:"text-sm",children:["(",s.original.product.brand,")"]}):null,e.jsx("span",{className:"text-[12px]",children:s.original.product.size}),s.original.product.color]})},{accessorKey:"price",header:()=>e.jsx("div",{className:"justify-center",children:"Unit Cost"}),cell:({row:s})=>{const a=s.original.id,r=l.find(m=>m.product_price_id===a),t=c.find(m=>m.product.id===s.original.product.id);return e.jsxs("div",{className:"flex flex-row gap-2",children:[e.jsx("span",{children:o(r.product_price)}),t!=null&&t.sale_discount?e.jsxs("span",{className:"text-sm font-light",children:["(",o((t==null?void 0:t.sale_discount)??0),")"]}):null]})}},{id:"total_price",accessorKey:"total_price",header:()=>e.jsx("div",{className:"justify-center",children:"Price"}),cell:({row:s})=>{const a=s.original.id,r=l.find(t=>t.product_price_id===a);return e.jsx("div",{className:"",children:e.jsx("span",{children:o(r.total_price)})})},size:250}];var d=0;return d=l.reduce((s,a)=>(s+=a.total_price,s),0),e.jsx(e.Fragment,{children:e.jsx(p,{data:n,columns:u,invoice:!0,total:d})})},y=({})=>{const[n,l]=i.useState(),[c,x]=i.useState(),[o,u]=i.useState(),[d,s]=i.useState(),[a,r]=i.useState();return console.log(window.api.receive()),i.useEffect(()=>{async function t(){x(await window.api.receive())}t()},[]),i.useEffect(()=>{c&&(l(c.fullData),u(new Date(c.fullData.updated_at)),s(c.invoiceItems),r(c.invoiceItemsDatabase))},[c]),e.jsx(e.Fragment,{children:n&&d&&o&&e.jsx("div",{className:"flex h-full w-screen flex-col p-3",children:e.jsxs("div",{className:"overflow-x-hidden",children:[e.jsxs("div",{className:"text-base",children:["Date: ",e.jsx("span",{className:"font-bold",children:o.toLocaleDateString([],{year:"numeric",month:"long",day:"numeric"})}),e.jsx("br",{}),"Invoice number: ",e.jsxs("span",{className:"font-bold",children:[" ",n.code," "]}),e.jsx("br",{}),"Customer name: ",e.jsx("span",{className:"font-bold",children:n.customer.firstname+" "+n.customer.lastname})]}),e.jsx("div",{className:"flex flex-1 flex-col gap-6 p-6",children:e.jsx(h,{queue:d,itemsDatabase:a})})]})})})};export{y as PrintForm};
