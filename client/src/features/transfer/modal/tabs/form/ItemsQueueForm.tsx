import { FormEvent } from 'react';
import {
   ItemCapitalPrice,
   ItemStocksCount,
   SelectProducts,
} from './components';
import { Button as LegacyButton } from '@/components';

interface TransferItemsQueueFormProps {}

export const TransferItemsQueueForm = ({}: TransferItemsQueueFormProps) => {
   function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
   }
   return (
      <>
         <form onSubmit={handleSubmit}>
            <div className="flex w-full flex-col gap-3">
               <SelectProducts />
               <hr />
               <div className="flex flex-row justify-between gap-2">
                  <ItemCapitalPrice />
                  <ItemStocksCount />
               </div>
               <div className="flex justify-end">
                  <LegacyButton
                     type="submit"
                     fill={'green'}
                     disabled={true} // Disable button if no product/supplier selected
                     className="max-w-fit flex-1 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">
                     {`Add Item to Queue`}
                  </LegacyButton>
               </div>
            </div>
         </form>
      </>
   );
};
