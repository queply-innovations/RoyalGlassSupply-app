import { useReportsContext } from '../context/ReportsContext';
import { ReportCard } from './ReportCard';

export const CollectiblesCard = () => {
   const { reports, isReportsFetching } = useReportsContext();

   return (
      <>
         <ReportCard
            title="Collectibles"
            tooltip="Total amount owed from customers for non-payment type transactions."
            bgClassName="bg-stone-50"
            textColorClassName="text-stone-800">
            {isReportsFetching ? (
               <div className="h-7 w-full animate-pulse rounded-md bg-stone-700/10"></div>
            ) : (
               <p className="text-right text-xl font-semibold tracking-tight">
                  {Intl.NumberFormat('en-US', {
                     style: 'currency',
                     currency: 'PHP',
                  }).format(reports?.total_collectibles ?? 0)}
               </p>
            )}
         </ReportCard>
      </>
   );
};
