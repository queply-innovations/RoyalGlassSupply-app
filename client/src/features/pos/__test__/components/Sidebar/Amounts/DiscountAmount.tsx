import { useInvoice } from '@/features/invoice/__test__/context/InvoiceContext';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Coins } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/utils/FormatCurrency';

export const DiscountAmount = () => {
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
					<span className="text-black ">Discount Amount</span>
				</div>
				<Input
					className="w-3/4 border-0 text-end text-base font-medium text-black focus-visible:ring-0 focus-visible:ring-offset-0 disabled:border-0"
					ref={inputRef}
					id="total_discount"
					name="total_discount"
					type="text"
					placeholder="₱0.00"
					disabled={invoiceItemsQueue.length <= 0}
					onBlur={e => {
						let value = e.target.value
							? parseFloat(e.target.value.replace(/[^\d.]/g, ''))
							: 0;
						value = Number(value.toFixed(2));
						e.target.value = `${formatCurrency(value)}`;
						handleChange('total_discount', value);
					}}
					onChange={e => {
						handleChange('total_discount', Number(e.target.value));
						handleChange(
							'change_amount',
							Number(e.target.value) -
								invoiceItemsQueue.reduce(
									(acc, item) => acc + item.total_price,
									0,
								),
						);
						handleChange('status', Number(e.target.value) > 0 ? 'pending' : 'approved')
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
