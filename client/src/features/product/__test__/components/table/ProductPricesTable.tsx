import { ProductPricesPOS } from '../../types';
import { ProductPricesColumns } from '.';
import { TooltipProvider } from '@/components/ui/tooltip';
import { DataTablePagination } from '@/components/Tables/DataTablePagination';
import { useProductPricesPaginated } from '../../context/ProductPricesPaginatedContext';

interface ProductsPricesTableProps {
	openModal: (action: string) => void;
}

export const ProductPricesTable = ({ openModal }: ProductsPricesTableProps) => {
	const {
		data: paginatedData,
		isLoading,
		isFetching,
		pagination,
		setPagination,
		setSelectedProductPrice,
		sorting,
		setSorting,
	} = useProductPricesPaginated();

	// Modal handler to expand product pricing/listing details
	const handleProdPriceDetails = (productPrice: ProductPricesPOS) => {
		setSelectedProductPrice(productPrice);
		openModal('details');
	};

	// Modal handler to edit product pricing/listing
	const handleEditProdPrice = (productPrice: ProductPricesPOS) => {
		setSelectedProductPrice(productPrice);
		openModal('edit');
	};

	// Modal handler to delete product pricing/listing
	const handleDeleteProdPrice = (productPrice: ProductPricesPOS) => {
		setSelectedProductPrice(productPrice);
		openModal('delete');
	};

	return (
		<>
			<TooltipProvider>
				<DataTablePagination
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
				/>
			</TooltipProvider>
		</>
	);
};
