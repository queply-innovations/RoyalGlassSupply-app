import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useReturnInvoice } from '../../context/ReturnInvoiceContext';

export const CashRefundCheckbox = () => {
	const { returnInvoice, setReturnInvoice } = useReturnInvoice();

	return (
		<div className="flex flex-row items-center gap-2">
			<Checkbox
				id="cash-refund"
				checked={Boolean(returnInvoice.is_cash_refund)}
				onCheckedChange={value => {
					setReturnInvoice(prevState => {
						return { ...prevState, is_cash_refund: Number(value) };
					});
				}}
			/>
			<Label htmlFor="cash-refund">Cash refund</Label>
		</div>
	);
};
