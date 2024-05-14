import { useNewTransfer } from '../../context/NewTransferContext';
import { AddItemButton, InventorySelect } from '../primitives';
import { useState } from 'react';

export const ItemsTab = () => {
	const {} = useNewTransfer();

	const [activeView, setActiveView] = useState<string>('table');

	return (
		<div className="flex flex-col gap-4">
			<div className="grid grid-cols-12 gap-4">
				<InventorySelect />
				<AddItemButton
					activeView={activeView}
					setActiveView={setActiveView}
				/>
			</div>

			{activeView === 'table' && (
				<div className="h-[400px] w-full bg-slate-100">
					items queue table
				</div>
			)}
			{activeView === 'form' && (
				<div className="h-[200px] w-full bg-slate-100">
					add item to queue form
				</div>
			)}
		</div>
	);
};
