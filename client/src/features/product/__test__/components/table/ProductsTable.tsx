import { DataTable } from '@/components/Tables/DataTable';
import { useProducts } from '../..';
import { Product } from '../../types';
import { useAuth } from '@/context/AuthContext';
import { ProductsCols, ProductsColsLimited } from '.';

interface ProductsTableProps {
	openModal: (data: Product, action: string) => void;
}

export const ProductsTable = ({ openModal }: ProductsTableProps) => {
	const { auth } = useAuth();
	const { data, isLoading, setSelectedProduct } = useProducts();

	// Modal handler to add product
	const handleAddProduct = () => {
		openModal({} as Product, 'add');
	};

	// Modal handler to edit product
	const handleEditProduct = (product: Product) => {
		setSelectedProduct(product);
		openModal(product, 'edit');
	};

	// Modal handler to remove product
	const handleRemoveProduct = (product: Product) => {
		setSelectedProduct(product);
		openModal(product, 'remove');
	};

	return (
		<>
			<DataTable
				columns={
					auth?.role === 'super_admin' || auth?.role === 'admin'
						? ProductsCols({ handleEditProduct, handleRemoveProduct })
						: ProductsColsLimited
				}
				data={data}
				filterWhat={'name'}
				dataType={'Product'}
				openModal={handleAddProduct}
				isLoading={isLoading}
			/>
		</>
	);
};
