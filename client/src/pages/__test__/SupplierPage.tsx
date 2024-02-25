import { Button, Inputbox } from '@/components';
import { ModalTest } from '@/components/__test__/Modal/Modal';
// import { SupplierForm } from '@/features/supplier/__test__/components/SupplierForm';
//TODO: Create SupplierForm
import { SupplierTable } from '@/features/supplier/__test__/components/SupplierTable';
import { SupplierProvider } from '@/features/supplier/__test__/context/SupplierContext';
import { Supplier as ISupplier } from '@/features/supplier/types';
import { MainLayout } from '@/layouts/MainLayout';
import { useModal } from '@/utils/Modal';
import { useState } from 'react';
import { set } from 'react-hook-form';

export const Supplier = () => {
	const { isOpen, openModal, closeModal } = useModal();
	const [modalAction, setModalAction] = useState<string>('');

	const openEditModal = (supplier: ISupplier, action: string) => {
		openModal();
		setModalAction(action);
	};

	const openAddModal = () => {
		openModal();
		setModalAction('add');
	};

	const openSupplierModal = (supplier: ISupplier, action: string) => {
		openModal();
		setModalAction(action);
		console.log('action', action);
	};

	return (
		<>
			<MainLayout title="Supplier">
				<SupplierProvider>
					<div className="flex flex-auto flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
						<div className="h-full w-full overflow-x-hidden rounded-lg border border-black/10">
							<SupplierTable openModal={openSupplierModal} />
						</div>
					</div>
					{/* <ModalTest
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
						<SupplierForm
							onClose={closeModal}
							isUpdate={modalAction === 'edit' ? true : false}
							isDelete={modalAction === 'remove' ? true : false}
						/>
					</ModalTest> */}
				</SupplierProvider>
			</MainLayout>
		</>
	);
};