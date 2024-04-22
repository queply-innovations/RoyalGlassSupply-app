import { Label } from '@/components/ui/label';
import { useInvoice } from '@/features/invoice/__test__/context/InvoiceContext';
import { formatCurrency } from '@/utils/FormatCurrency';

export const DeliveryCharge = () => {
	const { invoiceItemsQueue, invoice, handleChange } = useInvoice();

	return (
		<>
			<div className="flex w-full flex-row justify-between">
				<Label className="text-medium font-medium text-slate-700">
					Delivery Charge
				</Label>
				<Label className="font-bold text-slate-700">
					{invoice.delivery_charge
						? formatCurrency(invoice.delivery_charge)
						: '₱0.00'}
				</Label>
			</div>
		</>
	);
};
