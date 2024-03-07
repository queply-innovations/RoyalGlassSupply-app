import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@/components/ui/popover';
import { usePos } from '../../context/PosContext';
import { Button } from '@/components/ui/button';
import { ShoppingBasket } from 'lucide-react';

interface SidebarProps {}

export const Sidebar = ({}: SidebarProps) => {
	const { order, selectedProducts } = usePos();
	const formatted = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'PHP',
	}).format(order.totalAmount);

	return (
		<div className="bg-pos-primary-background flex w-full max-w-[350px] flex-col">
			<div className="flex flex-col p-4">
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="outline" className="justify-between">
							<div className="flex flex-row items-center gap-2">
								<ShoppingBasket />
								<span>Total Items</span>
							</div>
							<div>
								<span className="justify-between text-base">
									{order.totalItems}
								</span>
							</div>
						</Button>
					</PopoverTrigger>
					<PopoverContent className="">
						<div className="flex flex-col gap-1">
							<div>
								{selectedProducts.map((items, key) => {
									const formatSubtotal = items.subtotal
										? Intl.NumberFormat('en-US', {
												style: 'currency',
												currency: 'PHP',
											}).format(items.subtotal)
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
													{items.product.product?.name}
												</span>
											</div>
											<span className="text-sm">
												{formatSubtotal}
											</span>
										</div>
									);
								})}
							</div>

							<div className="flex flex-row items-center justify-between">
								<span className="text-sm">Total Amount:</span>
								<span className="border-t border-t-slate-800 text-sm">
									{order.totalAmount ? formatted : `—`}
								</span>
							</div>
						</div>
					</PopoverContent>
				</Popover>
			</div>
			<div className="flex flex-col p-4">
				<span className="text-white">
					Total Amount: {order.totalAmount ? formatted : `—`}
				</span>
			</div>
		</div>
	);
};
