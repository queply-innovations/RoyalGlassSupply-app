import { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import { useModal } from '@/utils/Modal';
import ExpensesTable from '@/features/expenses/components/table/ExpensesTable';
import { ExpensesProvider } from '@/features/expenses/context';
import { ExpensesDetails } from '@/features/expenses/components/modal/ExpensesDetails';
import { Expenses, ExpensesRaw } from '@/features/expenses/types';
import { ExpensesAdd } from '@/features/expenses/components/modal/ExpensesAdd';

export const ExpensesPage = () => {
	// Modal handlers
	const { openModal, isOpen, closeModal } = useModal();
	const [modalAction, setModalAction] = useState<string>('');

	const modalHandler = (
		expenses: ExpensesRaw[] | Expenses,
		action: string,
	) => {
		setModalAction(action);
		openModal();
	};

	return (
		<>
			<MainLayout title="Expenses">
				<ExpensesProvider>
					<div className="flex h-full flex-1 flex-col gap-5 rounded-xl border border-black/10 bg-white p-4">
						<div className="max-h-full w-full flex-1 rounded-md border border-black/10">
							<ExpensesTable openModal={modalHandler} />
						</div>
					</div>

					<ModalTest
						isOpen={isOpen}
						onClose={closeModal}
						title={
							modalAction === 'add' ? 'Add Expenses' : 'Edit Expenses'
						}
					>
						<>
							{modalAction === 'edit' && (
								<ExpensesDetails onClose={closeModal} />
							)}
							{modalAction === 'add' && (
								<ExpensesAdd onClose={closeModal} />
							)}
						</>
					</ModalTest>
				</ExpensesProvider>
			</MainLayout>
		</>
	);
};
