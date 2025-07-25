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
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { useInvoicePos } from '../../../context/__test__/InvoicePosContext';
import { useCustomer } from '@/features/customer/__test__/context/CustomerContext';

interface PaymentTypeDialogProps {
	// value: boolean;
}

export const PaymentTypeDialog = ({}: PaymentTypeDialogProps) => {
	const { setDialogOptions, dialogOptions } = usePos();
	const { selectedCustomer } = useCustomer();
	const {
		handleInvoicePosChange,
		currentInvoicePos,
		// setCurrentInvoiceItemsQueue,
		setCartItems,
		// setInvoiceItemsDatabase,
	} = useInvoicePos();
	const [PaymentType, setPaymentType] = useState<string>(
		currentInvoicePos.type ?? 'payment',
	);
	useEffect(() => {
		if (currentInvoicePos.type === 'exit') {
			handleInvoicePosChange('payment_method', 'exit');
		}
	}, [currentInvoicePos.type]);

	return (
		<Dialog
			onOpenChange={() => {
				setDialogOptions({ open: false, title: '' });
			}}
			open={dialogOptions.open}
		>
			<DialogContent>
				<DialogHeader className="items-start">
					<DialogTitle>Select Payment Type</DialogTitle>
					<DialogDescription>
						Payment Type:{' '}
						{currentInvoicePos.type === 'payment' ? 'Payment' : 'Exit'}
					</DialogDescription>
				</DialogHeader>
				<Tabs
					id="type"
					value={PaymentType}
					onValueChange={value => {
						handleInvoicePosChange('type', value);
						setPaymentType(value);
					}}
				>
					<TabsList className="flex h-12 flex-row gap-1 p-2">
						<TabsTrigger
							value="payment"
							className="data-[state=active]:bg-primary h-10 w-full rounded-md font-medium
                                text-slate-800 hover:bg-slate-200 data-[state=active]:text-white"
						>
							Payment
						</TabsTrigger>
						<TabsTrigger
							value="exit"
							className="data-[state=active]:bg-primary h-10 w-full rounded-md font-medium
                                text-slate-800 hover:bg-slate-200 data-[state=active]:text-white"
						>
							Exit
						</TabsTrigger>
					</TabsList>
				</Tabs>
				{currentInvoicePos.type === 'payment' && (
					<div className="grid columns-4 grid-cols-2 gap-2">
						<Button
							variant={'outline'}
							className={`h-16 font-medium ${currentInvoicePos.payment_method === 'cash' && 'bg-primary text-white'}`}
							onClick={() => {
								handleInvoicePosChange('payment_method', 'cash');
							}}
						>
							Cash
						</Button>
						<Button
							variant={'outline'}
							className={`h-16 font-medium ${currentInvoicePos.payment_method === 'cheque' && 'bg-primary text-white'}`}
							onClick={() => {
								handleInvoicePosChange('payment_method', 'cheque');
							}}
						>
							Cheque
						</Button>
						{/* <Button
                     variant={'outline'}
                     className={`h-16 font-medium ${currentInvoicePos.payment_method === 'voucher' && 'bg-primary text-white'}`}
                     onClick={() => {
                        handleInvoicePosChange('payment_method', 'voucher');
                     }}>
                     Voucher
                  </Button> */}
						<Button
							variant={'outline'}
							className={`h-16 font-medium ${currentInvoicePos.payment_method === 'e-wallet' && 'bg-primary text-white'}`}
							onClick={() => {
								handleInvoicePosChange('payment_method', 'e-wallet');
							}}
						>
							E-Wallet
						</Button>
						<Button
							variant={'outline'}
							className={`h-16 font-medium ${currentInvoicePos.payment_method === 'purchase_order' && 'bg-primary text-white'}`}
							onClick={() => {
								handleInvoicePosChange(
									'payment_method',
									'purchase_order',
								);
							}}
						>
							Purchase Order
						</Button>
						<Button
							variant={'outline'}
							disabled={!selectedCustomer?.total_balance}
							className={`h-16 font-medium ${currentInvoicePos.payment_method === 'balance_payment' && 'bg-primary text-white'}`}
							onClick={() => {
								setCartItems([]);
								handleInvoicePosChange(
									'payment_method',
									'balance_payment',
								);
							}}
						>
							Balance Payment
						</Button>
					</div>
				)}
				<div>
					{(currentInvoicePos.payment_method === 'cheque' ||
						currentInvoicePos.payment_method === 'voucher' ||
						currentInvoicePos.payment_method === 'e-wallet' ||
						currentInvoicePos.payment_method === 'purchase_order') && (
						<>
							<div className="flex w-full flex-col justify-between gap-2">
								<Label>Input Reference Code:</Label>
								<Input placeholder="Reference Code" />
							</div>
						</>
					)}
				</div>
				<DialogClose asChild>
					<Button
						// className="w-full bg-gray-200 text-slate-700 hover:bg-gray-400 hover:text-white"
						type="button"
						onClick={() => {
							setDialogOptions({ open: false, title: '' });
						}}
					>
						Close
					</Button>
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
};
