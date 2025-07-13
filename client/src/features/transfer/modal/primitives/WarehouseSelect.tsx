import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { ArrowRight } from 'lucide-react';
import { useNewTransfer } from '../../context/NewTransferContext';

export const WarehouseSelect = () => {
	const { newTransfer, handleChange } = useNewTransfer();

	return (
		<>
			<div className="col-span-5 flex flex-col gap-1">
				<Label
					htmlFor="source"
					className="text-sm font-bold text-slate-800"
				>
					Source
				</Label>
				<Select
					name="source"
					value={newTransfer.source?.toString() ?? ''}
					onValueChange={value => {
						handleChange('source', Number(value));
						handleChange('destination', value === '1' ? 2 : 1);
					}}
					required
				>
					<SelectTrigger
						name="source"
						id="source"
						className="flex flex-row items-center gap-3 truncate bg-white text-sm font-medium"
					>
						<SelectValue placeholder={'Select warehouse...'} />
					</SelectTrigger>
					<SelectContent className="text-sm font-medium text-slate-700">
						<SelectItem value="1">Cagayan de Oro</SelectItem>
						<SelectItem value="2">Iligan</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className="col-span-1 mt-3 flex h-full items-center justify-center">
				<ArrowRight size={20} strokeWidth={2} className="text-slate-800" />
			</div>
			<div className="col-span-5 flex flex-col gap-1">
				<Label
					htmlFor="destination"
					className="text-sm font-bold text-slate-800"
				>
					Destination
				</Label>
				<Select
					name="destination"
					value={newTransfer.destination?.toString() ?? ''}
					onValueChange={value => {
						handleChange('destination', Number(value));
						handleChange('source', value === '1' ? 2 : 1);
					}}
					required
				>
					<SelectTrigger
						name="destination"
						id="destination"
						className="flex flex-row items-center gap-3 truncate bg-white text-sm font-medium"
					>
						<SelectValue placeholder={'Select warehouse...'} />
					</SelectTrigger>
					<SelectContent className="text-sm font-medium text-slate-700">
						<SelectItem value="1">Cagayan de Oro</SelectItem>
						<SelectItem value="2">Iligan</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</>
	);
};
