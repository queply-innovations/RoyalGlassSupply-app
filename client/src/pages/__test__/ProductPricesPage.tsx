import { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import {
	ProdPriceDetails,
	ProductPricesTable,
	DeleteProdPrice,
} from '@/features/product/__test__/components';
import {
	Product as ProductType,
	ProductPrices as ProdPriceType,
} from '@/features/product/__test__/types';
import { useModal } from '@/utils/Modal';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import { ProductPricesForm } from '../../features/product/__test__/components/forms/ProductPricesForm';
// import { ProductPricesPaginatedProvider } from '@/features/product/__test__/context/ProductPricesPaginatedContext';
// import { WarehouseFilter } from '@/features/product/__test__/components/WarehouseFilter';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useWarehouseQuery } from '@/features/warehouse/__test__/hooks';
import {
	ProductPricesProvider,
	ProductsProvider,
} from '@/features/product/__test__';

export const ProductPrices = () => {
	const { warehouses } = useWarehouseQuery();
	const [filterWarehouse, setFilterWarehouse] = useState(0);

	const { isOpen, openModal, closeModal } = useModal();
	const [modalAction, setModalAction] = useState<string>('');

	// const modalHandler = (action: string) => {
	// 	setModalAction(action);
	// 	openModal();
	// };
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
				{/* <ProductPricesPaginatedProvider>
					<div className="flex h-full flex-1 flex-col gap-5 rounded-xl border border-black/10 bg-white p-4">
						<div className="ml-auto flex flex-none flex-row items-center space-x-4">
							<span className="text-sm font-medium">
								Filter warehouse:{' '}
							</span>
							<WarehouseFilter />
						</div>
						<div className="max-h-[calc(100%-4rem)] w-full flex-1 rounded-md border">
							<ProductPricesTable openModal={modalHandler} />
						</div>
					</div>
					<ModalTest
						title={
							modalAction === 'details'
								? 'Listing Details'
								: modalAction === 'edit'
									? 'Edit Listing'
									: modalAction === 'delete'
										? 'Delete Listing'
										: ''
						}
						isOpen={isOpen}
						onClose={closeModal}
						closeOnOverlayClick={modalAction === 'details'}
					>
						<>
							{modalAction === 'details' && <ProdPriceDetails />}
							{modalAction === 'edit' && (
								<ProductPricesForm onClose={closeModal} />
							)}
							{modalAction === 'delete' && (
								<DeleteProdPrice onClose={closeModal} />
							)}
						</>
					</ModalTest>
				</ProductPricesPaginatedProvider> */}
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
								modalAction === 'details'
									? 'Listing Details'
									: modalAction === 'edit'
										? 'Edit Listing'
										: modalAction === 'delete'
											? 'Delete Listing'
											: ''
							}
							isOpen={isOpen}
							onClose={closeModal}
							closeOnOverlayClick={modalAction === 'details'}
						>
							<>
								{modalAction === 'details' && <ProdPriceDetails />}
								{modalAction === 'edit' && (
									<ProductPricesForm onClose={closeModal} />
								)}
								{modalAction === 'delete' && (
									<DeleteProdPrice onClose={closeModal} />
								)}
							</>
						</ModalTest>
					</ProductPricesProvider>
				</ProductsProvider>
			</MainLayout>
		</>
	);
};
