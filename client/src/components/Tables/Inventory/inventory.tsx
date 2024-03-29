import React, { FC } from 'react';

export const InventoryTable: FC = () => {
	return (
		<div className="flex w-full max-w-[70%] flex-col items-start gap-y-5 rounded-md border-black/10 bg-white p-4 ">
			<h2 className="text-base font-bold uppercase text-black ">
				Inventory Level
			</h2>
			<div className="h-full w-full rounded-md border border-solid">
				<table className="w-full rounded-md">
					<tbody>
						<tr className="border-y">
							<th className="p-2 text-[15px]">Product ID</th>
							<th className="p-2 text-[15px]">Product Name</th>
							<th className="p-2 text-[15px]">Dimensions</th>
							<th className="p-2 text-[15px]">Warehouse</th>
							<th className="p-2 text-[15px]">QTY</th>
							<th className="p-2 text-[15px]">Alert Qty</th>
						</tr>
						<tr>
							<td id="Product_ID" className="table-data text-center">
								001
							</td>
							<td
								id="Product_Name"
								className="table-data border-x text-center"
							>
								10pcs
							</td>
							<td
								id="Product_Dimensions"
								className="table-data border-x text-center"
							>
								6x12
							</td>
							<td
								id="Product_Warehouse"
								className="table-data border-x text-center"
							>
								CDO
							</td>
							<td
								id="Product_Quantity"
								className="table-data border-x text-center"
							>
								10pcs
							</td>
							<td id="Product_Alert" className="table-data text-center">
								10pcs
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default InventoryTable;
