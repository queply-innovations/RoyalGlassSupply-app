import { ModalTest } from '@/components/__test__/Modal/Modal';
import { UserSales as IUserSales } from '@/features/usersales/types';
import { UserSalesProvider } from '@/features/usersales/context/UserSalesContext';
import { MainLayout } from '@/layouts/MainLayout';
import { useModal } from '@/utils/Modal';
import { useState } from 'react';
import UserSalesTable from '@/features/usersales/components/UserSalesTable';
import { InvoicesDetails } from '@/features/usersales/modal/InvoicesDetails';

export const UserSales = () => {
	const { isOpen, openModal, closeModal } = useModal();
	const [modalAction, setModalAction] = useState<string>('');

	const openUserInfoModal = (invoices: IUserSales, action: string) => {
		openModal();
		setModalAction(action);
	};

	return (
		<>
			<MainLayout title="User Sales">
				<UserSalesProvider>
					<div className="flex max-h-full flex-1 flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
						<div className="h-full w-full overflow-x-hidden rounded-lg border border-black/10">
							<UserSalesTable openModal={openUserInfoModal} />
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
				</UserSalesProvider>
			</MainLayout>
		</>
	);
};
