import{r as a,j as e}from"./index-8efc810c.js";import{P as h}from"./PosTable-7064da4b.js";import"./index-04af4c37.js";const N=({})=>{function c(s){return new Intl.NumberFormat("en-US",{style:"currency",currency:"PHP"}).format(s)}const[r,l]=a.useState(),[o,i]=a.useState(),[t,d]=a.useState(),[n,f]=a.useState(),[x,u]=a.useState(!1);a.useEffect(()=>{async function s(){l(await window.api.transferRec())}s()},[]),a.useEffect(()=>{r&&(console.log(r),d(r.transfer),f(r.products),i(new Date(r.transfer.created_at)))},[r]),a.useEffect(()=>{console.log(n),n&&n.length>0&&u(!0)},[n]);const m=[{accessorKey:"quantity",header:()=>e.jsx("div",{className:"flex justify-center",children:"Quantity"}),cell:({row:s})=>e.jsx("div",{className:"flex justify-center ",children:e.jsx("div",{className:"flex flex-row border drop-shadow-sm",children:s.original.total_quantity})})},{accessorKey:"name",header:()=>e.jsx("div",{className:"justify-center",children:"Product Name"}),cell:({row:s})=>e.jsxs("div",{className:"flex flex-row gap-2",children:[e.jsx("span",{className:"text-sm font-bold",children:s.original.product.name}),e.jsx("span",{className:"text-[12px]",children:s.original.product.size}),s.original.product.color]})},{accessorKey:"price",header:()=>e.jsx("div",{className:"justify-center",children:"Unit Cost"}),cell:({row:s})=>e.jsx("div",{className:"flex flex-row gap-2",children:e.jsx("span",{children:c(s.original.capital_price)})})}];return e.jsx(e.Fragment,{children:x&&e.jsx("div",{className:"flex h-full w-screen flex-col p-3",children:e.jsxs("div",{className:"overflow-x-hidden",children:[e.jsxs("div",{className:"text-base",children:["Date created: ",e.jsx("span",{className:"font-bold",children:o.toLocaleDateString([],{year:"numeric",month:"long",day:"numeric"})}),e.jsx("br",{}),"Transfer code: ",e.jsx("span",{className:"font-bold",children:t.code}),e.jsx("br",{}),"Created by: ",e.jsx("span",{className:"font-bold",children:t.created_by.firstname+" "+t.created_by.lastname}),e.jsx("br",{}),"Source: ",e.jsx("span",{className:"font-bold",children:t.source.name}),e.jsx("br",{}),"Destination: ",e.jsx("span",{className:"font-bold",children:t.destination.name})]}),e.jsx("div",{className:"flex flex-1 flex-col gap-6 p-6",children:e.jsx(h,{data:n,columns:m,invoice:!0})})]})})})};export{N as TransferProductsPrintTable,N as default};
