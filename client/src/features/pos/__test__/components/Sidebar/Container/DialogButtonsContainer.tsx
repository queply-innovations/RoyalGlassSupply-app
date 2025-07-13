/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { usePos } from '../../../context/__test__/PosContext';
// import { useInvoiceMutation } from '@/features/invoice/__test__/hooks/useInvoiceMutation';
import { useInvoicePos } from '../../../context/__test__/InvoicePosContext';
import { useCustomer } from '@/features/customer/__test__/context/CustomerContext';

interface DialogButtonsContainerProps {}

export const DialogButtonsContainer = ({}: DialogButtonsContainerProps) => {
	const { setDialogOptions, dialogOptions } = usePos();
	const { currentInvoicePos, cartItems } = useInvoicePos();
	// const {
	// 	currentInvoicePos,
	// 	currentInvoiceItemsQueue,
	// 	fullData,
	// 	setFullData,
	// } = useInvoicePos();
	// const { invoice, invoiceItemsQueue, fullData, setFullData } = useInvoice();
	// const { addInvoiceMutation } = useInvoiceMutation();
	const { selectedCustomer, selectedVoucher } = useCustomer();

	// async function handleSubmit() {
	// 	console.log('Invoice:', currentInvoicePos);
	// 	console.log('InvoiceItems:', currentInvoiceItemsQueue);
	// 	const data: any = currentInvoicePos;
	// 	data['invoice_items'] = currentInvoiceItemsQueue.map((d: any) => {
	// 		return { ...d, product_id: d.product_id.id };
	// 	});
	// 	// await addInvoiceMutation(data).then(() => window.api.send());
	// 	await addInvoiceMutation(data).then(res => {
	// 		setFullData(res.data);
	// 	});
	// }

	// TODO: Check this print function
	// useEffect(() => {
	// 	if (fullData) {
	// 		console.log(fullData);
	// 		window.api.send({
	// 			fullData: fullData,
	// 			invoiceItems: currentInvoiceItemsQueue,
	// 		});
	// 	}
	// }, [fullData]);

	return (
		<>
			<div className="mb-1 flex flex-col gap-2">
				{/* //TODO Add delivery charge */}
				{/* <div className="grid grid-cols-2 gap-2">
					<Button
						variant={'outline'}
						className="hover:cursor-not-allowed hover:bg-white"
						onClick={() => {
							setDialogOptions({
								open: true,
								title: 'delivery_charge',
							});
							console.log('Options:', dialogOptions);
						}}
					>
						Delivery Charge
					</Button>
				</div> */}
				<div className="flex w-full flex-row gap-2">
					<Button
						className="flex-1"
						onClick={() => {
							setDialogOptions({ open: true, title: 'delivery_charge' });
						}}
						disabled={
							currentInvoicePos.payment_method === 'balance_payment'
						}
					>
						Set Delivery
					</Button>
					<Button
						className="flex-1"
						onClick={() => {
							setDialogOptions({ open: true, title: 'discount' });
						}}
						disabled={
							currentInvoicePos.payment_method === 'balance_payment'
						}
					>
						Set Discount
					</Button>
				</div>
				<Button
					onClick={() => {
						setDialogOptions({ open: true, title: 'payment_type' });
						console.log('Options:', dialogOptions);
					}}
				>
					Set Payment Type
				</Button>
				<Button
					onClick={() => {
						setDialogOptions({ open: true, title: 'paid_amount' });
						console.log('Options:', dialogOptions);
					}}
				>
					Add Paid Amount
				</Button>
				<hr className="my-1 w-full" />

				<Button
					className="w-full disabled:cursor-not-allowed"
					onClick={() => {
						setDialogOptions({ open: true, title: 'checkout_discount' });
						//   handleSubmit();
					}}
					disabled={
						Object.keys(selectedCustomer).length === 0 ||
						selectedVoucher !== undefined || // disable discount request if voucher is selected
						(currentInvoicePos.total_discount ?? 0) <= 0 ||
						(currentInvoicePos.type === 'payment' &&
							currentInvoicePos.payment_method !== 'purchase_order' &&
							currentInvoicePos.payment_method !== 'balance_payment' &&
							(currentInvoicePos.change_amount ?? 0) < 0)
					}
				>
					Checkout with Discount
				</Button>
				<Button
					className="w-full disabled:cursor-not-allowed"
					onClick={() => {
						setDialogOptions({ open: true, title: 'checkout' });
						//   handleSubmit();
					}}
					disabled={
						Object.keys(selectedCustomer).length === 0 || // disable checkout if no customer is selected
						(currentInvoicePos.type === 'payment' &&
							currentInvoicePos.payment_method !== 'balance_payment' &&
							cartItems.length === 0) || // disable checkout if no items in cart for non-balance payment
						(currentInvoicePos.type === 'payment' &&
							currentInvoicePos.payment_method !== 'purchase_order' &&
							currentInvoicePos.payment_method !== 'balance_payment' &&
							(currentInvoicePos.change_amount ?? 0) < 0) || // disable checkout if change amount is negative for payment methods
						(currentInvoicePos.type === 'payment' &&
							currentInvoicePos.payment_method === 'balance_payment' &&
							(currentInvoicePos.paid_amount ?? 0) <= 0) || // disable checkout if no paid amount for balance payment
						(currentInvoicePos.type === 'exit' && cartItems.length === 0) // disable checkout if no items in cart for exit
					}
				>
					Checkout
				</Button>
			</div>
		</>
	);
};
