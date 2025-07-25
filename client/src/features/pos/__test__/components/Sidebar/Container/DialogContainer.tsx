import { usePos } from '../../../context/__test__/PosContext';
import {
	AddDeliveryChargeDialog,
	AddDiscountDialog,
	AddPaidAmount,
	CheckoutDialog,
	PaymentTypeDialog,
	CheckoutDiscount,
} from '../Dialog';

export const DialogContainer = () => {
	const { dialogOptions } = usePos();
	return (
		<>
			{dialogOptions.title === 'payment_type' && <PaymentTypeDialog />}
			{dialogOptions.title === 'discount' && <AddDiscountDialog />}
			{dialogOptions.title === 'paid_amount' && <AddPaidAmount />}
			{dialogOptions.title === 'checkout' && <CheckoutDialog />}
			{dialogOptions.title === 'checkout_discount' && <CheckoutDiscount />}
			{dialogOptions.title === 'delivery_charge' && (
				<AddDeliveryChargeDialog />
			)}
		</>
	);
};
