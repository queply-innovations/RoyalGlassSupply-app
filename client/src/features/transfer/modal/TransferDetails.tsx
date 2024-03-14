import { UseModalProps } from '@/utils/Modal';
import { Button } from '@/components';
import { formatUTCDate } from '@/utils/timeUtils';
import { useTransfer } from '../context/TransferContext';

interface TransferDetailsProps {
	onClose: UseModalProps['closeModal'];
}

export const TransferDetails = ({ onClose }: TransferDetailsProps) => {
	const { selectedTransfer } = useTransfer();

	return (
		<>
			<div className="flex max-w-2xl flex-col gap-4">
				<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-4">
					<div className="col-span-6 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">Transfer Code</h3>
						<p className="text-sm text-gray-800">{selectedTransfer.code ? selectedTransfer.code : 'N/A'}</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">
							Source
						</h3>
						<p className="text-sm text-gray-800">{selectedTransfer.source.name}</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">
							Destination
						</h3>
						<p className="text-sm text-gray-800">{selectedTransfer.destination.name}</p>
					</div>
				</div>
				<hr className="my-2 h-px w-full border-0 bg-gray-200" />
				<div className="grid w-full grid-flow-row grid-cols-6 gap-4">
					<div className="relative col-span-3 flex flex-col justify-center	gap-1">
						<h3 className="text-sm font-bold">
							Transfer status
						</h3>
						<p className="text-sm text-gray-800">
							{selectedTransfer.transfer_status ? 
								selectedTransfer.transfer_status.charAt(0).toUpperCase() + 
								selectedTransfer.transfer_status.slice(1) : 'N/A'}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center	gap-1">
						<h3 className="text-sm font-bold">
							Transfer schedule
						</h3>
						<p className="text-sm text-gray-800">
							{selectedTransfer.transfer_schedule.toString() === '0000-00-00 00:00:00' ? 
								'N/A' : formatUTCDate(selectedTransfer.transfer_schedule)}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center	gap-1">
						<h3 className="text-sm font-bold">Received by</h3>
						<p className="text-sm text-gray-800">
							{selectedTransfer.received_by ? 
								selectedTransfer.received_by.firstname + ' ' + selectedTransfer.received_by.lastname : 'N/A'}
						</p>
					</div>
					<div className="relative col-span-3 flex flex-col justify-center	gap-1">
						<h3 className="text-sm font-bold">
							Date received
						</h3>
						<p className="text-sm text-gray-800">
							{selectedTransfer.date_received ? 
								formatUTCDate(selectedTransfer.date_received) :
								'N/A' }
						</p>
					</div>
				</div>
				<hr className="my-2 h-px w-full border-0 bg-gray-200" />
				<div className="grid w-full grid-flow-row grid-cols-12 gap-4">
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">
							Created by
						</h3>
						<p className="text-sm text-gray-800">
							{selectedTransfer.created_by.firstname + ' ' + selectedTransfer.created_by.lastname}
						</p>
					</div>
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">
							Created at
						</h3>
						<p className="text-sm text-gray-800">
							{formatUTCDate(selectedTransfer.created_at)}
						</p>
					</div>
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">
							Approval status
						</h3>
						<p className="text-sm text-gray-800">
							{selectedTransfer.approval_status.charAt(0).toUpperCase() + 
							selectedTransfer.approval_status.slice(1)}
						</p>
					</div>
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">
							Approved by
						</h3>
						<p className="text-sm text-gray-800">
							{selectedTransfer.approved_by
								? selectedTransfer.approved_by.firstname +
									' ' +
									selectedTransfer.approved_by.firstname
								: 'N/A'}
						</p>
					</div>
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">
							Updated at
						</h3>
						<p className="text-sm text-gray-800">
							{formatUTCDate(selectedTransfer.updated_at)}
						</p>
					</div>
				</div>
				<hr className="my-2 h-px w-full border-0 bg-gray-200" />
				<div className="grid w-full grid-flow-row grid-cols-12 gap-4">
					<div className="col-span-12 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">
							Notes
						</h3>
						<p className="text-sm text-gray-800">
							{selectedTransfer.notes ? selectedTransfer.notes : 'N/A'}
						</p>
					</div>
				</div>
			</div>
		</>
	);
};
