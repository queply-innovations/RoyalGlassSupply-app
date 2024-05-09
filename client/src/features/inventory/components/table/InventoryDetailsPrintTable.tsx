import { DataTable } from '@/components/Tables/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { FC, useEffect, useState } from 'react';
import { PosTable } from '@/features/pos/__test__/components';
import { InventoryProduct } from '../../types';

interface InventoryDetailsPrintTableProps {
	// openModal: (data: Transfer, action: string) => void;
}

export const InventoryDetailsPrintTable: FC<InventoryDetailsPrintTableProps> = (
	{} : InventoryDetailsPrintTableProps
) =>{
	function formatCurrency(value: number) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'PHP',
		}).format(value);
	}

	const [wholeData, setWholeData] = useState<any>();
	const [dateCreated, setDateCreated] = useState<any>();
	const [dateReceived, setDateReceived] = useState<any>();
	const [invDetails, setInvDetails] = useState<any>();
	const [invProducts, setInvProducts] = useState<any>();
	const [show, setShow] = useState<boolean>(false);

	useEffect(() => {
		async function fetchData() {
			setWholeData(await window.api.invRec());
		}
		fetchData();
	}, []);

	useEffect(() => {
		if (wholeData) {
			setInvDetails(wholeData.inventory);
			setInvProducts(wholeData.products);
			setDateCreated(new Date(wholeData.inventory.created_at));
			setDateReceived(new Date(wholeData.inventory.date_received));
		}
	}, [wholeData]);

	useEffect(() => {
		if (invProducts && invProducts.length > 0) {
			setShow(true);
		}
	}, [invProducts]);

	const PrintInvTableHeader: ColumnDef<InventoryProduct>[] = [
		{
			accessorKey: 'name',
			header: () => <div className="justify-center">Product Name</div>,
			cell: ({ row }) => {
				return (
					<div className="flex flex-row gap-2">
						<span className="text-sm font-bold">
							{row.original.product.name}
						</span>
						<br />

						<span className="self-start">
							{row.original.product.size}
							<br />
							{row.original.product.color}
						</span>
					</div>
				);
			},
		},
		{
			accessorKey: 'brand',
			header: () => <div className="justify-center">Product Brand</div>,
			cell: ({ row }) => {
				return (
					<div className="flex flex-row gap-2">
						<span className="text-sm">
							{row.original.product.brand}
						</span>
					</div>
				);
			},
		},
		{
			accessorKey: 'price',
			header: () => <div className="justify-center">Capital Price</div>,
			cell: ({ row }) => {
				return (
					<div className="flex flex-row gap-2">
						<span>{formatCurrency(row.original.capital_price)}</span>
					</div>
				);
			},
		},
		{
			accessorKey: 'stocks_count',
			header: () => <div className="flex justify-center">Stocks</div>,
			cell: ({ row }) => {
				return (
					<div className="flex justify-center ">
						<div className="flex flex-row border drop-shadow-sm">
							{row.original.stocks_count} 
						</div>
					</div>
				);
			},
		},
		{
			accessorKey: 'approved_stocks',
			header: () => <div className="flex justify-center">Approved</div>,
			cell: ({ row }) => {
				return (
					<div className="flex justify-center ">
						<div className="flex flex-row border drop-shadow-sm">
							{row.original.approved_stocks} 
						</div>
					</div>
				);
			},
		},
		{
			accessorKey: 'sold_count',
			header: () => <div className="flex justify-center">Sold</div>,
			cell: ({ row }) => {
				return (
					<div className="flex justify-center ">
						<div className="flex flex-row border drop-shadow-sm">
							{row.original.sold_count} 
						</div>
					</div>
				);
			},
		},
		{
			accessorKey: 'remaingin_stocks_count',
			header: () => <div className="flex justify-center">Remaining</div>,
			cell: ({ row }) => {
				return (
					<div className="flex justify-center ">
						<div className="flex flex-row border drop-shadow-sm">
							{row.original.remaining_stocks_count} 
						</div>
					</div>
				);
			},
		},
	];

	return (
		<>
			{show && (
				<div className="flex h-full w-screen flex-col p-3">
					<div className="overflow-x-hidden">
						<div className="text-base">
							Date created:&nbsp;
							<span className="font-bold">
								{dateCreated.toLocaleDateString([], {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							</span>

							&nbsp;&nbsp;&nbsp;Date received:&nbsp;
							<span className="font-bold">
								{dateReceived.toLocaleDateString([], {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							</span>
							<br />

							Inventory code:&nbsp;
							<span className="font-bold">
								{invDetails.code} 
								&nbsp;(Type: {invDetails.type.charAt(0).toUpperCase() + invDetails.type.slice(1)})
							</span>
							<br />

							Created by:&nbsp;
							<span className="font-bold">
								{invDetails.created_by.firstname +
									' ' +
									invDetails.created_by.lastname}
							</span>
							<br />

						</div>
						<div className="flex flex-1 flex-col gap-6 p-6">
							<PosTable
								data={invProducts}
								columns={PrintInvTableHeader}
								invoice={true}
							/>
						</div>
					</div>
				</div>
				// <DataTable
				// 	data={transferProducts}
				// 	columns={PrintTransferTableHeader}
				// 	hideFilter={true} 
				// 	filterWhat={''} 
				// 	dataType={''}
				// 	hidePagination={true}
				// />
			)}
			{/* <div>test</div> */}
		</>
	);
}

export default InventoryDetailsPrintTable;