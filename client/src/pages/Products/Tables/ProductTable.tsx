/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from '@/components';
import { useModal } from '@/utils/Modal';
// import { removeProduct, useProducts, useProductsPrices } from '@/api/Products';
import { getProducts, getProductPrices } from '@/features/auth/api/getProducts'; 
//TODO: Create removeProduct, useProducts and useProductsPrices
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { ProductForm } from '@pages/Products';
import { FaPencilAlt } from 'react-icons/fa';

interface ProductsTableProps {
	data: any;
}

export const ProductTable: FC<ProductsTableProps> = ({ data }) => {
	const queryClient = useQueryClient();
	const ProductsTableHeader: string[] = [
		'Product ID',
		'Product Name',
		'Serial Number',
		'Quantity',
		'Capital Price',
		'Retail Price',
		'Markup Price',
		'On Sale',
		'Sale Price',
		'Approval Status',
		'Action',
	];

	const removeModal = useModal();
	const successModal = useModal();
	const updateModal = useModal();

	const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

	const handleUpdateModal = (product: any) => {
		setSelectedProduct(product);
		updateModal.openModal();
	};

	const handleRemoveWarehouse = (product: any) => {
		setSelectedProduct(product);
		removeModal.openModal();
	};

	// const { mutateAsync: removeProductMutation } = useMutation({
	// 	mutationKey: ['removeProduct', selectedProduct],
	// 	mutationFn: removeProduct,
	// 	onSuccess: async () => {
	// 		await queryClient.invalidateQueries({ queryKey: ['products'] });
	// 		console.log('Product Removed');
	// 		removeModal.closeModal();
	// 		successModal.openModal();
	// 	},
	// 	onError: (error: any) => {
	// 		console.error('Product Data removal failed', error);
	// 	},
	// });
	return (
		<>
			<table className="w-full overflow-y-scroll ">
				<thead className="table-head border-b border-black/10 bg-white ">
					<tr>
						{ProductsTableHeader.map(header => (
							<th
								key={header}
								className="py-5 text-xs font-bold uppercase"
							>
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="bg-primary-white overflow-y-auto">
					{data?.map((product: any) => {
						return (
							<tr key={product.id} className="text-center">
								<td className="py-2 text-xs font-normal uppercase">
									<span>{product.id}</span>
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									<span>{product.product_name}</span>
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									<span>{product.serial_number}</span>
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									<span>{product?.quantity}</span>
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									<span>{product?.capital_price}</span>
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									<span>{product?.retail_price}</span>
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									<span>{product?.markup_price}</span>
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									<span>{product?.on_sale}</span>
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									<span>{product?.sale_price}</span>
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									<span>{product?.approval_status}</span>
								</td>
								<td className="flex flex-row justify-center gap-3 py-2 text-xs font-normal uppercase">
									<Button
										fill={'empty'}
										className="flex flex-row items-center gap-2"
										textColor={'black'}
										onClick={() => handleUpdateModal(product)}
									>
										<FaPencilAlt /> Edit
									</Button>
									<Button
										fill={'red'}
										onClick={() => handleRemoveWarehouse(product)}
									>
										Remove
									</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<Modal isOpen={updateModal.isOpen} onClose={updateModal.closeModal}>
				<>
					<ProductForm
						data={selectedProduct}
						onClose={updateModal.closeModal}
						isUpdate={true}
					/>
				</>
			</Modal>
			<Modal
				isOpen={successModal.isOpen}
				onClose={() => {
					successModal.closeModal();
					setTimeout(() => {
						successModal.closeModal();
					}, 50000);
				}}
			>
				<div className="flex flex-col items-center justify-center gap-2">
					<p>
						{`Product ${selectedProduct?.product_name} successfully removed`}
					</p>
					<Button fill={'green'} onClick={successModal.closeModal}>
						Close
					</Button>
				</div>
			</Modal>
			<Modal isOpen={removeModal.isOpen} onClose={removeModal.closeModal}>
				<>
					<div className="flex flex-col gap-4">
						<p className="text-center font-bold uppercase">
							Are you sure you want to remove?
						</p>
						<span>{`Product ID: ${selectedProduct?.id}`}</span>
						<span>{`Product Name: ${selectedProduct?.product_name}`}</span>

						<div className="flex flex-row justify-center gap-1">
							<Button
								fill={'green'}
								className=""
								type="submit"
								// onClick={() =>
								// 	removeProductMutation(selectedProduct.id)
								// }
							>
								{`Remove ${selectedProduct?.product_name}`}
							</Button>
							<Button
								fill={'red'}
								className=""
								type="reset"
								onClick={removeModal.closeModal}
							>
								Cancel
							</Button>
						</div>
					</div>
				</>
			</Modal>

			{/* {isLoading && (
				<div className="flex items-center justify-center">
					Fetching Product Data...
				</div>
			)} */}
		</>
	);
};
