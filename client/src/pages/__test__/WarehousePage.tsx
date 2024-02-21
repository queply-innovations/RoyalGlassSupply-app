import { Button, Inputbox } from '@/components';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import WarehouseForm from '@/features/warehouse/__test__/components/WarehouseForm';
import { WarehouseTable } from '@/features/warehouse/__test__/components/WarehouseTable';
import { WarehouseProvider } from '@/features/warehouse/__test__/context/WarehouseContext';
import { Warehouse as IWarehouse } from '@/features/warehouse/__test__/types';
import { MainLayout } from '@/layouts/MainLayout';
import { useModal } from '@/utils/Modal';
import { useState } from 'react';
import { set } from 'react-hook-form';
// import { MainLayout } from '@/layouts/MainLayout';

export const Warehouse = () => {
	const { isOpen, openModal, closeModal } = useModal();
	const [modalAction, setModalAction] = useState<string>('');

	const openEditModal = (warehouses: IWarehouse, action: string) => {
		openModal();
		setModalAction(action);
	};

	const openAddModal = () => {
		openModal();
		setModalAction('add');
	};

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
