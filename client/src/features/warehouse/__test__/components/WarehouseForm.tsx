import { Warehouse } from '@/entities/Warehouse';
import { ChangeEvent, useState } from 'react';
import { Button, Inputbox } from '@/components';
import { UseModalProps } from '@/utils/Modal';
import { useWarehouse } from '..';
import { addWarehouse, updateWarehouse } from '../api/Warehouse';

interface WarehouseFormProps {
	isUpdate?: boolean;
	onClose: UseModalProps['closeModal'];
}

const WarehouseForm = ({ isUpdate = false, onClose }: WarehouseFormProps) => {
	const warehouse = useWarehouse();
	const [warehouseForm, setWarehouseForm] = useState<Warehouse>(
		{} as Warehouse,
	);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setWarehouseForm(prevWarehouseForm => ({
			...(prevWarehouseForm as Warehouse),
			[name]: value,
		}));
	};

	const handleSubmit = async () => {
		if (isUpdate) {
			await updateWarehouse(warehouseForm);
		} else {
			await addWarehouse(warehouseForm);
		}
	};

	return (
		<>
			<form>
				<div className="flex flex-col gap-5">
					<div className="flex flex-row gap-3">
						<div className="flex flex-col gap-1">
							<span className="text-sm font-bold uppercase">
								Warehouse ID
							</span>
							<Inputbox
								name="id"
								value={warehouse.length + 1 || 0}
								type="number"
								disabled={true}
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
							onClick={handleSubmit}
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
					</div>
				</div>
			</form>
		</>
	);
};

export default WarehouseForm;
