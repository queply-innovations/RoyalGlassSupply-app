import { Button } from '@/components/Button';
import { Inputbox } from '@/components/Inputbox';
import {
	addWarehouse,
	getNextId,
	updateWarehouse,
} from '@/utils/api/Warehouse';
import { FC, useEffect, useState } from 'react';
import { WarehouseData } from '@/entities/Warehouse';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseModalProps, useModal } from '@/utils/Modal';
import Modal from '@/components/Modal';

interface WarehouseFormProps extends WarehouseData {
	isUpdate?: boolean;
	onClose: UseModalProps['closeModal'];
}

const WarehouseForm: FC<WarehouseFormProps> = ({
	data,
	onClose,
	isUpdate = false,
}) => {
	const queryClient = useQueryClient();

	const { closeModal } = useModal();

	const warehouseNextId = isUpdate ? data?.id || '' : getNextId(data);

	const [isLoading, setIsLoading] = useState(false);
	const [warehouseId, setWarehouseId] = useState(warehouseNextId);
	const [warehouseName, setWarehouseName] = useState('');
	const [warehouseLocation, setWarehouseLocation] = useState('');

	const formData = {
		id: warehouseId,
		warehouse_name: warehouseName,
		location: warehouseLocation,
	};

	useEffect(() => {
		if (isUpdate && data) {
			setWarehouseId(data.id);
			setWarehouseName(data.warehouse_name);
			setWarehouseLocation(data.location);
		}
	}, [isUpdate, data]);

	const mutationConfig = {
		onSuccess: async () => {
			setIsLoading(false);
			setWarehouseId(warehouseNextId);
			setWarehouseName('');
			setWarehouseLocation('');
			await queryClient.invalidateQueries({ queryKey: ['warehouses'] });
			onClose();
		},
		onError: error => {
			setIsLoading(false);
			console.error('Warehouse Data submission failed', error);
		},
	};

	const { mutateAsync: addWarehouseMutation } = useMutation({
		mutationKey: ['addWarehouse:', formData.id],
		mutationFn: addWarehouse,
		...mutationConfig,
	});

	const { mutateAsync: updateWarehouseMutation } = useMutation({
		mutationKey: ['updateWarehouse:', formData.id],
		mutationFn: updateWarehouse,
		...mutationConfig,
	});

	const handleSubmit = async () => {
		setIsLoading(true);
		try {
			await new Promise(resolve => setTimeout(resolve, 1000));
			if (isUpdate) {
				await updateWarehouseMutation(formData);
			} else {
				await addWarehouseMutation(formData);
			}
		} catch (error) {
			console.error('Warehouse Data submission failed', error);
		}
	};

	return (
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
								value={warehouseId || ''}
								type="number"
								disabled={true}
							/>
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-sm font-bold uppercase">
								Warehouse Name
							</span>
							<Inputbox
								name="warehouse_name"
								placeholder="Warehouse Name"
								value={warehouseName || ''}
								onChange={e => setWarehouseName(e.target.value)}
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
							value={warehouseLocation || ''}
							onChange={e => setWarehouseLocation(e.target.value)}
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
					</div>
				</div>
			</form>
			{isLoading && (
				<Modal isOpen={true} onClose={closeModal}>
					<div className="flex w-60 flex-col gap-5 p-5">
						<div className="flex justify-center">Loading</div>
						<div>
							<p>
								{`Warehouse ${formData.id} - ${formData.warehouse_name} at ${formData.location}`}
							</p>
						</div>
					</div>
				</Modal>
			)}
		</>
	);
};

export default WarehouseForm;
