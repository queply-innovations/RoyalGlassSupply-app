import { Inputbox, Selectbox } from '@/components';
import { useInvoiceMutation } from '../../hooks/useInvoiceMutation';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { SelectGroup } from '@radix-ui/react-select';

export const InvoiceFormFirstSection = () => {
	const {
		value: InvoiceFormFirstSection,
		handleChange,
		selectChange,
	} = useInvoiceMutation();
	return (
		<>
			<div className="flex min-w-full max-w-md flex-grow flex-row gap-6">
				<div className="flex min-w-0 flex-1 flex-col gap-1">
					<label htmlFor="type" className="text-sm font-bold uppercase">
						Type
					</label>
					<Select name="type" onValueChange={value => selectChange(value)}>
						<SelectTrigger>
							<SelectValue placeholder="Select Payment" />
						</SelectTrigger>
						<SelectContent className="bg-white" id="type">
							<SelectItem key={'payment'} value="payment">
								Payment
							</SelectItem>
							<SelectItem key={'exit'} value={'exit'.toString()}>
								Exit
							</SelectItem>
						</SelectContent>
					</Select>
					{/* <Selectbox
						className="bg-white"
						name="type"
						id="type"
						placeholder="Select Type"
						options={['Payment', 'Exit']}
						onChange={handleChange}
						required
					/> */}
				</div>
				<div className="flex min-w-0 flex-1 flex-col gap-1">
					<label
						htmlFor="payment_method"
						className="text-sm font-bold uppercase"
					>
						Payment Method
					</label>
					<Selectbox
						className="bg-white"
						name="payment_method"
						id="payment_method"
						placeholder="Select Payment Method"
						options={['Cash', 'Credit', 'Debit', 'Wallet']}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="flex min-w-0 flex-1 flex-col gap-1">
					<label
						htmlFor="subtotal"
						className="text-sm font-bold uppercase"
					>
						Subtotal
					</label>
					<Inputbox
						name="subtotal"
						id="subtotal"
						placeholder="Select Payment Method"
						onChange={handleChange}
						required
					/>
				</div>
			</div>
		</>
	);
};
