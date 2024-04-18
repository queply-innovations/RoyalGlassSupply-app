import { useCustomer } from "@/features/customer/__test__/context/CustomerContext";
import { useInvoice } from "@/features/invoice/__test__/context/InvoiceContext";
import { CreateOrderTable } from "../Table/CreateOrderTable";

interface PrintFormProps {}

export const PrintForm = ({}: PrintFormProps) => {
	const { invoiceItemsQueue, invoice, setInvoice } = useInvoice();

	const { selectedCustomer } = useCustomer();

	return (
		<>
			<div id="main" className="flex w-screen flex-row">
				Invoice number: {invoice.code} <br />
				Customer name: {selectedCustomer.firstname + ' ' + selectedCustomer.lastname} 
				<div className="flex flex-1 flex-col gap-6 p-6">
					<CreateOrderTable />
				</div>
			</div>
		</>
	);
};
