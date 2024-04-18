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
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useModal } from '@/utils/Modal';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import { Warehouse } from 'lucide-react';
import { Label } from '@radix-ui/react-dropdown-menu';
// import { BrowserWindow, WebContents } from 'electron';

interface SidebarProps {}

declare global {
	interface Window {
		api: any;
	}
}

export const Sidebar = ({}: SidebarProps) => {
	const { auth } = useAuth();

	const { setFilter, selectedWarehouse, setSelectedWarehouse } = usePos();

	const { invoiceItemsQueue, invoice, setInvoice } = useInvoice();
	const { value: invoiceForm, addInvoiceMutation } = useInvoiceMutation();

	const { selectedCustomer } = useCustomer();

	async function handleSubmit() {
		console.log('Invoice:', invoice);
		console.log('InvoiceItems:', invoiceItemsQueue);
		let data: any = invoice;
		data['invoice_items'] = invoiceItemsQueue.map((d: any) => {
			return { ...d, product_id: d.product_id.id };
		});
		await addInvoiceMutation(data).then(() => window.api.send());
	}

	const { openModal, isOpen, closeModal } = useModal();
	const successModal = useModal();
	useEffect(() => {
		if (auth.role === 'admin') {
			openModal();
		} else if (auth.role?.split('_')[1] === 'CDO') {
			// console.log(auth.role?.split('_'));
			setFilter({ approval_status: 'approved', warehouse_id: 1 });
			setSelectedWarehouse('CDO');
			setInvoice({
				...invoice,
				warehouse_id: 1,
			});
		} else if (auth.role?.split('_')[1] === 'ILI') {
			console.log(auth.role?.split('_'));
			setFilter({ approval_status: 'approved', warehouse_id: 2 });
			setSelectedWarehouse('Iligan');
			setInvoice({
				...invoice,
				warehouse_id: 2,
			});
		}
	}, [auth.role]);

	return (
		<div className="bg-pos-primary-background flex w-full max-w-[350px] flex-col gap-2 p-4">
			{auth.role === 'admin' ? (
				<>
					<div className="flex flex-row items-center justify-between rounded-md bg-white p-1 px-3">
						<Label className="text-sm font-medium uppercase text-slate-900">
							Warehouse: {selectedWarehouse}
						</Label>
						<Button onClick={openModal} size={'icon'} className="h-8">
							<Warehouse size={18} />
						</Button>
					</div>
				</>
			) : (
				<>
					<div className="flex flex-row items-center justify-between rounded-md bg-white p-2">
						<Label className="flex flex-row items-center gap-2 text-sm font-medium uppercase text-slate-900">
							<Warehouse size={18} />
							{selectedWarehouse + ' BRANCH'}
						</Label>
						<Label className="text-sm font-medium uppercase text-slate-900">
							{auth.user.firstname + ' ' + auth.user.lastname}
						</Label>
					</div>
				</>
			)}
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
				onClick={() => window.api.send() }
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
					invoice.paid_amount === 0 ||
					invoice.payment_method === ''
				}
			>
				Submit
			</Button>
			<ModalTest
				title={''}
				isOpen={successModal.isOpen}
				onClose={successModal.closeModal}
				closeOnOverlayClick
			>
				<div>
					<div>Test</div>
				</div>
			</ModalTest>
			{auth.role === 'admin' ? (
				<>
					<ModalTest
						isOpen={isOpen}
						onClose={closeModal}
						title="Select Warehouse"
						closeOnOverlayClick={false}
					>
						<div className="flex flex-row gap-6">
							<Button
								onClick={() => {
									setFilter({
										approval_status: 'approved',
										warehouse_id: 1,
									});
									closeModal();
									setSelectedWarehouse('CDO');
									setInvoice({
										...invoice,
										warehouse_id: 1,
									});
								}}
								className="h-20 "
							>
								<div className="flex flex-col items-center gap-4">
									<Warehouse />
									<Label>CDO Warehouse</Label>
								</div>
							</Button>
							<Button
								onClick={() => {
									setFilter({
										approval_status: 'approved',
										warehouse_id: 2,
									});
									closeModal();
									setSelectedWarehouse('Iligan');
									setInvoice({
										...invoice,
										warehouse_id: 2,
									});
								}}
								className="h-20 "
							>
								<div className="flex flex-col items-center gap-4">
									<Warehouse />
									<Label>Iligan Warehouse</Label>
								</div>
							</Button>
						</div>
					</ModalTest>
				</>
			) : null}
		</div>
	);
};
