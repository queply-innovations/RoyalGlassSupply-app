import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useReturnInvoice } from '../../context/ReturnInvoiceContext';

export const VoucherDialog = () => {
	const { voucher, setVoucher, isVoucherDialogOpen, setIsVoucherDialogOpen } =
		useReturnInvoice();

	return (
		<AlertDialog open={isVoucherDialogOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="text-left">
						Voucher generated
					</AlertDialogTitle>
				</AlertDialogHeader>

				<div className="my-4 flex w-full flex-row justify-between gap-4">
					<h4>
						Code: <span className="font-semibold">{voucher?.code}</span>
					</h4>
					<h5>
						Discount:{' '}
						{Intl.NumberFormat('en-PH', {
							style: 'currency',
							currency: 'PHP',
						}).format(voucher?.discounted_price ?? 0)}
					</h5>
				</div>
				<AlertDialogCancel
					onClick={() => {
						setVoucher(undefined);
						setIsVoucherDialogOpen(false);
					}}
				>
					Close
				</AlertDialogCancel>
			</AlertDialogContent>
		</AlertDialog>
	);
};
