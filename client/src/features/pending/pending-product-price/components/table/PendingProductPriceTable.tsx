import { DataTable } from '@/components/Tables/DataTable';
import { TooltipProvider } from '@/components/ui/tooltip';
import { PendingProductPriceColumns } from './PendingProductPriceColumns';
import { usePendingProductPrice } from '../../context/PendingProductPriceContext';
import { ProductPrices } from '@/features/product/__test__/types';
import { useProductPricesMutation } from '@/features/product/__test__/hooks';
import { toast } from 'react-toastify';

interface PendingProductPriceTableProps {
	openModal: (data: ProductPrices, action: string) => void;
	isModalOpen: boolean;
}

export const PendingProductPriceTable = ({
	openModal,
	isModalOpen,
}: PendingProductPriceTableProps) => {
	const { data, isLoading, setSelectedProductPrice } =
		usePendingProductPrice();

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

	const { handleSubmit } = useProductPricesMutation();
	const handleApproveProdPrice = (id: number) => {
		handleSubmit({
			action: 'update',
			id: id,
			data: { approval_status: 'approved' },
		})
			.then(() => toast.success('Product price approved'))
			.catch(() => toast.error('Failed to approve product price'));
	};
	const handleRejectProdPrice = (id: number) => {
		handleSubmit({
			action: 'update',
			id: id,
			data: { approval_status: 'rejected' },
		})
			.then(() => toast.success('Product price rejected'))
			.catch(() => toast.error('Failed to reject product price'));
	};

	return (
		<>
			<TooltipProvider>
				<DataTable
					columns={PendingProductPriceColumns({
						handleProdPriceDetails,
						handleEditProdPrice,
						handleApproveProdPrice,
						handleRejectProdPrice,
					})}
					data={data}
					filterWhat={'name'}
					dataType={'Listing'}
					isLoading={isLoading}
				/>
			</TooltipProvider>
		</>
	);
};
