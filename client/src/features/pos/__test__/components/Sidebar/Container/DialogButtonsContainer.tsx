/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { usePos } from '../../../context/__test__/PosContext';
import { useInvoiceMutation } from '@/features/invoice/__test__/hooks/useInvoiceMutation';
import { useEffect } from 'react';
import { useInvoicePos } from '../../../context/__test__/InvoicePosContext';
import { useCustomer } from '@/features/customer/__test__/context/CustomerContext';

interface DialogButtonsContainerProps {}

export const DialogButtonsContainer = ({}: DialogButtonsContainerProps) => {
	const { setDialogOptions, dialogOptions } = usePos();
	const { currentInvoicePos } = useInvoicePos();
	// const {
	// 	currentInvoicePos,
	// 	currentInvoiceItemsQueue,
	// 	fullData,
	// 	setFullData,
	// } = useInvoicePos();
	// const { invoice, invoiceItemsQueue, fullData, setFullData } = useInvoice();
	const { addInvoiceMutation } = useInvoiceMutation();
	const { selectedCustomer } = useCustomer();

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
				{/* <div className="grid grid-cols-2 gap-2">
               //TODO Add delivery charge
               <Button
                  variant={'outline'}
                  className="hover:cursor-not-allowed hover:bg-white"
                  onClick={() => {
                     setDialogOptions({
                        open: true,
                        title: 'delivery_charge',
                     });
                     console.log('Options:', dialogOptions);
                  }}>
                  Delivery Charge
               </Button>
            </div> */}
				<Button
					variant={'outline'}
					onClick={() => {
						setDialogOptions({ open: true, title: 'discount' });
					}}
				>
					Set Discount
				</Button>

				<Button
					variant={'outline'}
					onClick={() => {
						setDialogOptions({ open: true, title: 'payment_type' });
						console.log('Options:', dialogOptions);
					}}
				>
					Set Payment Type
				</Button>
				<Button
					variant={'outline'}
					onClick={() => {
						setDialogOptions({ open: true, title: 'paid_amount' });
						console.log('Options:', dialogOptions);
					}}
				>
					Add Paid Amount
				</Button>
				<Button
					variant={'default'}
					className="w-full disabled:cursor-not-allowed"
					onClick={() => {
						setDialogOptions({ open: true, title: 'checkout' });
						//   handleSubmit();
					}}
					disabled={
						Object.keys(selectedCustomer).length === 0 ||
						(currentInvoicePos.payment_method !== 'purchase_order' &&
							(currentInvoicePos.change_amount ?? 0) < 0)
					}
				>
					Checkout
				</Button>
			</div>
		</>
	);
};
