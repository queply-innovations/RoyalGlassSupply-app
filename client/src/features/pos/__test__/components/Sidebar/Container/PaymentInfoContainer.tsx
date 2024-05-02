import {
   DeliveryCharge,
   Discount,
   Items,
   Subtotal,
   Tax,
   TotalAmountDue,
   ChangeAmount,
} from '../Info';

export const PaymentInfoContainer = () => {
   return (
      <>
         <div className="flex h-full flex-col justify-between p-4 px-2">
            <div className="flex flex-col gap-4">
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
