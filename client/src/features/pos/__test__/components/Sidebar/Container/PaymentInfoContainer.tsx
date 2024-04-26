import { ChangeAmount } from '../Amounts';
import {
   DeliveryCharge,
   Discount,
   Items,
   Subtotal,
   Tax,
   TotalAmountDue,
} from '../Info';

export const PaymentInfoContainer = () => {
   return (
      <>
         <div className="flex flex-col justify-between h-full p-4 px-2">
            <div className="flex flex-col gap-4">
               {/* <PaymentType /> */}
               <Items />
               <Subtotal />
               <Discount />
               <Tax />
               <DeliveryCharge />
               <TotalAmountDue />
               <ChangeAmount />
            </div>
         </div>
      </>
   );
};
