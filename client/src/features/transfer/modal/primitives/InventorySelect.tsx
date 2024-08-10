import { useNewTransfer } from '../../context/NewTransferContext';
import { Check, ChevronsUpDown } from 'lucide-react';
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
import { useState } from 'react';
import { Label } from '@/components/ui/label';

interface InventorySelectProps {
	tabState: 'details' | 'items';
	from?: 'source' | 'destination';
}

export const InventorySelect = ({ tabState, from }: InventorySelectProps) => {
	const {
		inventoriesList,
		inventoriesLoading,
		selectedInventory,
		setSelectedInventory,
		newTransfer,
		setNewTransfer,
	} = useNewTransfer();
	const [open, setOpen] = useState(false);

	return (
		<div
			className={`${tabState === 'details' ? 'col-span-11' : 'col-span-8'} flex flex-col gap-1`}
		>
			<Label
				htmlFor="inventory"
				className="text-sm font-bold capitalize text-slate-800"
			>
				Inventory {from}
			</Label>

			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						id="inventory"
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="justify-between"
						disabled={
							newTransfer.source === undefined ||
							inventoriesLoading[from!] ||
							tabState === 'items'
						}
					>
						{inventoriesLoading[from!]
							? 'Loading...'
							: selectedInventory[from!]
								? inventoriesList[from!]?.find(
										inventory =>
											inventory.id === selectedInventory[from!]?.id,
									)?.code
								: 'Select inventory...'}
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="max-h-[300px] w-[568px] overflow-auto p-0">
					<Command
						defaultValue={selectedInventory[from!]?.id.toString() ?? ''}
					>
						<CommandInput
							placeholder="Search inventory..."
							className="text-sm font-medium"
						/>
						<CommandEmpty className="p-4 text-center text-sm font-medium">
							No inventory found.
						</CommandEmpty>
						<CommandGroup>
							{inventoriesList[from!]?.map(inventory => (
								<CommandItem
									key={inventory.id}
									className="flex justify-between text-sm"
									value={inventory.id.toString()}
									onSelect={() => {
										setSelectedInventory(previous => {
											return { ...previous, [from!]: inventory };
										});
										if (from == 'destination') {
											setNewTransfer(previous => {
												return {
													...previous,
													destination_inventory: inventory.id,
												};
											});
										}

										setOpen(false);
									}}
								>
									<span className="font-semibold">
										{inventory.code}
									</span>
									<span className="inline-block text-xs font-bold text-slate-600">
										Created:{' '}
										{new Date(
											inventory.created_at ?? '',
										).toLocaleDateString('en-PH', {
											dateStyle: 'long',
										})}
									</span>
								</CommandItem>
							))}
						</CommandGroup>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
};
