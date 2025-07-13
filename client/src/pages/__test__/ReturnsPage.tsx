import { ReturnsTable } from '@/features/returns/components/table/ReturnsTable';
import { ReturnsProvider } from '@/features/returns/context/ReturnsContext';
import { MainLayout } from '@/layouts/MainLayout';

export const Returns = () => {
	return (
		<>
			<MainLayout title="Returns">
				<ReturnsProvider>
					<div className="flex h-full flex-1 flex-col gap-5 rounded-xl border border-black/10 bg-white p-4">
						<div className="max-h-[calc(100%-4rem)] w-full flex-1 rounded-md border">
							<ReturnsTable />
						</div>
					</div>
				</ReturnsProvider>
			</MainLayout>
		</>
	);
};
