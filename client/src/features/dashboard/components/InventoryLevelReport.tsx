import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboardReportsContext } from '../context/DashboardReportsContext';
import React from 'react';
import { WarehouseIdSelect } from './select/WarehouseIdSelect';
import { DataTable } from '@/components/Tables/DataTable';
import { InventoryLevelReportCols } from './table/InventoryLevelReportCols';

export const InventoryLevelReport = () => {
	const { inventoryLevel, isInventoryLevelFetching } =
		useDashboardReportsContext();

	return (
		<>
			<Card className="flex min-h-[28rem] w-[50%] flex-col gap-4">
				<CardHeader className="flex flex-none flex-row items-center justify-between gap-4 pb-2">
					<CardTitle className="flex w-full flex-row items-center justify-between text-base font-bold">
						<span>Inventory Level</span>
						{/* <WarehouseIdSelect /> */}
					</CardTitle>
				</CardHeader>
				<CardContent className="w-full flex-1 overflow-hidden">
					{/* {isInventoryLevelFetching ? (
						<div className="h-[350px] w-full animate-pulse rounded-2xl bg-slate-200/50"></div>
					) : (
						<div className="w-full h-full overflow-auto border divide-y rounded-md">
							{Object.entries(inventoryLevel ?? {}).map(
								([inventoryCode, products], index) => (
									<React.Fragment key={`row-a${index}`}>
										<div
											key={inventoryCode}
											className="px-4 py-3 bg-slate-100/50"
										>
											<span className="text-xs font-bold text-slate-800">
												{inventoryCode}
											</span>
										</div>
										{Object.entries(products).map(
											([productName, status], index) => (
												<div
													key={`product-${index}`}
													className="grid grid-cols-2 text-xs font-medium border-b text-slate-800 last:border-b-0"
												>
													<div
														key={productName}
														className="col-span-1 px-4 py-3"
													>
														{productName}
													</div>
													<div
														key={`${productName}-${status}`}
														className="col-span-1 px-4 py-3"
													>
														{status}
													</div>
												</div>
											),
										)}
									</React.Fragment>
								),
							)}
						</div>
					)} */}
					<div className="h-full max-h-full w-full rounded-md border">
						<DataTable
							columns={InventoryLevelReportCols()}
							data={inventoryLevel}
							isLoading={isInventoryLevelFetching}
							dataType="inventory-level"
							hideFilter={true}
							hidePagination={true}
							filterWhat="product.name"
						/>
					</div>
				</CardContent>
			</Card>
		</>
	);
};
