import { Label } from '@/components/ui/label';
import { useInvoice } from '@/features/invoice/__test__/context/InvoiceContext';
import { formatCurrency } from '@/utils/FormatCurrency';

export const Discount = () => {
	const { invoiceItemsQueue, invoice, handleChange } = useInvoice();

	return (
		<>
			<div className="flex w-full flex-row justify-between">
				<Label className="text-medium font-medium text-slate-700">
					Discount
				</Label>
				<Label className="font-bold text-slate-700">
					{invoice.total_discount
						? formatCurrency(invoice.total_discount)
						: '₱0.00'}
				</Label>
			</div>
		</>
	);
};
