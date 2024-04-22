import { Label } from '@/components/ui/label';
import { useInvoice } from '@/features/invoice/__test__/context/InvoiceContext';
import { formatCurrency } from '@/utils/FormatCurrency';

export const PaidAmount = () => {
	const { invoice } = useInvoice();
	return (
		<>
			<div className="flex w-full flex-row justify-between">
				<Label className="text-medium font-medium text-slate-700">
					Payment
				</Label>
				<Label className="font-bold text-slate-700">
					{invoice.paid_amount
						? formatCurrency(invoice.paid_amount)
						: '₱0.00'}
				</Label>
			</div>
		</>
	);
};
