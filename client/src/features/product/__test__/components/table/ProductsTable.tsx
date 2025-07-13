import { DataTable } from '@/components/Tables/DataTable';
import { useProducts } from '../..';
import { Product } from '../../types';
import { useAuth } from '@/context/AuthContext';
import { ProductsCols, ProductsColsLimited } from '.';

interface ProductsTableProps {
	openModal: (data: Product, action: string) => void;
}

export const ProductsTable = ({ openModal }: ProductsTableProps) => {
	const { auth, permissionListNames } = useAuth();
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

	const handleDeleteProduct = (product: Product) => {
		setSelectedProduct(product);
		openModal(product, 'delete');
	};

	return (
		<>
			<DataTable
				columns={
					auth?.role === 'super_admin' || auth?.role === 'admin'
						? ProductsCols({
								handleEditProduct,
								handleDeleteProduct,
							})
						: ProductsColsLimited
				}
				data={data.sort((a, b) => b.id - a.id)} // Sort by id, highest first
				filterWhat={'name'}
				dataType={'Product'}
				openModal={
					permissionListNames?.includes('add_product')
						? handleAddProduct
						: undefined
				}
				isLoading={isLoading}
			/>
		</>
	);
};
