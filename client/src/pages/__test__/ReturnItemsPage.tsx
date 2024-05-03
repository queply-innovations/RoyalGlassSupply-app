import { Button } from '@/components/ui/button';
import { ReturnItemsTable } from '@/features/returns/components/table/ReturnItemsTable';
import { ReturnItemsProvider } from '@/features/returns/context/ReturnItemsContext';
import { MainLayout } from '@/layouts/MainLayout';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export const ReturnItems = () => {
	// Get id from url
	const { id: returnTransactionId } = useParams();

	// Function to navigate back to prev page
	const navigate = useNavigate();
	const handleNavigateBack = () => {
		navigate(-1);
	};

	return (
		<>
			<MainLayout title="Return items">
				<ReturnItemsProvider
					returnTransactionId={Number(returnTransactionId ?? 0)}
				>
					<div className="flex h-full flex-1 flex-col gap-5 rounded-xl border border-black/10 bg-white p-4">
						<div className="text-primary-dark-gray flex flex-row items-center gap-6 text-sm font-medium">
							<Button
								onClick={() => handleNavigateBack()}
								className="flex flex-row items-center gap-3 whitespace-nowrap bg-gray-200 pr-6 font-bold text-gray-700 hover:bg-gray-300 hover:text-gray-700"
							>
								<ChevronLeft size={22} strokeWidth={2.25} />
								<span>Go back</span>
							</Button>
						</div>
						<div className="max-h-[calc(100%-4rem)] w-full flex-1 rounded-md border">
							<ReturnItemsTable />
						</div>
					</div>
				</ReturnItemsProvider>
			</MainLayout>
		</>
	);
};
