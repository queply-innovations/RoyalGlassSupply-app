import { Button } from '@/components/ui/button';
import { PaymentInfoContainer } from './PaymentInfoContainer';
import { useInvoicePos } from '../../../context/__test__/InvoicePosContext';
import { useInvoiceMutation } from '@/features/invoice/__test__/hooks/useInvoiceMutation';
import { Invoices } from '@/features/invoice/__test__/types';
import { toast } from 'react-toastify';

interface ApprovalWaitingContainerProps {
	invoiceID: number | undefined;
	isSubmitting: boolean;
	setisSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
	setPage: React.Dispatch<React.SetStateAction<any>>;
}

export const ApprovalWaitingContainer = ({
	invoiceID,
	isSubmitting,
	setisSubmitting,
	setPage,
}: ApprovalWaitingContainerProps) => {
	const { currentInvoicePos, setFullData } = useInvoicePos();
	const { updatePendingInvoiceMutation } = useInvoiceMutation();

	async function handleUpdate() {
		setisSubmitting(true);
		const data: Partial<Invoices> = {
			status: 'approved',
			total_discount: currentInvoicePos.total_discount,
			paid_amount: currentInvoicePos.paid_amount,
			change_amount: currentInvoicePos.change_amount,
			total_amount_due: currentInvoicePos.total_amount_due,
		};

		await updatePendingInvoiceMutation({ id: invoiceID!, data })
			.then(res => {
				setisSubmitting(false);
				setPage('success');
				setFullData(res.data);
			})
			.catch(() => {
				setisSubmitting(false);
				toast.error('An error occurred. Please try again.', {
					autoClose: 3000,
				});
			});
	}

	return (
		<>
			<PaymentInfoContainer />

			<div className="flex w-full flex-col gap-2">
				<div className="flex flex-row gap-2">
					<Button
						className={'flex-1 font-medium'}
						onClick={() => setPage('editPaidAmount')}
					>
						Edit paid amount
					</Button>

					<Button
						className={'flex-1 font-medium'}
						onClick={() => setPage('editDiscount')}
					>
						Edit discount
					</Button>
				</div>

				<hr className="my-1 border-slate-300" />

				<Button
					className={'font-medium'}
					disabled={
						invoiceID === undefined ||
						isSubmitting ||
						(currentInvoicePos.change_amount ?? 0) < 0
					}
					onClick={handleUpdate}
				>
					Submit transaction
				</Button>
			</div>
		</>
	);
};
