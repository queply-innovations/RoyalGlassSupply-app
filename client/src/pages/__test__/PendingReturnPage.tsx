import { MainLayout } from '@/layouts/MainLayout';
import { ReturnTransactionsRaw as IReturn } from '@/features/pending/pending-return/types';
import { useModal } from '@/utils/Modal';
import { useState } from 'react';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import { ReturnProvider } from '@/features/pending/pending-return/context';
import PendingReturnTable from '@/features/pending/pending-return/components/PendingReturnTable';
import { PendingReturnDetails } from '@/features/pending/pending-return/modal/PendingReturnDetails';
import { PendingReturnEdit } from '@/features/pending/pending-return/modal/PendingReturnEdit';

export const PendingReturn = () => {
	const { isOpen, openModal, closeModal } = useModal();
	const [modalAction, setModalAction] = useState<string>('');

	const openReturnModal = (returns: IReturn, action: string) => {
		openModal();
		setModalAction(action);
		console.log('action', action);
	};

	return (
		<>
			<MainLayout title="Pending Return">
				<ReturnProvider>
					<div className="flex max-h-full flex-1 flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
						<div className="h-full w-full overflow-x-hidden rounded-lg border border-black/10">
							<PendingReturnTable openModal={openReturnModal} />
						</div>
					</div>
					{/* <ModalTest isOpen onClose={closeModal} title="Add Products">
						<Form onClose={closeModal} />
					</ModalTest> */}
					<ModalTest
						title={
							modalAction === 'details'
								? 'Return Details'
								: 'Approve Return'
						}
						isOpen={isOpen}
						onClose={closeModal}
					>
						<>
							{modalAction === 'details' && (
								<PendingReturnDetails onClose={closeModal} />
							)}
							
							{modalAction === 'edit' && (
								<PendingReturnEdit onClose={closeModal} />
							)}
						</>
					</ModalTest>
				</ReturnProvider>
			</MainLayout>
		</>
	);
};