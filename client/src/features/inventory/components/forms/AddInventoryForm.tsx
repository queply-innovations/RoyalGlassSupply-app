import { UseModalProps } from '@/utils/Modal';
import { useInventoryMutation } from '../../hooks/useInventoryMutation';
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Warehouse } from '@/features/warehouse/__test__/types';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Button as LegacyButton } from '@/components';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SupplierTab } from './tabs/SupplierTab';
import { TransferTab } from './tabs/TransferTab';

interface AddInventoryFormProps {
	onClose: UseModalProps['closeModal'];
	warehouses: Warehouse[];
}
export const AddInventoryForm = ({
	onClose,
	warehouses,
}: AddInventoryFormProps) => {
	const { auth } = useAuth();
	const {
		value: FormValue,
		setValue: setFormValue,
		handleChange,
		handleSubmit,
	} = useInventoryMutation();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		handleChange('created_by', auth.user.id);
		handleChange('type', 'supplier');
	}, []);

	return (
		<>
			<form
				onSubmit={async e => {
					e.preventDefault();
					if (FormValue.date_received === undefined) {
						setError('Please select a date for date received.');
					} else {
						setIsSubmitting(!isSubmitting);
						const response = await handleSubmit({
							action: 'add',
							data: FormValue,
						});
						response?.status === 201 // Status 201 means resource successfully created
							? (setIsSubmitting(!isSubmitting), onClose())
							: (setIsSubmitting(!isSubmitting),
								setError('Failed to add inventory'));
					}
				}}
			>
				<div className="flex max-w-2xl flex-col gap-3">
					<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-3">
						<div className="col-span-6 flex flex-col justify-center gap-1">
							<Label
								htmlFor="code"
								className="text-sm font-bold text-gray-600"
							>
								Code
							</Label>
							<Input
								id="code"
								name="code"
								type="text"
								maxLength={50}
								required
								placeholder="Code..."
								onChange={e => handleChange('code', e.target.value)}
							/>
						</div>
						<div className="col-span-6 flex flex-col justify-center gap-1">
							<Label
								htmlFor="warehouse"
								className="text-sm font-bold text-gray-600"
							>
								Warehouse
							</Label>
							<Select
								onValueChange={value =>
									handleChange('warehouse_id', Number(value))
								}
								required
							>
								<SelectTrigger
									name="warehouse"
									className="flex max-w-[30ch] flex-row items-center gap-3 truncate bg-white text-sm"
								>
									<SelectValue placeholder={'Choose warehouse...'} />
								</SelectTrigger>
								<SelectContent className="bg-white font-medium">
									{warehouses.map((warehouse, key) => (
										<SelectItem
											key={key}
											value={warehouse.id.toString()}
											className="text-sm font-medium text-slate-700"
										>
											{warehouse.name}
											<span className="truncate text-xs text-slate-700/60">
												{' • ' +
													warehouse.code +
													' • ' +
													warehouse.location}
											</span>
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
					<hr className="col-span-12 my-2 h-px w-full border-0 bg-gray-200" />
					<div className="flex flex-col justify-center gap-1">
						<Label
							htmlFor="type"
							className="text-sm font-bold text-gray-600"
						>
							Type
						</Label>
						<Tabs
							id="type"
							defaultValue={FormValue.type ? FormValue.type : 'supplier'}
							className="w-full space-y-4"
							onValueChange={value => {
								// Destructure FormValue to discard date_received and transfer_id
								const { date_received, transfer_id, ...newObj } =
									FormValue;
								// Reset form value to newObj
								setFormValue(newObj);
								handleChange('type', value);
							}}
						>
							<TabsList className="grid h-fit w-full grid-flow-row grid-cols-2 rounded-md bg-slate-200/50">
								<TabsTrigger
									value="supplier"
									className="rounded-md py-1 text-sm font-semibold text-slate-700"
								>
									Supplier
								</TabsTrigger>
								<TabsTrigger
									value="transfer"
									className="rounded-md py-1 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
								>
									Transfer
								</TabsTrigger>
							</TabsList>
							<TabsContent value="supplier">
								<SupplierTab
									FormValue={FormValue}
									handleChange={handleChange}
								/>
							</TabsContent>
							<TabsContent value="transfer">
								<TransferTab
									FormValue={FormValue}
									handleChange={handleChange}
								/>
							</TabsContent>
						</Tabs>
					</div>
				</div>
				<div className="flex w-full justify-between whitespace-nowrap pt-6">
					<div className="ml-auto flex flex-row gap-4">
						<LegacyButton
							fill={'default'}
							type="reset"
							onClick={() => onClose()}
							className="flex-1 py-2 text-sm font-bold text-slate-700 hover:text-white"
						>
							Cancel
						</LegacyButton>
						<LegacyButton
							type="submit"
							fill={'green'}
							disabled={
								isSubmitting || Object.keys(FormValue).length <= 2
							} // Disable button if there are no changes or form is submitting
							className="max-w-fit flex-1 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
						>
							{!isSubmitting ? 'Submit inventory' : 'Submitting...'}
						</LegacyButton>
					</div>
				</div>
				{error && (
					<div className="flex w-full flex-row justify-center gap-4">
						<p className="text-sm font-semibold text-red-600">{error}</p>
					</div>
				)}
			</form>
		</>
	);
};
