import { DataTable } from '@/components/Tables/DataTable';
import { useInventory } from '../../context/InventoryContext';
import { Inventory } from '../../types';
import { InventoryCols } from './columns/InventoryCols';
import { useEffect, useState } from 'react';

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

	const handleEditInventory = () => {
		openModal({} as Inventory, 'edit');
	};

	const handleViewItems = (inventory: Inventory) => {
		setSelectedInventory(inventory);
		openModal(inventory, 'view_items');
	};

	const handleViewDetails = (inventory: Inventory) => {
		setSelectedInventory(inventory);
		openModal(inventory, 'view_details');
	};

	return (
		<>
			<DataTable
				columns={InventoryCols({ handleViewItems, handleViewDetails })}
				data={inventoryData}
				filterWhat={'code'}
				dataType={'Inventory'}
				openModal={handleAddInventory}
				isLoading={isLoading}
			/>
		</>
	);
};
