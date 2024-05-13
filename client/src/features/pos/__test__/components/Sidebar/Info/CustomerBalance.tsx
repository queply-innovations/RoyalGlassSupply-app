import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/utils/FormatCurrency';
import { useCustomer } from '@/features/customer/__test__/context/CustomerContext';
import { useInvoicePos } from '../../../context/__test__/InvoicePosContext';
import { useEffect } from 'react';

export const CustomerBalance = () => {
	const { currentInvoicePos, setCurrentInvoicePos } = useInvoicePos();
	const { selectedCustomer } = useCustomer();

	useEffect(() => {
		if (currentInvoicePos.payment_method === 'balance_payment') {
			setCurrentInvoicePos({
				...currentInvoicePos,
				subtotal: selectedCustomer?.total_balance ?? 0,
				total_amount_due: selectedCustomer?.total_balance ?? 0,
			});
		}
	}, []);

	return (
		<>
			<div className="my-2 flex w-full flex-row justify-between">
				<Label className="text-medium font-medium text-slate-700">
					Remaining Balance
				</Label>
				<Label className="font-bold text-slate-700">
					{selectedCustomer?.total_balance
						? formatCurrency(selectedCustomer.total_balance ?? 0)
						: '₱0.00'}
				</Label>
			</div>
		</>
	);
};
