import { useState } from 'react';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronsUpDown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Button as LegacyButton } from '@/components';
import { Product } from '../../types';

interface AddProdPriceProdTabProps {
	products: Product[];
	selectedProduct: Product;
	setSelectedProduct: (product: Product) => void;
	isLoading: boolean;
	setOpenedTab: React.Dispatch<React.SetStateAction<string>>;
	onClose: () => void;
}

export const AddProdPriceProdsTab = ({
	products,
	selectedProduct,
	setSelectedProduct,
	isLoading,
	setOpenedTab,
	onClose,
}: AddProdPriceProdTabProps) => {
	const [productsListOpen, setProductsListOpen] = useState(false);
	return (
		<div className="w-full">
			<p className="text-sm font-medium text-slate-700">
				Choose a product to add a listing for:
			</p>
			<Popover open={productsListOpen} onOpenChange={setProductsListOpen}>
				<PopoverTrigger className="relative my-2 w-full" asChild>
					<Button
						role="combobox"
						className="w-full justify-between text-sm font-bold text-slate-700"
						variant={'outline'}
					>
						{selectedProduct.name ? (
							<div className="flex items-baseline gap-4">
								<span>{selectedProduct.name}</span>
								<span className="font-baseline text-xs text-slate-700/50">
									{selectedProduct.serial_no}
								</span>{' '}
							</div>
						) : (
							<span>Select a product...</span>
						)}

						<ChevronsUpDown
							size={14}
							strokeWidth={2}
							className="h-4 w-4 opacity-70"
						/>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[672px] p-0 text-sm font-medium text-slate-700">
					<Command>
						<CommandInput placeholder="Product name or serial number..." />
						{isLoading && (
							<div className="flex h-16 w-full items-center justify-center">
								<Loader2
									size={22}
									strokeWidth={2.5}
									className="animate-spin text-slate-700/50"
								/>
							</div>
						)}
						<CommandEmpty>No match found</CommandEmpty>
						<ScrollArea className="max-h-[200px] overflow-y-scroll">
							<CommandGroup>
								{products.map((product, key) => (
									<CommandItem
										key={key}
										className="cursor-pointer justify-between rounded-sm"
										onSelect={() => {
											setSelectedProduct(product);
											setProductsListOpen(false);
										}}
									>
										<span>{product.name}</span>
										<span className="text-xs font-semibold text-slate-700/50">
											{product.serial_no}
										</span>
									</CommandItem>
								))}
							</CommandGroup>
						</ScrollArea>
					</Command>
				</PopoverContent>
			</Popover>
			{selectedProduct.id && (
				<div className="mt-4 grid grid-flow-row grid-cols-3 gap-4 text-sm text-slate-700">
					<div className="flex flex-col gap-1">
						<h3 className="font-bold">Serial Number</h3>
						<p className="font-medium">{selectedProduct.serial_no}</p>
					</div>
					<div className="flex flex-col gap-1">
						<h3 className="font-bold">Size</h3>
						<p className="font-medium">{selectedProduct.size}</p>
					</div>
					<div className="flex flex-col gap-1">
						<h3 className="font-bold">Color</h3>
						<p className="font-medium">{selectedProduct.color}</p>
					</div>
					<div className="col-span-3 flex flex-col gap-1">
						<h3 className="font-bold">Notes</h3>
						<p className="font-medium">{selectedProduct.notes}</p>
					</div>
				</div>
			)}
			<div className="flex w-full justify-between whitespace-nowrap pt-4">
				<div className="ml-auto flex flex-row gap-4">
					<LegacyButton
						fill={'default'}
						onClick={() => onClose()}
						className="flex-1 py-2 text-sm font-bold text-slate-700 hover:text-white"
					>
						Cancel
					</LegacyButton>
					<LegacyButton
						fill={'green'}
						disabled={!selectedProduct.id}
						onClick={() => setOpenedTab('listings')}
						className={`flex-1 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50`}
					>
						Proceed
					</LegacyButton>
				</div>
			</div>
		</div>
	);
};
