import { useDashboardReportsContext } from '../../context/DashboardReportsContext';
import { ReportCard } from '@/features/reports/components';

export const ProfitCard = () => {
   const { reports, isReportsFetching } = useDashboardReportsContext();

   return (
      <>
         <ReportCard
            title="Profit"
            tooltip="Calculated by subtracting the sum of capital and expenses from sales within the current month."
            bgClassName={`${reports?.total_profit ? (reports.total_profit >= 0 ? 'bg-blue-50' : 'bg-red-50') : 'bg-blue-50'}`}
            textColorClassName={`${reports?.total_profit ? (reports.total_profit >= 0 ? 'text-blue-800' : 'text-red-800') : 'text-blue-800'}`}>
            {isReportsFetching ? (
               <div className="h-7 w-full animate-pulse rounded-md bg-blue-700/10"></div>
            ) : (
               <p className="text-right text-xl font-semibold tracking-tight">
                  {Intl.NumberFormat('en-US', {
                     style: 'currency',
                     currency: 'PHP',
                  }).format(reports?.total_profit ?? 0)}
               </p>
            )}
         </ReportCard>
      </>
   );
};
