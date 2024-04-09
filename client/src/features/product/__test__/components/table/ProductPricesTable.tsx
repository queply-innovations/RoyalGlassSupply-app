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

	const handleAddProdPrice = () => {
		openModal({} as Product, 'add');
	};

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

	// Modal handler to remove product pricing/listing
	const handleToggleActiveStatus = (productPrice: ProductPrices) => {
		setSelectedProductPrice(productPrice);
		openModal(productPrice, 'toggle_active_stat');
	};

	return (
		<>
			<TooltipProvider>
				<DataTable
					columns={ProductPricesColumns({
						handleProdPriceDetails,
						handleEditProdPrice,
						handleToggleActiveStatus,
					})}
					data={
						filterWarehouse
							? data.filter(
									item => item.warehouse.id === filterWarehouse,
								)
							: data
					}
					filterWhat={'name'}
					dataType={'Listing'}
					openModal={handleAddProdPrice}
					isLoading={isLoading}
				/>
			</TooltipProvider>
		</>
	);
};
