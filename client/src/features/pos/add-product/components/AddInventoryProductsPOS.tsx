import { useAddProductPos } from '../context/AddProductPos';
import { SelectInventory } from './SelectInventory';
import { AddInventoryProducts } from './AddInventoryProduct/AddInventoryProductPos';

export const AddInventoryProductsPOS = () => {
	const { selectedInventory } = useAddProductPos();

	return (
		<div className="w-full space-y-4 rounded-lg border bg-white p-6">
			<SelectInventory />
			{selectedInventory && (
				<AddInventoryProducts inventoryId={selectedInventory.id} />
			)}
		</div>
	);
};
