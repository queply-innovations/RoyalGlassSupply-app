import { useEffect, useState } from 'react';
import { usePos } from '../../../context/__test__/PosContext';
import { useInvoicePos } from '../../../context/__test__/InvoicePosContext';
import { useNavigate } from 'react-router-dom';
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
	ApprovalWaitingContainer,
	ConfirmTransactionContainer,
	UpdateDiscountContainer,
	UpdatePaidAmountContainer,
} from '../Container';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CheckoutDiscount = () => {
	const { setDialogOptions, dialogOptions } = usePos();
	const {
		invoiceItemsDatabase,
		currentInvoiceItemsQueue,
		fullData,
		currentInvoicePos,
		setCurrentInvoicePos,
	} = useInvoicePos();

	const navigate = useNavigate();

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [page, setPage] = useState<
		| 'confirmation'
		| 'awaitingApproval'
		| 'editDiscount'
		| 'editPaidAmount'
		| 'success'
	>('confirmation');

	// State to store the invoice ID after submitting the transaction
	// Used as reference to update the status and discount
	const [invoiceID, setInvoiceID] = useState<number | undefined>();

	useEffect(() => {
		if (dialogOptions.title === 'checkout_discount') {
			//@ts-ignore
			setCurrentInvoicePos(previous => {
				return { ...previous, status: 'pending' };
			});
		}
	}, [dialogOptions.title]);

	useEffect(() => {
		console.log(currentInvoicePos);
	}, [currentInvoicePos]);

	function sendData() {
		window.api.send({
			fullData: fullData,
			invoiceItems: currentInvoiceItemsQueue,
			invoiceItemsDatabase: invoiceItemsDatabase,
		});
	}

	return (
		<AlertDialog
			onOpenChange={() => {
				setDialogOptions({ open: false, title: '' });
			}}
			open={dialogOptions.open}
		>
			<AlertDialogContent
				// Disable closing the dialog by pressing the escape key
				onEscapeKeyDown={e => {
					e.preventDefault();
				}}
			>
				<AlertDialogHeader className="items-start">
					<AlertDialogTitle>Checkout with Discount</AlertDialogTitle>
					<AlertDialogDescription className="text-left">
						{page === 'confirmation' &&
							'Confirm the details of this transaction, especially the discount. This will be sent to the admin for approval.'}
						{page === 'awaitingApproval' &&
							'Please wait for the admin to approve the transaction details.'}
					</AlertDialogDescription>
				</AlertDialogHeader>

				{/* Confirming transaction */}
				{page === 'confirmation' && (
					<ConfirmTransactionContainer
						isSubmitting={isSubmitting}
						setisSubmitting={setIsSubmitting}
						setPage={setPage}
						setInvoiceID={setInvoiceID}
					/>
				)}

				{/* Waiting for approval */}
				{page === 'awaitingApproval' && (
					<ApprovalWaitingContainer
						invoiceID={invoiceID}
						isSubmitting={isSubmitting}
						setisSubmitting={setIsSubmitting}
						setPage={setPage}
					/>
				)}

				{/* Approved and successful */}
				{page === 'success' && (
					<>
						<div className="my-4 w-full space-y-2 text-center">
							<CheckCircle2
								size={80}
								className="mx-auto text-green-500"
							/>
							<h3 className="text-base font-medium text-slate-700">
								Transaction has been successully submitted!
							</h3>
						</div>

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
									sendData();
								}}
							>
								Print invoice
							</Button>
						</div>
					</>
				)}

				{page === 'editDiscount' && (
					<UpdateDiscountContainer setPage={setPage} />
				)}

				{page === 'editPaidAmount' && (
					<UpdatePaidAmountContainer setPage={setPage} />
				)}
			</AlertDialogContent>
		</AlertDialog>
	);
};
