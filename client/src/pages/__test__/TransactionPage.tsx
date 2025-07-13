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
					<div className="flex h-full flex-1 flex-col gap-5 rounded-xl border border-black/10 bg-white p-4">
						<div className="max-h-[calc(100%-4rem)] w-full flex-1 rounded-md border">
							<TransactionTable openModal={openTransactionModal} />
						</div>
					</div>
				</TransactionProvider>
			</MainLayout>
		</>
	);
};
