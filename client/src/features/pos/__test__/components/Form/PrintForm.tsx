import { useCustomer } from "@/features/customer/__test__/context/CustomerContext";
import { CreateOrderTable } from "../Table/CreateOrderTable";
import { InvoiceTable } from "../Table/InvoiceTable";
import { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import { useInvoiceMutation } from "@/features/invoice/__test__/hooks/useInvoiceMutation";
import { useInvoice } from "@/features/invoice/__test__/context/InvoiceContext";

interface PrintFormProps {}

declare global {
	interface Window {
		api: any;
	}
}

export const PrintForm = ({}: PrintFormProps) => {
	// const { fullData } = useInvoice();

	// const dateInvoice = new Date(fullData.updated_at);
	const [wholeData, setWholeData] = useState<any>();
	const [fullData, setFullData] = useState<any>();
	const [dateInvoice, setDateInvoice] = useState<any>();
	const [itemsQueue, setItemsQueue] = useState<any>();

	useEffect(() => {
		async function fetchData() {
			setWholeData(await window.api.receive())
		}
		fetchData();
	}, []);
	// const wholeData = await window.api.receive();

	useEffect(() => {
		// console.log(wholeData);
		if (wholeData) {
			setFullData(wholeData.fullData);
			// console.log(fullData);
			setDateInvoice(new Date(wholeData.fullData.updated_at));
			setItemsQueue(wholeData.invoiceItems);
		}
	}, [wholeData]);

	

	return (
		<>
			{fullData && itemsQueue && dateInvoice && (
				<div className="flex h-full w-screen flex-col p-3">
					<div className="overflow-x-hidden">
						<div className="text-base">
							Date:&nbsp;
								<span className="font-bold"> 
									{dateInvoice.toLocaleDateString([], { 
									year: 'numeric', 
									month: 'long', 
									day: 'numeric' })} 
								</span>
							<br />
							Invoice number:&nbsp;
								<span className="font-bold"> {fullData.code} </span>
							<br />
							Customer name:&nbsp;
								<span className="font-bold">
									{fullData.customer.firstname + ' ' + fullData.customer.lastname}
								</span>
						</div>
						<div className="flex flex-1 flex-col gap-6 p-6">
							<InvoiceTable queue={itemsQueue} />
						</div>
					</div>
				</div>
			)}
		</>
	);
};
