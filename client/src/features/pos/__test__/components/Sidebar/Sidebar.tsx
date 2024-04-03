import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { usePos } from '../../context/__test__/PosContext';
import { SearchCustomer } from '@/features/customer/__test__/components/SearchCustomer';
import { CustomerInfo } from './Customer/CustomerInfo';
import { Button } from '@/components/ui/button';
import { useInvoice } from '@/features/invoice/__test__/context/InvoiceContext';
import { TotalItems } from './TotalItems';
import { Payment } from './Payment';
import { useInvoiceMutation } from '@/features/invoice/__test__/hooks/useInvoiceMutation';
import { useCustomer } from '@/features/customer/__test__/context/CustomerContext';
import { toast, ToastContainer } from 'react-toastify';


interface SidebarProps { }

export const Sidebar = ({ }: SidebarProps) => {
	const { auth } = useAuth();

	const { setFilter } = usePos();

	const { invoiceItemsQueue, invoice } = useInvoice();
	const {
		value: invoiceForm,
		addInvoiceMutation } = useInvoiceMutation();

	const { selectedCustomer } = useCustomer();


	async function handleSubmit() {
		console.log('Invoice:', invoice);
		console.log('InvoiceItems:', invoiceItemsQueue);
		let data: any = invoice;
		data["invoice_items"] = invoiceItemsQueue.map((d:any) => {
			return ({...d, product_id : d.product_id.id})
		});
		await addInvoiceMutation(data);
	}
	return (
		<div className="bg-pos-primary-background flex w-full max-w-[350px] flex-col gap-2 p-4">
			<ToastContainer/>
			{auth.role === 'admin' ? (
				<>
					<Tabs
						defaultValue="CDO"
						onValueChange={(value: string) => {
							if (value === 'ILI') {
								setFilter({
									approval_status: 'approved',
									warehouse_id: 2,
								});
							}
							if (value === 'CDO') {
								setFilter({
									approval_status: 'approved',
									warehouse_id: 1,
								});
							}
						}}
					>
						<TabsList className="flex flex-row">
							<TabsTrigger
								value="CDO"
								className="data-[state=active]:bg-primary w-full rounded-md text-slate-800 hover:bg-slate-200 data-[state=active]:text-white"
							>
								CDO
							</TabsTrigger>
							<TabsTrigger
								value="ILI"
								className="data-[state=active]:bg-primary w-full rounded-md text-slate-800 hover:bg-slate-200 data-[state=active]:text-white"
							>
								ILI
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</>
			) : null}
			{/* <Button
				onClick={() =>
					setFilter({ approval_status: 'approved', warehouse_id: 2 })
				}
			>
				2
			</Button> */}
			<SearchCustomer />
			<CustomerInfo />
			<TotalItems />
			<Payment />
			<Button
				onClick={() => {
					console.log(invoiceItemsQueue);
				}}
			>
				TEST INVOICE ITEMS
			</Button>
			<Button
				onClick={() => {
					toast.info('Coming Soon!');
				}}
			>
				Print Invoice
			</Button>
			<Button
				onClick={() => {
					// addInvoiceMutation(invoice);
					handleSubmit();
				}}
				disabled={
					Object.keys(selectedCustomer).length === 0 ||
					invoiceItemsQueue.length === 0 ||
					invoice.paid_amount === 0
				}
			>
				Submit
			</Button>
		</div>
	);
};
