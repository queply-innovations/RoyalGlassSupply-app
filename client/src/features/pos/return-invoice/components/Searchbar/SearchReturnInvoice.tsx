import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { ReturnInvoiceInfo } from '../Info/ReturnInvoiceInfo';
import { ReturnItems } from '../Select/ReturnItems';
import { useReturnInvoice } from '../../context/ReturnInvoiceContext';
import { toast } from 'react-toastify';
import { SubmitReturnButton } from '../Submit/SubmitReturnButton';
import { CashRefundCheckbox } from '../Checkbox/CashRefundCheckbox';

export const SearchReturnInvoice = () => {
	const [invoiceCodeValue, setInvoiceCodeValue] = useState<string>('IVC01-');
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
				<div className="flex flex-row justify-between w-full gap-4">
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
						<div className="flex flex-row items-center justify-between w-full gap-5 pb-4">
							<ReturnInvoiceInfo />
							<div className="flex flex-row items-center gap-6">
								<CashRefundCheckbox />
								<SubmitReturnButton />
							</div>
						</div>
						<ReturnItems />
					</>
				)}
			</form>
		</>
	);
};
