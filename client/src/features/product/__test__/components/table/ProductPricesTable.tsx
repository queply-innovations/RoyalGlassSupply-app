import { DataTable } from '@/components/Tables/DataTable';
import { useProductPrices } from '../..';
import { Product, ProductPrices } from '../../types';
import { ProductPricesColumns } from '.';
import { TooltipProvider } from '@/components/ui/tooltip';

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
										let dateA = new Date(
											a.updated_at ?? a.created_at,
										);
										let dateB = new Date(
											b.updated_at ?? b.created_at,
										);

										return dateB.getTime() - dateA.getTime();
									})
							: data.sort((a, b) => {
									let dateA = new Date(a.updated_at ?? a.created_at);
									let dateB = new Date(b.updated_at ?? b.created_at);

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
