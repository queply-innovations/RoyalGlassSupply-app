import { Label } from '@/components/ui/label';
import { useInvoice } from '@/features/invoice/__test__/context/InvoiceContext';
import { formatCurrency } from '@/utils/FormatCurrency';

export const Tax = () => {
	const { invoiceItemsQueue, invoice, handleChange } = useInvoice();

	return (
		<>
			<div className="flex w-full flex-row justify-between">
				<Label className="text-medium font-medium text-slate-700">
					Tax
				</Label>
				<Label className="font-bold text-slate-700">
					{invoice.total_tax ? formatCurrency(invoice.total_tax) : '₱0.00'}
				</Label>
			</div>
		</>
	);
};
