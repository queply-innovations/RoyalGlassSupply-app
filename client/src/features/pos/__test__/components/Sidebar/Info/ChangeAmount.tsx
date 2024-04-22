import { Label } from '@/components/ui/label';
import { useInvoice } from '@/features/invoice/__test__/context/InvoiceContext';
import { formatCurrency } from '@/utils/FormatCurrency';
import { PaidAmount } from './PaidAmount';
import { PaymentType } from './PaymentType';

export const ChangeAmount = () => {
	const { invoiceItemsQueue, invoice } = useInvoice();
	function getChange() {
		if (invoice.paid_amount === 0) {
			return 0;
		} else {
			return (
				(invoice.paid_amount ?? 0) -
				invoiceItemsQueue.reduce((acc, item) => acc + item.total_price, 0) +
				(invoice.total_discount ?? 0)
			);
		}
	}
	return (
		<>
			<div className="flex flex-col justify-between w-full gap-2 py-2 border-t border-dashed">
				<PaymentType />
				<PaidAmount />

				<div className="flex flex-row justify-between">
					<Label className="text-xl font-bold text-gray-700">Change</Label>
					<Label className="text-xl font-bold text-black">
						{formatCurrency(Number(getChange()))}
					</Label>
				</div>
			</div>
		</>
	);
};
