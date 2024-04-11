import { useAddProductPos } from '..';
import { ActionButton } from '.';
import { Boxes, ClipboardList } from 'lucide-react';

export const MainMenuButtons = () => {
	const { setActiveTab } = useAddProductPos();

	return (
		<div className="mx-auto flex w-full flex-row items-center gap-4">
			<ActionButton
				title="Product Item"
				subtitle="Create new unique product..."
				icon={<Boxes size={20} strokeWidth={1.5} className="h-16 w-16" />}
				onClick={() => setActiveTab('add_product')}
			/>
			<ActionButton
				title="Inventory Product"
				subtitle="Add existing products to inventory..."
				icon={
					<ClipboardList
						size={20}
						strokeWidth={1.5}
						className="h-16 w-16"
					/>
				}
				onClick={() => setActiveTab('select_inventory')}
			/>
		</div>
	);
};
