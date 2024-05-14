import { Label } from '@/components/ui/label';
import { useNewTransfer } from '../../context/NewTransferContext';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

export const SchedulePicker = () => {
	const { newTransfer, handleChange } = useNewTransfer();

	return (
		<>
			<div className="col-span-11 flex flex-col gap-1">
				<Label
					htmlFor="transfer_schedule"
					className="text-sm font-bold text-slate-800"
				>
					Schedule
				</Label>

				<Popover>
					<PopoverTrigger
						id="transfer_schedule"
						name="transfer_schedule"
						asChild
					>
						<Button variant={'outline'} className="w-full justify-start">
							<CalendarIcon className="mr-2 h-4 w-4" />
							{newTransfer.transfer_schedule ? (
								new Date(newTransfer.transfer_schedule).toLocaleString(
									'en-PH',
									{ dateStyle: 'full' },
								)
							) : (
								<span>Pick a date</span>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0">
						<Calendar
							required
							mode="single"
							selected={new Date(newTransfer.transfer_schedule ?? '')}
							onDayClick={value => {
								const formattedDate = new Date(value).toISOString(); // full timestamp
								handleChange('transfer_schedule', formattedDate);
							}}
							initialFocus
						/>
					</PopoverContent>
				</Popover>
			</div>
		</>
	);
};
