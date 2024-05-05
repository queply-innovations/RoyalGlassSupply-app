import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { usePos } from '../../context/__test__/PosContext';
import { useState } from 'react';
import { formatCurrency } from '@/utils/FormatCurrency';
import { useInvoicePos } from '../../context/__test__/InvoicePosContext';

export const SearchProductItems = () => {
  const [search, setSearch] = useState('');
  const { sellableItems, fetchingProducts } = usePos();
  const {
    currentInvoiceItemsQueue,
    setCurrentInvoiceItemsQueue,
    invoiceItemsDatabase,
    setInvoiceItemsDatabase,
  } = useInvoicePos();
  return (
    <>
      <div className="relative z-20 pb-10">
        <div className="absolute box-content flex w-full ">
          <Command className="rounded-lg border p-1 shadow-md">
            <CommandInput
              value={search}
              onValueChange={setSearch}
              placeholder={
                fetchingProducts ? 'Loading Products' : 'Enter Product Name'
              }
              disabled={sellableItems.length === 0}
            />
            <CommandList className="">
              {!search ? null : (
                <>
                  {sellableItems
                    .filter(
                      stocks =>
                        stocks.inventory_product.approved_stocks >
                        (stocks.inventory_product.sold_count ?? 0),
                    )
                    .map((item, index) => {
                      const availableStocks =
                        item.inventory_product.approved_stocks -
                          item.inventory_product.sold_count ?? 0;
                      return (
                        <CommandItem
                          key={index}
                          onSelect={() => {
                            //Check if it exist in the currentInvoiceItemsQueue array
                            const selectedInvoiceItemIndex =
                              currentInvoiceItemsQueue.findIndex(
                                invoiceItem =>
                                  invoiceItem.inventory_product.product.id ===
                                  item.inventory_product.product.id,
                              );
                            //TODO create increment function
                            if (selectedInvoiceItemIndex !== -1) {
                              invoiceItemsDatabase[
                                selectedInvoiceItemIndex
                              ].quantity += 1;
                              setSearch('');
                            }

                            //If it doesn't exist, add it to the array
                            if (selectedInvoiceItemIndex === -1) {
                              setCurrentInvoiceItemsQueue([
                                ...currentInvoiceItemsQueue,
                                item,
                              ]);
                              setInvoiceItemsDatabase([
                                ...invoiceItemsDatabase,
                                {
                                  product_id: item.product.id,
                                  product_price_id:
                                    item.inventory_product.product_price.id,
                                  product_price:
                                    item.inventory_product.product_price.price,
                                  quantity: 1,
                                  unit: item.unit,
                                  // inventory_product:
                                  //    item.inventory_product,
                                  item_discount: 0,
                                  price: item.price,
                                  created_by: item.created_by,
                                  active_status: item.active_status,
                                  created_at: item.created_at,
                                  updated_at: item.updated_at,
                                  total_price: item.price, // TODO, total price should be quantity * product_price
                                  source_inventory: item.warehouse.id,
                                },
                              ]);
                              setSearch('');
                            }
                          }}
                          value={`${item.product.id} ${item.id} ${item.product.name} ${item.product.serial_no} ${item.product.brand} ${item.product.color}`}>
                          <div className="flex flex-1 flex-row justify-between">
                            <div className="flex flex-col gap-2">
                              <div className="flex flex-row gap-2">
                                <span className="font-bold">
                                  {item.product.name}
                                </span>
                                <span className="font-medium">
                                  {item.product.size?.replace('inch', '"')}
                                </span>
                              </div>
                              <div className="flex flex-row gap-1">
                                {item.product.brand ? (
                                  <span className="text-[12px]">
                                    ({item.product.brand})
                                  </span>
                                ) : (
                                  <span className="text-[12px]">
                                    (No Brand)
                                  </span>
                                )}

                                <span className="">• {item.product.color}</span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="font-bold ">
                                {formatCurrency(item.price)}
                              </span>
                              <span className="font-medium">
                                {availableStocks}{' '}
                                {availableStocks > 1 ? 'items' : 'item'}
                              </span>
                            </div>
                          </div>
                        </CommandItem>
                      );
                    })}
                </>
              )}
            </CommandList>
          </Command>
        </div>
      </div>
    </>
  );
};
