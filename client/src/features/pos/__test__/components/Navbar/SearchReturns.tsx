import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
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
import { useState } from 'react';
import { fetchInvoiceByCode } from '@/features/invoice/__test__/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/utils/FormatCurrency';
import { useInvoice } from '@/features/invoice/__test__/context/InvoiceContext';
import { formatUTCMMDDYYYY } from '@/utils/timeUtils';

export const SearchReturns = () => {
	const [searchInvoiceCode, setSearchInvoiceCode] = useState<string>('');
	const { selectedInvoiceCode, setSelectedInvoiceCode } = useInvoice();

	async function handleSubmit() {
		const invoiceCodeResult = await fetchInvoiceByCode(searchInvoiceCode)
			.then(response => {
				if (Object.keys(response).length > 1) {
					toast.success('Invoice found');
					setSelectedInvoiceCode(response);
				}
				console.log(response);
				return response;
			})
			.catch(error => {
				setSelectedInvoiceCode(undefined);
				toast.error(error.message);
			});

		return invoiceCodeResult;
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
										className=" h-[72px] w-[72px] rounded-none hover:bg-white/5"
									>
										<DatabaseBackup
											className=" text-[#CCCCCC]"
											size={32}
										/>
									</Button>
								</DialogTrigger>
								<DialogContent
									className="rounded-sm"
									onPointerDownOutside={e => e.preventDefault()}
								>
									<DialogHeader className="items-start">
										<DialogTitle>Search Invoice Code</DialogTitle>
										<DialogDescription>
											Search for an invoice code to return items
										</DialogDescription>
									</DialogHeader>
									<form
										className="flex flex-row gap-2"
										onSubmit={e => {
											e.preventDefault();
										}}
									>
										<Input
											placeholder="IVC-123123"
											onChange={e =>
												setSearchInvoiceCode(e.target.value)
											}
											defaultValue={'IVC-'}
											autoFocus
											pattern="IVC-[0-9]*"
										/>
										<Button
											type="submit"
											onClick={() => {
												handleSubmit();
											}}
										>
											<Search />
										</Button>
									</form>

									{selectedInvoiceCode &&
										Object.keys(selectedInvoiceCode).length > 1 && (
											<>
												<div className="flex flex-col gap-1">
													<Label>
														Customer:{' '}
														{selectedInvoiceCode.customer
															.firstname +
															' ' +
															selectedInvoiceCode.customer
																.lastname}
													</Label>
													<Label>
														Paid Amount:{' '}
														{formatCurrency(
															selectedInvoiceCode.paid_amount,
														)}
													</Label>
													<Label>
														Created at:{' '}
														{formatUTCMMDDYYYY(
															selectedInvoiceCode.created_at,
														)}
													</Label>
												</div>
												<DialogFooter className="flex flex-row items-center justify-between">
													<div className="flex flex-col">
														<DialogDescription className="text-sm">
															Requires admin to confirm return
															items
														</DialogDescription>
													</div>
													<Link
														to={`/pos/return/${selectedInvoiceCode.code}`}
														state={{
															invoice: selectedInvoiceCode,
														}}
													>
														<Button>Proceed Return</Button>
													</Link>
												</DialogFooter>
											</>
										)}
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
			{/* <ToastContainer position="top-right" /> */}
		</>
	);
};
