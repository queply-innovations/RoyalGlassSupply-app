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

	const { searchInvoice, returnableItems } = useReturnInvoice();

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
			<form onSubmit={handleSubmit} className="flex flex-col gap-2">
				<div className="flex w-full flex-row justify-between gap-4">
					<Input
						value={invoiceCodeValue}
						maxLength={15}
						onChange={e => setInvoiceCodeValue(e.target.value)}
					/>
					<Button
						type="submit"
						className="bg-primary flex items-center gap-2 text-white"
					>
						<Search size={16} strokeWidth={2.5} />
						Search Invoice Code
					</Button>
				</div>
				{returnableItems.length > 0 && (
					<>
						<div className="flex w-full flex-row items-center justify-between">
							<ReturnInvoiceInfo />
							<Button>Initiate Return</Button>
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
