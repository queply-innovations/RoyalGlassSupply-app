import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { usePos } from '../../../context/__test__/PosContext';
import { useInvoice } from '@/features/invoice/__test__/context/InvoiceContext';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';
import { useInvoicePos } from '../../../context/__test__/InvoicePosContext';
import { formatCurrency } from '@/utils/FormatCurrency';
import { PaymentInfoContainer } from '../Container';
import { useInvoiceMutation } from '@/features/invoice/__test__/hooks/useInvoiceMutation';
import { toast } from 'react-toastify';
import { CheckCircle2 } from 'lucide-react';
import { PrintInvoice } from '../PrintInvoice/PrintInvoice';

export const CheckoutDialog = () => {
	const { setDialogOptions, dialogOptions } = usePos();
	const {
		handleInvoicePosChange,
		invoiceItemsDatabase,
		currentInvoiceItemsQueue,
		fullData,
		setFullData,
		currentInvoicePos,
	} = useInvoicePos();

	const [transactionStatus, setTransactionStatus] = useState<
		'confirming' | 'submitting' | 'success'
	>('confirming');
	const { addInvoiceMutation } = useInvoiceMutation();
	async function handleSubmit() {
		setTransactionStatus('submitting');
		console.log('Invoice:', currentInvoicePos);
		console.log('InvoiceItems:', currentInvoiceItemsQueue);
		console.log('InvoiceItemsDatabase:', invoiceItemsDatabase);
		const data: any = currentInvoicePos;
		data['invoice_items'] = invoiceItemsDatabase.map((d: any) => {
			return { ...d, product_id: d.product_id };
		});
		// await addInvoiceMutation(data).then(() => window.api.send());
		await addInvoiceMutation(data)
			.then(res => {
				setFullData(res.data);
				setTransactionStatus('success');
				toast.success('Transaction successful.', { autoClose: 3000 });
			})
			.catch(() => {
				setTransactionStatus('confirming');
				toast.error('Transaction failed. Please try again.', {
					autoClose: 3000,
				});
			});
	}

	// TODO: Check this print function
	// useEffect(() => {
	//    if (fullData) {
	//       console.log(fullData);

	//    }
	// }, [fullData]);

	function sendData() {
		window.api.send({
			fullData: fullData,
			invoiceItems: currentInvoiceItemsQueue,
		});
	}

	return (
		<Dialog
			onOpenChange={() => {
				setDialogOptions({ open: false, title: '' });
			}}
			open={dialogOptions.open}
		>
			<DialogContent>
				<DialogHeader className="items-start">
					<DialogTitle>
						{transactionStatus !== 'success'
							? 'Checkout'
							: 'Transaction successful'}
					</DialogTitle>
					{transactionStatus !== 'success' && (
						<DialogDescription>
							Confirm the details of this transaction
						</DialogDescription>
					)}
				</DialogHeader>
				{transactionStatus !== 'success' ? (
					<PaymentInfoContainer />
				) : (
					<div className="my-4 w-full space-y-2 text-center">
						<CheckCircle2 size={80} className="mx-auto text-green-500" />
						<h3 className="text-base font-medium text-slate-700">
							Transaction has been successully submitted!
						</h3>
					</div>
				)}

				<div className="flex w-full flex-row gap-2">
					<Button
						variant={'outline'}
						className={`${transactionStatus !== 'confirming' && 'hidden'} flex-1`}
						type="reset"
						onClick={() => {
							const iframe = document.getElementById('print-iframe');
							if (iframe) {
								iframe.remove();
							}
							setDialogOptions({ open: false, title: '' });
						}}
					>
						Cancel
					</Button>
					<DialogClose asChild>
						{!(transactionStatus === 'success') ? (
							<PrintInvoice />
						) : (
							//  <Button
							//     className={`flex-1`}
							//     type="submit"
							//     onClick={e => {
							//        e.preventDefault();
							//        setTransactionStatus('confirming');
							//        sendData();
							//     }}>
							//     Print invoice
							//  </Button>
							<Button
								className={`flex-1`}
								// disabled={transactionStatus === 'submitting'}
								type="submit"
								onClick={e => {
									e.preventDefault();
									setTransactionStatus('submitting');
									handleSubmit();
								}}
							>
								{/* {transactionStatus === 'confirming'
									? 'Confirm transaction'
									: transactionStatus === 'submitting'
										? 'Submitting...'
										: ''} */}
							</Button>
						)}
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	);
};
