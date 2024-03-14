import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { InventoryDatabase } from '@/features/inventory/types';
import { CalendarDays } from 'lucide-react';

interface SupplierTabProps {
	FormValue: Partial<InventoryDatabase>;
	handleChange: (key: string, value: any) => void;
}

export const SupplierTab = ({ FormValue, handleChange }: SupplierTabProps) => {
	return (
		<>
			<div className="grid w-full grid-cols-4 gap-4">
				<div className="col-span-4 flex flex-col justify-center gap-1">
					<Label
						htmlFor="date_received"
						className="text-sm font-bold text-gray-600"
					>
						Date received
					</Label>
					<Popover>
						<PopoverTrigger
							id="date_received"
							name="date_received"
							asChild
						>
							<Button
								variant={'outline'}
								className="flex w-full flex-row items-center justify-start gap-2 bg-white text-sm font-normal"
							>
								<CalendarDays size={18} strokeWidth={1.5} />
								{FormValue.date_received
									? FormValue.date_received
									: 'Choose date...'}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0">
							<Calendar
								mode="single"
								initialFocus
								required
								onDayClick={value => {
									const date = new Date(value!);
									const formattedDate = `${date.getFullYear()}-${(
										date.getMonth() + 1
									)
										.toString()
										.padStart(2, '0')}-${date
										.getDate()
										.toString()
										.padStart(2, '0')}`;
									handleChange('date_received', formattedDate);
								}}
								selected={
									FormValue.date_received
										? new Date(FormValue.date_received)
										: new Date()
								}
							/>
						</PopoverContent>
					</Popover>
				</div>
				<div className="col-span-4 flex flex-col justify-center gap-1">
					<Label
						htmlFor="notes"
						className="text-sm font-bold text-gray-600"
					>
						Notes
					</Label>
					<Input
						id="notes"
						name="notes"
						type="text"
						defaultValue={FormValue.notes ? FormValue.notes : undefined}
						maxLength={1000}
						placeholder="Notes..."
						onChange={e => handleChange('notes', e.target.value)}
					/>
				</div>
			</div>
		</>
	);
};
