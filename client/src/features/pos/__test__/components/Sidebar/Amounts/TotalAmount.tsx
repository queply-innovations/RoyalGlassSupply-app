import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/FormatCurrency';
import { Banknote } from 'lucide-react';
import { usePos } from '../../../context/PosContext';

export const TotalAmount = () => {
	const { order } = usePos();
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
						{order.totalAmount ? (
							formatCurrency(order.totalAmount)
						) : (
							<span>₱0.00</span>
						)}
					</span>
				</div>
			</Button>
		</>
	);
};
