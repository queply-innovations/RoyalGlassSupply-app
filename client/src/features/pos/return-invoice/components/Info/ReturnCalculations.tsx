import { useReturnInvoice } from '../../context/ReturnInvoiceContext';

export const ReturnCalculations = () => {
	const { returnInvoice } = useReturnInvoice();

	return (
		<div className="flex w-full flex-row justify-end gap-8 border-t px-4 pt-2 text-base">
			{returnInvoice.return_items && (
				<h3 className="space-x-2">
					<span className="font-medium">Total items:</span>
					<span className="font-bold">
						{returnInvoice.return_items.length}
					</span>
				</h3>
			)}
			{!!returnInvoice.refundable_amount && (
				<h3 className="space-x-2">
					<span className="font-medium">Refundable amount:</span>
					<span className="font-bold">
						{Intl.NumberFormat('en-PH', {
							style: 'currency',
							currency: 'PHP',
						}).format(returnInvoice.refundable_amount)}
					</span>
				</h3>
			)}
		</div>
	);
};
