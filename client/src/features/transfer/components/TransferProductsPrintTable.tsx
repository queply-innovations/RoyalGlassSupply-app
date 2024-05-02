import { DataTable } from '@/components/Tables/DataTable';
import { Transfer, TransferProductFull } from '../types';
import { ColumnDef } from '@tanstack/react-table';
import { FC, useEffect, useState } from 'react';
import { useTransfer } from '../context/TransferContext';
import { PosTable } from '@/features/pos/__test__/components';

interface TransferProductsPrintTableProps {
	// openModal: (data: Transfer, action: string) => void;
}

export const TransferProductsPrintTable: FC<TransferProductsPrintTableProps> = (
	{} : TransferProductsPrintTableProps
) =>{
	// const { transfers, transferProducts, isFetching, selectedTransfer } = useTransfer();

	// console.log(selectedTransfer);

	//console.log(window.api.transferRec());

	// const { data: productPrices, isLoading } = useProductPricesQuery();
	function formatCurrency(value: number) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'PHP',
		}).format(value);
	}

	// const [ fullData, setFullData ] = useState<any>();

	// const dateInvoice = new Date(fullData.updated_at);
	const [wholeData, setWholeData] = useState<any>();
	// const [fullData, setFullData] = useState<any>();
	const [dateCreated, setDateCreated] = useState<any>();
	const [transferDetails, setTransferDetails] = useState<any>();
	const [transferProducts, setTransferProducts] = useState<any>();
	const [show, setShow] = useState<boolean>(false);

	useEffect(() => {
		async function fetchData() {
			setWholeData(await window.api.transferRec());
		}
		fetchData();
	}, []);

	useEffect(() => {
		if (wholeData) {
			// setFullData(wholeData.transfer);
			console.log(wholeData);
			setTransferDetails(wholeData.transfer);
			setTransferProducts(wholeData.products);
			setDateCreated(new Date(wholeData.transfer.created_at));
		}
	}, [wholeData]);

	useEffect(() => {
		console.log(transferProducts);
		if (transferProducts && transferProducts.length > 0) {
			setShow(true);
		}
	}, [transferProducts]);

	const PrintTransferTableHeader: ColumnDef<TransferProductFull>[] = [
		{
			accessorKey: 'quantity',
			header: () => <div className="flex justify-center">Quantity</div>,
			cell: ({ row }) => {
				return (
					<div className="flex justify-center ">
						<div className="flex flex-row border drop-shadow-sm">
							{row.original.total_quantity} 
						</div>
					</div>
				);
			},
		},
		{
			accessorKey: 'name',
			header: () => <div className="justify-center">Product Name</div>,
			cell: ({ row }) => {
				return (
					<div className="flex flex-row gap-2">
						<span className="text-sm font-bold">
							{row.original.product.name}
						</span>
						<span className="text-[12px]">
							{row.original.product.size}
						</span>

						{row.original.product.color}
					</div>
				);
			},
		},
		{
			accessorKey: 'price',
			header: () => <div className="justify-center">Unit Cost</div>,
			cell: ({ row }) => {
				return (
					<div className="flex flex-row gap-2">
						<span>{formatCurrency(row.original.capital_price)}</span>
					</div>
				);
			},
		},
		// {
		// 	id: 'total_price',
		// 	accessorKey: 'total_price',
		// 	header: () => <div className="justify-center">Price</div>,
		// 	cell: ({ row }) => {
		// 		return (
		// 			<div className="">
		// 				<span>{formatCurrency(itemDatabase.total_price)}</span>
		// 			</div>
		// 		);
		// 	},
		// 	size: 250,
		// },
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
							<br />

							Transfer code:&nbsp;
							<span className="font-bold">{transferDetails.code}</span>
							<br />

							Created by:&nbsp;
							<span className="font-bold">
								{transferDetails.created_by.firstname +
									' ' +
									transferDetails.created_by.lastname}
							</span>
							<br />

							Source:&nbsp;
							<span className="font-bold">
								{transferDetails.source.name}
							</span>
							<br />

							Destination:&nbsp;
							<span className="font-bold">
								{transferDetails.destination.name}
							</span>
						</div>
						<div className="flex flex-1 flex-col gap-6 p-6">
							<PosTable
								data={transferProducts}
								columns={PrintTransferTableHeader}
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

export default TransferProductsPrintTable;