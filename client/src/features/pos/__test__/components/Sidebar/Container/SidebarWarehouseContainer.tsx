import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Warehouse } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePos } from '../../../context/__test__/PosContext';

export const SidebarWarehouseContainer = () => {
   const { auth } = useAuth();
   const { searchFilterItems } = usePos();
   const navigate = useNavigate();
   return (
      <>
         <div>
            {auth.role === 'admin' ? (
               <>
                  <div className="flex flex-row items-center justify-between px-2 py-4 ">
                     <span className="flex flex-col font-bold text-slate-700">
                        Warehouse{' '}
                        <span className="font-medium text-slate-800">
                           {searchFilterItems.warehouse_id === 1
                              ? 'Cagayan De Oro'
                              : 'Iligan'}
                        </span>
                     </span>
                     <Button
                        onClick={() => {
                           navigate('/pos');
                        }}
                        size={'icon'}>
                        <Warehouse size={18} />
                     </Button>
                  </div>
               </>
            ) : (
               <>
                  <div className="flex flex-row justify-between p-2 bg-white">
                     <div className="flex flex-col">
                        <span className="flex flex-row items-center gap-2 font-bold uppercase text-slate-800">
                           {searchFilterItems.warehouse_id === 1
                              ? 'Cagayan De Oro Branch'
                              : 'Iligan Branch'}
                        </span>
                        <span className="font-medium capitalize text-slate-900">
                           {auth.user.firstname + ' ' + auth.user.lastname}
                        </span>
                     </div>
                     <Button className="hover:cursor-default" size={'icon'}>
                        <Warehouse size={18} />
                     </Button>
                  </div>
               </>
            )}
         </div>
      </>
   );
};
