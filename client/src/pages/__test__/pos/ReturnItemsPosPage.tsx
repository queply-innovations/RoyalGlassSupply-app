import { Button } from '@/components/ui/button';
import {
	SearchReturnInvoice,
	ReturnTable,
} from '@/features/pos/return-invoice/components';
import { Navbar } from '@/features/pos/__test__/components/Navbar/Navbar';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ReturnInvoiceItemsPosProvider } from '@/features/pos/return-invoice/context/ReturnInvoiceItems';

export const ReturnItemsPosPage = () => {
	const navigate = useNavigate();

	return (
		<>
			<ReturnInvoiceItemsPosProvider>
				<div className="flex h-screen w-screen flex-row">
					<Navbar />
					<div className="flex max-h-full w-full flex-col gap-4 overflow-y-auto p-6 pt-12 text-slate-700">
						<div className="mx-auto w-full max-w-[1024px] space-y-6">
							<div className="flex w-full flex-row items-start justify-between">
								<h1 className="text-3xl font-bold">
									Search Invoice Code to return items
								</h1>
								<Button
									className="flex flex-row items-center gap-2 bg-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-300 hover:text-gray-700"
									onClick={() => {
										navigate(-1);
									}}
								>
									<ChevronLeft size={20} strokeWidth={2.5} />
									Go Back
								</Button>
							</div>
							<div>
								<SearchReturnInvoice />
							</div>
						</div>
						<ReturnTable />
					</div>
				</div>
			</ReturnInvoiceItemsPosProvider>
		</>
	);
};
