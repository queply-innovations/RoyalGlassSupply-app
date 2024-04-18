import { useState } from 'react';
import { ProductPricesProvider } from '@/features/product/__test__/context/ProductPricesContext';
import { MainLayout } from '@/layouts/MainLayout';
import {
	Product as ProductType,
	ProductPrices as ProdPriceType,
} from '@/features/product/__test__/types';
import {
	ProdPriceDetails,
	ProdPriceActiveToggle,
	ProductPricesTable,
} from '@/features/product/__test__/components';
import { useModal } from '@/utils/Modal';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import { ProductPricesForm } from '../../features/product/__test__/components/forms/ProductPricesForm';
import { AddProductPrice } from '@/features/product/__test__/components';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useWarehouseQuery } from '@/features/warehouse/__test__/hooks';
import { ProductsProvider } from '@/features/product/__test__/context/ProductContext';

export const ProductPrices = () => {
	const { warehouses } = useWarehouseQuery();
	const [filterWarehouse, setFilterWarehouse] = useState(0);

	const { isOpen, openModal, closeModal } = useModal();
	const [modalAction, setModalAction] = useState<string>('');

	const modalHandler = (
		productPrice: ProdPriceType | ProductType,
		action: string,
	) => {
		setModalAction(action);
		openModal();
	};

	return (
		<>
			<MainLayout title="Product Listings">
				<ProductsProvider>
					<ProductPricesProvider>
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
								<ProductPricesTable
									openModal={modalHandler}
									isModalOpen={isOpen}
									filterWarehouse={
										// If filterWarehouse is given (greater than 0),
										// filter the inventory data by warehouse code
										filterWarehouse > 0 ? filterWarehouse : undefined
									}
								/>
							</div>
						</div>
						<ModalTest
							title={
								modalAction === 'add'
									? 'Add Listing'
									: modalAction === 'details'
										? 'Listing Details'
										: modalAction === 'edit'
											? 'Edit Listing'
											: modalAction === 'toggle_active_stat'
												? 'Toggle Active Status'
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
								{modalAction === 'add' && (
									<AddProductPrice onClose={closeModal} />
								)}
								{modalAction === 'details' && <ProdPriceDetails />}
								{modalAction === 'edit' && (
									<ProductPricesForm onClose={closeModal} />
								)}
								{modalAction === 'toggle_active_stat' && (
									<ProdPriceActiveToggle onClose={closeModal} />
								)}
							</>
						</ModalTest>
					</ProductPricesProvider>
				</ProductsProvider>
			</MainLayout>
		</>
	);
};
