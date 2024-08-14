import { TransferProvider } from '@/features/transfer/context/TransferContext';
import TransferTable from '@/features/transfer/components/TransferTable';
import { useModal } from '@/utils/Modal';
import { useState } from 'react';
import { Transfer } from '@/features/transfer/types';
import { Navbar } from '@/features/pos/__test__/components/Navbar/Navbar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import { TransferDetails } from '@/features/transfer/modal/TransferDetails';
import { PendingTransferEdit } from '@/features/pending/pending-transfer/modal/PendingTransferEdit';
import { NewTransferProvider } from '@/features/transfer/context/NewTransferContext';
import { TransferForm2 } from '@/features/transfer/modal/TransferForm2';
import { TransferProductEdit } from '@/features/transfer/modal/TransferProductEdit';

export const TransfersPosPage = () => {
	const navigate = useNavigate();

	const { isOpen, openModal, closeModal } = useModal();
	const [modalAction, setModalAction] = useState<string>('');

	const openTransferModal = (_: Transfer, action: string) => {
		openModal();
		setModalAction(action);
	};

	return (
		<div className="flex h-screen w-screen flex-row">
			<Navbar />
			<TransferProvider>
				<div className="max-h-full w-full overflow-y-auto p-6 pt-12 text-slate-700">
					<div className="mx-auto max-w-[1250px] space-y-6">
						<div className="flex w-full flex-row items-start justify-between">
							<h1 className="text-3xl font-bold">Transfers</h1>
							<Button
								className="flex flex-row items-center gap-2 bg-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-300 hover:text-gray-700"
								onClick={() => {
									navigate('/pos/add-order');
								}}
							>
								<ChevronLeft size={20} strokeWidth={2.5} />
								Go back
							</Button>
						</div>

						<div className="max-h-full w-full flex-1 rounded-md border bg-white">
							<TransferTable openModal={openTransferModal} />
						</div>
					</div>
				</div>

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
							<PendingTransferEdit onClose={closeModal} />
						)}
						{modalAction === 'add' && (
							<NewTransferProvider>
								<TransferForm2 onClose={closeModal} />
							</NewTransferProvider>
						)}
						{modalAction === 'products' && (
							<TransferProductEdit onClose={closeModal} />
						)}
					</>
				</ModalTest>
			</TransferProvider>
		</div>
	);
};
