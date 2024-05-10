import { InvoiceTable } from '../Table/InvoiceTable';
import { useEffect, useState } from 'react';

interface PrintFormProps {}

declare global {
	interface Window {
		api: any;
	}
}

export const PrintForm = ({}: PrintFormProps) => {
	const [fullData, setFullData] = useState<any>();
	const [wholeData, setWholeData] = useState<any>();
	const [dateInvoice, setDateInvoice] = useState<any>();
	const [itemsQueue, setItemsQueue] = useState<any>();
	const [itemsDatabase, setItemsDatabase] = useState<any>();

	console.log(window.api.receive());

	useEffect(() => {
		async function fetchData() {
			setWholeData(await window.api.receive());
		}
		fetchData();
	}, []);

	useEffect(() => {
		if (wholeData) {
			setFullData(wholeData.fullData);
			setDateInvoice(new Date(wholeData.fullData.updated_at));
			setItemsQueue(wholeData.invoiceItems);
			setItemsDatabase(wholeData.invoiceItemsDatabase);
		}
	}, [wholeData]);

	return (
		<>
			{fullData && itemsQueue && dateInvoice && (
				<div className="flex h-full w-screen flex-col p-3">
					<div className="space-y-4">
						<div className="flex flex-col gap-1 text-sm">
							<div className="flex flex-row justify-between">
								<h3>
									Date issued:&nbsp;
									<span className="font-bold">
										{dateInvoice.toLocaleDateString([], {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
										})}
									</span>
								</h3>
								<h3>
									Invoice number:&nbsp;
									<span className="font-bold"> {fullData.code} </span>
								</h3>
							</div>
							<h3>
								Billed to:&nbsp;
								<span className="font-bold">
									{fullData.customer.firstname +
										' ' +
										fullData.customer.lastname}
								</span>
							</h3>
						</div>
						<div className="flex flex-1 flex-col">
							<InvoiceTable
								queue={itemsQueue}
								itemsDatabase={itemsDatabase}
								fullData={fullData}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
