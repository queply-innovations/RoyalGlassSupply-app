import { formatUTCMMDDYYYY } from '@/utils/timeUtils';
import { formatCurrency } from '@/utils/FormatCurrency';
import { useReturnInvoice } from '../../context/ReturnInvoiceContext';

export const ReturnInvoiceInfo = () => {
	const { selectedInvoice } = useReturnInvoice();
	const formattedPaymentMethod = (paymentMethod: string | undefined) => {
		if (paymentMethod) {
			return paymentMethod
				.split('_')
				.map(word => word.charAt(0).toUpperCase() + word.slice(1))
				.join(' ');
		}
		return '';
	};

	return (
		<>
			<div className="flex flex-row gap-4 text-sm">
				<div className="flex flex-col">
					<div>
						<span className="font-bold">Billed to: </span>
						<span className="font-medium">
							{selectedInvoice?.customer.firstname}{' '}
							{selectedInvoice?.customer.lastname}
						</span>
					</div>
					<div>
						<span className="font-bold">Date issued: </span>
						<span className="font-medium">
							{formatUTCMMDDYYYY(selectedInvoice?.created_at ?? '')}
						</span>
					</div>
				</div>

				<div className="flex flex-col">
					<div>
						<span className="font-bold">Delivery: </span>
						<span className="font-medium">
							{formatCurrency(selectedInvoice?.delivery_charge ?? 0)}
						</span>
					</div>
					<div>
						<span className="font-bold">Discount: </span>
						<span className="font-medium">
							{formatCurrency(selectedInvoice?.total_discount ?? 0)}
						</span>
					</div>
				</div>

				<div className="flex flex-col">
					<div>
						<span className="font-bold">Total due: </span>
						<span className="font-medium">
							{formatCurrency(selectedInvoice?.total_amount_due ?? 0)}
						</span>
					</div>
					<div>
						<span className="font-bold">Paid amount: </span>
						<span className="font-medium">
							{`${formatCurrency(selectedInvoice?.paid_amount ?? 0)} 
							(${formattedPaymentMethod(selectedInvoice?.payment_method)})`}
						</span>
					</div>
				</div>

				<div className="flex flex-col">
					<div>
						<span className="font-bold">Items: </span>
						<span className="font-medium">
							{
								//@ts-expect-error 'invoice_items' does not exist on type 'Invoice | undefined'
								selectedInvoice?.invoice_items.length ?? 0
							}
						</span>
					</div>
				</div>
			</div>
		</>
	);
};
