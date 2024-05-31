import TransferTable from '@/features/transfer/components/TransferTable';
import { TransferDetails } from '@/features/transfer/modal/TransferDetails';
import { TransferForm2 } from '@/features/transfer/modal/TransferForm2';
import { TransferProvider } from '@/features/transfer/context/TransferContext';
import { MainLayout } from '@/layouts/MainLayout';
import { Transfer as ITransfer } from '@/features/transfer/types';
import { useModal } from '@/utils/Modal';
import { useEffect, useState } from 'react';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import { TransferEdit } from '@/features/transfer/modal/TransferEdit';
import { TransferProducts } from '@/features/transfer/modal/TransferProducts';
import { NewTransferProvider } from '@/features/transfer/context/NewTransferContext';
import { TransferProductEdit } from '@/features/transfer/modal/TransferProductEdit';

export const Transfer = () => {
	const { isOpen, openModal, closeModal } = useModal();
	const [modalAction, setModalAction] = useState<string>('');

	const openTransferModal = (transfers: ITransfer, action: string) => {
		openModal();
		setModalAction(action);
		// console.log('action', action);
	};

	return (
		<>
			<MainLayout title="Transfer">
				<TransferProvider>
					<div className="flex h-full flex-1 flex-col gap-5 rounded-xl border border-black/10 bg-white p-4">
						<div className="max-h-full w-full flex-1 rounded-md border">
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
									: modalAction === 'add'
										? 'Add Transfer'
										: 'Transfer Products'
						}
						isOpen={isOpen}
						onClose={closeModal}
						closeOnOverlayClick={modalAction === 'details'}
					>
						<>
							{modalAction === 'details' && (
								<TransferDetails onClose={closeModal} />
							)}
							{modalAction === 'edit' && (
								<TransferEdit onClose={closeModal} />
							)}
							{modalAction === 'add' && (
								<NewTransferProvider>
									<TransferForm2 onClose={closeModal} />
								</NewTransferProvider>
							)}

							{modalAction === 'products' && (
								<TransferProductEdit onClose={closeModal} />
							)}
							{/* {modalAction === 'print' && (
								// <TransferProductsPrint />
								<></>
							)} */}
						</>
					</ModalTest>
				</TransferProvider>
			</MainLayout>
		</>
	);
};
