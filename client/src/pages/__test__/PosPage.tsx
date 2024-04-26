import { Navbar } from '@/features/pos/__test__/components/Navbar/Navbar';
import { SidebarContainer } from '@/features/pos/__test__/components/Sidebar/Container';
import { Sidebar } from '@/features/pos/__test__/components/Sidebar/Sidebar';

interface PointOfSalePageProps {}

export const PointOfSalePage = ({}: PointOfSalePageProps) => {
   return (
      <>
         <div className="flex flex-row">
            <Navbar />
            <div id="main" className="flex w-screen flex-row">
               <div className="flex flex-1 flex-col gap-6 p-6">
                  {/* <SearchProducts /> */}
                  {/* <CreateOrderTable /> */}
               </div>
               {/* <Sidebar /> */}
               <SidebarContainer />
            </div>
         </div>
      </>
   );
};
