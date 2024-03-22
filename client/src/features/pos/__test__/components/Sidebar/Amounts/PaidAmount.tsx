import { Input } from '@/components/ui/input';
import { useInvoice } from '@/features/invoice/__test__/context/InvoiceContext';
import { formatCurrency } from '@/utils/FormatCurrency';
import { Coins } from 'lucide-react';
import { usePos } from '../../../context/PosContext';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';

export const PaidAmount = () => {
	const { invoice, handleChange, invoiceItemsQueue } = useInvoice();
	const inputRef = useRef<HTMLInputElement>(null);
	return (
		<>
			<Button
				className="flex w-full flex-row justify-between border-0 bg-white pr-0 hover:bg-white disabled:bg-white disabled:opacity-100"
				onClick={() => {
					inputRef.current!.focus();
				}}
				disabled={invoiceItemsQueue.length <= 0}
			>
				<div className="flex flex-row items-center gap-2">
					<Coins color="black" className="" size={24} />
					<span className="text-black ">Paid Amount</span>
				</div>
				<Input
					className="w-3/4 border-0 text-end text-base font-medium text-black focus-visible:ring-0 focus-visible:ring-offset-0 disabled:border-0"
					ref={inputRef}
					id="paid_amount"
					name="paid_amount"
					type="text"
					placeholder="₱0.00"
					disabled={invoiceItemsQueue.length <= 0}
					onBlur={e => {
						let value = e.target.value
							? parseFloat(e.target.value.replace(/[^\d.]/g, ''))
							: 0;
						value = Number(value.toFixed(2));
						e.target.value = `${formatCurrency(value)}`;
						handleChange('paid_amount', value);
					}}
					onChange={e => {
						handleChange('paid_amount', Number(e.target.value));
						handleChange(
							'change_amount',
							Number(
								Number(
									Number(e.target.value) -
										invoiceItemsQueue.reduce(
											(acc, item) => acc + item.total_price,
											0,
										),
								).toFixed(2),
							),
						);
						console.log('change:', invoice.change_amount);
					}}
					onFocus={e => {
						e.target.value = e.target.value.replace(/[^\d.]/g, '');
					}}
				/>
			</Button>
		</>
	);
};
