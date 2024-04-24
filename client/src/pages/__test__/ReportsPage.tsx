import {
	SalesCard,
	ProfitCard,
	CollectiblesCard,
	ExpensesCard,
	CapitalCard,
	CustomersCard,
} from '@/features/reports/components';
import { MainLayout } from '@/layouts/MainLayout';
import { DatePickerWithRange } from '@/features/reports/components/DatePickerWithRange';
import { ReportsProvider } from '@/features/reports';
import { ResetToDefaultButton } from '@/features/reports/components/ResetToDefaultButton';
import { SalesRevenueHistory } from '@/features/reports/components/charts/SalesRevenueHistory';

export const Reports = () => {
	// const dateFilters = ['Monthly', 'Quarterly', 'Yearly'];

	return (
		<>
			<MainLayout title="Reports">
				<ReportsProvider>
					<div className="flex h-full w-full flex-1 flex-col gap-5 rounded-xl border border-black/10 bg-white p-4">
						<div className="h-full max-h-full w-full max-w-full overflow-auto">
							<div className="flex w-full max-w-full flex-col gap-4">
								<div className="flex flex-row gap-2">
									<DatePickerWithRange />
									<ResetToDefaultButton />
								</div>
								<div className="flex flex-1 flex-col gap-4">
									<div className="flex flex-row gap-2 rounded-lg border p-2 shadow-sm">
										<SalesCard />
										<ProfitCard />
										<CapitalCard />
										<ExpensesCard />
										<CollectiblesCard />
									</div>
								</div>
								<CustomersCard />
								{/* <SalesRevenueHistory /> */}
							</div>
						</div>
					</div>
				</ReportsProvider>
			</MainLayout>
		</>
	);
};
