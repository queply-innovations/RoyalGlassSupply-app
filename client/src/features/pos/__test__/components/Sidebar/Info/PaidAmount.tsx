import { Label } from '@/components/ui/label';
import { useInvoice } from '@/features/invoice/__test__/context/InvoiceContext';
import { formatCurrency } from '@/utils/FormatCurrency';

export const PaidAmount = () => {
	const { invoice } = useInvoice();
	return (
		<>
			<div className="flex flex-row justify-between w-full">
				<Label className="font-medium text-medium text-slate-700">
					Paid Amount
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
