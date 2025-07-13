import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/utils/FormatCurrency';
import { useInvoicePos } from '../../../context/__test__/InvoicePosContext';

export const TotalAmountDue = () => {
	const { currentInvoicePos } = useInvoicePos();
	const totalAmountDue = currentInvoicePos.total_amount_due;

	return (
		<>
			<div className="flex w-full flex-col justify-between gap-2 py-2">
				<div className="flex flex-row justify-between">
					<Label className="text-lg font-bold text-gray-700">Total</Label>
					<Label className="text-lg font-bold text-black">
						{formatCurrency(totalAmountDue ?? 0)}
					</Label>
				</div>
			</div>
		</>
	);
};
