import { Label } from '@/components/ui/label';
import { useInvoice } from '@/features/invoice/__test__/context/InvoiceContext';
import { formatCurrency } from '@/utils/FormatCurrency';

export const Subtotal = () => {
	const { invoice } = useInvoice();

	return (
		<>
			<div className="flex w-full flex-row justify-between">
				<Label className="text-medium font-medium text-slate-700">
					Subtotal
				</Label>
				<Label className="font-bold text-slate-700">
					{invoice.subtotal ? formatCurrency(invoice.subtotal) : '₱0.00'}
				</Label>
			</div>
		</>
	);
};
