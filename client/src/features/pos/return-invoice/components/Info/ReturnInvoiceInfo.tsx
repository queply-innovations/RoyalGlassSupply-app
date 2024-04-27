import { formatUTCMMDDYYYY } from '@/utils/timeUtils';
import { useReturnInvoiceItemsPos } from '../../context/ReturnInvoiceItems';
import { formatCurrency } from '@/utils/FormatCurrency';

export const ReturnInvoiceInfo = () => {
	const { returnInvoiceItems } = useReturnInvoiceItemsPos();
	return (
		<>
			<div className="flex flex-row gap-4">
				<div className="flex flex-col">
					<div>
						<span className="font-bold">Customer: </span>
						<span className="font-medium capitalize">
							{returnInvoiceItems.customer.firstname}{' '}
							{returnInvoiceItems.customer.lastname}
						</span>
					</div>
					<div>
						<span className="font-bold">Created at: </span>
						<span className="font-medium capitalize">
							{formatUTCMMDDYYYY(returnInvoiceItems.created_at)}
						</span>
					</div>
				</div>
				<div className="flex flex-col">
					<div>
						<span className="font-bold">Paid Amount: </span>
						<span className="font-medium capitalize">
							{formatCurrency(returnInvoiceItems.paid_amount)}
						</span>
					</div>
					<div>
						<span className="font-bold">Total Amount: </span>
						<span className="font-medium capitalize">
							{formatCurrency(returnInvoiceItems.total_amount_due)}
						</span>
					</div>
				</div>
				<div className="flex flex-col">
					<div>
						<span className="font-bold">Total Items: </span>
						<span className="font-medium capitalize">
							{returnInvoiceItems.invoice_items.length}
						</span>
					</div>
				</div>
			</div>
		</>
	);
};
