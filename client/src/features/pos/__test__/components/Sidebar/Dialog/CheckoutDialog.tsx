import { Button } from '@/components/ui/button';
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { usePos } from '../../../context/__test__/PosContext';
import { useEffect, useState } from 'react';
import { useInvoicePos } from '../../../context/__test__/InvoicePosContext';
import { PaymentInfoContainer } from '../Container';
import { useInvoiceMutation } from '@/features/invoice/__test__/hooks/useInvoiceMutation';
import { toast } from 'react-toastify';
import { CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCustomer } from '@/features/customer/__test__/context/CustomerContext';
import { setVoucherClaimed } from '@/features/customer/__test__/api/Vouchers';

export const CheckoutDialog = () => {
	const { setDialogOptions, dialogOptions } = usePos();
	const {
		fullData,
		setFullData,
		currentInvoicePos,
		setCurrentInvoicePos,
		cartItems,
	} = useInvoicePos();

	const [transactionStatus, setTransactionStatus] = useState<
		'confirming' | 'submitting' | 'success'
	>('confirming');
	const { addInvoiceMutation } = useInvoiceMutation();
	const { selectedVoucher, setSelectedVoucher } = useCustomer();
	async function handleSubmit() {
		setTransactionStatus('submitting');
		const data: any = currentInvoicePos;
		data['invoice_items'] = cartItems.map(({ item, ...rest }) => rest);
		// await addInvoiceMutation(data).then(() => window.api.send());
		await addInvoiceMutation(data)
			.then(res => {
				selectedVoucher &&
					setVoucherClaimed(selectedVoucher.id).then(() =>
						setSelectedVoucher(undefined),
					);
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

	useEffect(() => {
		if (dialogOptions.title === 'checkout_discount') {
			//@ts-ignore
			setCurrentInvoicePos(previous => {
				return { ...previous, status: 'pending' };
			});
		} else {
			//@ts-ignore
			setCurrentInvoicePos(previous => {
				return { ...previous, status: 'approved' };
			});
		}
	}, [dialogOptions.title]);

	const navigate = useNavigate();

	// Send data to main process
	const sendInvoiceData = () => {
		window.api.sendInvoice({
			invoiceItems: cartItems,
			invoiceDetails: fullData,
		});
	};

	return (
		<AlertDialog
			onOpenChange={() => {
				setDialogOptions({ open: false, title: '' });
			}}
			open={dialogOptions.open}
		>
			<AlertDialogContent onEscapeKeyDown={e => e.preventDefault()}>
				<AlertDialogHeader className="items-start">
					<AlertDialogTitle>
						{transactionStatus !== 'success'
							? `${dialogOptions.title === 'checkout' ? 'Checkout' : 'Checkout with Discount'}`
							: 'Transaction successful'}
					</AlertDialogTitle>
					{transactionStatus !== 'success' && (
						<AlertDialogDescription>
							Confirm the details of this transaction
						</AlertDialogDescription>
					)}
				</AlertDialogHeader>
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
						className={`font-medium ${transactionStatus !== 'confirming' && 'hidden'} flex-1`}
						type="reset"
						onClick={() => {
							setDialogOptions({ open: false, title: '' });
						}}
					>
						Cancel
					</Button>

					{transactionStatus === 'success' ? (
						<div className="flex w-full flex-row gap-2">
							<Button
								className="flex-1"
								onClick={() => {
									navigate(0);
								}}
							>
								New transaction
							</Button>
							<Button
								className={`flex-1`}
								type="submit"
								onClick={e => {
									e.preventDefault();
									sendInvoiceData();
								}}
							>
								Print invoice
							</Button>
						</div>
					) : (
						<Button
							className={`flex-1`}
							disabled={transactionStatus === 'submitting'}
							type="submit"
							onClick={e => {
								e.preventDefault();
								setTransactionStatus('submitting');
								handleSubmit();
							}}
						>
							{transactionStatus === 'confirming'
								? 'Confirm transaction'
								: transactionStatus === 'submitting'
									? 'Submitting...'
									: ''}
						</Button>
					)}
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
};
