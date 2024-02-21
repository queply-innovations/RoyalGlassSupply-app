import { useEffect } from 'react';
import { Button, Inputbox } from '@/components';
import { UseModalProps } from '@/utils/Modal';
// import { useWarehouse } from '..';
// import { addWarehouse, updateWarehouse } from '../api/Warehouse';
import { useWarehouseMutation } from '../hooks';
import { Warehouse } from '../types';

interface WarehouseFormProps {
	isUpdate?: boolean;
	onClose: UseModalProps['closeModal'];
	isDelete?: boolean;
}

const WarehouseForm = ({
	isUpdate = false,
	onClose,
	isDelete,
}: WarehouseFormProps) => {
	const {
		value: warehouseForm,
		setValue: setWarehouseForm,
		handleChange,
		addWarehouseMutation,
		updateWarehouseMutation,
		removeWarehouseMutation,
	} = useWarehouseMutation();

	// TODO: Need to handle setValue when isUpdate and isDelete is true to pass data to form
	// TODO: maybe need to pass WarehouseData selected from Context to setValue

	const handleSubmit = async () => {
		console.log('warehouseForm:', warehouseForm);
		try {
			await new Promise(resolve => setTimeout(resolve, 1000));
			if (isUpdate) {
				// * call updateWarehouseMutation to Update Warehouse
				// TODO: TEST IF WORKING
				await updateWarehouseMutation(warehouseForm);
				onClose();
			}
			if (isDelete) {
				// * call removeWarehouseMutation to Remove Warehouse
				// TODO: TEST IF WORKING

				await removeWarehouseMutation(warehouseForm.id);
				onClose();
			} else {
				// * call addWarehouseMutation to Add Warehouse
				await addWarehouseMutation(warehouseForm);
				onClose();
			}
		} catch (error) {
			console.error('Warehouse Data submission failed', error);
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
										required
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
								<Button
									fill={'green'}
									className=""
									type="submit"
									// onClick={handleSubmit}
								>
									{isUpdate ? 'Update Warehouse' : 'Add Warehouse'}
								</Button>
								<Button
									fill={'red'}
									className=""
									onClick={onClose}
									type="reset"
								>
									Cancel
								</Button>
								<Button
									onClick={() => console.log(warehouseForm)}
									type="button"
								>
									console form
								</Button>
							</div>
						</div>
					</form>
				</>
			)}
		</>
	);
};

export default WarehouseForm;
