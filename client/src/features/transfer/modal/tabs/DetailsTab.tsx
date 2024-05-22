import { Label } from '@/components/ui/label';
import { SchedulePicker, WarehouseSelect } from '../primitives';
import { Textarea } from '@/components/ui/textarea';
import { useNewTransfer } from '../../context/NewTransferContext';
import { Button } from '@/components';
import { InventorySelect } from '../primitives';

interface DetailsTabProps {
	onClose: () => void;
}

export const DetailsTab = ({ onClose }: DetailsTabProps) => {
	const { newTransfer, handleChange, setActiveTab } = useNewTransfer();

	return (
		<div className="flex flex-col gap-5">
			<div className="grid grid-cols-11 gap-4">
				<WarehouseSelect />
				<InventorySelect tabState="details" />
				<SchedulePicker />

				<div className="col-span-11 flex flex-col gap-1">
					<Label
						htmlFor="notes"
						className="text-sm font-bold text-slate-800"
					>
						Notes
					</Label>
					<Textarea
						id="notes"
						placeholder="Type the notes for this transfer..."
						className="text-sm"
						value={newTransfer.notes ?? ''}
						onChange={e => handleChange('notes', e.target.value)}
					/>
				</div>

				<div className="col-span-11 flex justify-end gap-4">
					<Button
						fill={'default'}
						className="py-2 text-sm font-bold text-slate-900"
						onClick={() => onClose()}
					>
						Cancel
					</Button>
					<Button
						fill={'green'}
						className="py-2 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50"
						disabled={
							!newTransfer.source ||
							!newTransfer.destination ||
							!newTransfer.transfer_schedule
						}
						onClick={() => setActiveTab('items')}
					>
						Proceed to add items
					</Button>
				</div>
			</div>
		</div>
	);
};
