import{j as e,bx as m,by as b,bz as t,bA as j,bB as u,bC as n}from"./index-bcc716ed.js";import{u as h,g as p,f as i}from"./index-a7bfa2b6.js";function y({columns:x,data:d,invoice:r}){var c;var o=0;r&&(o=d.reduce((l,s)=>(l+=s.total_price,l),0));const a=h({data:d,columns:x,getCoreRowModel:p(),defaultColumn:{size:200,minSize:50,maxSize:500}});return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"rounded-md border",children:e.jsxs(m,{children:[e.jsx(b,{children:a.getHeaderGroups().map(l=>e.jsx(t,{children:l.headers.map(s=>e.jsx(j,{style:{width:`${s.getSize()}px`},className:"{}",children:s.isPlaceholder?null:i(s.column.columnDef.header,s.getContext())},s.id))},l.id))}),e.jsxs(u,{children:[((c=a.getRowModel().rows)==null?void 0:c.length)&&a.getRowModel().rows.map(l=>e.jsx(t,{children:l.getVisibleCells().map(s=>e.jsx(n,{children:i(s.column.columnDef.cell,s.getContext())},s.id))},l.id)),r&&e.jsx(e.Fragment,{children:e.jsxs(t,{children:[e.jsx(n,{colSpan:3}),e.jsx(n,{colSpan:2,children:e.jsx("div",{className:"flex justify-center",children:e.jsxs("span",{className:"text-lg font-semibold",children:["Total: ",Intl.NumberFormat("en-US",{style:"currency",currency:"PHP"}).format(o)]})})},"total_cost")]})})]})]})}),r&&e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("hr",{className:"col-span-12 my-2 h-px w-full border-0 bg-gray-800"}),e.jsxs("div",{className:"flex flex-row text-base justify-between mx-10",children:[e.jsx("p",{children:"Issued by:"}),e.jsx("p",{children:"Prepared by:"}),e.jsx("p",{children:"Released/checked by:"})]})]})]})}export{y as P};