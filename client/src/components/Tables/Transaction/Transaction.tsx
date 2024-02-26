import { FC } from 'react';
import { Button } from '@/components/Button';
// import { BsFillEyeFill } from 'react-icons/bs';

export const TransactionStatus: FC = () => {
	return (
		<div className="h-[88%] flex w-full flex-1 flex-col gap-y-5 rounded-md border-black/10 border-spacing-y-3 bg-white p-4">
			<div className="w-full rounded-md items-center border border-solid overflow-y-auto">
				<table className="w-full rounded-md">
					<tbody>
						<tr className="bg-white sticky top-0">
							<th className="border-b p-2 text-[15px]">Product ID</th>
							<th className="border-b p-2 text-[15px]"> Price </th>
							<th className="border-b p-2 text-[15px]">Product Name</th>
							<th className="border-b p-2 text-[15px]">Dimensions</th>
							<th className="border-b p-2 text-[15px]">Serial</th>
							<th className="border-b p-2 text-[15px]">SKU</th>
							<th className="border-b p-2 text-[15px]">Inventory Status</th>
							<th className="border-b p-2 text-[15px]">Order Type</th>
							<th className="border-b p-2 text-[15px]">Quantity</th>
						</tr>
						<tr>
							<td id="Product_ID" className="table-data text-center">
								001
							</td>

							<td id="Product_Price" className="table-data text-center">
								PHP 1000
							</td>

							<td	id="Product_Name" className="table-data text-center">
								<div className="flex justify-center">
									Aluminum
								</div>
							</td>
							
							<td id="Product_Dimensions" className="table-data text-center">
								6X12
							</td>
							
							<td id="Product_Serial" className="table-data text-center">
								----
							</td>
							
							<td id="Product_SKU" className="table-data text-center">
								----
							</td>
							
							<td id="Inventory_Status" className="table-data text-center">
								<span className="flex flex-1 flex-col text-center bg-red-500">LOW</span>
								{/* <span className="flex w-full flex-1 flex-col text-center bg-amber-500">MODERATE</span> */}
								{/* <span className="flex w-full flex-1 flex-col text-center bg-lime-600">HIGH</span> */}
							</td>
							
							<td id="Order_Type" className="table-data text-center">
								---
							</td>
							
							<td id="Product_Quantity" className="table-data text-center">
								100
							</td>
						</tr>

						<tr>
							<td id="Product_ID" className="table-data text-center">
								002
							</td>

							<td
								id="Product_Price"
								className="table-data text-center"
							>
								PHP 2000
							</td>

							<td
								id="Product_Name"
								className="table-data text-center"
							>
								<div className="flex justify-center">
									Marble
								</div>
							</td>
							
							<td id="Product_Dimensions" className="table-data text-center">
								6X12
							</td>
							
							<td id="Product_Serial" className="table-data text-center">
								----
							</td>
							
							<td id="Product_SKU" className="table-data text-center">
								----
							</td>
							
							<td id="Inventory_Status" className="table-data text-center">
								{/* <span className="flex flex-1 flex-col text-center bg-red-500">LOW</span> */}
								<span className="flex flex-1 flex-col text-center bg-amber-500">MODERATE</span>
								{/* <span className="flex flex-1 flex-col text-center bg-lime-600">HIGH</span> */}
							</td>
							
							<td id="Order_Type" className="table-data text-center">
								---
							</td>
							
							<td id="Product_Quantity" className="table-data text-center">
								200
							</td>
						</tr>

						<tr>
							<td id="Product_ID" className="table-data text-center">
								003
							</td>

							<td
								id="Product_Price"
								className="table-data text-center"
							>
								PHP 3000
							</td>

							<td
								id="Product_Name"
								className="table-data text-center"
							>
								<div className="flex justify-center">
									Platinum
								</div>
							</td>
							
							<td id="Product_Dimensions" className="table-data text-center">
								6X12
							</td>
							
							<td id="Product_Serial" className="table-data text-center">
								----
							</td>
							
							<td id="Product_SKU" className="table-data text-center">
								----
							</td>
							
							<td id="Inventory_Status" className="table-data text-center">
								{/* <span className="flex flex-1 flex-col text-center bg-red-500">LOW</span> */}
								{/* <span className="flex flex-1 flex-col text-center bg-amber-500">MODERATE</span> */}
								<span className="flex flex-1 flex-col text-center bg-lime-600">HIGH</span>
							</td>
							
							<td id="Order_Type" className="table-data text-center">
								---
							</td>
							
							<td id="Product_Quantity" className="table-data text-center">
								500
							</td>
						</tr>

						<tr>
							<td id="Product_ID" className="table-data text-center">
								003
							</td>

							<td
								id="Product_Price"
								className="table-data text-center"
							>
								PHP 3000
							</td>

							<td
								id="Product_Name"
								className="table-data text-center"
							>
								<div className="flex justify-center">
									Platinum
								</div>
							</td>
							
							<td id="Product_Dimensions" className="table-data text-center">
								6X12
							</td>
							
							<td id="Product_Serial" className="table-data text-center">
								----
							</td>
							
							<td id="Product_SKU" className="table-data text-center">
								----
							</td>
							
							<td id="Inventory_Status" className="table-data text-center">
								{/* <span className="flex flex-1 flex-col text-center bg-red-500">LOW</span> */}
								{/* <span className="flex flex-1 flex-col text-center bg-amber-500">MODERATE</span> */}
								<span className="flex flex-1 flex-col text-center bg-lime-600">HIGH</span>
							</td>
							
							<td id="Order_Type" className="table-data text-center">
								---
							</td>
							
							<td id="Product_Quantity" className="table-data text-center">
								500
							</td>
						</tr>

						<tr>
							<td id="Product_ID" className="table-data text-center">
								003
							</td>

							<td
								id="Product_Price"
								className="table-data text-center"
							>
								PHP 3000
							</td>

							<td
								id="Product_Name"
								className="table-data text-center"
							>
								<div className="flex justify-center">
									Platinum
								</div>
							</td>
							
							<td id="Product_Dimensions" className="table-data text-center">
								6X12
							</td>
							
							<td id="Product_Serial" className="table-data text-center">
								----
							</td>
							
							<td id="Product_SKU" className="table-data text-center">
								----
							</td>
							
							<td id="Inventory_Status" className="table-data text-center">
								{/* <span className="flex flex-1 flex-col text-center bg-red-500">LOW</span> */}
								{/* <span className="flex flex-1 flex-col text-center bg-amber-500">MODERATE</span> */}
								<span className="flex flex-1 flex-col text-center bg-lime-600">HIGH</span>
							</td>
							
							<td id="Order_Type" className="table-data text-center">
								---
							</td>
							
							<td id="Product_Quantity" className="table-data text-center">
								500
							</td>
						</tr>

						<tr>
							<td id="Product_ID" className="table-data text-center">
								003
							</td>

							<td
								id="Product_Price"
								className="table-data text-center"
							>
								PHP 3000
							</td>

							<td
								id="Product_Name"
								className="table-data text-center"
							>
								<div className="flex justify-center">
									Platinum
								</div>
							</td>
							
							<td id="Product_Dimensions" className="table-data text-center">
								6X12
							</td>
							
							<td id="Product_Serial" className="table-data text-center">
								----
							</td>
							
							<td id="Product_SKU" className="table-data text-center">
								----
							</td>
							
							<td id="Inventory_Status" className="table-data text-center">
								{/* <span className="flex flex-1 flex-col text-center bg-red-500">LOW</span> */}
								{/* <span className="flex flex-1 flex-col text-center bg-amber-500">MODERATE</span> */}
								<span className="flex flex-1 flex-col text-center bg-lime-600">HIGH</span>
							</td>
							
							<td id="Order_Type" className="table-data text-center">
								---
							</td>
							
							<td id="Product_Quantity" className="table-data text-center">
								500
							</td>
						</tr>

						<tr>
							<td id="Product_ID" className="table-data text-center">
								003
							</td>

							<td
								id="Product_Price"
								className="table-data text-center"
							>
								PHP 3000
							</td>

							<td
								id="Product_Name"
								className="table-data text-center"
							>
								<div className="flex justify-center">
									Platinum
								</div>
							</td>
							
							<td id="Product_Dimensions" className="table-data text-center">
								6X12
							</td>
							
							<td id="Product_Serial" className="table-data text-center">
								----
							</td>
							
							<td id="Product_SKU" className="table-data text-center">
								----
							</td>
							
							<td id="Inventory_Status" className="table-data text-center">
								{/* <span className="flex flex-1 flex-col text-center bg-red-500">LOW</span> */}
								{/* <span className="flex flex-1 flex-col text-center bg-amber-500">MODERATE</span> */}
								<span className="flex flex-1 flex-col text-center bg-lime-600">HIGH</span>
							</td>
							
							<td id="Order_Type" className="table-data text-center">
								---
							</td>
							
							<td id="Product_Quantity" className="table-data text-center">
								500
							</td>
						</tr>

						<tr>
							<td id="Product_ID" className="table-data text-center">
								003
							</td>

							<td
								id="Product_Price"
								className="table-data text-center"
							>
								PHP 3000
							</td>

							<td
								id="Product_Name"
								className="table-data text-center"
							>
								<div className="flex justify-center">
									Platinum
								</div>
							</td>
							
							<td id="Product_Dimensions" className="table-data text-center">
								6X12
							</td>
							
							<td id="Product_Serial" className="table-data text-center">
								----
							</td>
							
							<td id="Product_SKU" className="table-data text-center">
								----
							</td>
							
							<td id="Inventory_Status" className="table-data text-center">
								{/* <span className="flex flex-1 flex-col text-center bg-red-500">LOW</span> */}
								{/* <span className="flex flex-1 flex-col text-center bg-amber-500">MODERATE</span> */}
								<span className="flex flex-1 flex-col text-center bg-lime-600">HIGH</span>
							</td>
							
							<td id="Order_Type" className="table-data text-center">
								---
							</td>
							
							<td id="Product_Quantity" className="table-data text-center">
								500
							</td>
						</tr>

						<tr>
							<td id="Product_ID" className="table-data text-center">
								003
							</td>

							<td
								id="Product_Price"
								className="table-data text-center"
							>
								PHP 3000
							</td>

							<td
								id="Product_Name"
								className="table-data text-center"
							>
								<div className="flex justify-center">
									Platinum
								</div>
							</td>
							
							<td id="Product_Dimensions" className="table-data text-center">
								6X12
							</td>
							
							<td id="Product_Serial" className="table-data text-center">
								----
							</td>
							
							<td id="Product_SKU" className="table-data text-center">
								----
							</td>
							
							<td id="Inventory_Status" className="table-data text-center">
								{/* <span className="flex flex-1 flex-col text-center bg-red-500">LOW</span> */}
								{/* <span className="flex flex-1 flex-col text-center bg-amber-500">MODERATE</span> */}
								<span className="flex flex-1 flex-col text-center bg-lime-600">HIGH</span>
							</td>
							
							<td id="Order_Type" className="table-data text-center">
								---
							</td>
							
							<td id="Product_Quantity" className="table-data text-center">
								500
							</td>
						</tr>

						<tr>
							<td id="Product_ID" className="table-data text-center">
								003
							</td>

							<td
								id="Product_Price"
								className="table-data text-center"
							>
								PHP 3000
							</td>

							<td
								id="Product_Name"
								className="table-data text-center"
							>
								<div className="flex justify-center">
									Platinum
								</div>
							</td>
							
							<td id="Product_Dimensions" className="table-data text-center">
								6X12
							</td>
							
							<td id="Product_Serial" className="table-data text-center">
								----
							</td>
							
							<td id="Product_SKU" className="table-data text-center">
								----
							</td>
							
							<td id="Inventory_Status" className="table-data text-center">
								{/* <span className="flex flex-1 flex-col text-center bg-red-500">LOW</span> */}
								{/* <span className="flex flex-1 flex-col text-center bg-amber-500">MODERATE</span> */}
								<span className="flex flex-1 flex-col text-center bg-lime-600">HIGH</span>
							</td>
							
							<td id="Order_Type" className="table-data text-center">
								---
							</td>
							
							<td id="Product_Quantity" className="table-data text-center">
								500
							</td>
						</tr>

						<tr>
							<td id="Product_ID" className="table-data text-center">
								003
							</td>

							<td
								id="Product_Price"
								className="table-data text-center"
							>
								PHP 3000
							</td>

							<td
								id="Product_Name"
								className="table-data text-center"
							>
								<div className="flex justify-center">
									Platinum
								</div>
							</td>
							
							<td id="Product_Dimensions" className="table-data text-center">
								6X12
							</td>
							
							<td id="Product_Serial" className="table-data text-center">
								----
							</td>
							
							<td id="Product_SKU" className="table-data text-center">
								----
							</td>
							
							<td id="Inventory_Status" className="table-data text-center">
								{/* <span className="flex flex-1 flex-col text-center bg-red-500">LOW</span> */}
								{/* <span className="flex flex-1 flex-col text-center bg-amber-500">MODERATE</span> */}
								<span className="flex flex-1 flex-col text-center bg-lime-600">HIGH</span>
							</td>
							
							<td id="Order_Type" className="table-data text-center">
								---
							</td>
							
							<td id="Product_Quantity" className="table-data text-center">
								500
							</td>
						</tr>

						<tr>
							<td id="Product_ID" className="table-data text-center">
								003
							</td>

							<td
								id="Product_Price"
								className="table-data text-center"
							>
								PHP 3000
							</td>

							<td
								id="Product_Name"
								className="table-data text-center"
							>
								<div className="flex justify-center">
									Platinum
								</div>
							</td>
							
							<td id="Product_Dimensions" className="table-data text-center">
								6X12
							</td>
							
							<td id="Product_Serial" className="table-data text-center">
								----
							</td>
							
							<td id="Product_SKU" className="table-data text-center">
								----
							</td>
							
							<td id="Inventory_Status" className="table-data text-center">
								{/* <span className="flex flex-1 flex-col text-center bg-red-500">LOW</span> */}
								{/* <span className="flex flex-1 flex-col text-center bg-amber-500">MODERATE</span> */}
								<span className="flex flex-1 flex-col text-center bg-lime-600">HIGH</span>
							</td>
							
							<td id="Order_Type" className="table-data text-center">
								---
							</td>
							
							<td id="Product_Quantity" className="table-data text-center">
								500
							</td>
						</tr>

						<tr>
							<td id="Product_ID" className="table-data text-center">
								003
							</td>

							<td
								id="Product_Price"
								className="table-data text-center"
							>
								PHP 3000
							</td>

							<td
								id="Product_Name"
								className="table-data text-center"
							>
								<div className="flex justify-center">
									Platinum
								</div>
							</td>
							
							<td id="Product_Dimensions" className="table-data text-center">
								6X12
							</td>
							
							<td id="Product_Serial" className="table-data text-center">
								----
							</td>
							
							<td id="Product_SKU" className="table-data text-center">
								----
							</td>
							
							<td id="Inventory_Status" className="table-data text-center">
								{/* <span className="flex flex-1 flex-col text-center bg-red-500">LOW</span> */}
								{/* <span className="flex flex-1 flex-col text-center bg-amber-500">MODERATE</span> */}
								<span className="flex flex-1 flex-col text-center bg-lime-600">HIGH</span>
							</td>
							
							<td id="Order_Type" className="table-data text-center">
								---
							</td>
							
							<td id="Product_Quantity" className="table-data text-center">
								500
							</td>
						</tr>

						<tr>
							<td id="Product_ID" className="table-data text-center">
								003
							</td>

							<td
								id="Product_Price"
								className="table-data text-center"
							>
								PHP 3000
							</td>

							<td
								id="Product_Name"
								className="table-data text-center"
							>
								<div className="flex justify-center">
									Platinum
								</div>
							</td>
							
							<td id="Product_Dimensions" className="table-data text-center">
								6X12
							</td>
							
							<td id="Product_Serial" className="table-data text-center">
								----
							</td>
							
							<td id="Product_SKU" className="table-data text-center">
								----
							</td>
							
							<td id="Inventory_Status" className="table-data text-center">
								{/* <span className="flex flex-1 flex-col text-center bg-red-500">LOW</span> */}
								{/* <span className="flex flex-1 flex-col text-center bg-amber-500">MODERATE</span> */}
								<span className="flex flex-1 flex-col text-center bg-lime-600">HIGH</span>
							</td>
							
							<td id="Order_Type" className="table-data text-center">
								---
							</td>
							
							<td id="Product_Quantity" className="table-data text-center">
								500
							</td>
						</tr>

						<tr>
							<td id="Product_ID" className="table-data text-center">
								003
							</td>

							<td
								id="Product_Price"
								className="table-data text-center"
							>
								PHP 3000
							</td>

							<td
								id="Product_Name"
								className="table-data text-center"
							>
								<div className="flex justify-center">
									Platinum
								</div>
							</td>
							
							<td id="Product_Dimensions" className="table-data text-center">
								6X12
							</td>
							
							<td id="Product_Serial" className="table-data text-center">
								----
							</td>
							
							<td id="Product_SKU" className="table-data text-center">
								----
							</td>
							
							<td id="Inventory_Status" className="table-data text-center">
								{/* <span className="flex flex-1 flex-col text-center bg-red-500">LOW</span> */}
								{/* <span className="flex flex-1 flex-col text-center bg-amber-500">MODERATE</span> */}
								<span className="flex flex-1 flex-col text-center bg-lime-600">HIGH</span>
							</td>
							
							<td id="Order_Type" className="table-data text-center">
								---
							</td>
							
							<td id="Product_Quantity" className="table-data text-center">
								500
							</td>
						</tr>

						<tr>
							<td id="Product_ID" className="table-data text-center">
								003
							</td>

							<td
								id="Product_Price"
								className="table-data text-center"
							>
								PHP 3000
							</td>

							<td
								id="Product_Name"
								className="table-data text-center"
							>
								<div className="flex justify-center">
									Platinum
								</div>
							</td>
							
							<td id="Product_Dimensions" className="table-data text-center">
								6X12
							</td>
							
							<td id="Product_Serial" className="table-data text-center">
								----
							</td>
							
							<td id="Product_SKU" className="table-data text-center">
								----
							</td>
							
							<td id="Inventory_Status" className="table-data text-center">
								{/* <span className="flex flex-1 flex-col text-center bg-red-500">LOW</span> */}
								{/* <span className="flex flex-1 flex-col text-center bg-amber-500">MODERATE</span> */}
								<span className="flex flex-1 flex-col text-center bg-lime-600">HIGH</span>
							</td>
							
							<td id="Order_Type" className="table-data text-center">
								---
							</td>
							
							<td id="Product_Quantity" className="table-data text-center">
								500
							</td>
						</tr>

						<tr>
							<td id="Product_ID" className="table-data text-center">
								003
							</td>

							<td
								id="Product_Price"
								className="table-data text-center"
							>
								PHP 3000
							</td>

							<td
								id="Product_Name"
								className="table-data text-center"
							>
								<div className="flex justify-center">
									Platinum
								</div>
							</td>
							
							<td id="Product_Dimensions" className="table-data text-center">
								6X12
							</td>
							
							<td id="Product_Serial" className="table-data text-center">
								----
							</td>
							
							<td id="Product_SKU" className="table-data text-center">
								----
							</td>
							
							<td id="Inventory_Status" className="table-data text-center">
								{/* <span className="flex flex-1 flex-col text-center bg-red-500">LOW</span> */}
								{/* <span className="flex flex-1 flex-col text-center bg-amber-500">MODERATE</span> */}
								<span className="flex flex-1 flex-col text-center bg-lime-600">HIGH</span>
							</td>
							
							<td id="Order_Type" className="table-data text-center">
								---
							</td>
							
							<td id="Product_Quantity" className="table-data text-center">
								500
							</td>
						</tr>

						<tr>
							<td id="Product_ID" className="table-data text-center">
								003
							</td>

							<td
								id="Product_Price"
								className="table-data text-center"
							>
								PHP 3000
							</td>

							<td
								id="Product_Name"
								className="table-data text-center"
							>
								<div className="flex justify-center">
									Platinum
								</div>
							</td>
							
							<td id="Product_Dimensions" className="table-data text-center">
								6X12
							</td>
							
							<td id="Product_Serial" className="table-data text-center">
								----
							</td>
							
							<td id="Product_SKU" className="table-data text-center">
								----
							</td>
							
							<td id="Inventory_Status" className="table-data text-center">
								{/* <span className="flex flex-1 flex-col text-center bg-red-500">LOW</span> */}
								{/* <span className="flex flex-1 flex-col text-center bg-amber-500">MODERATE</span> */}
								<span className="flex flex-1 flex-col text-center bg-lime-600">HIGH</span>
							</td>
							
							<td id="Order_Type" className="table-data text-center">
								---
							</td>
							
							<td id="Product_Quantity" className="table-data text-center">
								500
							</td>
						</tr>

						<tr>
							<td id="Product_ID" className="table-data text-center">
								003
							</td>

							<td
								id="Product_Price"
								className="table-data text-center"
							>
								PHP 3000
							</td>

							<td
								id="Product_Name"
								className="table-data text-center"
							>
								<div className="flex justify-center">
									Platinum
								</div>
							</td>
							
							<td id="Product_Dimensions" className="table-data text-center">
								6X12
							</td>
							
							<td id="Product_Serial" className="table-data text-center">
								----
							</td>
							
							<td id="Product_SKU" className="table-data text-center">
								----
							</td>
							
							<td id="Inventory_Status" className="table-data text-center">
								{/* <span className="flex flex-1 flex-col text-center bg-red-500">LOW</span> */}
								{/* <span className="flex flex-1 flex-col text-center bg-amber-500">MODERATE</span> */}
								<span className="flex flex-1 flex-col text-center bg-lime-600">HIGH</span>
							</td>
							
							<td id="Order_Type" className="table-data text-center">
								---
							</td>
							
							<td id="Product_Quantity" className="table-data text-center">
								500
							</td>
						</tr>

						<tr>
							<td id="Product_ID" className="table-data text-center">
								003
							</td>

							<td
								id="Product_Price"
								className="table-data text-center"
							>
								PHP 3000
							</td>

							<td
								id="Product_Name"
								className="table-data text-center"
							>
								<div className="flex justify-center">
									Platinum
								</div>
							</td>
							
							<td id="Product_Dimensions" className="table-data text-center">
								6X12
							</td>
							
							<td id="Product_Serial" className="table-data text-center">
								----
							</td>
							
							<td id="Product_SKU" className="table-data text-center">
								----
							</td>
							
							<td id="Inventory_Status" className="table-data text-center">
								{/* <span className="flex flex-1 flex-col text-center bg-red-500">LOW</span> */}
								{/* <span className="flex flex-1 flex-col text-center bg-amber-500">MODERATE</span> */}
								<span className="flex flex-1 flex-col text-center bg-lime-600">HIGH</span>
							</td>
							
							<td id="Order_Type" className="table-data text-center">
								---
							</td>
							
							<td id="Product_Quantity" className="table-data text-center">
								500
							</td>
						</tr>

						<tr>
							<td id="Product_ID" className="table-data text-center">
								003
							</td>

							<td
								id="Product_Price"
								className="table-data text-center"
							>
								PHP 3000
							</td>

							<td
								id="Product_Name"
								className="table-data text-center"
							>
								<div className="flex justify-center">
									Platinum
								</div>
							</td>
							
							<td id="Product_Dimensions" className="table-data text-center">
								6X12
							</td>
							
							<td id="Product_Serial" className="table-data text-center">
								----
							</td>
							
							<td id="Product_SKU" className="table-data text-center">
								----
							</td>
							
							<td id="Inventory_Status" className="table-data text-center">
								{/* <span className="flex flex-1 flex-col text-center bg-red-500">LOW</span> */}
								{/* <span className="flex flex-1 flex-col text-center bg-amber-500">MODERATE</span> */}
								<span className="flex flex-1 flex-col text-center bg-lime-600">HIGH</span>
							</td>
							
							<td id="Order_Type" className="table-data text-center">
								---
							</td>
							
							<td id="Product_Quantity" className="table-data text-center">
								500
							</td>
						</tr>

						<tr>
							<td id="Product_ID" className="table-data text-center">
								003
							</td>

							<td
								id="Product_Price"
								className="table-data text-center"
							>
								PHP 3000
							</td>

							<td
								id="Product_Name"
								className="table-data text-center"
							>
								<div className="flex justify-center">
									Platinum
								</div>
							</td>
							
							<td id="Product_Dimensions" className="table-data text-center">
								6X12
							</td>
							
							<td id="Product_Serial" className="table-data text-center">
								----
							</td>
							
							<td id="Product_SKU" className="table-data text-center">
								----
							</td>
							
							<td id="Inventory_Status" className="table-data text-center">
								{/* <span className="flex flex-1 flex-col text-center bg-red-500">LOW</span> */}
								{/* <span className="flex flex-1 flex-col text-center bg-amber-500">MODERATE</span> */}
								<span className="flex flex-1 flex-col text-center bg-lime-600">HIGH</span>
							</td>
							
							<td id="Order_Type" className="table-data text-center">
								---
							</td>
							
							<td id="Product_Quantity" className="table-data text-center">
								500
							</td>
						</tr>

						<tr>
							<td id="Product_ID" className="table-data text-center">
								003
							</td>

							<td
								id="Product_Price"
								className="table-data text-center"
							>
								PHP 3000
							</td>

							<td
								id="Product_Name"
								className="table-data text-center"
							>
								<div className="flex justify-center">
									Platinum
								</div>
							</td>
							
							<td id="Product_Dimensions" className="table-data text-center">
								6X12
							</td>
							
							<td id="Product_Serial" className="table-data text-center">
								----
							</td>
							
							<td id="Product_SKU" className="table-data text-center">
								----
							</td>
							
							<td id="Inventory_Status" className="table-data text-center">
								{/* <span className="flex flex-1 flex-col text-center bg-red-500">LOW</span> */}
								{/* <span className="flex flex-1 flex-col text-center bg-amber-500">MODERATE</span> */}
								<span className="flex flex-1 flex-col text-center bg-lime-600">HIGH</span>
							</td>
							
							<td id="Order_Type" className="table-data text-center">
								---
							</td>
							
							<td id="Product_Quantity" className="table-data text-center">
								500
							</td>
						</tr>

						<tr>
							<td id="Product_ID" className="table-data text-center">
								003
							</td>

							<td
								id="Product_Price"
								className="table-data text-center"
							>
								PHP 3000
							</td>

							<td
								id="Product_Name"
								className="table-data text-center"
							>
								<div className="flex justify-center">
									Platinum
								</div>
							</td>
							
							<td id="Product_Dimensions" className="table-data text-center">
								6X12
							</td>
							
							<td id="Product_Serial" className="table-data text-center">
								----
							</td>
							
							<td id="Product_SKU" className="table-data text-center">
								----
							</td>
							
							<td id="Inventory_Status" className="table-data text-center">
								{/* <span className="flex flex-1 flex-col text-center bg-red-500">LOW</span> */}
								{/* <span className="flex flex-1 flex-col text-center bg-amber-500">MODERATE</span> */}
								<span className="flex flex-1 flex-col text-center bg-lime-600">HIGH</span>
							</td>
							
							<td id="Order_Type" className="table-data text-center">
								---
							</td>
							
							<td id="Product_Quantity" className="table-data text-center">
								500
							</td>
						</tr>

						<tr>
							<td id="Product_ID" className="table-data text-center">
								003
							</td>

							<td
								id="Product_Price"
								className="table-data text-center"
							>
								PHP 3000
							</td>

							<td
								id="Product_Name"
								className="table-data text-center"
							>
								<div className="flex justify-center">
									Platinum
								</div>
							</td>
							
							<td id="Product_Dimensions" className="table-data text-center">
								6X12
							</td>
							
							<td id="Product_Serial" className="table-data text-center">
								----
							</td>
							
							<td id="Product_SKU" className="table-data text-center">
								----
							</td>
							
							<td id="Inventory_Status" className="table-data text-center">
								{/* <span className="flex flex-1 flex-col text-center bg-red-500">LOW</span> */}
								{/* <span className="flex flex-1 flex-col text-center bg-amber-500">MODERATE</span> */}
								<span className="flex flex-1 flex-col text-center bg-lime-600">HIGH</span>
							</td>
							
							<td id="Order_Type" className="table-data text-center">
								---
							</td>
							
							<td id="Product_Quantity" className="table-data text-center">
								500
							</td>
						</tr>

						<tr>
							<td id="Product_ID" className="table-data text-center">
								003
							</td>

							<td
								id="Product_Price"
								className="table-data text-center"
							>
								PHP 3000
							</td>

							<td
								id="Product_Name"
								className="table-data text-center"
							>
								<div className="flex justify-center">
									Platinum
								</div>
							</td>
							
							<td id="Product_Dimensions" className="table-data text-center">
								6X12
							</td>
							
							<td id="Product_Serial" className="table-data text-center">
								----
							</td>
							
							<td id="Product_SKU" className="table-data text-center">
								----
							</td>
							
							<td id="Inventory_Status" className="table-data text-center">
								{/* <span className="flex flex-1 flex-col text-center bg-red-500">LOW</span> */}
								{/* <span className="flex flex-1 flex-col text-center bg-amber-500">MODERATE</span> */}
								<span className="flex flex-1 flex-col text-center bg-lime-600">HIGH</span>
							</td>
							
							<td id="Order_Type" className="table-data text-center">
								---
							</td>
							
							<td id="Product_Quantity" className="table-data text-center">
								500
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className="flex w-full flex-1 flex-col items-end">
				<Button fill={'yellow'} className="px-8">Add Product</Button>
			</div>
		</div>
	);
};

export default TransactionStatus;
