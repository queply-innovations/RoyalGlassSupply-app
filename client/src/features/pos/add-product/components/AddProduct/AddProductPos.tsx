import { useProducts } from '@/features/product/__test__';
import { DataTable } from '@/components/Tables/DataTable';
import { ProductsColsLimited } from '@/features/product/__test__/components/table';
import { Product } from '@/features/product/__test__/types';

interface ProductsTableProps {
	openModal: (data: Product, action: string) => void;
}

export const ProductsTablePos = ({ openModal }: ProductsTableProps) => {
	const { data, isLoading } = useProducts();

	// Modal handler to add product
	const handleAddProduct = () => {
		openModal({} as Product, 'add');
	};

	return (
		<div className="rounded-lg border bg-white p-4">
			<DataTable
				columns={ProductsColsLimited}
				data={data}
				filterWhat={'name'}
				dataType={'Product'}
				openModal={handleAddProduct}
				isLoading={isLoading}
			/>
		</div>
	);
};
