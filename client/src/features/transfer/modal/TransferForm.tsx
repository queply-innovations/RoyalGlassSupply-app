import { UseModalProps } from '@/utils/Modal';
import { Button, Inputbox, Loading, Selectbox } from '@/components';
import { formatUTCDate } from '@/utils/timeUtils';
import { useTransfer } from '../context/TransferContext';
import { useTransferAddition } from '../hooks';
import { Roles } from '@/entities';
import user from '@/store/user';
import { Loader2 } from 'lucide-react';
import { 
	Select, 
	SelectContent, 
	SelectItem, 
	SelectTrigger, 
	SelectValue } 
	from '@/components/ui/select';
import { useWarehouseQuery } from '@/features/warehouse/__test__/hooks';
import { useAuth } from '@/context/AuthContext';

import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { Textarea } from '@/components/ui/textarea';

interface TransferDetailsProps {
	onClose: UseModalProps['closeModal'];
}

export const TransferForm = ({ onClose }: TransferDetailsProps) => {
	const {
		transfer,
		lastId,
		isChanged,
		isSubmitting,
		error,
		success,
		dateDisplay,
		handleSubmit,
		handleChange,
		handleChangeSelect,
		handleChangeDateTime,
	} = useTransferAddition();

	const { warehouses } = useWarehouseQuery();
	const { auth } = useAuth();

	success && setTimeout(() => {
		onClose();
	}, 3000);

	return (
		<>
			<form
				onSubmit={e => {
					e.preventDefault();
				}}
			>
				<div className="flex flex-col gap-5">
					<div className="flex flex-row gap-3 justify-center">
						<div className="flex flex-col gap-1">
							<span className="text-sm font-bold uppercase">
								Transfer ID
							</span>
							<Inputbox
								name="id"
								value={lastId}
								type="number"
								disabled
								readOnly
							/>
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-sm font-bold uppercase">
								Created by
							</span>
							<Inputbox
								name="created_by"
								placeholder="User ID"
								value={auth.user.firstname + ' ' + auth.user.lastname}
								disabled
								readOnly
							/>
						</div>
					</div>

					<div className="flex flex-row grid-cols-12 gap-3 justify-center">
						<div className="flex flex-col col-span-4 gap-1">
							<span className="text-sm font-bold uppercase">
								Source
							</span>
							<Select
								onValueChange={value => handleChangeSelect('source', Number(value))}
								required
								name="source"
							>
								<SelectTrigger
									name="source"
									className="flex flex-row items-center gap-3 truncate bg-white text-sm"
								>
									<SelectValue placeholder={'Choose source location...'} />
								</SelectTrigger>

								<SelectContent className="bg-white font-medium">
									{warehouses.length <= 0 ? (
										<div className="flex h-12 w-full items-center justify-center">
											<Loader2
												size={22}
												strokeWidth={2.5}
												className="animate-spin text-slate-700/50"
											/>
										</div>
									) : (
										warehouses.map((warehouse, key) => (
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
										))
									)}
								</SelectContent>
							</Select>
						</div>
						<div className="flex flex-col col-span-4 gap-1">
							<span className="text-sm font-bold uppercase">
								Destination
							</span>
							<Select
								onValueChange={value => handleChangeSelect('destination', Number(value))}
								required
								name="destination"
							>
								<SelectTrigger
									name="destination"
									className="flex flex-row items-center gap-3 truncate bg-white text-sm"
								>
									<SelectValue placeholder={'Choose source location...'} />
								</SelectTrigger>

								<SelectContent className="bg-white font-medium">
									{warehouses.length <= 0 ? (
										<div className="flex h-12 w-full items-center justify-center">
											<Loader2
												size={22}
												strokeWidth={2.5}
												className="animate-spin text-slate-700/50"
											/>
										</div>
									) : (
										warehouses.map((warehouse, key) => (
											<SelectItem
												key={warehouse.code}
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
										))
									)}
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className="flex flex-row gap-3 grid-cols-12 justify-center">
						<div className="flex flex-col col-span-10 gap-1">
							<span className="text-sm font-bold uppercase">
								Transfer Schedule
							</span>
							<DateTimePicker 
								onChange={value => handleChangeDateTime("transfer_schedule", value)}
								format="yyyy-M-d H:m"
								minDate={new Date()}
								value={dateDisplay}
								required
							/>
						</div>
					</div>
					<span className="flex flex-col grid-cols-12 text-sm font-bold uppercase text-center">
						(for PM times, add 12 to the hour)
					</span>

					<div className="flex flex-row gap-3 grid-cols-12">
						<div className="flex flex-col gap-1 col-span-12 w-full">
							<span className="text-sm font-bold uppercase">
								Notes: 
							</span>
							<Textarea
								name="notes"
								onChange={handleChange}
								value={transfer.notes || ''}
								placeholder="Add notes here...."
							/>
						</div>
					</div>
					
					<div className="flex flex-row justify-center gap-1">
						<div className="mt-3 grid w-full grid-flow-row grid-cols-10 gap-4 text-center">
							<div className="flex flex-col col-span-2 gap-3">
								<Button
									type="submit"
									fill={isChanged ? 'green' : null}
									disabled={isChanged ? false : true}
									onClick={handleSubmit}
								>
									{!isSubmitting ? 'Add Transfer' : 'Submitting'}
								</Button>
							</div>
							<div className="flex flex-col col-span-5 items-start">
								{success && (
									<div className="font-bold text-green-700">{success}</div>
								)}
								{error && (
									<div className="font-bold text-red-700">{error}</div>
								)}
								{!isSubmitting ? '' : 
									<div className="flex flex-col flex-wrap items-start"> 
										<Loading width={30} height={30} /> 
									</div>}
							</div>
							<div className="flex flex-col col-span-3 gap-3 items-end">
								<Button
									type="reset"
									fill={'red'}
									onClick={onClose}
								>
									Cancel
								</Button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};