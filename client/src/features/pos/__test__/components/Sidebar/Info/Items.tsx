import { Label } from '@/components/ui/label';
import { useInvoicePos } from '../../../context/__test__/InvoicePosContext';

export const Items = () => {
	const { cartItems } = useInvoicePos();
	return (
		<>
			<div className="flex w-full flex-row justify-between">
				<Label className="text-medium font-medium text-slate-700">
					Items
				</Label>
				<Label className="font-bold text-slate-700">
					{cartItems.length}
				</Label>
			</div>
		</>
	);
};
