import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { DatabaseBackup, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchInvoiceByCode } from '@/features/invoice/__test__/api';

export const SearchReturns = () => {
	const [searchInvoiceCode, setSearchInvoiceCode] = useState<string>('');

	async function handleSubmit() {
		const invoiceCodeResult = await fetchInvoiceByCode(searchInvoiceCode);
		console.log(invoiceCodeResult);
	}

	return (
		<>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<div className="">
							<Dialog>
								<DialogTrigger asChild>
									<Button
										onClick={() => {}}
										variant={'ghost'}
										className="p-4 hover:bg-white/5"
									>
										<DatabaseBackup className=" text-[#CCCCCC]" />
									</Button>
								</DialogTrigger>
								<DialogContent className="rounded-sm">
									<DialogHeader className="items-start">
										<DialogTitle>Search Invoice Code</DialogTitle>
										<DialogDescription>
											Search for an invoice code to return items
										</DialogDescription>
									</DialogHeader>
									<div className="flex flex-row gap-2">
										<Input
											placeholder="IVC-123123"
											onChange={e =>
												setSearchInvoiceCode(e.target.value)
											}
										/>
										<Button
											onClick={() => {
												handleSubmit();
											}}
										>
											<Search />
										</Button>
									</div>
								</DialogContent>
							</Dialog>
						</div>
					</TooltipTrigger>
					<TooltipContent
						align="center"
						className="bg-pos-primary-background"
						side="right"
						sideOffset={0}
					>
						<span className="p-2 text-white">Return Items</span>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</>
	);
};
