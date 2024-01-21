/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from '@/components';
import { removeSupplier, useSupplier } from '@/utils/api/Supplier';
import { useModal } from '@/utils/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, FC, useState } from 'react';
import { SupplierForm } from '@/pages';
import { FaPencilAlt } from 'react-icons/fa';

interface SupplierTableProps {
	data: any;
}

export const SupplierTable: FC<SupplierTableProps> = ({ data }) => {
	const queryClient = useQueryClient();
	const SupplierTableHeader: string[] = [
		'',
		'Supplier ID',
		'Supplier Name',
		'Contact Number',
		'Location',
		'Action',
	];
	const removeModal = useModal();
	const successModal = useModal();
	const updateModal = useModal();
	const [selectedSupplier, setSelectedSupplier] = useState<any | null>(null);
	const { isLoading } = useSupplier();

	const { mutateAsync: removeSupplierMutation } = useMutation({
		mutationKey: ['removeSupplier:', selectedSupplier],
		mutationFn: removeSupplier,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['supplier'] });
			console.log('Supplier removed');
			removeModal.closeModal();
			successModal.openModal();
		},
		onError: error => {
			console.error('Supplier Data submission failed', error);
		},
	});

	const handleUpdateModal = (Supplier: any) => {
		setSelectedSupplier(Supplier);
		updateModal.openModal();
		console.log('Update Supplier', Supplier);
	};
	const handleRemoveSupplier = (Supplier: any) => {
		setSelectedSupplier(Supplier);
		removeModal.openModal();
		console.log(Supplier.id);
	};

	return (
		<>
			<table className="w-full overflow-y-scroll">
				<thead className="table-head border-b border-black/10 bg-white ">
					<tr>
						{SupplierTableHeader.map(header => (
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
					{data?.map((supplier: any) => {
						const handleCheckboxChange = (
							event: ChangeEvent<HTMLInputElement>,
						) => {
							if (event.target.checked) {
								console.log(
									'Checkbox checked for supplier ID:',
									supplier,
								);
							}
						};

						return (
							<tr key={supplier.id} className="text-center">
								<td className="w-16">
									<input
										type="checkbox"
										onChange={handleCheckboxChange}
									/>
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									<span>{supplier.id}</span>
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									{supplier.name}
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									{supplier.contact_number}
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									{supplier.address}
								</td>
								<td className="flex flex-row justify-center gap-3 py-2 text-xs font-normal uppercase">
									<Button
										fill={'empty'}
										textColor={'black'}
										onClick={() => handleUpdateModal(supplier)}
										className="flex flex-row gap-2"
									>
										<FaPencilAlt /> Edit
									</Button>
									<Button
										fill={'red'}
										onClick={() => handleRemoveSupplier(supplier)}
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
						<span>{`Supplier ID: ${selectedSupplier?.id}`}</span>
						<span>{`Supplier Name: ${selectedSupplier?.name}`}</span>
						<span>{`Supplier Location: ${selectedSupplier?.address}`}</span>

						<div className="flex flex-row justify-center gap-1">
							<Button
								fill={'green'}
								className=""
								type="submit"
								onClick={() =>
									removeSupplierMutation(selectedSupplier.id)
								}
							>
								{`Remove ${selectedSupplier?.name}`}
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
					<SupplierForm
						data={selectedSupplier}
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
						{`Supplier ${selectedSupplier?.Supplier_name} successfully removed`}
					</p>
					<Button fill={'green'} onClick={successModal.closeModal}>
						Close
					</Button>
				</div>
			</Modal>

			{isLoading && (
				<div className="flex items-center justify-center">
					Fetching Supplier Information Data...
				</div>
			)}
		</>
	);
};
