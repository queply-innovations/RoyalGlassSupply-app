import { ChangeAmount, PaidAmount, TotalAmount } from '../Amounts';
import { DiscountAmount } from '../Amounts/DiscountAmount';
import { PaymentType } from './PaymentType';

export const Payment = () => {
	return (
		<div className="flex flex-col gap-2">
			<PaymentType />
			<TotalAmount />
			<PaidAmount />
			<ChangeAmount />
			<DiscountAmount />
		</div>
	);
};
