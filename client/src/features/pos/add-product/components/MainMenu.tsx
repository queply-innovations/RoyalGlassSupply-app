import { useAddProductPos } from '..';
import { ActionButton } from '.';
import { ClipboardCheck, ClipboardPlus } from 'lucide-react';

export const MainMenu = () => {
	const { setActiveTab } = useAddProductPos();

	return (
		<div className="mx-auto flex w-full flex-row items-center gap-4">
			<ActionButton
				title="Existing inventory"
				subtitle="Add products to existing inventory..."
				icon={
					<ClipboardCheck
						size={20}
						strokeWidth={1.5}
						className="h-16 w-16"
					/>
				}
				onClick={() => setActiveTab('select_inventory')}
			/>
			<ActionButton
				title="Add new inventory"
				subtitle="Create new inventory to add products to..."
				icon={
					<ClipboardPlus
						size={20}
						strokeWidth={1.5}
						className="h-16 w-16"
					/>
				}
				onClick={() => setActiveTab('add_new_inventory')}
			/>
		</div>
	);
};
