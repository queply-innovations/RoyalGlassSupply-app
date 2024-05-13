import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { usePos } from '../../../context/__test__/PosContext';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useInvoicePos } from '../../../context/__test__/InvoicePosContext';

export const AddDeliveryChargeDialog = () => {
	const { setDialogOptions, dialogOptions } = usePos();
	const { handleInvoicePosChange, currentInvoicePos } = useInvoicePos();

	const [deliveryCharge, setDeliveryCharge] = useState<number>(
		currentInvoicePos.delivery_charge ?? 0,
	);

	const submitHandler = () => {
		handleInvoicePosChange('delivery_charge', deliveryCharge);
		setDialogOptions({ open: false, title: '' });
	};

	return (
		<Dialog
			onOpenChange={() => {
				setDialogOptions({ open: false, title: '' });
			}}
			open={dialogOptions.open}
		>
			<DialogContent>
				<DialogHeader className="items-start">
					<DialogTitle>Add Delivery Charge</DialogTitle>
				</DialogHeader>
				<form
					className="flex flex-col gap-6"
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
							defaultValue={deliveryCharge}
							type="number"
							onChange={e => {
								setDeliveryCharge(Number(e.target.value));
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
