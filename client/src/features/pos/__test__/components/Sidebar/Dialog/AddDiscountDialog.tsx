import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { usePos } from '../../../context/__test__/PosContext';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useInvoicePos } from '../../../context/__test__/InvoicePosContext';
import { useCustomer } from '@/features/customer/__test__/context/CustomerContext';
interface AddDiscountDialogProps {
	// value: boolean;
}

export const AddDiscountDialog = ({}: AddDiscountDialogProps) => {
	const { setDialogOptions, dialogOptions } = usePos();
	const { handleInvoicePosChange, currentInvoicePos } = useInvoicePos();
	const { selectedCustomer, vouchers, selectedVoucher, setSelectedVoucher } =
		useCustomer();

	const [DiscountAmount, setDiscountAmount] = useState<number>(
		currentInvoicePos.total_discount ?? 0,
	);

	const submitHandler = () => {
		handleInvoicePosChange('total_discount', DiscountAmount);
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
							value={DiscountAmount}
							type="number"
							onChange={e => {
								setDiscountAmount(Number(e.target.value));
								setSelectedVoucher(undefined);
							}}
							onBlur={e => {
								e.target.value = DiscountAmount.toString();
							}}
						/>
					</div>

					<div className="mb-4">
						<span className="text-sm font-semibold text-slate-800">
							Claim voucher
						</span>
						<Select
							disabled={Object.keys(selectedCustomer).length === 0}
							value={
								selectedVoucher ? selectedVoucher?.id.toString() : ''
							}
							onValueChange={value => {
								const voucherItem = vouchers?.find(
									voucher => voucher.id === Number(value),
								);
								setDiscountAmount(voucherItem?.discounted_price ?? 0);
								setSelectedVoucher(voucherItem ?? undefined);
							}}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select voucher..." />
							</SelectTrigger>
							<SelectContent>
								{vouchers?.map(voucher => (
									<SelectItem key={voucher.id} value={`${voucher.id}`}>
										<span className="font-bold">{voucher.code}</span>
										{' • '}
										<span>
											{Intl.NumberFormat('en-PH', {
												style: 'currency',
												currency: 'PHP',
											}).format(voucher.discounted_price ?? 0)}
										</span>
									</SelectItem>
								))}
							</SelectContent>
						</Select>
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
