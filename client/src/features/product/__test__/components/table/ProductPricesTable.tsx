import { DataTable } from '@/components/Tables/DataTable';
import { useProductPrices } from '../..';
import { Product, ProductPrices } from '../../types';
import { useAuth } from '@/context/AuthContext';
import { ProductPricesColumns, ProductPricesColumnsLimited } from '.';

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
	const { auth } = useAuth();
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
			<DataTable
				columns={
					// If user is a super admin or admin, show all columns
					// else, show only limited columns
					auth.role === 'super_admin' || auth.role === 'admin'
						? ProductPricesColumns({
								handleProdPriceDetails,
								handleEditProdPrice,
								handleToggleActiveStatus,
							})
						: ProductPricesColumnsLimited
				}
				data={
					filterWarehouse
						? data.filter(item => item.warehouse.id === filterWarehouse)
						: data
				}
				filterWhat={'name'}
				dataType={'Listing'}
				openModal={handleAddProdPrice}
				isLoading={isLoading}
			/>
		</>
	);
};
