import { Label } from '@/components/ui/label';
import { useInvoice } from '@/features/invoice/__test__/context/InvoiceContext';

export const Items = () => {
	const { invoiceItemsQueue } = useInvoice();
	return (
		<>
			<div className="flex w-full flex-row justify-between">
				<Label className="text-medium font-medium text-slate-700">
					Item
				</Label>
				<Label className="font-bold text-slate-700">
					{invoiceItemsQueue.length > 0 ? (
						<>{invoiceItemsQueue.length} (items)</>
					) : (
						0
					)}
				</Label>
			</div>
		</>
	);
};
