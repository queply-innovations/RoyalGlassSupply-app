import { SearchCustomer } from '@/features/customer/__test__/components/SearchCustomer';
import { SidebarWarehouseContainer } from './SidebarWarehouseContainer';
import { CustomerInfoContainer } from './CustomerInfoContainer';
import { DialogButtonsContainer } from './DialogButtonsContainer';

export const SidebarContainer = () => {
   return (
      <>
         <div className="bg-pos-primary-background flex w-full max-w-[375px] flex-col gap-2 p-5">
            <div className="flex h-full flex-col rounded-md bg-white p-2 px-4">
               <SidebarWarehouseContainer />
               <SearchCustomer />
               <CustomerInfoContainer />
               <DialogButtonsContainer />
            </div>
         </div>
      </>
   );
};
