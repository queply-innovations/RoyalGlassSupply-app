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
interface AddDiscountDialogProps {
	// value: boolean;
}

export const AddDiscountDialog = ({}: AddDiscountDialogProps) => {
	const { setOpenDialog, openDialog } = usePos();
	const { handleChange, invoice } = useInvoice();

	const [DiscountAmount, setDiscountAmount] = useState<number>(
		invoice.total_discount ?? 0,
	);

	const submitHandler = () => {
		handleChange('total_discount', DiscountAmount);
		setOpenDialog(false);
	};

	return (
		<Dialog onOpenChange={setOpenDialog} open={openDialog}>
			<DialogContent>
				<DialogHeader className="items-start">
					<DialogTitle>Add Discount Amount</DialogTitle>
					<DialogDescription>
						Contact admininstrator for approval
					</DialogDescription>
				</DialogHeader>
				<form
					className="flex flex-col gap-2 "
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
							defaultValue={DiscountAmount}
							type="number"
							onChange={e => {
								setDiscountAmount(Number(e.target.value));
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
