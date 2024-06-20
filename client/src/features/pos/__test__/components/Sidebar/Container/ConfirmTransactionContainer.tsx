import { Button } from '@/components/ui/button';
import { PaymentInfoContainer } from './PaymentInfoContainer';
import { usePos } from '../../../context/__test__/PosContext';
import { useInvoicePos } from '../../../context/__test__/InvoicePosContext';
import { useInvoiceMutation } from '@/features/invoice/__test__/hooks/useInvoiceMutation';
import { useCustomer } from '@/features/customer/__test__/context/CustomerContext';
import { setVoucherClaimed } from '@/features/customer/__test__/api/Vouchers';
import { toast } from 'react-toastify';

interface ConfirmTransactionContainerProps {
	isSubmitting: boolean;
	setisSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
	setPage: React.Dispatch<React.SetStateAction<any>>;
	setInvoiceID: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const ConfirmTransactionContainer = ({
	isSubmitting,
	setisSubmitting,
	setPage,
	setInvoiceID,
}: ConfirmTransactionContainerProps) => {
	const { setDialogOptions } = usePos();
	const { invoiceItemsDatabase, currentInvoicePos } = useInvoicePos();
	const { addInvoiceMutation } = useInvoiceMutation();
	const { selectedVoucher, setSelectedVoucher } = useCustomer();

	async function handleSubmit() {
		setisSubmitting(true);
		const data: any = currentInvoicePos;
		data['invoice_items'] = invoiceItemsDatabase.map((d: any) => {
			return { ...d, product_id: d.product_id };
		});
		await addInvoiceMutation(data)
			.then(res => {
				selectedVoucher &&
					setVoucherClaimed(selectedVoucher.id).then(() =>
						setSelectedVoucher(undefined),
					);
				setisSubmitting(false);
				setPage('awaitingApproval');
				setInvoiceID(res.data.id); // set invoice id for updating the status and discount
			})
			.catch(() => {
				setisSubmitting(false);
				toast.error('Transaction failed. Please try again.', {
					autoClose: 3000,
				});
			});
	}

	return (
		<>
			<PaymentInfoContainer />

			<div className="flex flex-row gap-2">
				<Button
					variant={'outline'}
					className={'flex-1 font-medium'}
					type="reset"
					onClick={() => {
						setDialogOptions({ open: false, title: '' });
					}}
				>
					Cancel
				</Button>
				<Button
					className={'flex-1'}
					disabled={
						isSubmitting || (currentInvoicePos.change_amount ?? 0) < 0
					}
					type="submit"
					onClick={e => {
						e.preventDefault();
						setisSubmitting(true);
						handleSubmit();
					}}
				>
					{!isSubmitting ? 'Request approval' : 'Submitting...'}
				</Button>
			</div>
		</>
	);
};
