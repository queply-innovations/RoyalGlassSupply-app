import { ModalTest } from '@/components/__test__/Modal/Modal';
import { Customer as ICustomer } from '@/features/customers/types';
import { UserSalesProvider } from '@/features/usersales/context/UserSalesContext';
import { MainLayout } from '@/layouts/MainLayout';
import { useModal } from '@/utils/Modal';
import { useState } from 'react';
import UserSalesTable from '@/features/usersales/components/UserSalesTable';
import { InvoicesDetails } from '@/features/customers/modal/InvoicesDetails';
import { CustomersProvider } from '@/features/customers/context/CustomersContext';
import CustomersTable from '@/features/customers/components/CustomersTable';

export const Customers = () => {
	const { isOpen, openModal, closeModal } = useModal();
	const [modalAction, setModalAction] = useState<string>('');

	const openUserInfoModal = (invoices: ICustomer, action: string) => {
		openModal();
		setModalAction(action);
	};

	return (
		<>
			<MainLayout title="Customer Sales">
				<CustomersProvider>
					<div className="flex h-full flex-1 flex-col gap-5 rounded-xl border border-black/10 bg-white p-4">
						<div className="max-h-full w-full flex-1 rounded-md border border-black/10">
							<CustomersTable openModal={openUserInfoModal} />
						</div>
					</div>
					<ModalTest
						isOpen={isOpen}
						onClose={closeModal}
						title={modalAction === 'details' ? 'Invoice Details' : ''}
						closeOnOverlayClick={modalAction === 'details'}
					>
						<>
							{modalAction === 'details' && (
								<InvoicesDetails onClose={closeModal} />
							)}
						</>
					</ModalTest>
				</CustomersProvider>
			</MainLayout>
		</>
	);
};
