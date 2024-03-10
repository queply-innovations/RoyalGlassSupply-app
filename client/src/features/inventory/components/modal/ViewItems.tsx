import { UseModalProps } from '@/utils/Modal';
import { InventoryProductsTable } from '../table/InventoryProductsTable';

interface ViewItemsProps {
	onClose: UseModalProps['closeModal'];
}

export const ViewItems = ({ onClose }: ViewItemsProps) => {
	return (
		<div className="w-[900px]">
			<InventoryProductsTable />
		</div>
	);
};
