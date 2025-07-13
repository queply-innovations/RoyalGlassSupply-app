import { UseModalProps } from '@/utils/Modal';
import { useInvoice } from '../context/InvoiceContext';
import { Button } from '@/components';
import { useInvoiceMutation } from '../hooks/useInvoiceMutation';
import { InvoiceFormHeader } from './form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/components/ui/select';
import { useEffect } from 'react';
import { Invoices } from '../types';
import { useAuth } from '@/context/AuthContext';
import { formatUTCDate } from '@/utils/timeUtils';
import { Axios } from 'axios';

interface InvoiceFormProps {
	onClose: UseModalProps['closeModal'];
	formAction: string;
}

export const InvoiceForm = ({
	// onClose,
	formAction = 'add',
}: InvoiceFormProps) => {
	const { invoices, invoiceSelected } = useInvoice();
	const { auth } = useAuth();

	const handleSubmit = async () => {
		console.log('invoiceForm:', invoiceForm);
		try {
			await new Promise(resolve => setTimeout(resolve, 1000));
			if (formAction === 'update') {
				// * call updateInvoiceMutation to Update Invoice
				console.log('Update Invoice:', invoiceForm.id);
				// await updateInvoiceMutation(invoiceForm);
				// onClose();
			}
			if (formAction === 'remove') {
				// * call removeInvoiceMutation to Remove Invoice
				console.log('Remove Invoice:', invoiceForm.id);
				await removeInvoiceMutation(invoiceForm.id);
				// onClose();
			} else if (formAction === 'add') {
				// * call addInvoiceMutation to Add Invoice
				console.log('Add Invoice:', invoiceForm.id);
				// await addInvoiceMutation(invoiceForm);
				// onClose();
			}
		} catch (error: any) {
			console.error('Invoice Data submission failed', error.message);
		}
	};
	const {
		value: invoiceForm,
		setValue: setInvoiceForm,
		handleChange,
		selectChange,
		// addInvoiceMutation,
		// updateInvoiceMutation,
		removeInvoiceMutation,
	} = useInvoiceMutation();

	useEffect(() => {
		if (formAction === 'update') {
			setInvoiceForm(invoiceSelected);
			console.log('update', invoiceSelected.id);
		}
		if (formAction === 'remove') {
			setInvoiceForm(invoiceSelected);
			console.log('remove', invoiceSelected.id);
		}
		if (formAction === 'add') {
			setInvoiceForm({} as Invoices);
		}
	}, [invoiceSelected, formAction]);

	return (
		<>
			<form
				onSubmit={e => {
					e.preventDefault();
					handleSubmit();
				}}
			>
				{formAction === 'remove' && (
					<>
						<div className="flex flex-col gap-5">
							<Button type="submit" fill={'red'}>
								Delete Invoice
							</Button>
						</div>
					</>
				)}
				{formAction === 'update' && (
					<>
						<div className="flex min-w-[700px] max-w-2xl  flex-col gap-5">
							{/* Invoice Header */}
							<div className="flex flex-row justify-between gap-10">
								<div className="flex flex-col ">
									<div className="flex min-w-0 flex-row gap-1">
										<p className="text-base font-bold uppercase">
											Invoice ID:
										</p>
										{formAction === 'update'
											? invoiceSelected.id
											: ''}
									</div>
									<div className="flex min-w-0 flex-row gap-1">
										<p className="text-base font-bold uppercase">
											Issued By:
										</p>
										{formAction === 'update'
											? invoiceSelected.issued_by.firstname.toUpperCase()
											: auth.user.firstname.toUpperCase()}
									</div>
								</div>
								<div className="flex flex-col justify-between">
									<div className="flex min-w-0 flex-row gap-1">
										<p className="text-base font-bold uppercase">
											Created At:
										</p>
										<span className="text-base">
											{formatUTCDate(invoiceSelected.created_at)}
										</span>
									</div>
									<div className="flex min-w-0 flex-row gap-1">
										<p className="text-base font-bold uppercase">
											OR #:
										</p>
										<span className="text-base">
											{invoiceSelected.or_no}
										</span>
									</div>
									<div className="flex min-w-0 flex-row gap-1">
										<p className="text-base font-bold uppercase">
											Reference #:
										</p>
										<span className="text-base">
											{invoiceSelected.reference_no
												? invoiceSelected.reference_no
												: 'N/A'}
										</span>
									</div>
								</div>
							</div>
							{/* <InvoiceFormHeader /> */}
							<hr />
							{/* Invoice First Row Section */}
							<div className="flex min-w-full max-w-md flex-grow flex-row gap-6">
								{/* Invoice Type */}
								<div className="flex min-w-0 flex-1 flex-col gap-2">
									<Label
										htmlFor="type"
										className="text-sm font-bold uppercase "
									>
										Type
									</Label>
									<Select
										id="type"
										name="type"
										key={'type'}
										onValueChange={value =>
											selectChange({ type: value })
										}
										defaultValue={
											formAction === 'update'
												? invoiceSelected.type
												: ''
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select Payment" />
										</SelectTrigger>
										<SelectContent className="bg-white" id="type">
											<SelectItem key={'payment'} value="payment">
												Payment
											</SelectItem>
											<SelectItem key={'exit'} value={'exit'}>
												Exit
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								{/* Invoice Payment Method */}
								<div className="flex min-w-0 flex-1 flex-col gap-2">
									<Label
										htmlFor="payment_method"
										className="text-sm font-bold uppercase "
									>
										Payment Method
									</Label>
									<Select
										id="payment_method"
										name="type"
										key={'type'}
										onValueChange={value =>
											selectChange({ payment_method: value })
										}
										defaultValue={
											formAction === 'update'
												? invoiceSelected.payment_method
												: ''
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select Payment Method" />
										</SelectTrigger>
										<SelectContent className="bg-white" id="type">
											<SelectItem value="cash">Cash</SelectItem>
											<SelectItem value="credit">Credit</SelectItem>
											<SelectItem value="debit">Debit</SelectItem>
											<SelectItem value="wallet">Wallet</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<hr />
							<div className="flex min-w-full max-w-md flex-grow flex-row gap-6">
								{/* Invoice Subtotal */}
								<div className="flex min-w-0 flex-1 flex-col gap-2">
									<Label
										htmlFor="subtotal"
										className="text-sm font-bold uppercase"
									>
										Subtotal
									</Label>
									<Input
										name="subtotal"
										id="subtotal"
										value={
											formAction === 'update'
												? invoiceSelected.subtotal
												: ''
										}
										onChange={handleChange}
										required
									/>
								</div>
								<div className="flex min-w-0 flex-1 flex-col gap-2">
									<Label
										htmlFor="total_tax"
										className="text-sm font-bold uppercase"
									>
										Total Tax
									</Label>
									<Input
										name="total_tax"
										id="total_tax"
										value={
											formAction === 'update'
												? invoiceSelected.total_tax
												: ''
										}
										onChange={handleChange}
										required
									/>
								</div>
								<div className="flex min-w-0 flex-1 flex-col gap-2">
									<Label
										htmlFor="total_discount"
										className="text-sm font-bold uppercase"
									>
										Total Discount
									</Label>
									<Input
										name="total_discount"
										id="total_discount"
										value={
											formAction === 'update'
												? invoiceSelected.total_discount
												: ''
										}
										onChange={handleChange}
										required
									/>
								</div>
								<div className="flex min-w-0 flex-1 flex-col gap-2">
									<Label
										htmlFor="total_amount_due"
										className="text-sm font-bold uppercase"
									>
										Total Amount Due
									</Label>
									<Input
										name="total_amount_due"
										id="total_amount_due"
										value={
											formAction === 'update'
												? invoiceSelected.total_amount_due
												: ''
										}
										onChange={handleChange}
										required
									/>
								</div>
							</div>
						</div>
						<Button
							onClick={() => {
								console.log('InvoiceFORMDATA:', invoiceForm);
							}}
						>
							console form
						</Button>
					</>
				)}
			</form>
		</>
	);
};
