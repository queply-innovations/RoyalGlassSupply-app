import { Button } from '@/components/ui/button';
import { useReportsContext } from '../context/ReportsContext';

export const ResetToDefaultButton = () => {
	const { setDateRange, isFetching } = useReportsContext();

	const handleResetDateRange = () => {
		setDateRange({
			from: new Date(new Date().setDate(new Date().getDate() - 90)),
			to: new Date(),
		});
	};

	return (
		<Button
			variant={'outline'}
			disabled={isFetching}
			onClick={handleResetDateRange}
		>
			Reset date
		</Button>
	);
};
