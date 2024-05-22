import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import React from 'react';
import { useNewTransfer } from '../../context/NewTransferContext';

interface AddItemButtonProps {
	activeView: string;
	setActiveView: React.Dispatch<React.SetStateAction<string>>;
	setEditProduct: React.Dispatch<React.SetStateAction<any>>;
}

export const AddItemButton = ({
	activeView,
	setActiveView,
	setEditProduct,
}: AddItemButtonProps) => {
	const { selectedInventory } = useNewTransfer();

	return (
		<div className="col-span-3 col-start-10 flex h-full items-end">
			<Button
				variant={'secondary'}
				disabled={!selectedInventory}
				className="w-full text-sm font-bold text-slate-800 hover:bg-slate-300"
				onClick={
					activeView === 'table'
						? () => {
								setActiveView('form');
								setEditProduct(null);
							}
						: () => setActiveView('table')
				}
			>
				<span>
					{activeView === 'table' ? (
						<span className="flex gap-2">
							<Plus size={20} /> <span>Add an item</span>
						</span>
					) : (
						<span className="flex gap-2">
							<ArrowLeft size={20} /> <span>Cancel</span>
						</span>
					)}
				</span>
			</Button>
		</div>
	);
};
