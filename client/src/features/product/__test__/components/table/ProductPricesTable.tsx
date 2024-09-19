import { Product, ProductPrices, ProductPricesPOS } from '../../types';
import { ProductPricesColumns } from '.';
import { TooltipProvider } from '@/components/ui/tooltip';
// import { DataTablePagination } from '@/components/Tables/DataTablePagination';
// import { useProductPricesPaginated } from '../../context/ProductPricesPaginatedContext';
import { DataTable } from '@/components/Tables/DataTable';
import { useProductPrices } from '../../context/ProductPricesContext';

interface ProductsPricesTableProps {
	openModal: (data: ProductPrices | Product, action: string) => void;
	isModalOpen: boolean;
	filterWarehouse?: number;
}

export const ProductPricesTable = ({
	openModal,
	isModalOpen,
	filterWarehouse,
}: ProductsPricesTableProps) => {
	// const {
	// 	data: paginatedData,
	// 	isLoading,
	// 	isFetching,
	// 	pagination,
	// 	setPagination,
	// 	setSelectedProductPrice,
	// 	sorting,
	// 	setSorting,
	// } = useProductPricesPaginated();

	// // Modal handler to expand product pricing/listing details
	// const handleProdPriceDetails = (productPrice: ProductPricesPOS) => {
	// 	setSelectedProductPrice(productPrice);
	// 	openModal('details');
	// };

	// // Modal handler to edit product pricing/listing
	// const handleEditProdPrice = (productPrice: ProductPricesPOS) => {
	// 	setSelectedProductPrice(productPrice);
	// 	openModal('edit');
	// };

	// // Modal handler to delete product pricing/listing
	// const handleDeleteProdPrice = (productPrice: ProductPricesPOS) => {
	// 	setSelectedProductPrice(productPrice);
	// 	openModal('delete');
	// };

	const { data, isLoading, setSelectedProductPrice } = useProductPrices();

	// Modal handler to expand product pricing/listing details
	const handleProdPriceDetails = (productPrice: ProductPrices) => {
		setSelectedProductPrice(productPrice);
		openModal(productPrice, 'details');
	};

	// Modal handler to edit product pricing/listing
	const handleEditProdPrice = (productPrice: ProductPrices) => {
		setSelectedProductPrice(productPrice);
		openModal(productPrice, 'edit');
	};

	// Modal handler to delete product pricing/listing
	const handleDeleteProdPrice = (productPrice: ProductPrices) => {
		setSelectedProductPrice(productPrice);
		openModal(productPrice, 'delete');
	};

	return (
		<>
			<TooltipProvider>
				{/* <DataTablePagination
					data={paginatedData?.data ?? []}
					columns={ProductPricesColumns({
						handleProdPriceDetails,
						handleEditProdPrice,
						handleDeleteProdPrice,
					})}
					rowCount={paginatedData?.total ?? 0}
					pageCount={paginatedData?.last_page ?? 1}
					pagination={pagination}
					setPagination={setPagination}
					sorting={sorting}
					setSorting={setSorting}
					from={paginatedData?.from}
					to={paginatedData?.to}
					isFetching={isFetching}
					isLoading={isLoading}
				/> */}

				<DataTable
					columns={ProductPricesColumns({
						handleProdPriceDetails,
						handleEditProdPrice,
						handleDeleteProdPrice,
					})}
					data={
						filterWarehouse
							? data
									.filter(
										item => item.warehouse.id === filterWarehouse,
									)
									.sort((a, b) => {
										const dateA = new Date(
											a.updated_at ?? a.created_at,
										);
										const dateB = new Date(
											b.updated_at ?? b.created_at,
										);

										return dateB.getTime() - dateA.getTime();
									})
							: data.sort((a, b) => {
									const dateA = new Date(a.updated_at ?? a.created_at);
									const dateB = new Date(b.updated_at ?? b.created_at);

									return dateB.getTime() - dateA.getTime();
								})
					}
					filterWhat={'name'}
					dataType={'Listing'}
					isLoading={isLoading}
				/>
			</TooltipProvider>
		</>
	);
};
