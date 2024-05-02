import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { useReportsContext } from '../context/ReportsContext';

export function DatePickerWithRange({
	className,
}: React.HTMLAttributes<HTMLDivElement>) {
	const { dateRange, setDateRange } = useReportsContext();

	return (
		<div className={cn('grid gap-2', className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={'outline'}
						className={cn(
							'w-[300px] justify-start text-left font-medium',
							!dateRange && 'text-muted-foreground',
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{dateRange?.from ? (
							dateRange.to ? (
								<>
									{format(dateRange.from, 'LLL dd, y')} —{' '}
									{format(dateRange.to, 'LLL dd, y')}
								</>
							) : (
								format(dateRange.from, 'LLL dd, y')
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						initialFocus
						mode="range"
						// Default to the show previous month if there's a `to` date
						defaultMonth={
							dateRange?.to
								? new Date(
										dateRange.to.getFullYear(),
										dateRange.to.getMonth() - 1,
										1,
									)
								: new Date()
						}
						selected={dateRange}
						onSelect={setDateRange}
						classNames={{
							day: 'text-sm flex items-center justify-center w-full h-full rounded-md font-medium',
							months: 'flex flex-row gap-6',
						}}
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
