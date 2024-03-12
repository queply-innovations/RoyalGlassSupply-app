import { DataTable } from '@/components/Tables/DataTable';
import { useInventory } from '../../context/InventoryContext';
import { Inventory } from '../../types';
import { InventoryCols } from './columns/InventoryCols';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface InventoryTableProps {
	openModal: (data: Inventory, action: string) => void;
	filterWarehouse?: number; // this should match the warehouse id in warehouse type
}

export const InventoryTable = ({
	openModal,
	filterWarehouse,
}: InventoryTableProps) => {
	const [inventoryData, setInventoryData] = useState<Inventory[]>([]);
	const { data, isLoading, setSelectedInventory } = useInventory();
	const navigate = useNavigate();

	useEffect(() => {
		// If filterWarehouse is given, filter the inventory data by warehouse code
		if (filterWarehouse) {
			setInventoryData(
				data.filter(item => item.warehouse.id === filterWarehouse),
			);
			// If filterWarehouse is not given, set the inventory data to the data from the context
		} else {
			setInventoryData(data);
		}
	}, [data, filterWarehouse]);

	const handleAddInventory = () => {
		openModal({} as Inventory, 'add');
	};

	const handleEditInventory = (inventory: Inventory) => {
		setSelectedInventory(inventory);
		openModal(inventory, 'edit');
	};

	const handleViewItems = (inventory: Inventory) => {
		setSelectedInventory(inventory);
		navigate(`/inventory/items/${inventory.id}`); // navigate to inventory items page
	};

	const handleViewDetails = (inventory: Inventory) => {
		setSelectedInventory(inventory);
		openModal(inventory, 'view_details');
	};

	return (
		<>
			<DataTable
				columns={InventoryCols({
					handleViewItems,
					handleViewDetails,
					handleEditInventory,
				})}
				data={inventoryData}
				filterWhat={'code'}
				dataType={'Inventory'}
				openModal={handleAddInventory}
				isLoading={isLoading}
			/>
		</>
	);
};
