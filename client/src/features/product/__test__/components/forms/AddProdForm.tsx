import { UseModalProps } from '@/utils/Modal';
import { useProductMutation } from '../../hooks';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components';

interface AddProductFormProps {
	onClose: UseModalProps['closeModal'];
}

export const AddProductForm = ({ onClose }: AddProductFormProps) => {
	const {
		value: FormValue,
		handleChange,
		handleSubmit,
	} = useProductMutation();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [errorSerial, setErrorSerial] = useState<boolean>(false);

	return (
		<>
			<form
				onSubmit={async e => {
					setIsSubmitting(!isSubmitting);
					e.preventDefault();
					const response = await handleSubmit({
						action: 'add',
						data: FormValue,
					});
					response?.status === 201 // 201 means resource successfully created
						? (setIsSubmitting(!isSubmitting), onClose())
						: (setIsSubmitting(!isSubmitting),
							setError('Failed to submit product'));
				}}
			>
				<div className="flex max-w-2xl flex-col gap-3">
					<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-3">
						<div className="col-span-6 flex flex-col justify-start gap-1">
							<Label
								htmlFor="name"
								className="text-sm font-bold text-gray-600"
							>
								Name
							</Label>
							<Input
								id="name"
								name="name"
								type="text"
								maxLength={100}
								required
								placeholder="Product name..."
								onChange={e => handleChange('name', e.target.value)}
							/>
						</div>
						<div className="col-span-6 flex flex-col justify-center gap-1">
							<Label
								htmlFor="serial_no"
								className="text-sm font-bold text-gray-600"
							>
								Serial number
							</Label>
							<Input
								id="serial_no"
								name="serial_no"
								type="text"
								maxLength={100}
								required
								placeholder="Serial number..."
								onChange={e => {
									const regex = /^[a-zA-Z0-9-]{0,100}$/;
									if (regex.test(e.target.value)) {
										handleChange('serial_no', e.target.value);
										setErrorSerial(false);
									} else {
										setErrorSerial(true);
									}
								}}
							/>
							<span
								hidden={!errorSerial}
								className="text-xs font-bold text-red-600"
							>
								Must only contain A-Z, 0-9, and -
							</span>
						</div>
						<div className="col-span-6 flex flex-col justify-center gap-1">
							<Label
								htmlFor="size"
								className="text-sm font-bold text-gray-600"
							>
								Size
							</Label>
							<Input
								id="size"
								name="size"
								type="text"
								maxLength={100}
								required
								placeholder="e.g. medium..."
								onChange={e => handleChange('size', e.target.value)}
							/>
						</div>
						<div className="col-span-6 flex flex-col justify-center gap-1">
							<Label
								htmlFor="color"
								className="text-sm font-bold text-gray-600"
							>
								Color
							</Label>
							<Input
								id="color"
								name="color"
								type="text"
								maxLength={40}
								required
								placeholder="e.g. white..."
								onChange={e => handleChange('color', e.target.value)}
							/>
						</div>
						<div className="col-span-12 flex flex-col justify-center gap-1">
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
								placeholder="Type product notes here..."
								onBlur={e => handleChange('notes', e.target.value)}
							/>
						</div>
					</div>
					<div className="ml-auto flex flex-row gap-4 whitespace-nowrap">
						<Button
							type="reset"
							fill={'default'}
							className="flex-1 py-2 text-sm font-bold text-gray-700 hover:text-white"
							onClick={onClose}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							fill={'green'}
							disabled={
								isSubmitting ||
								Object.keys(FormValue).length === 0 ||
								errorSerial ||
								FormValue.name === '' ||
								FormValue.serial_no === ''
							} // Disable button if there are no changes or form is submitting
							className="flex-1 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
						>
							{!isSubmitting ? 'Add product' : 'Submitting...'}
						</Button>
					</div>
					{error && (
						<div className="flex w-full flex-row justify-center gap-4">
							<p className="text-sm text-red-600">{error}</p>
						</div>
					)}
				</div>
			</form>
		</>
	);
};
