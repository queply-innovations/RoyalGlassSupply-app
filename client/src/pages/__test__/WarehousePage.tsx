import { ModalTest } from '@/components/__test__/Modal/Modal';
import {
	WarehouseForm,
	WarehouseTable,
} from '@/features/warehouse/__test__/components/';
import { WarehouseProvider } from '@/features/warehouse/__test__/';
import { Warehouse as IWarehouse } from '@/features/warehouse/__test__/types';
import { MainLayout } from '@/layouts/MainLayout';
import { useModal } from '@/utils/Modal';
import { useState } from 'react';

export const Warehouse = () => {
	const { isOpen, openModal, closeModal } = useModal();
	const [modalAction, setModalAction] = useState<string>('');

	/**
	 * Opens the warehouse modal and sets the modal action.
	 *
	 * @param warehouse - The warehouse object.
	 * @param action - The action to be performed.
	 */
	const openWarehouseModal = (warehouse: IWarehouse, action: string) => {
		openModal();
		setModalAction(action);
		console.log('action', action);
	};

	return (
		<>
			<MainLayout title="Warehouse">
				<WarehouseProvider>
					<div className="flex flex-auto flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
						<div className="h-full w-full overflow-x-hidden rounded-lg border border-black/10">
							<WarehouseTable openModal={openWarehouseModal} />
						</div>
					</div>
					<ModalTest
						isOpen={isOpen}
						onClose={closeModal}
						title={
							modalAction === 'edit'
								? 'Edit Warehouse'
								: modalAction === 'remove'
									? 'Remove Warehouse'
									: 'Add Warehouse'
						}
					>
						<WarehouseForm
							onClose={closeModal}
							isUpdate={modalAction === 'edit' ? true : false}
							isDelete={modalAction === 'remove' ? true : false}
						/>
					</ModalTest>
				</WarehouseProvider>
			</MainLayout>
		</>
	);
};
