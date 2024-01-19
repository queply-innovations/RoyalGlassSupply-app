import { Button } from '@/components';
import { FC } from 'react';

interface ProductFormTableProps {
	data?: any;
}

export const ProductFormTable: FC<ProductFormTableProps> = ({ data }) => {
	const TableHeaders = [
		'Product ID',
		'Product Name',
		'Serial Number',
		'Quantity',
		'Capital Price',
		'Retail Price',
		'Markup Price',
		'Approval Status',
		'On Sale',
		'Sale Price',
		'Action',
	];
	return (
		<>
			<table className="overflow-y-scroll">
				<thead className="table-head border-b border-black/10 bg-white ">
					<tr>
						{TableHeaders.map(header => (
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
					{data?.map((product: any) => (
						<tr key={product.id} className="border-b border-black/10">
							<td className="py-5 text-xs font-bold uppercase">
								{product.id}
							</td>
							<td className="py-5 text-xs font-bold uppercase">
								{product.product_name}
							</td>
							<td className="py-5 text-xs font-bold uppercase">
								{product.serial_number}
							</td>
							<td className="py-5 text-xs font-bold uppercase">
								{product.quantity}
							</td>
							<td className="py-5 text-xs font-bold uppercase">
								{product.capital_price}
							</td>
							<td className="py-5 text-xs font-bold uppercase">
								{product.retail_price}
							</td>
							<td className="py-5 text-xs font-bold uppercase">
								{product.markup_price}
							</td>
							<td className="py-5 text-xs font-bold uppercase">
								{product.approval_status}
							</td>
							<td className="py-5 text-xs font-bold uppercase">
								{product.on_sale}
							</td>
							<td className="py-5 text-xs font-bold uppercase">
								{product.sale_price}
							</td>
							<td className="py-5 text-xs font-bold uppercase">
								<div className="flex flex-row gap-3">
									<div className="flex flex-row gap-3">
										<Button fill={'yellow'}>Edit</Button>
										<Button fill={'red'}>Remove</Button>
									</div>
								</div>
							</td>
						</tr>
					))}
					<tr className="items-center">
						<td></td>
					</tr>
				</tbody>
			</table>
			<Button fill={'yellow'}>Add Product</Button>
			<div className="flex justify-end">
				<Button fill={'green'}>Add Products</Button>
			</div>
		</>
	);
};
