import TransferTable from '@/features/transfer/components/TransferTable';
import { TransferDetails } from '@/features/transfer/modal/TransferDetails';
import { TransferForm } from '@/features/transfer/modal/TransferForm';
import { TransferProvider } from '@/features/transfer/context/TransferContext';
import { MainLayout } from '@/layouts/MainLayout';
import { Transfer as ITransfer } from '@/features/transfer/types';
import { useModal } from '@/utils/Modal';
import { useState } from 'react';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import { TransferEdit } from '@/features/transfer/modal/TransferEdit';

export const Transfer = () => {
	const { isOpen, openModal, closeModal } = useModal();
	const [modalAction, setModalAction] = useState<string>('');
	
	const openTransferModal = (transfers: ITransfer, action: string) => {
		openModal();
		setModalAction(action);
		console.log('action', action);
	};

	return (
		<>
			<MainLayout title="Transfer">
				<TransferProvider>
					<div className="flex flex-auto flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
						<div className="h-full w-full overflow-x-hidden rounded-lg border border-black/10">
							<TransferTable openModal={openTransferModal} />
						</div>
					</div>
					{/* <ModalTest isOpen onClose={closeModal} title="Add Products">
						<Form onClose={closeModal} />
					</ModalTest> */}
					<ModalTest
						title={
							modalAction === 'details'
								? 'Transfer Details'
								: modalAction === 'edit'
									? 'Edit Transfer'
									: 'Add Transfer'
						}
						isOpen={isOpen}
						onClose={closeModal}
					>
						<>
							{modalAction === 'details' && (
								<TransferDetails onClose={closeModal} />
							)}
							{modalAction === 'edit' && (
								<TransferEdit onClose={closeModal} />
							)}
							{modalAction === 'add' && (
								<TransferForm onClose={closeModal} />
							)}
						</>
					</ModalTest>
				</TransferProvider>
			</MainLayout>
		</>
	);
}