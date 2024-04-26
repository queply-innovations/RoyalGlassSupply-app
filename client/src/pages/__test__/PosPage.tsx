import { CreateOrderTable } from '@/features/pos/__test__/components';
import { Navbar } from '@/features/pos/__test__/components/Navbar/Navbar';
import { SearchProducts } from '@/features/pos/__test__/components/SearchProducts';
import {
   SidebarContainer,
   DialogContainer,
} from '@/features/pos/__test__/components/Sidebar/Container';

interface PointOfSalePageProps {}

export const PointOfSalePage = ({}: PointOfSalePageProps) => {
   return (
      <>
         <div className="flex flex-row">
            <Navbar />
            <div className="flex w-screen flex-row">
               <div className="flex flex-1 flex-col gap-6 p-6">
                  <SearchProducts />
                  <CreateOrderTable />
               </div>
               {/* <Sidebar /> */}
               <SidebarContainer />
               <DialogContainer />
            </div>
         </div>
      </>
   );
};
