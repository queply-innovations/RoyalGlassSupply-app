import { useInvoicePos } from '../../../context/__test__/InvoicePosContext';
import {
	DeliveryCharge,
	Discount,
	Items,
	Subtotal,
	TotalAmountDue,
	ChangeAmount,
	CustomerBalance,
} from '../Info';

export const PaymentInfoContainer = () => {
	const { currentInvoicePos } = useInvoicePos();

	return (
		<>
			<div className="flex h-full flex-col justify-between p-4 px-2">
				<div className="flex flex-col gap-2">
					{currentInvoicePos.payment_method !== 'balance_payment' ? (
						<>
							<Items />
							<Subtotal />
							<Discount />
							<DeliveryCharge />
							<TotalAmountDue />
							<ChangeAmount />
						</>
					) : (
						<>
							<CustomerBalance />
							<ChangeAmount />
						</>
					)}
				</div>
			</div>
		</>
	);
};
