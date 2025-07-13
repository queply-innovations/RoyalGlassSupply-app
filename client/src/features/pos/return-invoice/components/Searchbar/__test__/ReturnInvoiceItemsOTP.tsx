import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/input-otp';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useReturnInvoiceItemsPos } from '../../context/ReturnInvoiceItems';

export const SearchReturnInvoice = () => {
	const [invoiceCodeValue, setInvoiceCodeValue] = useState<string>('IVC01');
	const { invoiceCode, setInvoiceCode } = useReturnInvoiceItemsPos();

	// useEffect(() => {
	// 	if (invoiceCodeValue) {
	// 		const ivc = invoiceCodeValue.match(/([A-Z]+\d{2})(\d{2})(\d{6})/);
	// 		if (ivc) {
	// 			const [_, prefix, year, code] = ivc;
	// 			setInvoiceCode(`${prefix}-${year}-${code}`);
	// 			console.log('IVC:', invoiceCode);
	// 		}
	// 	}
	// }, [invoiceCodeValue]);

	const handleSubmit = e => {
		e.preventDefault();
		setInvoiceCode(invoiceCodeValue);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="flex w-full flex-row justify-between">
				<InputOTP
					containerClassName="gap-0 "
					value={invoiceCodeValue}
					maxLength={13}
					pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
					onChange={value => setInvoiceCodeValue(value)}
				>
					<InputOTPGroup>
						<InputOTPSlot
							index={0}
							className="border-gray-500 font-bold uppercase"
						/>
						<InputOTPSlot
							index={1}
							className="border-gray-500 font-bold uppercase"
						/>
						<InputOTPSlot
							index={2}
							className="border-gray-500 font-bold uppercase"
						/>
						<InputOTPSlot
							index={3}
							className="border-gray-500 font-bold uppercase"
						/>
						<InputOTPSlot
							index={4}
							className="border-gray-500 font-bold uppercase"
						/>
					</InputOTPGroup>
					<InputOTPSeparator />
					<InputOTPGroup>
						<InputOTPSlot
							index={5}
							className="border-gray-500 font-bold uppercase"
						/>
						<InputOTPSlot
							index={6}
							className="border-gray-500 font-bold uppercase"
						/>
					</InputOTPGroup>
					<InputOTPSeparator />
					<InputOTPGroup>
						<InputOTPSlot
							index={7}
							className="border-gray-500 font-bold uppercase"
						/>
						<InputOTPSlot
							index={8}
							className="border-gray-500 font-bold uppercase"
						/>
						<InputOTPSlot
							index={9}
							className="border-gray-500 font-bold uppercase"
						/>
						<InputOTPSlot
							index={10}
							className="border-gray-500 font-bold uppercase"
						/>
						<InputOTPSlot
							index={11}
							className="border-gray-500 font-bold uppercase"
						/>
						<InputOTPSlot
							index={12}
							className="border-gray-500 font-bold uppercase"
						/>
					</InputOTPGroup>
				</InputOTP>
				<Button size={'default'} type="submit">
					<Search />
				</Button>
			</div>
		</form>
	);
};
