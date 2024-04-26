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
import { useEffect, useState } from 'react';
import { useModal } from '@/utils/Modal';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import { Warehouse } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
	Items,
	Subtotal,
	Discount,
	Tax,
	DeliveryCharge,
	TotalAmountDue,
	PaidAmount,
	ChangeAmount,
} from './Info';
import { PaymentType } from './Payment/PaymentType';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { AddDiscountDialog, AddPaidAmount, PaymentTypeDialog } from './Dialog';
import { Label } from '@/components/ui/label';
// import { BrowserWindow, WebContents } from 'electron';

interface SidebarProps {}

declare global {
	interface Window {
		api: any;
	}
}

export const Sidebar = ({}: SidebarProps) => {
	const { handleChange } = useInvoice();
	const { auth } = useAuth();

	const {
		setFilter,
		selectedWarehouse,
		setSelectedWarehouse,
		openDialog,
		setOpenDialog,
	} = usePos();

	// useEffect(() => {
	// 	if (selectedWarehouse === 'CDO') {
	// 		setInvoice({ ...invoice, warehouse_id: 1 });
	// 	} else if (selectedWarehouse === 'Iligan') {
	// 		setInvoice({ ...invoice, warehouse_id: 2 });
	// 	}
	// 	handleChange('');
	// }, [selectedWarehouse]);

	const { value: invoiceForm, addInvoiceMutation } = useInvoiceMutation();

	// const { selectedCustomer } = useCustomer();

	const navigate = useNavigate();

	async function handleSubmit() {
		console.log('Invoice:', invoice);
		console.log('InvoiceItems:', invoiceItemsQueue);
		let data: any = invoice;
		data['invoice_items'] = invoiceItemsQueue.map((d: any) => {
			return { ...d, product_id: d.product_id.id };
		});
		// await addInvoiceMutation(data).then(() => window.api.send());
		await addInvoiceMutation(data).then(res => {
			setFullData(res.data);
		});
	}

	useEffect(() => {
		if (fullData) {
			console.log(fullData);
			window.api.send({
				fullData: fullData,
				invoiceItems: invoiceItemsQueue,
			});
		}
	}, [fullData]);

	// const { openModal, isOpen, closeModal } = useModal();
	const successModal = useModal();
	// useEffect(() => {
	// 	if (auth.role === 'admin') {
	// 		openModal();
	// 	} else if (auth.role?.split('_')[1] === 'CDO') {
	// 		// console.log(auth.role?.split('_'));
	// 		setFilter({ approval_status: 'approved', warehouse_id: 1 });
	// 		setSelectedWarehouse('CDO');
	// 		setInvoice({
	// 			...invoice,
	// 			warehouse_id: 1,
	// 		});
	// 	} else if (auth.role?.split('_')[1] === 'ILI') {
	// 		console.log(auth.role?.split('_'));
	// 		setFilter({ approval_status: 'approved', warehouse_id: 2 });
	// 		setSelectedWarehouse('Iligan');
	// 		setInvoice({
	// 			...invoice,
	// 			warehouse_id: 2,
	// 		});
	// 	}
	// }, [auth.role]);
	const [dialogType, setDialogType] = useState<string>('');
	return (
		<div className="bg-pos-primary-background flex w-full max-w-[375px] flex-col gap-2 p-5">
			<div className="flex h-full flex-col rounded-md bg-white p-2 px-4">
				<div>
					{auth.role === 'admin' ? (
						<>
							<div className="flex flex-row items-center justify-between px-2 py-4 ">
								<Label className="flex flex-col font-bold text-slate-700">
									Warehouse{' '}
									<span className="font-medium text-slate-800">
										{selectedWarehouse === 'CDO'
											? 'Cagayan De Oro'
											: 'Iligan'}
									</span>
								</Label>
								<Button
									onClick={() => {
										navigate('/pos');
									}}
									size={'icon'}
								>
									<Warehouse size={18} />
								</Button>
							</div>
						</>
					) : (
						<>
							<div className="flex flex-row justify-between bg-white p-2">
								<div className="flex flex-col">
									<Label className="flex flex-row items-center gap-2 font-bold uppercase text-slate-800">
										{selectedWarehouse + ' BRANCH'}
									</Label>
									<Label className="font-medium capitalize text-slate-900">
										{auth.user.firstname + ' ' + auth.user.lastname}
									</Label>
								</div>
								<Button className="hover:cursor-default" size={'icon'}>
									<Warehouse size={18} />
								</Button>
							</div>
						</>
					)}
				</div>
				<SearchCustomer />
				<CustomerInfo />

				<div className="flex h-full flex-col justify-between p-4 px-2">
					<div className="flex flex-col gap-4">
						{/* <PaymentType /> */}
						<Items />
						<Subtotal />
						<Discount />
						<Tax />
						<DeliveryCharge />
						<TotalAmountDue />
						<ChangeAmount />
					</div>
					<div className="flex flex-col gap-2">
						<div className="grid grid-cols-2 gap-2">
							<Button
								onClick={() => {
									setOpenDialog(true);
									setDialogType('discount');
								}}
							>
								Add Discount
							</Button>
							<Button
								variant={'outline'}
								className="hover:cursor-not-allowed hover:bg-white"
								onClick={() => {
									setOpenDialog(true);
									setDialogType('delivery_charge');
								}}
							>
								Delivery Charge
							</Button>
						</div>
						<Button
							onClick={() => {
								setOpenDialog(true);
								setDialogType('payment_type');
							}}
						>
							Select Payment Type
						</Button>
						<Button
							onClick={() => {
								setOpenDialog(true);
								setDialogType('paid_amount');
							}}
						>
							Add Paid Amount
						</Button>
						<Button
							variant={'outline'}
							className="w-full"
							onClick={() => {
								handleSubmit();
							}}
						>
							Submit
						</Button>
					</div>
				</div>
			</div>
			{dialogType === 'payment_type' && <PaymentTypeDialog />}
			{dialogType === 'discount' && <AddDiscountDialog />}
			{dialogType === 'paid_amount' && <AddPaidAmount />}
			{/* {dialogType === '' && <PaymentTypeDialog />}
			{dialogType === 'payment' && <PaymentTypeDialog />}
			{dialogType === 'payment' && <PaymentTypeDialog />}
			{dialogType === 'payment' && <PaymentTypeDialog />} */}

			{/* <div className="flex flex-col gap-2">
				{auth.role === 'admin' ? (
					<>
						<div className="flex flex-row items-center justify-between p-1 px-3 bg-white rounded-md">
							<Label className="text-sm font-medium uppercase text-slate-900">
								Warehouse: {selectedWarehouse}
							</Label>
							<Button
								onClick={() => {
									navigate('/pos');
								}}
								size={'icon'}
								className="h-8"
							>
								<Warehouse size={18} />
							</Button>
						</div>
					</>
				) : (
					<>
						<div className="flex flex-row items-center justify-between p-2 bg-white rounded-md">
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
				<CustomerInfo />
			</div> */}

			{/* <Button
				onClick={() =>
					setFilter({ approval_status: 'approved', warehouse_id: 2 })
			}
			>
				2
			</Button> */}

			{/* <TotalItems /> */}

			{/* <div className="flex flex-col justify-between h-full">
				<Payment />
				<div className="flex flex-col gap-2">
					<Button
						onClick={() => {
							// toast.info('Coming Soon!');
							// const windowWebContents: WebContents = new BrowserWindow().webContents
							// windowWebContents.print({}, (success, reason) => {
							// 	console.log(success, reason)
							// })
							// let win = window.open();
							window.print();
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
							invoice.paid_amount === 0 ||
							invoice.payment_method === ''
						}
					>
						Submit
					</Button>
				</div>
			</div> */}

			{/* <ModalTest
				title={''}
				isOpen={successModal.isOpen}
				onClose={successModal.closeModal}
				closeOnOverlayClick
			>
				<div>
					<div>Test</div>
				</div>
			</ModalTest> */}
			{/* {auth.role === 'admin' ? (
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
			) : null} */}
		</div>
	);
};
