import TransferTable from '@/features/transfer/components/TransferTable';
import { TransferProvider } from '@/features/transfer/context/TransferContext';
import { MainLayout } from '@/layouts/MainLayout';
import { Transfer as ITransfer } from '@/features/transfer/types';
import { useModal } from '@/utils/Modal';
import { useState } from 'react';

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
			<MainLayout title="Transaction">
				<TransferProvider>
					<div className="flex flex-auto flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
						<div className="h-full w-full overflow-x-hidden rounded-lg border border-black/10">
							<TransferTable openModal={openTransferModal} />
						</div>
					</div>
				</TransferProvider>
			</MainLayout>
		</>
	);
}