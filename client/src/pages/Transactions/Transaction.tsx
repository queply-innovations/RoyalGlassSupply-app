import { Inputbox } from '@/components/Inputbox';
import LayoutWrapper from '@/layouts/Layout';
import TransactionTable from '@/components/Tables/Transaction/Transaction';
import { Button } from '@/components/Button';

export const Transaction = () => {
	return (
		<>
			<LayoutWrapper>
				<div className="flex h-[100%] flex-col gap-y-4">
					<h1 className="page-title text-primary-dark-gray text-3xl font-bold">
						Add Transaction
					</h1>
					<div className="flex flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
						<div className="flex flex-row justify-between">
							<Inputbox
								placeholder="Search"
								variant={'searchbar'}
								buttonIcon={'outside'}
								className="w-1/2"
							/>
						</div>
					</div>
					<div className="flex h-[80%] w-full rounded-lg">
						<TransactionTable />
						<div className="bg-primary-white flex h-[88%] w-[25%] flex-col items-center justify-between rounded-md border border-black/10 p-4">
							<table className="h-[80%] flex w-full flex-1 flex-col w-full rounded-md overflow-y-auto px-2">
								<tbody>
									<tr className="flex w-full flex-1 flex-col w-full bg-primary-white sticky top-0">
										<th className="border-b-2 add-transfer-receipt-title font-Inter text-base font-light items-center uppercase pb-2">
											Item Review
										</th>
									</tr>

									{/* <div className="add-transaction-receipt-table  w-full "> */}
										<tr className="flex w-full flex-1 justify-between w-full pt-2">
											<td id="Product_Type" className="table-data">
												Aluminum
											</td>

											<td id="Product_Quantity" className="table-data">
												(x100)
											</td>

											<td id="Product_TotalPrice" className="table-data">
												PHP 100 000
											</td>
										</tr>

										<tr className="flex w-full flex-1 justify-between w-full pt-2">
											<td id="Product_Type" className="table-data">
												Aluminum
											</td>

											<td id="Product_Quantity" className="table-data">
												(x100)
											</td>

											<td id="Product_TotalPrice" className="table-data">
												PHP 100 000
											</td>
										</tr>

										<tr className="flex w-full flex-1 justify-between w-full pt-2">
											<td id="Product_Type" className="table-data">
												Aluminum
											</td>

											<td id="Product_Quantity" className="table-data">
												(x100)
											</td>

											<td id="Product_TotalPrice" className="table-data">
												PHP 100 000
											</td>
										</tr>

										<tr className="flex w-full flex-1 justify-between w-full pt-2">
											<td id="Product_Type" className="table-data">
												Aluminum
											</td>

											<td id="Product_Quantity" className="table-data">
												(x100)
											</td>

											<td id="Product_TotalPrice" className="table-data">
												PHP 100 000
											</td>
										</tr>

										<tr className="flex w-full flex-1 justify-between w-full pt-2">
											<td id="Product_Type" className="table-data">
												Aluminum
											</td>

											<td id="Product_Quantity" className="table-data">
												(x100)
											</td>

											<td id="Product_TotalPrice" className="table-data">
												PHP 100 000
											</td>
										</tr>

										<tr className="flex w-full flex-1 justify-between w-full pt-2">
											<td id="Product_Type" className="table-data">
												Aluminum
											</td>

											<td id="Product_Quantity" className="table-data">
												(x100)
											</td>

											<td id="Product_TotalPrice" className="table-data">
												PHP 100 000
											</td>
										</tr>

										<tr className="flex w-full flex-1 justify-between w-full pt-2">
											<td id="Product_Type" className="table-data">
												Aluminum
											</td>

											<td id="Product_Quantity" className="table-data">
												(x100)
											</td>

											<td id="Product_TotalPrice" className="table-data">
												PHP 100 000
											</td>
										</tr>

										<tr className="flex w-full flex-1 justify-between w-full pt-2">
											<td id="Product_Type" className="table-data">
												Aluminum
											</td>

											<td id="Product_Quantity" className="table-data">
												(x100)
											</td>

											<td id="Product_TotalPrice" className="table-data">
												PHP 100 000
											</td>
										</tr>

										<tr className="flex w-full flex-1 justify-between w-full pt-2">
											<td id="Product_Type" className="table-data">
												Aluminum
											</td>

											<td id="Product_Quantity" className="table-data">
												(x100)
											</td>

											<td id="Product_TotalPrice" className="table-data">
												PHP 100 000
											</td>
										</tr>

										<tr className="flex w-full flex-1 justify-between w-full pt-2">
											<td id="Product_Type" className="table-data">
												Aluminum
											</td>

											<td id="Product_Quantity" className="table-data">
												(x100)
											</td>

											<td id="Product_TotalPrice" className="table-data">
												PHP 100 000
											</td>
										</tr>

										<tr className="flex w-full flex-1 justify-between w-full pt-2">
											<td id="Product_Type" className="table-data">
												Aluminum
											</td>

											<td id="Product_Quantity" className="table-data">
												(x100)
											</td>

											<td id="Product_TotalPrice" className="table-data">
												PHP 100 000
											</td>
										</tr>

										<tr className="flex w-full flex-1 justify-between w-full pt-2">
											<td id="Product_Type" className="table-data">
												Aluminum
											</td>

											<td id="Product_Quantity" className="table-data">
												(x100)
											</td>

											<td id="Product_TotalPrice" className="table-data">
												PHP 100 000
											</td>
										</tr>

										<tr className="flex w-full flex-1 justify-between w-full pt-2">
											<td id="Product_Type" className="table-data">
												Aluminum
											</td>

											<td id="Product_Quantity" className="table-data">
												(x100)
											</td>

											<td id="Product_TotalPrice" className="table-data">
												PHP 100 000
											</td>
										</tr>

										<tr className="flex w-full flex-1 justify-between w-full pt-2">
											<td id="Product_Type" className="table-data">
												Aluminum
											</td>

											<td id="Product_Quantity" className="table-data">
												(x100)
											</td>

											<td id="Product_TotalPrice" className="table-data">
												PHP 100 000
											</td>
										</tr>

										<tr className="flex w-full flex-1 justify-between w-full pt-2">
											<td id="Product_Type" className="table-data">
												Aluminum
											</td>

											<td id="Product_Quantity" className="table-data">
												(x100)
											</td>

											<td id="Product_TotalPrice" className="table-data">
												PHP 100 000
											</td>
										</tr>

										<tr className="flex w-full flex-1 justify-between w-full pt-2">
											<td id="Product_Type" className="table-data">
												Aluminum
											</td>

											<td id="Product_Quantity" className="table-data">
												(x100)
											</td>

											<td id="Product_TotalPrice" className="table-data">
												PHP 100 000
											</td>
										</tr>

										<tr className="flex w-full flex-1 justify-between w-full pt-2">
											<td id="Product_Type" className="table-data">
												Aluminum
											</td>

											<td id="Product_Quantity" className="table-data">
												(x100)
											</td>

											<td id="Product_TotalPrice" className="table-data">
												PHP 100 000
											</td>
										</tr>

										<tr className="flex w-full flex-1 justify-between w-full pt-2">
											<td id="Product_Type" className="table-data">
												Aluminum
											</td>

											<td id="Product_Quantity" className="table-data">
												(x100)
											</td>

											<td id="Product_TotalPrice" className="table-data">
												PHP 100 000
											</td>
										</tr>

										<tr className="flex w-full flex-1 justify-between w-full pt-2">
											<td id="Product_Type" className="table-data">
												Aluminum
											</td>

											<td id="Product_Quantity" className="table-data">
												(x100)
											</td>

											<td id="Product_TotalPrice" className="table-data">
												PHP 100 000
											</td>
										</tr>

										<tr className="flex w-full flex-1 justify-between w-full pt-2">
											<td id="Product_Type" className="table-data">
												Aluminum
											</td>

											<td id="Product_Quantity" className="table-data">
												(x100)
											</td>

											<td id="Product_TotalPrice" className="table-data">
												PHP 100 000
											</td>
										</tr>
									{/* </div> */}
								</tbody>
							</table>
							{/* <div className="add-transfer-receipt-table h-full w-full overflow-y-auto"></div> */}
							<div className="add-transaction-receipt-total-container border-primary-dark-gray flex w-full flex-col gap-y-4 border-t">
								<div className="add-transaction-receipt-total flex w-full flex-row justify-between">
									<p className="add-transaction-receipt-total-title font-Inter text-base font-light uppercase">
										Total
									</p>
									<span className="add-transaction-receipt-total-amount text-lg font-bold">
										999.00
									</span>
								</div>
								<div className="flex w-full flex-1 flex-col items-end">
									<Button fill={'green'} className="px-8">Produce Invoice</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</LayoutWrapper>
		</>
	);
};
