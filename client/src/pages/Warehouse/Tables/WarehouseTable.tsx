/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/Button';
import Modal from '@/components/Modal';
import { removeWarehouse, useWarehouses } from '@/utils/api/Warehouse';
import { useModal } from '@/utils/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, FC, useState } from 'react';
import WarehouseForm from '@/components/Warehouse/Forms/WarehouseForm';

interface WarehouseTableProps {
	data: any;
}

const WarehouseTable: FC<WarehouseTableProps> = ({ data }) => {
	const queryClient = useQueryClient();
	const WarehouseTableHeader: string[] = [
		'',
		'Warehouse ID',
		'Warehouse Name',
		'Location',
		'Action',
	];
	const removeModal = useModal();
	const successModal = useModal();
	const updateModal = useModal();
	const [selectedWarehouse, setSelectedWarehouse] = useState<any | null>(null);
	const { isLoading } = useWarehouses();

	const { mutateAsync: removeWarehouseMutation } = useMutation({
		mutationKey: ['removeWarehouse:', selectedWarehouse],
		mutationFn: removeWarehouse,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['warehouses'] });
			console.log('Warehouse removed');
			removeModal.closeModal();
			successModal.openModal();
		},
		onError: error => {
			console.error('Warehouse Data submission failed', error);
		},
	});

	const handleUpdateModal = (warehouse: any) => {
		setSelectedWarehouse(warehouse);
		updateModal.openModal();
		console.log('Update Warehouse', warehouse);
	};
	const handleRemoveWarehouse = (warehouse: any) => {
		setSelectedWarehouse(warehouse);
		removeModal.openModal();
		console.log(warehouse.id);
	};

	return (
		<>
			<table className="w-full overflow-y-scroll">
				<thead className="table-head border-b border-black/10 bg-white ">
					<tr>
						{WarehouseTableHeader.map(header => (
							<th
								key={header}
								className="py-5 text-xs font-bold uppercase"
							>
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="bg-primary-white h-full overflow-y-auto">
					{data?.map((warehouse: any) => {
						const handleCheckboxChange = (
							event: ChangeEvent<HTMLInputElement>,
						) => {
							if (event.target.checked) {
								console.log(
									'Checkbox checked for warehouse ID:',
									warehouse,
								);
							}
						};

						return (
							<tr key={warehouse.id} className="text-center">
								<td className="w-16">
									<input
										type="checkbox"
										onChange={handleCheckboxChange}
									/>
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									<span>{warehouse.id}</span>
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									{warehouse.warehouse_name}
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									{warehouse.location}
								</td>
								<td className="flex flex-row justify-center gap-3 py-2 text-xs font-normal uppercase">
									<Button
										fill={'yellow'}
										textColor={'black'}
										onClick={() => handleUpdateModal(warehouse)}
									>
										Edit
									</Button>
									<Button
										fill={'red'}
										onClick={() => handleRemoveWarehouse(warehouse)}
									>
										Remove
									</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<Modal isOpen={removeModal.isOpen} onClose={removeModal.closeModal}>
				<>
					<div className="flex flex-col gap-4">
						<p className="text-center font-bold uppercase">
							Are you sure you want to remove?
						</p>
						<span>{`Warehouse ID: ${selectedWarehouse?.id}`}</span>
						<span>{`Warehouse Name: ${selectedWarehouse?.warehouse_name}`}</span>
						<span>{`Warehouse Location: ${selectedWarehouse?.location}`}</span>

						<div className="flex flex-row justify-center gap-1">
							<Button
								fill={'green'}
								className=""
								type="submit"
								onClick={() =>
									removeWarehouseMutation(selectedWarehouse.id)
								}
							>
								{`Remove ${selectedWarehouse?.warehouse_name}`}
							</Button>
							<Button
								fill={'red'}
								className=""
								type="reset"
								onClick={removeModal.closeModal}
							>
								Cancel
							</Button>
						</div>
					</div>
				</>
			</Modal>
			<Modal isOpen={updateModal.isOpen} onClose={updateModal.closeModal}>
				<>
					<WarehouseForm
						data={selectedWarehouse}
						onClose={updateModal.closeModal}
						isUpdate={true}
					/>
				</>
			</Modal>
			<Modal
				isOpen={successModal.isOpen}
				onClose={() => {
					successModal.closeModal();
					setTimeout(() => {
						successModal.closeModal();
					}, 50000);
				}}
			>
				<div className="flex flex-col items-center justify-center gap-2">
					<p>
						{`Warehouse ${selectedWarehouse?.warehouse_name} successfully removed`}
					</p>
					<Button fill={'green'} onClick={successModal.closeModal}>
						Close
					</Button>
				</div>
			</Modal>

			{isLoading && (
				<div className="flex items-center justify-center">
					Fetching Warehouse Information Data...
				</div>
			)}
		</>
	);
};

export default WarehouseTable;
