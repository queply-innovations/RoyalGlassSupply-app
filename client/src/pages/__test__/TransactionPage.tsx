import TransactionTable from '@/features/transaction/components/TransactionTable';
import { TransactionProvider } from '@/features/transaction/context/TransactionContext';
import { MainLayout } from '@/layouts/MainLayout';
import { Transaction as ITransaction } from '@/features/transaction/types';
import { useModal } from '@/utils/Modal';
import { useState } from 'react';

export const Transaction = () => {
	const { isOpen, openModal, closeModal } = useModal();
	const [modalAction, setModalAction] = useState<string>('');

	const openTransactionModal = (
		transactions: ITransaction,
		action: string,
	) => {
		openModal();
		setModalAction(action);
		console.log('action', action);
	};

	return (
		<>
			<MainLayout title="Transaction">
				<TransactionProvider>
					<div className="flex max-h-full flex-1 flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
						<div className="h-full w-full overflow-x-hidden rounded-lg border border-black/10">
							<TransactionTable openModal={openTransactionModal} />
						</div>
					</div>
				</TransactionProvider>
			</MainLayout>
		</>
	);
};
