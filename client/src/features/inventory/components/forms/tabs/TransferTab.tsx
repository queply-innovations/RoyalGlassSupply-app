import { Label } from '@/components/ui/label';
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
import { InventoryDatabase } from '@/features/inventory/types';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CalendarDays, ChevronsUpDown, Loader2 } from 'lucide-react';
import { useTransferQuery } from '@/features/transfer/hooks';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';

interface TransferTabProps {
	FormValue: Partial<InventoryDatabase>;
	handleChange: (key: string, value: any) => void;
}

export const TransferTab = ({ FormValue, handleChange }: TransferTabProps) => {
	// TODO: Implement filters, filter to current warehouse, filter active status and transfer status
	// const [filters, setFilters] = useState<
	// 	Array<Record<string, string | number>>
	// >([]);

	// useEffect(() => {
	// 	if (FormValue.warehouse_id) {
	// 		setFilters(
	// 			prev =>
	// 				[...prev, { destination: FormValue.warehouse_id }] as Record<
	// 					string,
	// 					string | number
	// 				>[],
	// 		);
	// 	}
	// }, [FormValue.warehouse_id]);

	const { transfers, isFetching: isLoading } = useTransferQuery();
	const [transfersListOpen, setTransfersListOpen] = useState(false);

	return (
		<>
			<div className="grid w-full grid-cols-4 gap-4">
				<div className="col-span-4 flex flex-col justify-center gap-1">
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
						<PopoverTrigger className="relative my-2 w-full" asChild>
							<Button
								role="combobox"
								className="my-0 w-full justify-between text-sm text-slate-700"
								variant={'outline'}
							>
								{FormValue.transfer_id
									? (() => {
											const transfer = transfers.find(
												item => item.id === FormValue.transfer_id,
											);
											return (
												<div className="flex items-baseline gap-4">
													<span>{transfer!.code}</span>
												</div>
											);
										})()
									: 'Select a transfer item...'}
								<ChevronsUpDown
									size={14}
									strokeWidth={2}
									className="h-4 w-4 opacity-70"
								/>
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-[462px] p-0 text-sm font-medium text-slate-700">
							{/* <div className="flex w-full flex-row gap-4 border-b p-4">
								<div className="flex flex-1 flex-col gap-1">
									<Select
										defaultValue="arrived"
										onValueChange={value => {
											setFilters(
												prev =>
													[...prev, { : FormValue.warehouse_id }] as Record<
														string,
														string | number
													>[],
											);
										}}
									>
										<SelectTrigger className="h-8 text-xs font-semibold">
											<div className="space-x-2">
												<span>Approval status:</span>
												<SelectValue placeholder="Filter approval status..." />
											</div>
										</SelectTrigger>
										<SelectContent className="text-sm font-medium">
											<SelectItem value="none">No filter</SelectItem>
											<SelectItem value="arrived">
												Approved
											</SelectItem>
											<SelectItem value="enroute">
												Pending
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="flex flex-1 flex-col gap-1">
									<Select
										defaultValue="arrived"
										onValueChange={value => {}}
									>
										<SelectTrigger className="h-8 text-xs font-semibold">
											<div className="space-x-2">
												<span>Transfer status:</span>
												<SelectValue placeholder="Filter approval status..." />
											</div>
										</SelectTrigger>
										<SelectContent className="text-sm font-medium">
											<SelectItem value="none">No filter</SelectItem>
											<SelectItem value="arrived">
												Arrived
											</SelectItem>
											<SelectItem value="enroute">
												Enroute
											</SelectItem>
											<SelectItem value="loading">
												Loading
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div> */}
							<Command>
								<CommandInput
									id="transfer_id"
									name="transfer_id"
									placeholder="Transfer code..."
								/>
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
										{transfers.map((transfer, key) => (
											<CommandItem
												key={transfer.id}
												value={
													transfer.id.toString() + transfer.code
												}
												onSelect={() => {
													handleChange('transfer_id', transfer.id);
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
				<div className="col-span-4 flex flex-col justify-center gap-1">
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
									: 'Choose date...'}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0">
							<Calendar
								mode="single"
								initialFocus
								required
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
										: new Date()
								}
							/>
						</PopoverContent>
					</Popover>
				</div>
				<div className="col-span-4 flex flex-col justify-center gap-1">
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
						defaultValue={FormValue.notes ? FormValue.notes : undefined}
						maxLength={1000}
						placeholder="Notes..."
						onChange={e => handleChange('notes', e.target.value)}
					/>
				</div>
			</div>
		</>
	);
};
