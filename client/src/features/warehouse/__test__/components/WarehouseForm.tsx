import { useEffect, useState } from 'react';
import { Button, Inputbox, Loading } from '@/components';
import { UseModalProps } from '@/utils/Modal';
// import { useWarehouse } from '..';
// import { addWarehouse, updateWarehouse } from '../api/Warehouse';
import { useWarehouseMutation } from '../hooks';
import { useWarehouse } from '..';

interface WarehouseFormProps {
	isUpdate?: boolean;
	onClose: UseModalProps['closeModal'];
	isDelete?: boolean;
}

export const WarehouseForm = ({
	isUpdate = false,
	onClose,
	isDelete,
}: WarehouseFormProps) => {
	const { warehouseSelected } = useWarehouse();
	const {
		value: warehouseForm,
		setValue: setWarehouseForm,
		handleChange,
		addWarehouseMutation,
		updateWarehouseMutation,
		removeWarehouseMutation,
	} = useWarehouseMutation();

	// TODO TEST FOR BUGS
	useEffect(() => {
		if (isUpdate || isDelete) {
			setWarehouseForm(warehouseSelected);
			// console.log(isUpdate, isDelete);
		}
	}, [isUpdate, isDelete, warehouseSelected, setWarehouseForm]);

	const [ isSubmitting, setIsSubmitting ] = useState(false);
	const [ success, setSuccess ] = useState<string | null>(null);
	const [ error, setError ] = useState<string | null>(null);

	const handleSubmit = async () => {
		// console.log('warehouseForm:', warehouseForm);
		setIsSubmitting(true);
		try {
			await new Promise(resolve => setTimeout(resolve, 1000));
			if (isUpdate) {
				// * call updateWarehouseMutation to Update Warehouse
				// console.log('Update Warehouse:', warehouseForm.id);
				await updateWarehouseMutation(warehouseForm);
				setIsSubmitting(false);
				setSuccess('Warehouse updated successfully');
				onClose();
			}
			if (isDelete) {
				// * call removeWarehouseMutation to Remove Warehouse
				// console.log('Remove Warehouse:', warehouseForm.id);
				await removeWarehouseMutation(warehouseForm.id);
				setIsSubmitting(false);
				setSuccess('Warehouse deleted successfully');
				onClose();
			} else if (!isUpdate && !isDelete) {
				// * call addWarehouseMutation to Add Warehouse
				// console.log('Add Warehouse:', warehouseForm.id);
				await addWarehouseMutation(warehouseForm);
				setIsSubmitting(false);
				setSuccess('Warehouse added successfully');
				onClose();
			}
		} catch (error) {
			console.error('Warehouse data submission failed', error);
			setIsSubmitting(false);
			setError(error.message);
		}
	};

	return (
		<>
			{isDelete ? (
				<>
					<form
						onSubmit={e => {
							e.preventDefault();
							handleSubmit();
						}}
					>
						<div className="flex flex-col gap-5">
							<Button type="submit" fill={'red'}>
								{isDelete ? 'Delete Warehouse' : 'Add Warehouse'}
							</Button>
						</div>
					</form>
				</>
			) : (
				<>
					<form
						onSubmit={e => {
							e.preventDefault();
							handleSubmit();
						}}
					>
						<div className="flex flex-col gap-5">
							<div className="flex flex-row gap-3">
								<div className="flex flex-col gap-1">
									<span className="text-sm font-bold uppercase">
										Warehouse ID
									</span>
									<Inputbox
										name="id"
										value={warehouseForm?.id || 0}
										type="number"
										disabled={true}
									/>
								</div>
								<div className="flex flex-col gap-1">
									<span className="text-sm font-bold uppercase">
										Warehouse Code
									</span>
									<Inputbox
										name="code"
										placeholder="Warehouse Code"
										value={warehouseForm?.code || ''}
										onChange={handleChange}
										maxLength={3}
									/>
								</div>
								<div className="flex flex-col gap-1">
									<span className="text-sm font-bold uppercase">
										Warehouse Name
									</span>
									<Inputbox
										name="name"
										placeholder="Warehouse Name"
										value={warehouseForm?.name || ''}
										onChange={handleChange}
										required
									/>
								</div>
							</div>
							<div className="flex flex-col gap-1">
								<span className="text-sm font-bold uppercase">
									Warehouse Location
								</span>
								<Inputbox
									name="location"
									placeholder="Warehouse Location"
									type="string"
									value={warehouseForm?.location || ''}
									onChange={handleChange}
									required
								/>
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
												fill={'green'}
												//onClick={handleSubmit}
											>
												{isUpdate ? 'Update Warehouse' : 'Add Warehouse'}
											</Button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</form>
				</>
			)}
		</>
	);
};
