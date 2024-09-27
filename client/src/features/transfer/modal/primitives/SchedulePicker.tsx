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

	const changeDate = (value: Date) => {
		const year = value.getFullYear();
		const month = String(value.getMonth() + 1).padStart(2, '0');
		const day = String(value.getDate()).padStart(2, '0');
		const formattedDate = `${year}-${month}-${day}`;
		handleChange('transfer_schedule', formattedDate);
	};

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
								<span>Pick a date...</span>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0">
						<Calendar
							required
							mode="single"
							disabled={{ before: new Date() }}
							selected={new Date(newTransfer.transfer_schedule ?? '')}
							onDayClick={changeDate}
							initialFocus
						/>
					</PopoverContent>
				</Popover>
			</div>
		</>
	);
};
