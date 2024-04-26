import { Button } from '@/components/ui/button';
import { Navbar } from '@/features/pos/__test__/components/Navbar/Navbar';
import { usePos } from '@/features/pos/__test__/context/__test__/PosContext';
import { ActionButton } from '@/features/pos/add-product/components';
import { ChevronLeft, Warehouse } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SelectWarehousePos = () => {
   const { setSearchFilterItems } = usePos();
   const navigate = useNavigate();

   return (
      <>
         <div className="flex flex-row w-screen h-screen">
            <Navbar />
            <div className="w-full max-h-full p-6 pt-12 overflow-y-auto text-slate-700">
               <div className="mx-auto max-w-[1024px] space-y-6">
                  <div className="flex flex-row items-start justify-between w-full">
                     <h1 className="text-3xl font-bold">
                        Select Warehouse to start selling
                     </h1>
                     <Button
                        className="flex flex-row items-center gap-2 text-sm font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"
                        onClick={() => {
                           navigate(-3);
                        }}>
                        <ChevronLeft size={20} strokeWidth={2.5} />
                        Go Back
                     </Button>
                  </div>
                  <div className="flex flex-row items-center w-full gap-4 mx-auto">
                     <ActionButton
                        title="Select CDO Warehouse"
                        subtitle="Cdo available products"
                        icon={
                           <Warehouse
                              size={20}
                              strokeWidth={1.5}
                              className="w-16 h-16"
                           />
                        }
                        onClick={() => {
                           setSearchFilterItems({
                              approval_status: 'approved', //TODO Possible to comment out
                              warehouse_id: 1,
                           });
                           navigate('/pos/add-order');
                        }}
                     />
                     <ActionButton
                        title="Select Iligan Warehouse"
                        subtitle="Iligan available products"
                        icon={
                           <Warehouse
                              size={20}
                              strokeWidth={1.5}
                              className="w-16 h-16"
                           />
                        }
                        onClick={() => {
                           setSearchFilterItems({
                              approval_status: 'approved', //TODO Possible to comment out
                              warehouse_id: 2,
                           });
                           navigate('/pos/add-order');
                        }}
                     />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};
