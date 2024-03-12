import { UseModalProps } from '@/utils/Modal';
import { Button } from '@/components';
import { formatUTCDate } from '@/utils/timeUtils';
import { usePendingTransfer } from '../context/PendingTransferContext';

interface TransferDetailsProps {
	onClose: UseModalProps['closeModal'];
}

export const PendingTransferDetails = ({ onClose }: TransferDetailsProps) => {
	const { selectedTransfer } = usePendingTransfer();

	return (
		<>
			<div className="flex max-w-2xl flex-col gap-4">
				<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-4">
					<div className="col-span-6 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">Transfer Code</h3>
						<p className="text-sm">{selectedTransfer.code ? selectedTransfer.code : 'N/A'}</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">
							Source
						</h3>
						<p className="text-sm">{selectedTransfer.source.name}</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">
							Destination
						</h3>
						<p className="text-sm">{selectedTransfer.destination.name}</p>
					</div>
				</div>
				<hr className="my-2 h-px w-full border-0 bg-gray-200" />
				<div className="grid w-full grid-flow-row grid-cols-6 gap-4">
					<div className="relative col-span-3 flex flex-col justify-center	gap-1">
						<h3 className="text-sm font-bold text-gray-600">
							Transfer status
						</h3>
						<p className="text-sm">
							{selectedTransfer.transfer_status ? 
								selectedTransfer.transfer_status.charAt(0).toUpperCase() + 
								selectedTransfer.transfer_status.slice(1) : 'N/A'}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center	gap-1">
						<h3 className="text-sm font-bold text-gray-600">
							Transfer schedule
						</h3>
						<p className="text-sm">
							{selectedTransfer.transfer_schedule.toString() === '0000-00-00 00:00:00' ? 
								'N/A' : formatUTCDate(selectedTransfer.transfer_schedule)}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center	gap-1">
						<h3 className="text-sm font-bold text-gray-600">Received by</h3>
						<p className="text-sm">
							{selectedTransfer.received_by ? 
								selectedTransfer.received_by.firstname + ' ' + selectedTransfer.received_by.lastname : 'N/A'}
						</p>
					</div>
					<div className="relative col-span-3 flex flex-col justify-center	gap-1">
						<h3 className="text-sm font-bold text-gray-600">
							Date received
						</h3>
						<p className="text-sm">
							{selectedTransfer.date_received ? 
								formatUTCDate(selectedTransfer.date_received) :
								'N/A' }
						</p>
					</div>
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
							Created at
						</h3>
						<p className="text-sm">
							{formatUTCDate(selectedTransfer.created_at)}
						</p>
					</div>
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">
							Approval status
						</h3>
						<p className="text-sm">
							{selectedTransfer.approval_status.charAt(0).toUpperCase() + 
							selectedTransfer.approval_status.slice(1)}
						</p>
					</div>
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">
							Approved by
						</h3>
						<p className="text-sm">
							{selectedTransfer.approved_by
								? selectedTransfer.approved_by.firstname +
									' ' +
									selectedTransfer.approved_by.firstname
								: 'N/A'}
						</p>
					</div>
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">
							Updated at
						</h3>
						<p className="text-sm">
							{formatUTCDate(selectedTransfer.updated_at)}
						</p>
					</div>
				</div>
				<hr className="my-2 h-px w-full border-0 bg-gray-200" />
				<div className="grid w-full grid-flow-row grid-cols-12 gap-4">
					<div className="col-span-12 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">
							Notes
						</h3>
						<p className="text-sm">
							{selectedTransfer.notes ? selectedTransfer.notes : 'N/A'}
						</p>
					</div>
				</div>
				<div className="flex w-full flex-row justify-end pt-4">
					<div className="flex flex-row gap-4 whitespace-nowrap">
						<Button
							fill={'default'}
							className="flex-1 py-2 text-sm font-bold text-gray-700 hover:text-white"
							onClick={onClose}
						>
							Close
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};
