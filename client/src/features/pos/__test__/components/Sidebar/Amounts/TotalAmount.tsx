import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/FormatCurrency';
import { Banknote } from 'lucide-react';
import { usePos } from '../../../context/PosContext';
import { useInvoice } from '@/features/invoice/__test__/context/InvoiceContext';
import { useEffect } from 'react';

export const TotalAmount = () => {
	const { invoiceItemsQueue, invoice, handleChange } = useInvoice();
	const totalAmount =
		invoiceItemsQueue.reduce((acc, item) => acc + item.total_price, 0) -
		(invoice.total_discount ?? 0);

	useEffect(() => {
		handleChange('total_amount_due', totalAmount);
	}, [totalAmount]);
	return (
		<>
			<Button
				variant="outline"
				className="justify-between hover:cursor-default"
			>
				<div className="flex flex-row items-center gap-2">
					<Banknote />
					<span>Total Amount</span>
				</div>
				<div>
					<span className="justify-between text-base">
						{totalAmount ? formatCurrency(totalAmount) : '₱0.00'}
					</span>
				</div>
			</Button>
		</>
	);
};
