import { useState } from 'react';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import { InventoryProvider } from '@/features/inventory/context';
import { PendingInventoryProductProvider } from '@/features/pending/pending-inventory-product';
import { PendingInventoryProductTable } from '@/features/pending/pending-inventory-product/components/table/PendingInventoryProductTable';
import { MainLayout } from '@/layouts/MainLayout';
import { useModal } from '@/utils/Modal';
import { ViewDetails } from '@/features/pending/pending-inventory-product/components/modal/ViewDetails';
import { ApproveInventoryProductPending } from '@/features/pending/pending-inventory-product/components/modal/ApproveInventoryProductPending';
import { EditPendingInventoryProductForm } from '@/features/pending/pending-inventory-product/components/modal/EditPendingInventoryProduct';

export const PendingInventoryProduct = () => {
	const { isOpen, openModal, closeModal } = useModal();
	const [modalAction, setModalAction] = useState<string>('');
	const modalHandler = (productPrice: any, action: string) => {
		setModalAction(action);
		openModal();
	};
	return (
		<>
			<MainLayout title="Pending Inventory Products">
				<PendingInventoryProductProvider>
					<InventoryProvider>
						<div className="flex h-full flex-1 flex-col gap-5 rounded-xl border border-black/10 bg-white p-4">
							<div className="max-h-full w-full flex-1 rounded-md border">
								<PendingInventoryProductTable
									openModal={modalHandler}
								/>
							</div>
						</div>
						<ModalTest
							title={
								modalAction === 'add'
									? 'Add Items'
									: modalAction === 'edit'
										? 'Edit Item'
										: modalAction === 'view_details'
											? 'Item Details'
											: ''
							}
							isOpen={isOpen}
							onClose={closeModal}
							closeOnOverlayClick={modalAction === 'view_details'}
						>
							<>
								{modalAction === 'view_details' && <ViewDetails />}
								{modalAction === 'edit' && (
									<EditPendingInventoryProductForm
										onClose={closeModal}
									/>
								)}
								{modalAction === 'approve' && (
									<ApproveInventoryProductPending
										onClose={closeModal}
									/>
								)}
							</>
						</ModalTest>
					</InventoryProvider>
				</PendingInventoryProductProvider>
			</MainLayout>
		</>
	);
};
