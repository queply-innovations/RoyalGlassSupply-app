import TransferTable from '@/features/transfer/components/TransferTable';
import { TransferDetails } from '@/features/transfer/modal/TransferDetails';
import { MainLayout } from '@/layouts/MainLayout';
import { Transfer as ITransfer } from '@/features/transfer/types';
import { useModal } from '@/utils/Modal';
import { useState } from 'react';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import { TransferEdit } from '@/features/transfer/modal/TransferEdit';
import { PendingTransferProvider } from '@/features/pending/pending-transfer/context/PendingTransferContext';
import PendingTransferTable from '@/features/pending/pending-transfer/components/PendingTransferTable';
import { PendingTransferDetails } from '@/features/pending/pending-transfer/modal/PendingTransferDetails';
import { PendingTransferEdit } from '@/features/pending/pending-transfer/modal/PendingTransferEdit';

export const PendingTransfer = () => {
	const { isOpen, openModal, closeModal } = useModal();
	const [modalAction, setModalAction] = useState<string>('');
	
	const openTransferModal = (transfers: ITransfer, action: string) => {
		openModal();
		setModalAction(action);
		console.log('action', action);
	};

	return (
		<>
			<MainLayout title="Pending Transfer">
				<PendingTransferProvider>
					<div className="flex flex-auto flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
						<div className="h-full w-full overflow-x-hidden rounded-lg border border-black/10">
							<PendingTransferTable openModal={openTransferModal} />
						</div>
					</div>
					{/* <ModalTest isOpen onClose={closeModal} title="Add Products">
						<Form onClose={closeModal} />
					</ModalTest> */}
					<ModalTest
						title={
							modalAction === 'details'
								? 'Transfer Details'
								: 'Edit Transfer'
						}
						isOpen={isOpen}
						onClose={closeModal}
					>
						<>
							{modalAction === 'details' && (
								<PendingTransferDetails onClose={closeModal} />
							)}
							{modalAction === 'edit' && (
								<PendingTransferEdit onClose={closeModal} />
							)}
						</>
					</ModalTest>
				</PendingTransferProvider>
			</MainLayout>
		</>
	);
}