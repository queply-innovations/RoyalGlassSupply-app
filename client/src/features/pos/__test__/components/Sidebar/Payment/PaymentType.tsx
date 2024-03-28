import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { useInvoice } from '@/features/invoice/__test__/context/InvoiceContext';
import { Hash } from 'lucide-react';

export const PaymentType = () => {
	const { handleChange, invoice } = useInvoice();
	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-col gap-1">
				<Label
					htmlFor="payment_method"
					className="text-lg uppercase text-white"
				>
					Payment Type
				</Label>
				<Tabs
					id="type"
					defaultValue="payment"
					onValueChange={value => {
						handleChange('type', value);
					}}
				>
					<TabsList className="flex flex-row gap-1">
						<TabsTrigger
							value="payment"
							className="data-[state=active]:bg-primary w-full rounded-md
                                text-slate-800 hover:bg-slate-200 data-[state=active]:text-white"
						>
							Payment
						</TabsTrigger>
						<TabsTrigger
							value="exit"
							className="data-[state=active]:bg-primary w-full rounded-md
                                text-slate-800 hover:bg-slate-200 data-[state=active]:text-white"
						>
							Exit
						</TabsTrigger>
					</TabsList>
				</Tabs>
				<Tabs
					id="payment_method"
					defaultValue="cash"
					onValueChange={value => {
						handleChange('payment_method', value);
					}}
				>
					<TabsList className="flex flex-row">
						<TabsTrigger
							value="cash"
							className="data-[state=active]:bg-primary w-full rounded-md
                                text-slate-800 hover:bg-slate-200 data-[state=active]:text-white"
						>
							Cash
						</TabsTrigger>
						<TabsTrigger
							value="credit"
							className="data-[state=active]:bg-primary w-full rounded-md   text-slate-800 hover:bg-slate-200 data-[state=active]:text-white"
						>
							Credit
						</TabsTrigger>
						<TabsTrigger
							value="debit"
							className="data-[state=active]:bg-primary w-full rounded-md   text-slate-800 hover:bg-slate-200 data-[state=active]:text-white"
						>
							Debit
						</TabsTrigger>
						<TabsTrigger
							value="wallet"
							className="data-[state=active]:bg-primary w-full rounded-md   text-slate-800 hover:bg-slate-200 data-[state=active]:text-white"
						>
							Wallet
						</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<div className="relative flex flex-col">
							<Hash
								color="black"
								className="absolute top-0 translate-x-4 translate-y-2"
								size={24}
							/>
							<Input
								id="reference_no"
								name="reference_no"
								type="text"
								placeholder="Reference Number"
								onChange={e => {
									handleChange('reference_no', Number(e.target.value));
								}}
								disabled={
									invoice.payment_method !== 'credit' &&
									invoice.payment_method !== 'debit' &&
									invoice.payment_method !== 'wallet'
								}
								className="pl-[3rem] text-base font-medium disabled:opacity-100"
							/>
						</div>
					</TooltipTrigger>
					<TooltipContent
						align="center"
						className="bg-pos-primary-background"
						side="left"
						sideOffset={2}
					>
						<span className="p-2 text-white">Reference Number</span>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
};
