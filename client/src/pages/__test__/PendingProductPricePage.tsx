import { ProductPricesProvider } from '@/features/product/__test__';
import { MainLayout } from '@/layouts/MainLayout';

export const PendingProductPrice = () => {
	return (
		<>
			<MainLayout title="Pending Product Price">
				<ProductPricesProvider>
					<div className="flex max-h-full flex-1 flex-col gap-5 rounded-lg border border-black/10 bg-white p-5"></div>
				</ProductPricesProvider>
			</MainLayout>
		</>
	);
};
