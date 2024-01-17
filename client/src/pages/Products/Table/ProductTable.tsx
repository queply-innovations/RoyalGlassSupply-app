/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';

interface ProductsTableProps {
	data: any;
}

const ProductTable: FC<ProductsTableProps> = ({ data }) => {
	const ProductsTableHeader: string[] = [
		'Product ID',
		'Product Name',
		'Serial Number',
		'Size',
		'Color',
		'Action',
	];
	return (
		<>
			<table className="w-full overflow-y-scroll">
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
				<tbody className="bg-primary-white h-full overflow-y-auto">
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
									<span>{product.size}</span>
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									<span>{product.color}</span>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

export default ProductTable;
