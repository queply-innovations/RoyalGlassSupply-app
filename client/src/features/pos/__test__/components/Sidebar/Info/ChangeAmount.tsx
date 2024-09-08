import { formatCurrency } from '@/utils/FormatCurrency';
import { PaidAmount } from './PaidAmount';
import { PaymentType } from './PaymentType';
import { useInvoicePos } from '../../../context/__test__/InvoicePosContext';

export const ChangeAmount = () => {
	const { currentInvoicePos } = useInvoicePos();

	return (
		<>
			<div className="flex w-full flex-col justify-between gap-2 border-t-2 border-dashed py-2">
				<PaymentType />
				{currentInvoicePos.payment_method !== 'purchase_order' && (
					<PaidAmount />
				)}

				<div className="flex flex-row justify-between">
					{(currentInvoicePos.change_amount ?? 0) < 0 ? (
						<span className="text-lg font-bold text-gray-700">
							Balance
						</span>
					) : (
						<span className="text-lg font-bold text-gray-700">
							Change
						</span>
					)}
					<span className="text-lg font-bold text-black">
						{formatCurrency(currentInvoicePos.change_amount ?? 0)}
					</span>
				</div>
			</div>
		</>
	);
};
