import React, { FC } from 'react';

export const TopSellingProducts: FC = () => {
	return (
		<div className="flex w-[50%] flex-col items-center gap-y-5 rounded-md border-black/10 bg-white p-4 ">
			<h2 className="w-full font-bold text-slate-800">
				Top selling products
			</h2>
			<div className="h-full w-full rounded-md border border-solid">
				<table className="w-full rounded-md">
					<tbody>
						<tr>
							<th className="border-b p-2 text-[15px]">Product</th>
							<th className="border-x border-b p-2 text-[15px]">
								Quantity
							</th>
							<th className="border-b p-2 text-[15px]">Total</th>
						</tr>
						{/* <tr>
							<td
								id="TopProduct_Product"
								className="text-center table-data"
							>
								001
							</td>
							<td
								id="TopProduct_Quantity"
								className="text-center table-data border-x"
							>
								10pcs
							</td>
							<td
								id="TopProduct_Total"
								className="text-center table-data"
							>
								10pcs
							</td>
						</tr> */}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default TopSellingProducts;
