import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@/components/ui/popover';
import { ShoppingBasket } from 'lucide-react';
import { usePos } from '../../context/PosContext';
import { useInvoice } from '@/features/invoice/__test__/context/InvoiceContext';

export const TotalItems = () => {
	const { formatCurrency, invoiceItemsQueue } = useInvoice();
	const totalAmount = invoiceItemsQueue.reduce(
		(acc, item) => acc + item.total_price,
		0,
	);
	return (
		<div className="flex flex-col gap-2 ">
			<Popover>
				<PopoverTrigger asChild>
					<Button variant="outline" className="justify-between">
						<div className="flex flex-row items-center gap-2">
							<ShoppingBasket />
							<span>Total Items</span>
						</div>
						<div>
							<span className="justify-between text-base">
								{invoiceItemsQueue.length}
							</span>
						</div>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="">
					<div className="flex flex-col gap-1">
						<div>
							{invoiceItemsQueue.map((items, key) => {
								const formatSubtotal = items.total_price
									? Intl.NumberFormat('en-US', {
											style: 'currency',
											currency: 'PHP',
										}).format(items.total_price)
									: '';

								return (
									<div
										key={key}
										className="flex flex-row justify-between"
									>
										<div className="flex flex-row items-center gap-2">
											<div className="flex w-5 flex-row justify-between">
												<span className="text-sm">
													{items.quantity}
												</span>
												<span className="text-sm">x</span>
											</div>

											<span className="text-sm">
												{items.product_id.name}
											</span>
										</div>
										<span className="text-sm">{formatSubtotal}</span>
									</div>
								);
							})}
						</div>

						<div className="flex flex-row items-center justify-between">
							<span className="text-sm">Total Amount:</span>
							<span className="border-t border-t-slate-800 text-sm">
								{totalAmount ? formatCurrency(totalAmount) : '₱0.00'}
							</span>
						</div>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};
