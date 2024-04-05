import { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import { useModal } from '@/utils/Modal';
import { useWarehouseQuery } from '@/features/warehouse/__test__/hooks';
import { Inventory as InventoryType } from '@/features/inventory/types';
import { InventoryProvider } from '@/features/inventory/context/InventoryContext';
import { InventoryTable } from '@/features/inventory/components/table/InventoryTable';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { AddInventoryForm } from '@/features/inventory/components/forms/AddInventoryForm';
import { ViewDetails } from '@/features/inventory/components/modal/ViewDetails';
import { EditInventoryForm } from '@/features/inventory/components/forms/EditInventoryForm';
import { Invoice } from '@/features/expenses/types';
import ExpensesTable from '@/features/expenses/components/table/ExpensesTable';
import { ExpensesProvider } from '@/features/expenses/context';

export const Expenses = () => {

	// Modal handlers
	const { openModal, isOpen, closeModal } = useModal();
	const [modalAction, setModalAction] = useState<string>('');

	const modalHandler = (invoice: Invoice[], action: string) => {
		setModalAction(action);
		openModal();
	};

	return (
		<>
			<MainLayout title="Expenses">
				<ExpensesProvider>
					<div className="flex max-h-full flex-1 flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
						<div className="w-full overflow-x-hidden rounded-lg border border-black/10">
							<ExpensesTable openModal={modalHandler} />
						</div>
					</div>

					<ModalTest
						isOpen={isOpen}
						onClose={closeModal}
						title={'Add Expenses'}
					>
						<>
							{/* {modalAction === 'add' && (
								<AddInventoryForm
									warehouses={warehouses}
									onClose={closeModal}
								/>
							)} */}
							{/* {modalAction === 'view_details' && (
								<ViewDetails onClose={closeModal} />
							)}
							{modalAction === 'edit' && (
								<EditInventoryForm
									warehouses={warehouses}
									onClose={closeModal}
								/>
							)} */}
						</>
					</ModalTest>
				</ExpensesProvider>
			</MainLayout>
		</>
	);
};
