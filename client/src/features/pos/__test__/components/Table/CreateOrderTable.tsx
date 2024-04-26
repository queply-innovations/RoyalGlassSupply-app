import { ColumnDef } from '@tanstack/react-table';
import { PosTable } from './PosTable';
import { TablePlacholder } from './EmptyPlaceholder';
import { useInvoice } from '@/features/invoice/__test__/context/InvoiceContext';
import { InvoiceItemDatabase } from '@/features/invoice/__test__/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useInventoryProds } from '@/features/inventory/context';
import { Trash2Icon } from 'lucide-react';
import { useProductPrices } from '@/features/product/__test__';
import { useEffect } from 'react';
import { useInvoicePos } from '../../context/__test__/InvoicePosContext';
import { formatCurrency } from '@/utils/FormatCurrency';
import { ProductPrices } from '@/features/product/__test__/types';

interface CreateOrderTableProps {}

export const CreateOrderTable = ({}: CreateOrderTableProps) => {
   // const {
   // 	invoiceItemsQueue,
   // 	quantityHandler,
   // 	formatCurrency,
   // 	handleInvoiceItemsChange,
   // 	handleRemoveInvoiceItem,
   // 	handleChange,
   // } = useInvoice();
   const {
      currentInvoiceItemsQueue,
      handleInvoicePosChange,
      handleInvoiceItemQuantiy,
      removeInvoiceItem,
   } = useInvoicePos();
   // const { data: inventoryProducts } = useInventoryProds();
   // const { data: productPrices } = useProductPrices();
   console.log();
   useEffect(() => {
      handleInvoicePosChange(
         'subtotal',
         currentInvoiceItemsQueue.reduce(
            (acc, currentItem) => acc + currentItem.total_price,
            0,
         ),
      );
   }, [currentInvoiceItemsQueue]);

   const CreateOrderTableHeader: ColumnDef<InvoiceItemDatabase>[] = [
      {
         id: 'orderItem',
         enableResizing: false,
         header: () => {
            return <div className="flex justify-center">Item #</div>;
         },
         // <div className="flex justify-center">Item #</div>,
         cell: ({ row }) => {
            return <div className="flex justify-center">{row.index + 1}</div>;
         },
         size: 100,
      },
      {
         accessorKey: 'name',
         header: () => <div className="justify-center">Product</div>,
         cell: ({ row }) => {
            return (
               <div className="flex flex-col">
                  <div className="flex flex-row gap-2">
                     <span className="text-sm font-bold">
                        {row.original.product.name}
                     </span>

                     <span className="font-medium">
                        {row.original.product.size}
                     </span>
                  </div>
                  <div className="flex flex-row items-center gap-1">
                     {row.original.product.brand ? (
                        <span className="">{row.original.product.brand}</span>
                     ) : (
                        <span className="font-light">(No Brand)</span>
                     )}
                     <span className="">• {row.original.product.color}</span>
                  </div>
               </div>
            );
         },
         size: 350,
      },
      {
         accessorKey: 'quantity',
         header: () => <div className="flex justify-center">Quantity</div>,
         size: 150,
         cell: ({ row }) => {
            const productIndex = row.index;
            // const productInfo = inventoryProducts.find(
            // 	inventory => inventory.product.id === row.original.product_id.id,
            // );
            // console.log(
            // 	'Remaining Stocks:',
            // 	productInfo?.remaining_stocks_count,
            // 	'FOR:',
            // 	row.original.product_id.id,
            // 	'Product Name:',
            // 	row.original.product_id.name,
            // );
            const availableStocks =
               row.original.approved_stocks - row.original.sold_count ?? 0;
            return (
               <div className="flex justify-center ">
                  <div className="flex flex-row border drop-shadow-sm">
                     <Button
                        className="rounded-sm bg-red-300 hover:bg-red-500 disabled:opacity-100"
                        onClick={() => {
                           handleInvoiceItemQuantiy(
                              productIndex,
                              row.original.quantity - 1,
                              availableStocks,
                           );
                        }}
                        disabled={row.original.quantity <= 1 ? true : false}>
                        <span>-</span>
                     </Button>
                     <Input
                        id="quantity"
                        className="w-20 rounded-none text-center drop-shadow-none"
                        type="number"
                        value={row.original.quantity || ''}
                        onBlur={e => {
                           handleInvoiceItemQuantiy(
                              productIndex,
                              Number(e.target.value),
                              availableStocks,
                           );
                        }}
                        onChange={e => {
                           //TODO - rerenders after input loses focus
                           e.target.value;
                        }}
                        disabled={availableStocks ? false : true}
                     />
                     <Button
                        className="rounded-sm bg-slate-500 hover:bg-slate-700 disabled:bg-slate-200"
                        onClick={() => {
                           handleInvoiceItemQuantiy(
                              productIndex,
                              row.original.quantity + 1,
                              availableStocks,
                           );
                        }}
                        disabled={row.original.quantity >= availableStocks}>
                        <span>+</span>
                     </Button>
                  </div>
               </div>
            );
         },
      },
      {
         accessorKey: 'price',
         header: () => <div className="justify-center">Product Price</div>,
         cell: ({ row }) => {
            return (
               <div className="flex flex-row gap-2">
                  <span>{formatCurrency(row.original.product_price)}</span>
                  {row.original.on_sale ? (
                     <span className="text-sm font-light">
                        ({formatCurrency(row.original.sale_discount ?? 0)})
                     </span>
                  ) : null}
               </div>
            );
         },
      },
      //TODO - Comment out this part, not needed for now
      // {
      // 	accessorKey: 'item_discount',
      // 	header: () => <div className="justify-center">Item Discount</div>,
      // 	cell: ({ row }) => {
      // 		return (
      // 			<div key={row.index}>
      // 				<Input
      // 					id="item_discount"
      // 					value={row.original.item_discount}
      // 					type="number"
      // 					onChange={e => {
      // 						//TODO - Fix this part, rerenders when adding input loses out of focus after input
      // 						handleInvoiceItemsChange(
      // 							row.index,
      // 							'item_discount',
      // 							Number(e.target.value),
      // 						);
      // 					}}
      // 				/>
      // 			</div>
      // 		);
      // 	},
      // },
      {
         id: 'total_price',
         accessorKey: 'total_price',
         header: () => <div className="justify-center">Subtotal</div>,
         cell: ({ row }) => (
            <div className="">
               <span>
                  {formatCurrency(
                     row.original.total_price * row.original.quantity,
                  )}
               </span>
            </div>
         ),
         size: 250,
      },
      {
         id: 'actions',
         size: 100,
         cell: ({ row }) => {
            const invoiceIndex = row.index;
            return (
               <div className="flex flex-row justify-center text-xs font-normal uppercase">
                  <Button
                     className="bg-red-500 hover:bg-red-700"
                     onClick={() => {
                        removeInvoiceItem(invoiceIndex);
                     }}>
                     <Trash2Icon color="#FFF" />
                  </Button>
               </div>
            );
         },
      },
   ];
   return (
      <>
         {currentInvoiceItemsQueue.length === 0 ? (
            <>
               <TablePlacholder />
            </>
         ) : (
            <PosTable
               data={currentInvoiceItemsQueue}
               columns={CreateOrderTableHeader}
            />
         )}
      </>
   );
};
