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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';

interface PaymentTypeDialogProps {
	// value: boolean;
}

export const PaymentTypeDialog = ({}: PaymentTypeDialogProps) => {
	const { setOpenDialog, openDialog } = usePos();
	const { handleChange, invoice } = useInvoice();
	const [PaymentType, setPaymentType] = useState<string>('payment');
	useEffect(() => {
		if (invoice.type === 'exit') {
			handleChange('payment_method', 'exit');
		}
		if (invoice.type === 'payment') {
			handleChange('payment_method', 'cash');
		}
	}, [invoice.type]);
	return (
		<Dialog onOpenChange={setOpenDialog} open={openDialog}>
			<DialogContent>
				<DialogHeader className="items-start">
					<DialogTitle>Select Payment Type</DialogTitle>
					<DialogDescription>
						Payment Type:{' '}
						{invoice.type === 'payment' ? 'Payment' : 'Exit'}
					</DialogDescription>
				</DialogHeader>
				<Tabs
					id="type"
					defaultValue={PaymentType}
					onValueChange={value => {
						handleChange('type', value);
						setPaymentType(value);
					}}
				>
					<TabsList className="flex flex-row h-12 gap-1 p-2">
						<TabsTrigger
							value="payment"
							className="data-[state=active]:bg-primary h-10 w-full rounded-md
                                text-slate-800 hover:bg-slate-200 data-[state=active]:text-white"
						>
							Payment
						</TabsTrigger>
						<TabsTrigger
							value="exit"
							className="data-[state=active]:bg-primary h-10 w-full rounded-md
                                text-slate-800 hover:bg-slate-200 data-[state=active]:text-white"
						>
							Exit
						</TabsTrigger>
					</TabsList>
				</Tabs>
				{invoice.type === 'payment' && (
					<div className="grid grid-cols-2 gap-2 columns-4">
						<Button
							variant={'outline'}
							className={`h-16 ${invoice.payment_method === 'cash' && 'bg-primary text-white'}`}
							onClick={() => {
								handleChange('payment_method', 'cash');
							}}
						>
							Cash
						</Button>
						<Button
							variant={'outline'}
							className={`h-16 ${invoice.payment_method === 'cheque' && 'bg-primary text-white'}`}
							onClick={() => {
								handleChange('payment_method', 'cheque');
							}}
						>
							Cheque
						</Button>
						<Button
							variant={'outline'}
							className={`h-16 ${invoice.payment_method === 'voucher' && 'bg-primary text-white'}`}
							onClick={() => {
								handleChange('payment_method', 'voucher');
							}}
						>
							Voucher
						</Button>
						<Button
							variant={'outline'}
							className={`h-16 ${invoice.payment_method === 'e-wallet' && 'bg-primary text-white'}`}
							onClick={() => {
								handleChange('payment_method', 'e-wallet');
							}}
						>
							E-Wallet
						</Button>
						<Button
							variant={'outline'}
							className={`col-span-2 h-16 ${invoice.payment_method === 'purchase_order' && 'bg-primary text-white'}`}
							onClick={() => {
								handleChange('payment_method', 'purchase_order');
							}}
						>
							Purchase Order
						</Button>
					</div>
				)}
				<div>
					{(invoice.payment_method === 'cheque' ||
						invoice.payment_method === 'voucher' ||
						invoice.payment_method === 'e-wallet' ||
						invoice.payment_method === 'purchase_order') && (
						<>
							<div className="flex flex-col justify-between w-full gap-2">
								<Label>Input Reference Code:</Label>
								<Input placeholder="Reference Code" />
							</div>
						</>
					)}
				</div>
				<DialogClose asChild>
					<Button
						className="w-full bg-gray-200 text-slate-700 hover:bg-gray-400 hover:text-white"
						type="button"
						onClick={() => {
							setOpenDialog(false);
						}}
					>
						Close
					</Button>
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
};
