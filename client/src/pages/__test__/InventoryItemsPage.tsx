import { MainLayout } from '@/layouts/MainLayout';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import { useModal } from '@/utils/Modal';
import { useInventoryQueryById } from '@/features/inventory/hooks';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { InventoryProdsProvider } from '@/features/inventory/context/InventoryProdsContext';
import { InventoryProductsTable } from '@/features/inventory/components/table/InventoryProductsTable';
import { InventoryProduct } from '@/features/inventory/types';
import { AddInventoryProducts } from '@/features/inventory/components/modal/AddInventoryProduct';
import { EditInventoryProductForm } from '@/features/inventory/components/forms/EditInventoryProductForm';
import { ViewDetails } from '@/features/inventory/components/modal/inventory-products/ViewDetails';

export const InventoryItemsPage = () => {
	// Get id from url
	const { id: inventoryId } = useParams();
	// Then query for inventory by id
	const { data: inventoryItem, isLoading } = useInventoryQueryById(
		Number(inventoryId),
	);

	// Function to navigate back to prev page
	const navigate = useNavigate();
	const handleNavigateBack = () => {
		navigate(-1);
	};

	// Modal handlers
	const { openModal, isOpen, closeModal } = useModal();
	const [modalAction, setModalAction] = useState<string>('');

	const modalHandler = (inventoryItem: InventoryProduct, action: string) => {
		setModalAction(action);
		openModal();
	};

	return (
		<>
			<MainLayout title={`Inventory items`}>
				<InventoryProdsProvider>
					<div className="flex max-h-full flex-1 flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
						<div className="text-primary-dark-gray flex flex-row items-center gap-6 text-sm font-medium">
							<Button
								onClick={() => handleNavigateBack()}
								className="flex flex-row items-center gap-3 whitespace-nowrap bg-gray-200 pr-6 font-bold text-gray-700 hover:bg-gray-300 hover:text-gray-700"
							>
								<ChevronLeft size={22} strokeWidth={2.25} />
								<span>Go back</span>
							</Button>
							<div className="flex flex-row gap-2">
								<h2 className="font-bold">Inventory code:</h2>
								<span>
									{!isLoading ? inventoryItem?.code : 'Loading...'}
								</span>
							</div>
						</div>
						<div className="h-full w-full overflow-x-hidden rounded-lg">
							<InventoryProductsTable
								id={Number(inventoryId)}
								openModal={modalHandler}
							/>
						</div>
					</div>
					<ModalTest
						isOpen={isOpen}
						onClose={closeModal}
						closeOnOverlayClick={modalAction === 'view_details'}
						title={
							modalAction === 'add'
								? 'Add Items'
								: modalAction === 'edit'
									? 'Edit Item'
									: modalAction === 'view_details'
										? 'Item Details'
										: ''
						}
					>
						<>
							{modalAction === 'add' && (
								<AddInventoryProducts
									inventoryId={Number(inventoryId)}
									onClose={closeModal}
								/>
							)}
							{modalAction === 'view_details' && <ViewDetails />}
							{modalAction === 'edit' && (
								<EditInventoryProductForm onClose={closeModal} />
							)}
						</>
					</ModalTest>
				</InventoryProdsProvider>
			</MainLayout>
		</>
	);
};
