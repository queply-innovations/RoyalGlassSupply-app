import { UseModalProps } from '@/utils/Modal';
import { Button, Inputbox, Loading, Selectbox } from '@/components';
import { formatUTCDate } from '@/utils/timeUtils';
// import { usePendingTransfer } from '../context/PendingTransferContext';
import { AlertTriangle, Ban, Check, Clock, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useWarehouseQuery } from '@/features/warehouse/__test__/hooks';
import { useUserInfoQuery } from '@/features/userinfo/hooks';
import { useAuth } from '@/context/AuthContext';
import { Button as Button2 } from '@/components/ui/button';

// import DateTimePicker from 'react-datetime-picker';
// import 'react-datetime-picker/dist/DateTimePicker.css';
// import 'react-calendar/dist/Calendar.css';
// import 'react-clock/dist/Clock.css';
// import { Textarea } from '@/components/ui/textarea';
import { useTransfer } from '@/features/transfer/context/TransferContext';
import { useTransferMutation } from '@/features/transfer/hooks';

import { Label } from '@/components/ui/label';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarDays } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { TimePicker } from "antd";
import { useEffect } from 'react';

interface TransferDetailsProps {
	onClose: UseModalProps['closeModal'];
}

export const PendingTransferEdit = ({ onClose }: TransferDetailsProps) => {
	const {
		transfer,
		lastId,
		isChanged,
		isSubmitting,
		error,
		success,
		dateDisplay,
		dateDisplayArrived,
		handleSubmit,
		handleChange,
		handleChangeSelect,
		handleChangeDateTime,
	} = useTransferMutation();

	const { selectedTransfer, transferProducts } = useTransfer();
	const { warehouses } = useWarehouseQuery();
	const { users } = useUserInfoQuery();
	const { auth } = useAuth();

	useEffect(() => {
		console.log(transfer);
	}, [transfer]);

	const approvalStatusChange = (
		<>
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
 
		{transferProducts.filter((prod) => prod.transfer_id === transfer.id).length === 0 && (
			<div className="flex align-center group">
				<AlertTriangle size={30} strokeWidth={2} className="self-center text-yellow-600" />
				<span className="text-nowrap absolute left-1/2 mx-auto -translate-x-10 -translate-y-7 rounded-md bg-gray-800 px-1 text-sm text-gray-100 transition-opacity opacity-0 group-hover:opacity-100">
					No products have been added yet.
				</span>
			</div>
		)}

		</>
	);

	const sourceSelect = (
		<Select
			onValueChange={value => handleChangeSelect('source', Number(value))}
			name="source"
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
	);

	const destinationSelect = (
		<Select
			onValueChange={value => handleChangeSelect('destination', Number(value))}
			name="destination"
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
	);

	const transferSelect = (
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
	);

	const receivedSelect = (
		<Select
			onValueChange={value => handleChangeSelect('received_by', Number(value))}
			name="received_by"
		>
			<SelectTrigger
				name="received_by"
				className="flex flex-row items-center gap-3 truncate bg-white text-sm"
			>
				<SelectValue placeholder={ 
					users.length <= 0 ? (
						<div className="flex h-12 w-full items-center justify-center">
							<Loader2
								size={22}
								strokeWidth={2.5}
								className="animate-spin text-slate-700/50"
							/>
						</div>
					) : (
						<>
							{transfer.received_by ? 
								users[Number(transfer.received_by) - 1].firstname + ' ' 
								+ users[Number(transfer.received_by) - 1].lastname
								: 'Choose user...'
							}
						</>
					) }
				/>
			</SelectTrigger>

			<SelectContent className="bg-white font-medium">
				{users.length <= 0 ? (
					<div className="flex h-12 w-full items-center justify-center">
						<Loader2
							size={22}
							strokeWidth={2.5}
							className="animate-spin text-slate-700/50"
						/>
					</div>
				) : (
					users.map((user, key) => (
						<SelectItem
							key={key}
							value={user.id.toString()}
							className={`text-sm font-medium text-slate-700 
								${transfer.received_by && 
									user.id === transfer.received_by && 
									'selected'}`}
						>
							{user.firstname + ' ' + user.lastname} 
						</SelectItem>
					))
				)}
			</SelectContent>
		</Select>
	);

	success && setTimeout(() => {
		onClose();
	}, 1000);

	return (
		<>
			<form
				onSubmit={e => {
					e.preventDefault();
				}}
			>
				{/* { transfer ? console.log("with") : console.log("without") } */}
				<div className="flex max-w-3xl flex-col gap-4">
					<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-4">
						<div className="col-span-4 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">Transfer Code</h3>
							<p className="text-sm">{transfer.code ? transfer.code : 'N/A'}</p>
						</div>
						<div className="col-span-4 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">
								Source
							</h3>
							{sourceSelect}
						</div>
						<div className="col-span-4 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">
								Destination
							</h3>
							{destinationSelect}
						</div>
					</div>
					<hr className="my-2 h-px w-full border-0 bg-gray-200" />

					<div className="grid w-full grid-flow-row grid-cols-12 gap-4 pb-4">
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
							<p className="text-sm flex flex-row gap-2">
								{transfer.approval_status?.toLowerCase() === 'approved' && 
									(
										<>
											{transfer.approval_status.charAt(0).toUpperCase() + 
												transfer.approval_status.slice(1)}
											<Check
												size={20}
												strokeWidth={2}
												className="text-green-600"
												/> 
										</>
									)
								}
								{transfer.approval_status?.toLowerCase() === 'rejected' && 
									(
										<>
											{transfer.approval_status.charAt(0).toUpperCase() + 
												transfer.approval_status.slice(1)}
											<Ban
												size={20}
												strokeWidth={2}
												className="text-red-600"
											/>
										</>
									)
								}
								{transfer.approval_status?.toLowerCase() === 'pending' && 
									auth.rolePermissions.some((role) => role.permission_id === 22) && (
											transfer.approval_status?.toLowerCase() === 'pending' &&
											approvalStatusChange
										)
								}
							</p>
						</div>
						{transfer.approved_by && 
							transfer.approval_status != 'pending' && (
								<div className="col-span-4 flex flex-col justify-center gap-1">
									<h3 className="text-sm font-bold text-gray-600">
										{transfer.approval_status === 'approved' && 'Approved by'}
										{transfer.approval_status === 'rejected' && 'Rejected by'}
									</h3>
									<p className="text-sm flex flex-row">
										{users.length > 0 ? 
											users[transfer.approved_by - 1].firstname + ' ' + users[transfer.approved_by - 1].lastname
											: (
												<div className="flex h-12 w-full items-center justify-center">
													<Loader2
														size={22}
														strokeWidth={2.5}
														className="animate-spin text-slate-700/50"
													/>
												</div>
											)}
									</p>
								</div>
							)
						}
					</div>

					{transfer.approval_status == 'approved' && (
						<>
						<div className="grid w-full grid-flow-row grid-cols-8 gap-4">
							<div className="relative col-span-2 flex flex-col justify-center	gap-1">
								<h3 className="text-sm font-bold text-gray-600">
									Transfer status
								</h3>
								<p className="text-sm">
									{transferSelect}
								</p>
							</div>
							<div className="col-span-2 flex flex-col justify-center	gap-1">
								<h3 className="text-sm font-bold text-gray-600">
									Transfer schedule
								</h3>
								<div className="text-sm">
									{/* <DateTimePicker 
										onChange={value => handleChangeDateTime("transfer_schedule", value)}
										value={dateDisplay}
										format="yyyy-M-d H:mm"
										minDate={dateDisplay}
										required
									/> */}
									<Popover>
										<PopoverTrigger
											id="date_received"
											name="date_received"
											asChild
										>
											<Button2
												variant={'outline'}
												className="flex w-full flex-row items-center justify-start gap-2 bg-white text-sm font-normal"
											>
												<CalendarDays size={18} strokeWidth={1.5} />
												{transfer.transfer_schedule
													? transfer.transfer_schedule.split(' ')[0]
													: 'Choose date...'}
											</Button2>
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
													handleChangeSelect('transfer_schedule', formattedDate);
												}}
												selected={
													transfer.transfer_schedule
														? new Date(transfer.transfer_schedule.split(' ')[0])
														: new Date()
												}
											/>
										</PopoverContent>
									</Popover>
								</div>
							</div>
							{transfer.transfer_status === 'arrived' && (
								<>
									<div className="col-span-2 flex flex-col justify-center	gap-1">
										<h3 className="text-sm font-bold text-gray-600">Received by</h3>
										<p className="text-sm">
											{receivedSelect}
										</p>
									</div>
									<div className="col-span-2 flex flex-col justify-center	gap-1">
										<h3 className="text-sm font-bold text-gray-600">
											Date received
										</h3>
										<div className="text-sm">
										<Popover>
											<PopoverTrigger
												id="date_received"
												name="date_received"
												asChild
											>
												<Button2
													variant={'outline'}
													className="flex w-full flex-row items-center justify-start gap-2 bg-white text-sm font-normal"
												>
													<CalendarDays size={18} strokeWidth={1.5} />
													{transfer.date_received
														? transfer.date_received.split(' ')[0]
														: 'Choose date...'}
												</Button2>
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
														handleChangeSelect('date_received', formattedDate);
													}}
													selected={
														transfer.date_received
															? new Date(transfer.date_received.split(' ')[0])
															: new Date(transfer.transfer_schedule.split(' ')[0])
													}
												/>
											</PopoverContent>
										</Popover>
										</div>
									</div>
								</>
							)}
						</div>
						</>
					)}

					
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
				<div className="flex flex-row justify-center gap-1">
					<div className="mt-3 grid w-full grid-flow-row grid-cols-10 gap-4 text-center">
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
						<div className="flex flex-col col-span-5 gap-3 items-end">
							<div className="flex flex-row">
								<Button
									type="reset"
									fill={'default'}
									className="flex-1 py-2 text-sm font-bold text-gray-700 hover:text-white"
									onClick={onClose}
								>
									Cancel
								</Button>

								<Button
									type="submit"
									fill={isChanged ? 'green' : null}
									disabled={isChanged ? false : true}
									onClick={handleSubmit}
								>
									{!isSubmitting ? 'Edit Transfer' : 'Submitting'}
								</Button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};
