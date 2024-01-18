import { Button } from '@/components/Button';
import { Inputbox } from '@/components/Inputbox';
import LayoutWrapper from '@/layouts/Layout';
import ProductTable from './Table/ProductTable';
import { useProducts } from '@/utils/api/Products';

export const Products = () => {
	const { data: products } = useProducts();
	return (
		<>
			<LayoutWrapper>
				<div className="flex h-full flex-col gap-y-4">
					<h1 className="page-title text-primary-dark-gray text-3xl font-bold">
						Products
					</h1>
					<div className="flex flex-auto flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
						<div className="flex flex-row justify-between">
							<Inputbox
								placeholder="Search"
								variant={'searchbar'}
								buttonIcon={'outside'}
								className="w-1/2"
							/>
							<div className="flex flex-row gap-3">
								<Button fill={'green'}>Add Products</Button>
							</div>
						</div>
						<div className="h-full w-full overflow-x-hidden rounded-lg border border-black/10">
							<ProductTable data={products} />
						</div>
					</div>
				</div>
			</LayoutWrapper>
		</>
	);
};
