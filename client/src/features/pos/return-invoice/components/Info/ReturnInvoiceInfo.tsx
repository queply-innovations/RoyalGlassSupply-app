import { formatUTCMMDDYYYY } from '@/utils/timeUtils';
import { useReturnInvoiceItemsPos } from '../../context/ReturnInvoiceItems';
import { formatCurrency } from '@/utils/FormatCurrency';
import { useReturnInvoice } from '../../context/ReturnInvoiceContext';

export const ReturnInvoiceInfo = () => {
	const { selectedInvoice } = useReturnInvoice();
	return (
		<>
			<div className="flex flex-row gap-4">
				<div className="flex flex-col">
					<div>
						<span className="font-bold">Customer: </span>
						<span className="font-medium capitalize">
							{selectedInvoice?.customer.firstname}{' '}
							{selectedInvoice?.customer.lastname}
						</span>
					</div>
					<div>
						<span className="font-bold">Created at: </span>
						<span className="font-medium capitalize">
							{formatUTCMMDDYYYY(selectedInvoice?.created_at ?? '')}
						</span>
					</div>
				</div>
				<div className="flex flex-col">
					<div>
						<span className="font-bold">Paid Amount: </span>
						<span className="font-medium capitalize">
							{formatCurrency(selectedInvoice?.paid_amount ?? 0)}
						</span>
					</div>
					<div>
						<span className="font-bold">Total Amount: </span>
						<span className="font-medium capitalize">
							{formatCurrency(selectedInvoice?.total_amount_due ?? 0)}
						</span>
					</div>
				</div>
				<div className="flex flex-col">
					<div>
						<span className="font-bold">Total Items: </span>
						<span className="font-medium capitalize">
							{selectedInvoice?.invoice_items.length}
						</span>
					</div>
				</div>
			</div>
		</>
	);
};
