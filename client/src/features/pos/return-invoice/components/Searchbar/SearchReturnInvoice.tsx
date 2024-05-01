import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { useReturnInvoiceItemsPos } from '../../context/ReturnInvoiceItems';
import { ReturnInvoiceInfo } from '../Info/ReturnInvoiceInfo';
import { ReturnItems } from '../Select/ReturnItems';
import { useReturnInvoice } from '../../context/ReturnInvoiceContext';
import { fetchInvoiceByCode } from '@/features/invoice/__test__/api';
import { toast } from 'react-toastify';
import { SubmitReturnButton } from '../Submit/SubmitReturnButton';

export const SearchReturnInvoice = () => {
	const [invoiceCodeValue, setInvoiceCodeValue] = useState<string>('IVC01-');
	// const {
	// 	setInvoiceCode,
	// 	toastMessage,
	// 	returnInvoiceItems,
	// 	setSelectedReturnItems,
	// } = useReturnInvoiceItemsPos();

	// const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();
	// 	setSelectedReturnItems([]);
	// 	setInvoiceCode(invoiceCodeValue);
	// };

	const { searchInvoice, returnableItems, returnInvoice } = useReturnInvoice();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		searchInvoice(invoiceCodeValue)
			.then(res => {
				toast.success(res);
			})
			.catch(err => {
				toast.error(err);
			});
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<div className="flex w-full flex-row justify-between gap-4">
					<Input
						value={invoiceCodeValue}
						maxLength={15}
						onChange={e => setInvoiceCodeValue(e.target.value)}
					/>
					<Button
						type="submit"
						variant={returnInvoice.invoice_id ? 'outline' : 'default'}
						className="flex items-center gap-2"
					>
						<Search size={16} strokeWidth={2.5} />
						Search Invoice Code
					</Button>
				</div>
				{returnableItems.length > 0 && (
					<>
						<div className="flex w-full flex-row items-center justify-between pb-4">
							<ReturnInvoiceInfo />
							<SubmitReturnButton />
						</div>
						<ReturnItems />
					</>
				)}
				{/* {toastMessage && (
					<div className="p-2">
						<span>{toastMessage}</span>
					</div>
				)} */}
			</form>
		</>
	);
};
