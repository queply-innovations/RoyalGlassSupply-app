import { UseModalProps } from '@/utils/Modal';
import { Button, Inputbox, Loading, Selectbox } from '@/components';
import { formatUTCDate } from '@/utils/timeUtils';
import { useTransfer } from '../context/TransferContext';
import { useTransferMutation } from '../hooks';
import { Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useWarehouseQuery } from '@/features/warehouse/__test__/hooks';
import { useUserInfoQuery } from '@/features/userinfo/hooks';
import { useAuth } from '@/context/AuthContext';

import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { Textarea } from '@/components/ui/textarea';

interface TransferDetailsProps {
	onClose: UseModalProps['closeModal'];
}

export const TransferEdit = ({ onClose }: TransferDetailsProps) => {
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
	} = useTransferMutation();

	const { selectedTransfer } = useTransfer();
	const { warehouses } = useWarehouseQuery();
	const { users } = useUserInfoQuery();
	const { auth } = useAuth();

	return (
		<>
			{success && (setTimeout(() => {
				onClose();
			}, 3000))}
			<form
				onSubmit={e => {
					e.preventDefault();
				}}
			>
				<div className="flex max-w-2xl flex-col gap-4">
					<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-4">
						<div className="col-span-4 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">Transfer Code</h3>
							<p className="text-sm">{transfer.code ? transfer.code : 'N/A'}</p>
						</div>
						<div className="col-span-4 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">
								Source
							</h3>
							<Select
								onValueChange={value => handleChangeSelect('source', Number(value))}
								name="source"
								// value={transfer.source.toString()}
							>
								<SelectTrigger
									name="source"
									className="flex flex-row items-center gap-3 truncate bg-white text-sm"
								>
									<SelectValue placeholder={ 
										warehouses.length <= 0 ? (
											<div className="flex h-12 w-full items-center justify-center">
												<Loader2
													size={22}
													strokeWidth={2.5}
													className="animate-spin text-slate-700/50"
												/>
											</div>
										) : (
											<>
												{warehouses[transfer.source - 1]?.name}
												<span className="truncate text-xs text-slate-700/60">
													{' '}•{' '} 
														{warehouses[transfer.source - 1]?.code} 
														{' '}•{' '} 
														{warehouses[transfer.source - 1]?.location}
												</span>
											</>
										) }
									/>
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
												className={`text-sm font-medium text-slate-700 
													${warehouse.id === transfer.source && 'selected'}`}
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
						<div className="col-span-4 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">
								Destination
							</h3>
							<Select
								onValueChange={value => handleChangeSelect('destination', Number(value))}
								name="destination"
								// value={transfer.destination?.toString()}
							>
								<SelectTrigger
									name="destination"
									className="flex flex-row items-center gap-3 truncate bg-white text-sm"
								>
									<SelectValue placeholder={ 
										warehouses.length <= 0 ? (
											<div className="flex h-12 w-full items-center justify-center">
												<Loader2
													size={22}
													strokeWidth={2.5}
													className="animate-spin text-slate-700/50"
												/>
											</div>
										) : (
											<>
												{warehouses[transfer.destination - 1]?.name}
												<span className="truncate text-xs text-slate-700/60">
													{' '}•{' '} 
														{warehouses[transfer.destination - 1]?.code} 
														{' '}•{' '} 
														{warehouses[transfer.destination - 1]?.location}
												</span>
											</>
										) }
									/>
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
												className={`text-sm font-medium text-slate-700 
													${warehouse.id === transfer.destination && 'selected'}`}
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
					<hr className="my-2 h-px w-full border-0 bg-gray-200" />
					<div className="grid w-full grid-flow-row grid-cols-8 gap-4">
						<div className="relative col-span-3 flex flex-col justify-center	gap-1">
							<h3 className="text-sm font-bold text-gray-600">
								Transfer status
							</h3>
							<p className="text-sm">
								<Select
									onValueChange={value => handleChangeSelect('transfer_status', value)}
									name="transfer_status"
									value={transfer.transfer_status || ''}
								>
									<SelectTrigger
										name="transfer_status"
										className="flex flex-row items-center gap-3 truncate bg-white text-sm"
									>
										<SelectValue placeholder={
											transfer.transfer_status ?
											transfer.transfer_status.charAt(0).toUpperCase() +
											transfer.transfer_status.slice(1) 
											: 'Choose status...'
										} />
										<SelectContent className="bg-white font-medium">
											<SelectItem
												value="loading"
												key="loading"
												className="text-sm font-medium text-slate-700"
											>
												Loading
											</SelectItem>
											<SelectItem
												value="en route"
												key="en route"
												className="text-sm font-medium text-slate-700">
												En route
											</SelectItem>
											<SelectItem
												value="arrived"
												key="arrived"
												className="text-sm font-medium text-slate-700">
												Arrived
											</SelectItem>
										</SelectContent>
									</SelectTrigger>
								</Select>
							</p>
						</div>
						<div className="col-span-5 flex flex-col justify-center	gap-1">
							<h3 className="text-sm font-bold text-gray-600">
								Transfer schedule
							</h3>
							<div className="text-sm">
								<DateTimePicker 
									onChange={value => handleChangeDateTime("transfer_schedule", value)}
									value={dateDisplay}
									format="yyyy-M-d H:m"
									minDate={dateDisplay}
									required
								/>
							</div>
						</div>
						{transfer.transfer_status === 'arrived' && (
							<>
								<div className="col-span-3 flex flex-col justify-center	gap-1">
									<h3 className="text-sm font-bold text-gray-600">Received by</h3>
									<p className="text-sm">
										
									</p>
								</div>
								<div className="relative col-span-3 flex flex-col justify-center	gap-1">
									<h3 className="text-sm font-bold text-gray-600">
										Date received
									</h3>
									<div className="text-sm">
										<DateTimePicker 
											onChange={value => handleChangeDateTime("date_received", value)}
											value={dateDisplay}
											format="yyyy-M-d H:m"
											minDate={dateDisplay}
											required
										/>
									</div>
								</div>
							</>
						)}
					</div>
					<hr className="my-2 h-px w-full border-0 bg-gray-200" />
					<div className="grid w-full grid-flow-row grid-cols-12 gap-4">
						<div className="col-span-4 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">
								Created by
							</h3>
							<p className="text-sm">
								{selectedTransfer.created_by.firstname + ' ' + selectedTransfer.created_by.lastname}
							</p>
						</div>
						<div className="col-span-4 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">
								Approval status
							</h3>
							<p className="text-sm">
								<Select
									onValueChange={value => handleChangeSelect('approval_status', value)}
									name="approval_status"
									value={transfer.approval_status || ''}
								>
									<SelectTrigger
										name="approval_status"
										className="flex flex-row items-center gap-3 truncate bg-white text-sm"
									>
										<SelectValue placeholder={
											transfer.approval_status ?
											transfer.approval_status.charAt(0).toUpperCase() +
											transfer.approval_status.slice(1) 
											: 'Choose status...'
										} />
										<SelectContent className="bg-white font-medium">
											<SelectItem
												value="pending"
												key="pending"
												className="text-sm font-medium text-slate-700"
											>
												Pending
											</SelectItem>
											<SelectItem
												value="approved"
												key="approved"
												className="text-sm font-medium text-slate-700">
												Approved
											</SelectItem>
											<SelectItem
												value="rejected"
												key="rejected"
												className="text-sm font-medium text-slate-700">
												Rejected
											</SelectItem>
										</SelectContent>
									</SelectTrigger>
								</Select>
							</p>
						</div>
						{/* TODO: Approved by: get from user auth storage */}
					</div>
					<hr className="my-2 h-px w-full border-0 bg-gray-200" />
					<div className="grid w-full grid-flow-row grid-cols-12 gap-4">
						<div className="col-span-12 w-full flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">
								Notes
							</h3>
							<Textarea
								name="notes"
								value={transfer.notes || ''}
								placeholder="Add notes here...."
								onChange={handleChange}
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-5">
					<div className="flex flex-row justify-center gap-1">
						<div className="mt-3 grid w-full grid-flow-row grid-cols-10 gap-4 text-center">
							<div className="flex flex-col col-span-2 gap-3">
								<Button
									type="submit"
									fill={isChanged ? 'green' : null}
									disabled={isChanged ? false : true}
									onClick={handleSubmit}
								>
									{!isSubmitting ? 'Edit Transfer' : 'Submitting'}
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
