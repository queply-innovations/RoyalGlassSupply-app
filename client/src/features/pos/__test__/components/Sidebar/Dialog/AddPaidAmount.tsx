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
import { useState } from 'react';
interface AddPaidAmountProps {
	// value: boolean;
}

export const AddPaidAmount = ({}: AddPaidAmountProps) => {
	const { setOpenDialog, openDialog } = usePos();
	const { handleChange, invoice } = useInvoice();

	const [PaidAmount, setPaidAmount] = useState<number>(
		invoice.paid_amount ?? 0,
	);

	const submitHandler = () => {
		handleChange('paid_amount', PaidAmount);
		setOpenDialog(false);
	};

	return (
		<Dialog onOpenChange={setOpenDialog} open={openDialog}>
			<DialogContent>
				<DialogHeader className="items-start">
					<DialogTitle>Add Paid Amount</DialogTitle>
					<DialogDescription>
						Input the exact amount paid by the customer
					</DialogDescription>
				</DialogHeader>
				<form
					className="flex flex-col gap-2"
					onSubmit={e => {
						e.preventDefault();
					}}
				>
					<div className="relative">
						<span className="absolute inset-y-0 left-0 flex items-center pl-4 text-black">
							₱
						</span>
						<Input
							className="pl-8"
							defaultValue={PaidAmount}
							type="number"
							onChange={e => {
								setPaidAmount(Number(e.target.value));
							}}
						/>
					</div>

					<DialogClose asChild>
						<Button
							className="w-full "
							type="submit"
							onClick={() => {
								submitHandler();
							}}
						>
							Apply
						</Button>
					</DialogClose>
				</form>
			</DialogContent>
		</Dialog>
	);
};
