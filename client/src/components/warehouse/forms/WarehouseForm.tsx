import { Button } from '@/components/Button';
import { Inputbox } from '@/components/Inputbox';
import { useMutation } from '@tanstack/react-query';
import { addWarehouse, getNextId, useWarehouses } from '@/utils/api/Warehouse';
import { useState } from 'react';

const WarehouseForm = () => {
	const { data } = useWarehouses();
	const warehouseNextId = getNextId(data);

	const [warehouseId, setWarehouseId] = useState(warehouseNextId);
	const [warehouseName, setWarehouseName] = useState('');
	const [warehouseLocation, setWarehouseLocation] = useState('');

	const formData = {
		id: warehouseId,
		warehouse_name: warehouseName,
		warehouse_location: warehouseLocation,
	};

	const { mutateAsync: addWarehouseMutation } = useMutation({
		mutationFn: addWarehouse,
	});

	return (
		<form
			onSubmit={() => {
				console.log(formData);
				event?.preventDefault();
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
							value={warehouseId}
							type="number"
							disabled={true}
							onChange={e => setWarehouseId(e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<span className="text-sm font-bold uppercase">
							Warehouse Name
						</span>
						<Inputbox
							name="warehouse_name"
							placeholder="Warehouse Name"
							onChange={e => setWarehouseName(e.target.value)}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-1">
					<span className="text-sm font-bold uppercase">
						Warehouse Location
					</span>
					<Inputbox
						name="warehouse_location"
						placeholder="Warehouse Location"
						type="string"
						onChange={e => setWarehouseLocation(e.target.value)}
					/>
				</div>

				<div className="flex flex-row justify-center gap-1">
					<Button fill={'green'} className="" type="submit">
						Add Warehouse
					</Button>
					<Button fill={'red'} className="" type="reset">
						Cancel
					</Button>
				</div>
			</div>
		</form>
	);
};

export default WarehouseForm;
