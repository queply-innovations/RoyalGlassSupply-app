import { UseModalProps } from '@/utils/Modal';
import { useInventoryMutation } from '../../hooks/useInventoryMutation';
import { useInventory } from '../../context/InventoryContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Warehouse } from '@/features/warehouse/__test__/types';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Button as LegacyButton } from '@/components';
import { CalendarDays, ChevronsUpDown, Loader2 } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { useTransferQuery } from '@/features/transfer/hooks';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EditInventoryFormProps {
	onClose: UseModalProps['closeModal'];
	warehouses: Warehouse[];
}

export const EditInventoryForm = ({
	onClose,
	warehouses,
}: EditInventoryFormProps) => {
	// Get selected inventory in the table
	const { selectedInventory } = useInventory();
	// Get the INVENTORY mutation hook
	const {
		value: FormValue,
		handleChange,
		handleSubmit,
	} = useInventoryMutation();
	// Get the TRANSFER query hook
	const { transfers, isFetching: isTransferLoading } = useTransferQuery();
	// State handler for transfer list dropdown/select
	const [transfersListOpen, setTransfersListOpen] = useState(false);

	// Form state handlers
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	// Function to find transfer item by id
	// returns the transfer item
	const findTransferItem = (id: number) => {
		return transfers.find(item => id === item.id);
	};

	return (
		<>
			<form
				onSubmit={async e => {
					setIsSubmitting(!isSubmitting);
					e.preventDefault();
					const response = await handleSubmit({
						action: 'update',
						id: selectedInventory.id,
						data: FormValue,
					});
					response?.status === 200
						? (setIsSubmitting(!isSubmitting), onClose())
						: (setIsSubmitting(!isSubmitting),
							setError('Failed to update inventory item'));
				}}
			>
				<div className="flex max-w-2xl flex-col gap-3">
					<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-3">
						<div className="col-span-6 flex flex-col justify-center gap-1">
							<Label
								htmlFor="code"
								className="text-sm font-bold text-gray-600"
							>
								Code
							</Label>
							<Input
								id="code"
								name="code"
								type="text"
								maxLength={50}
								required
								placeholder="Code..."
								defaultValue={
									FormValue.code
										? FormValue.code
										: selectedInventory.code
											? selectedInventory.code
											: undefined
								}
								onChange={e => handleChange('code', e.target.value)}
							/>
						</div>
						<div className="col-span-6 flex flex-col justify-center gap-1">
							<Label
								htmlFor="warehouse"
								className="text-sm font-bold text-gray-600"
							>
								Warehouse
							</Label>
							<Select
								onValueChange={value =>
									handleChange('warehouse_id', Number(value))
								}
								defaultValue={selectedInventory.warehouse.id.toString()}
								required
							>
								<SelectTrigger
									name="warehouse"
									className="flex max-w-[30ch] flex-row items-center gap-3 truncate bg-white text-sm"
								>
									<SelectValue placeholder={'Choose warehouse...'} />
								</SelectTrigger>
								<SelectContent className="bg-white font-medium">
									{warehouses.map((warehouse, key) => (
										<SelectItem
											key={key}
											value={warehouse.id.toString()}
											className="text-sm font-medium text-slate-700"
										>
											{warehouse.name}
											<span className="truncate text-xs text-slate-700/60">
												{' • ' +
													warehouse.code +
													' • ' +
													warehouse.location}
											</span>
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
					<hr className="col-span-12 my-2 h-px w-full border-0 bg-gray-200" />
					<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-3">
						<div className="col-span-6 flex flex-col justify-center gap-1">
							<Label
								htmlFor="type"
								className="text-sm font-bold text-gray-600"
							>
								Type
							</Label>
							<Select
								defaultValue={selectedInventory.type}
								onValueChange={value => handleChange('type', value)}
							>
								<SelectTrigger
									name="type"
									className="flex max-w-[30ch] flex-row items-center gap-3 truncate bg-white text-sm capitalize"
								>
									<SelectValue placeholder={'Choose type...'} />
								</SelectTrigger>
								<SelectContent className="bg-white font-medium">
									<SelectItem
										value="supplier"
										className="text-sm font-medium text-slate-700"
									>
										Supplier
									</SelectItem>
									<SelectItem
										value="transfer"
										className="text-sm font-medium text-slate-700"
									>
										Transfer
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="col-span-6 flex flex-col justify-center gap-1">
							<Label
								htmlFor="date_received"
								className="text-sm font-bold text-gray-600"
							>
								Date received
							</Label>
							<Popover>
								<PopoverTrigger
									id="date_received"
									name="date_received"
									asChild
								>
									<Button
										variant={'outline'}
										className="flex w-full flex-row items-center justify-start gap-2 bg-white text-sm font-normal"
									>
										<CalendarDays size={18} strokeWidth={1.5} />
										{FormValue.date_received
											? FormValue.date_received
											: selectedInventory.date_received}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0">
									<Calendar
										mode="single"
										initialFocus
										required
										month={
											FormValue.date_received
												? new Date(FormValue.date_received)
												: new Date(selectedInventory.date_received)
										}
										onDayClick={value => {
											const date = new Date(value!);
											const formattedDate = `${date.getFullYear()}-${(
												date.getMonth() + 1
											)
												.toString()
												.padStart(2, '0')}-${date
												.getDate()
												.toString()
												.padStart(2, '0')}`;
											handleChange('date_received', formattedDate);
										}}
										selected={
											FormValue.date_received
												? new Date(FormValue.date_received)
												: new Date(selectedInventory.date_received)
										}
									/>
								</PopoverContent>
							</Popover>
						</div>
						{(selectedInventory.type === 'transfer' ||
							FormValue.type === 'transfer') && (
							<div className="col-span-12 flex flex-col justify-center gap-1">
								<Label
									htmlFor="transfer_id"
									className="text-sm font-bold text-gray-600"
								>
									Transfer Item
								</Label>
								<Popover
									open={transfersListOpen}
									onOpenChange={setTransfersListOpen}
								>
									<PopoverTrigger
										className="relative my-2 w-full"
										asChild
									>
										<Button
											role="combobox"
											className="my-0 w-full justify-between text-sm text-slate-700"
											variant={'outline'}
										>
											{transfers
												? FormValue.transfer_id
													? (() => {
															const transferItem =
																findTransferItem(
																	FormValue.transfer_id,
																);
															return (
																<div className="flex items-baseline gap-4">
																	{transferItem?.code}
																</div>
															);
														})()
													: selectedInventory.transfer_id
														? (() => {
																const transferItem =
																	findTransferItem(
																		selectedInventory.transfer_id,
																	);
																return (
																	<div className="flex items-baseline gap-4">
																		{transferItem?.code}
																	</div>
																);
															})()
														: 'Select inventory item...'
												: 'Loading...'}
											<ChevronsUpDown
												size={14}
												strokeWidth={2}
												className="h-4 w-4 opacity-70"
											/>
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-[462px] p-0 text-sm font-medium text-slate-700">
										<Command>
											<CommandInput
												id="transfer_id"
												name="transfer_id"
												placeholder="Transfer code..."
											/>
											{isTransferLoading && (
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
													{transfers.map(transfer => (
														<CommandItem
															key={transfer.id}
															value={
																transfer.id.toString() +
																transfer.code
															}
															onSelect={() => {
																handleChange(
																	'transfer_id',
																	transfer.id,
																);
																setTransfersListOpen(false);
															}}
															className="cursor-pointer justify-between rounded-sm"
														>
															<span>{transfer.code}</span>
															<span className="text-xs font-semibold text-slate-700/50">
																{transfer.approval_status}
																{' • '}
																{transfer.source.code}
																{'->'}
																{transfer.destination.code}
																{' • '}
																{transfer.transfer_status}
															</span>
														</CommandItem>
													))}
												</CommandGroup>
											</ScrollArea>
										</Command>
									</PopoverContent>
								</Popover>
							</div>
						)}
						<div className="col-span-12 flex flex-col justify-center gap-1">
							<Label
								htmlFor="notes"
								className="text-sm font-bold text-gray-600"
							>
								Notes
							</Label>
							<Input
								id="notes"
								name="notes"
								type="text"
								defaultValue={
									FormValue.notes
										? FormValue.notes
										: selectedInventory.notes
											? selectedInventory.notes
											: undefined
								}
								maxLength={1000}
								placeholder="Notes..."
								onChange={e => handleChange('notes', e.target.value)}
							/>
						</div>
					</div>
					<div className="flex w-full flex-row pt-4">
						<div className="ml-auto flex flex-row gap-4 whitespace-nowrap">
							<LegacyButton
								type="reset"
								fill={'default'}
								className="flex-1 py-2 text-sm font-bold text-gray-700 hover:text-white"
								onClick={onClose}
							>
								Cancel
							</LegacyButton>
							<LegacyButton
								type="submit"
								fill={'green'}
								disabled={
									isSubmitting || Object.keys(FormValue).length === 0
								} // Disable button if there are no changes or form is submitting
								className="flex-1 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
							>
								{!isSubmitting
									? 'Apply changes'
									: 'Applying changes...'}
							</LegacyButton>
						</div>
					</div>
					{error && (
						<div className="flex w-full flex-row justify-center gap-4">
							<p className="text-sm text-red-600">{error}</p>
						</div>
					)}
				</div>
			</form>
		</>
	);
};
