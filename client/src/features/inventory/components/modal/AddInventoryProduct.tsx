import { useState } from 'react';
import { InventoryProductDatabase } from '../../types';
import { Button } from '@/components/ui/button';
import { AddInventoryProductForm } from '../forms/AddInventoryProductForm';
import { motion as m, AnimatePresence } from 'framer-motion';
import { Plus, ChevronLeft } from 'lucide-react';
import { useProductQuery } from '@/features/product/__test__/hooks';
import { useSupplierQuery } from '@/features/supplier/__test__/hooks';
import { useInventoryProdsMutation } from '../../hooks';
import { AddInventoryProductTable } from '../table/AddInventoryProductTable';
import { useAuth } from '@/context/AuthContext';

interface AddInventoryProductProps {
	onClose: () => void;
	inventoryId: number;
}

// Custom type for the queue of products to be added to the inventory
export interface InventoryProductsQueueProps {
	id: number;
	data: Partial<InventoryProductDatabase>;
}

// Animation variant props of the table and form
const tableAnimation = {
	hidden: { opacity: 0, x: '-100%' },
	animate: {
		opacity: 1,
		x: '0%',
		transition: { duration: 0.3, ease: 'easeInOut' },
	},
	exit: {
		opacity: 0,
		x: '-100%',
		transition: { duration: 0.3, ease: 'easeInOut' },
	},
};

const formAnimation = {
	hidden: { opacity: 0, x: '100%' },
	animate: {
		opacity: 1,
		x: '0%',
		transition: { duration: 0.3, ease: 'easeInOut' },
	},
	exit: {
		opacity: 0,
		x: '100%',
		transition: { duration: 0.3, ease: 'easeInOut' },
	},
};

export const AddInventoryProducts = ({
	onClose,
	inventoryId,
}: AddInventoryProductProps) => {
	const { auth } = useAuth();
	// Query and state handlers for PRODUCTS and SUPPLIERS
	const { data: products, isLoading: productsLoading } = useProductQuery();
	const { suppliers, isFetching: suppliersLoading } = useSupplierQuery();
	const { handleSubmit } = useInventoryProdsMutation();

	const [inventoryProductsQueue, setInventoryProductsQueue] = useState<
		InventoryProductsQueueProps[]
	>([]);
	const [selectedProduct, setSelectedProduct] =
		useState<InventoryProductsQueueProps>({} as InventoryProductsQueueProps);

	const [activeTab, setActiveTab] = useState<string>('main');

	// Function to handle navigation between table and form
	const handleNavigation = () => {
		setSelectedProduct({} as InventoryProductsQueueProps); // Should clear selectedProduct state when navigating
		setActiveTab(activeTab === 'main' ? 'form' : 'main');
	};

	// Function to handle editing an item in the queue
	const handleEditItem = (item: InventoryProductsQueueProps) => {
		setSelectedProduct(item);
		setActiveTab('form'); // Navigate to the form
	};

	// Function to remove an item from the queue
	const handleRemoveItem = (id: number) => {
		setInventoryProductsQueue(prev => prev.filter(item => item.id !== id));
	};

	return (
		<>
			<div className="flex flex-col gap-4">
				<div className={activeTab === 'main' ? 'ml-auto' : ''}>
					<Button
						className="flex flex-row items-center gap-2 bg-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-300 hover:text-gray-700"
						onClick={() => {
							handleNavigation();
						}}
					>
						<>
							{activeTab === 'main' ? (
								<Plus size={20} strokeWidth={2.5} />
							) : (
								<ChevronLeft size={20} strokeWidth={2.5} />
							)}
							{activeTab === 'main' ? 'Add an item' : 'Back'}
						</>
					</Button>
				</div>

				<div
					className={`relative min-w-[650px] overflow-x-clip transition-all duration-300 
					${
						activeTab === 'form'
							? auth.role === 'admin' || auth.role === 'super_admin'
								? 'min-h-[558px]'
								: 'min-h-[490px]'
							: 'min-h-[490px]'
					}`}
				>
					<AnimatePresence initial={false}>
						{activeTab === 'main' ? (
							<m.div
								key={'main'}
								variants={tableAnimation}
								initial="hidden"
								animate="animate"
								exit="exit"
								className="absolute h-full w-full overflow-x-auto antialiased"
							>
								<AddInventoryProductTable
									data={inventoryProductsQueue}
									products={products}
									suppliers={suppliers}
									handleEditItem={handleEditItem}
									handleRemoveItem={handleRemoveItem}
									handleSubmit={handleSubmit}
									onClose={onClose}
								/>
							</m.div>
						) : (
							<m.div
								key={'form'}
								variants={formAnimation}
								initial="hidden"
								animate="animate"
								exit="exit"
								className="absolute max-h-[642px] w-full p-1"
							>
								<AddInventoryProductForm
									// onClose={onClose}
									setInventoryProductsQueue={setInventoryProductsQueue}
									inventoryId={inventoryId}
									products={products}
									productsLoading={productsLoading}
									suppliers={suppliers}
									suppliersLoading={suppliersLoading}
									currentId={
										// Get the highest id in the queue
										// Used to avoid duplicate id, after removing items
										inventoryProductsQueue.reduce(
											(acc, curr) => (curr.id > acc ? curr.id : acc),
											0,
										)
									}
									handleNavigation={handleNavigation}
									selectedProduct={
										// If selectedProduct is not empty, pass it to the form
										Object.keys(selectedProduct).length
											? selectedProduct
											: undefined
									}
								/>
							</m.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</>
	);
};
