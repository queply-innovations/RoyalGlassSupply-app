import { Button } from '@/components/ui/button';

import { useInvoice } from '@/features/invoice/__test__/context/InvoiceContext';
import { formatCurrency } from '@/utils/FormatCurrency';
import { HandCoins } from 'lucide-react';
import { usePos } from '../../../context/PosContext';

export const ChangeAmount = () => {
	const { order } = usePos();
	const { invoice } = useInvoice();

	function getChange() {
		if (invoice.paid_amount === 0) {
			return 0;
		} else {
			return (invoice.paid_amount ?? 0) - order.totalAmount;
		}
	}
	return (
		<>
			<Button
				variant="outline"
				className="justify-between hover:cursor-default hover:bg-white"
			>
				<div className="flex flex-row items-center gap-2">
					<HandCoins />
					<span>Change</span>
				</div>
				<div>
					<span className="justify-between text-base">
						{formatCurrency(Number(getChange()))}
					</span>
				</div>
			</Button>
		</>
	);
};
