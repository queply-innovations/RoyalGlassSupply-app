import { UseModalProps } from '@/utils/Modal';
import { useInventory } from '../../context/InventoryContext';
import { formatUTCDate } from '@/utils/timeUtils';
import { Button } from '@/components/Button';
import { useTransferQuery } from '@/features/transfer/hooks';

interface ViewDetailsProps {
	onClose: UseModalProps['closeModal'];
}

export const ViewDetails = ({ onClose }: ViewDetailsProps) => {
	const { selectedInventory } = useInventory();
	// TODO: Add transfer query by id to reduce processes/load
	const { transfers, isFetching: isTransferLoading } = useTransferQuery();

	const transfer = transfers.find(
		item => item.id === selectedInventory.transfer_id,
	);

	return (
		<>
			<div className="flex max-w-2xl flex-col gap-2">
				<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-5">
					<div className="col-span-5 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">Code</h3>
						<p className="text-sm">{selectedInventory.code}</p>
					</div>
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">Type</h3>
						<p className="text-sm capitalize">{selectedInventory.type}</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">ID</h3>
						<p className="text-sm">{selectedInventory.id}</p>
					</div>
					<div className="col-span-5 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">Warehouse</h3>
						<p className="text-sm">
							{selectedInventory.warehouse.name} (
							{selectedInventory.warehouse.code})
						</p>
					</div>
					{selectedInventory.type === 'transfer' && (
						<div className="col-span-4 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold text-gray-600">
								Transfer Code
							</h3>
							<p className="text-sm capitalize">
								{!isTransferLoading ? transfer?.code : 'Loading...'}
							</p>
						</div>
					)}
					<div
						className={`flex flex-col justify-center gap-1 ${selectedInventory.type === 'supplier' ? 'col-span-7' : 'col-span-3'}`}
					>
						<h3 className="text-sm font-bold text-gray-600">
							Date received
						</h3>
						<p className="text-sm capitalize">
							{selectedInventory.date_received
								? selectedInventory.date_received
								: '—'}
						</p>
					</div>
					<div className="col-span-12 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">Notes</h3>
						<p className="text-sm capitalize">
							{selectedInventory.notes ? selectedInventory.notes : '—'}
						</p>
					</div>
				</div>
				<hr className="my-2 h-px w-full border-0 bg-gray-200" />
				<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-5">
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">
							Created by
						</h3>
						<p className="text-sm capitalize">
							{selectedInventory.created_by.firstname}{' '}
							{selectedInventory.created_by.lastname}
						</p>
					</div>
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">
							Created at
						</h3>
						<p className="text-sm capitalize">
							{formatUTCDate(selectedInventory.created_at)}
						</p>
					</div>
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold text-gray-600">
							Updated at
						</h3>
						<p className="text-sm capitalize">
							{selectedInventory.updated_at
								? formatUTCDate(selectedInventory.updated_at)
								: '—'}
						</p>
					</div>
				</div>
				{/* <div className="flex w-full flex-row justify-end pt-4">
					<div className="flex flex-row gap-4 whitespace-nowrap">
						<Button
							fill={'default'}
							className="flex-1 py-2 text-sm font-bold text-gray-700 hover:text-white"
							onClick={onClose}
						>
							Close
						</Button>
					</div>
				</div> */}
			</div>
		</>
	);
};
