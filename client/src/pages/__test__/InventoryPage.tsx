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

export const Inventory = () => {
	const { warehouses } = useWarehouseQuery();
	const [filterWarehouse, setFilterWarehouse] = useState(0);
	const [totalInventories, setTotalInventories] = useState<number>(0);

	// Modal handlers
	const { openModal, isOpen, closeModal } = useModal();
	const [modalAction, setModalAction] = useState<string>('');

	const modalHandler = (inventory: InventoryType, action: string) => {
		setModalAction(action);
		openModal();
	};

	return (
		<>
			<MainLayout title="Inventory">
				<InventoryProvider>
					<div className="flex h-full flex-1 flex-col gap-5 rounded-xl border border-black/10 bg-white p-4">
						<div className="ml-auto flex flex-none flex-row items-center space-x-4">
							<span className="text-sm font-medium">
								Filter warehouse:{' '}
							</span>
							{/* //* Warehouse id of zero is assumed 'all' */}
							<Select
								defaultValue="0"
								onValueChange={value =>
									setFilterWarehouse(Number(value))
								}
							>
								<SelectTrigger className="w-[300px] text-sm font-medium">
									<SelectValue placeholder="All" />
								</SelectTrigger>
								<SelectContent className="text-sm font-medium capitalize">
									<SelectItem key="all" value="0">
										All
									</SelectItem>
									{warehouses.map(warehouse => (
										<SelectItem
											key={warehouse.id}
											value={warehouse.id.toString()}
										>
											{warehouse.name} ({warehouse.code})
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="max-h-[calc(100%-4rem)] w-full flex-1 rounded-md border">
							<InventoryTable
								filterWarehouse={
									// If filterWarehouse is given (greater than 0),
									// filter the inventory data by warehouse code
									filterWarehouse > 0 ? filterWarehouse : undefined
								}
								openModal={modalHandler}
								setTotalInventories={setTotalInventories}
							/>
						</div>
					</div>

					<ModalTest
						isOpen={isOpen}
						onClose={closeModal}
						title={
							modalAction === 'add'
								? 'Add Inventory'
								: modalAction === 'view_details'
									? 'Details'
									: modalAction === 'edit'
										? 'Edit Inventory'
										: ''
						}
						closeOnOverlayClick={modalAction === 'view_details'}
					>
						<>
							{modalAction === 'add' && (
								<AddInventoryForm
									warehouses={warehouses}
									totalInventories={totalInventories}
									onClose={closeModal}
								/>
							)}
							{modalAction === 'view_details' && (
								<ViewDetails onClose={closeModal} />
							)}
							{modalAction === 'edit' && (
								<EditInventoryForm
									warehouses={warehouses}
									onClose={closeModal}
								/>
							)}
						</>
					</ModalTest>
				</InventoryProvider>
			</MainLayout>
		</>
	);
};
