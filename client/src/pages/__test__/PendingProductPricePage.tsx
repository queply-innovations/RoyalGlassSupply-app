import { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import {
	PendingProductPriceDetails,
	PendingProductPriceEdit,
	PendingProductPriceProvider,
} from '@/features/pending/pending-product-price';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { PendingProductPriceTable } from '@/features/pending/pending-product-price/components';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import { useModal } from '@/utils/Modal';
import { ProductPrices as ProdPriceType } from '@/features/product/__test__/types';
import { useWarehouseQuery } from '@/features/warehouse/__test__/hooks';

export const PendingProductPrice = () => {
	const { warehouses } = useWarehouseQuery();
	const [filterWarehouse, setFilterWarehouse] = useState(0);

	const { isOpen, openModal, closeModal } = useModal();
	const [modalAction, setModalAction] = useState<string>('');
	const modalHandler = (productPrice: ProdPriceType, action: string) => {
		setModalAction(action);
		openModal();
	};

	return (
		<>
			<MainLayout title="Pending Listing">
				<PendingProductPriceProvider>
					<div className="flex max-h-full flex-1 flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
						<div className="ml-auto flex flex-row items-center space-x-4">
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
						<div className="w-full overflow-x-hidden rounded-lg border border-black/10">
							<PendingProductPriceTable
								openModal={modalHandler}
								isModalOpen={isOpen}
								filterWarehouse={filterWarehouse}
							/>
						</div>
					</div>
					<ModalTest
						title={
							modalAction === 'details'
								? 'Price Details'
								: modalAction === 'edit'
									? 'Edit Price'
									: ''
						}
						isOpen={isOpen}
						onClose={closeModal}
						closeOnOverlayClick={
							modalAction === 'details' ||
							modalAction === 'toggle_active_stat'
						}
					>
						<>
							{modalAction === 'details' && (
								<PendingProductPriceDetails />
							)}
							{modalAction === 'edit' && (
								<PendingProductPriceEdit onClose={closeModal} />
							)}
						</>
					</ModalTest>
				</PendingProductPriceProvider>
			</MainLayout>
		</>
	);
};
