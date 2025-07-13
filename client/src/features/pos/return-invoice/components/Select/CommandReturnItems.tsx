import { CommandItem } from '@/components/ui/command';
// import { useReturnInvoiceItemsPos } from '../../context';
import { formatCurrency } from '@/utils/FormatCurrency';
import { useReturnInvoice } from '../../context/ReturnInvoiceContext';
import { ReturnInvoiceItems } from '@/features/invoice/__test__/types';

interface CommandReturnItemsProps {
	isOpen: (open: boolean) => void;
}

export const CommandReturnItems = ({ isOpen }: CommandReturnItemsProps) => {
	const {
		returnableItems,
		returnInvoice,
		setReturnInvoice,
		setSelectedItems,
	} = useReturnInvoice();

	return (
		<>
			{returnableItems.map((item, key) => (
				<CommandItem
					key={key}
					value={
						item.product.id +
						'_' +
						item.product.name +
						'_' +
						item.product.serial_no
					}
					className={`${returnInvoice.return_items ? (returnInvoice.return_items.find(prod => prod.invoice_item_id === item.id) ? 'hidden' : '') : ''}`}
					onSelect={() => {
						setSelectedItems(prev => [...prev, item]);
						const updatedItems = [
							...(returnInvoice.return_items || []),
							{
								invoice_item_id: item.id,
								quantity: 1, // Default quantity to return
								unit: item.unit,
								price: item.product_price,
								reason: 'return',
							},
						];
						setReturnInvoice(prev => ({
							...prev,
							return_items: updatedItems as ReturnInvoiceItems[],
						}));
						isOpen(false);
					}}
				>
					<div className="flex w-full flex-row justify-between">
						<div className="flex flex-row items-center gap-2">
							{item.product.brand && (
								<>
									<span className="text-sm text-slate-500">
										({item.product.brand})
									</span>
									•
								</>
							)}
							<span className="text-base font-bold">
								{item.product.name}
							</span>
							•
							<span className="text-sm capitalize text-slate-500">
								{item.product.size}
							</span>
							•
							<span className="text-sm capitalize text-slate-700">
								{item.product.color}
							</span>
						</div>
						<div className="flex flex-row gap-3">
							{item.quantity > 1 ? (
								<span>{item.quantity} pcs</span>
							) : (
								<span>{item.quantity} pc</span>
							)}
							<span className="font-bold">
								{
									//@ts-expect-error 'price' does not exist on type 'InvoiceItems'
									formatCurrency(item.product_price.price ?? 0)
								}
							</span>
						</div>
					</div>
				</CommandItem>
			))}
		</>
	);
};
