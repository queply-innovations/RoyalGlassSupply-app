import { Button } from '@/components/ui/button';
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
import { useAddProductPos } from '..';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Label } from '@/components/ui/label';

export const SelectInventory = () => {
	const { auth } = useAuth();
	const {
		inventories,
		isInventoriesLoading,
		selectedInventory,
		setSelectedInventory,
	} = useAddProductPos();
	// Filter inventories based on user role to show only inventories
	// that the user has access to.
	// Like 'encoder_ILI' => warehouse.code === 'ILI'
	const filteredInventories = inventories.filter(inventory =>
		auth?.role !== 'admin' && auth?.role !== 'super_admin'
			? inventory.warehouse.code.includes(auth?.role?.split('_')[1] ?? '')
			: inventories,
	);
	const sortedInventories = filteredInventories.sort((a, b) => {
		return (
			new Date(b.updated_at ?? b.created_at).getTime() -
			new Date(a.updated_at ?? a.created_at).getTime()
		);
	});

	const [inventoriesListOpen, setInventoriesListOpen] = useState(false);

	return (
		<div className="flex flex-col justify-center gap-1">
			<Label htmlFor="inventory" className="text-sm font-bold text-gray-600">
				Inventory
			</Label>
			<Popover
				open={inventoriesListOpen}
				onOpenChange={setInventoriesListOpen}
			>
				<PopoverTrigger
					id="inventory"
					name="inventory"
					className="relative w-full"
					asChild
				>
					<Button
						role="combobox"
						className="justify-between truncate bg-white text-sm font-bold text-slate-600"
						variant={'outline'}
					>
						{selectedInventory ? (
							<div className="flex items-center font-bold text-slate-600">
								{selectedInventory.code}
								<span className="ml-1 text-xs opacity-80">
									{' • ' +
										selectedInventory.type +
										' • ' +
										selectedInventory.date_received}
								</span>
							</div>
						) : (
							<span>Select an inventory...</span>
						)}

						<ChevronsUpDown
							size={14}
							strokeWidth={2}
							className="h-4 w-4 opacity-70"
						/>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[calc(100vw-170px)] max-w-[974px] p-0 text-sm font-medium text-slate-700">
					<Command defaultValue={selectedInventory?.code || ''}>
						<CommandInput placeholder="Inventory code..." />
						{isInventoriesLoading && (
							<div className="flex h-16 w-full items-center justify-center">
								<Loader2
									size={22}
									strokeWidth={2.5}
									className="animate-spin text-slate-700/50"
								/>
							</div>
						)}
						<CommandEmpty>No results found</CommandEmpty>
						<ScrollArea className="max-h-[200px] overflow-y-scroll">
							<CommandGroup>
								{sortedInventories &&
									sortedInventories.map(inventory => (
										<CommandItem
											key={inventory.id}
											className="cursor-pointer justify-between rounded-sm"
											value={inventory.code}
											onSelect={() => {
												setSelectedInventory(inventory);
												setInventoriesListOpen(false);
											}}
										>
											<span>{inventory.code}</span>
											<span className="text-xs font-semibold text-slate-600">
												{inventory.type +
													' • ' +
													inventory.date_received}
											</span>
										</CommandItem>
									))}
							</CommandGroup>
						</ScrollArea>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
};
