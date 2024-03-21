import { UseModalProps } from '@/utils/Modal';
import { useProductMutation } from '../../hooks';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components';
import { useProducts } from '../..';

interface EditProductFormProps {
	onClose: UseModalProps['closeModal'];
}

export const EditProductForm = ({ onClose }: EditProductFormProps) => {
	const {
		value: FormValue,
		handleChange,
		handleSubmit,
	} = useProductMutation();
	const { selectedProduct } = useProducts();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [errorInput, setErrorInput] = useState<
		{ type: string; error: string } | undefined
	>();

	/**
	 * Handles the validation of an input field based on a regular expression.
	 * If the input value matches the regular expression, the value is updated and the error state is cleared.
	 * If the input value does not match the regular expression, an error state is set with the specified error message.
	 *
	 * @param event - The change event triggered by the input field.
	 * @param type - The type of the input field.
	 * @param regex - The regular expression used for validation.
	 * @param errorMessage - The error message to be displayed when the input value does not match the regular expression.
	 */
	const handleValidator = (
		event: React.ChangeEvent<HTMLInputElement>,
		type: string,
		regex: RegExp,
		errorMessage: string,
	) => {
		if (regex.test(event.target.value)) {
			event.target.value = event.target.value;
			handleChange(type, event.target.value);
			setErrorInput(undefined);
		} else {
			setErrorInput({
				type: type,
				error: errorMessage,
			});
		}
	};

	return (
		<>
			<form
				onSubmit={async e => {
					setIsSubmitting(!isSubmitting);
					e.preventDefault();
					const response = await handleSubmit({
						action: 'update',
						id: selectedProduct.id,
						data: FormValue,
					});
					response?.status === 200
						? (setIsSubmitting(!isSubmitting), onClose())
						: (setIsSubmitting(!isSubmitting),
							setError('Failed to update product'));
				}}
			>
				<div className="flex max-w-2xl flex-col gap-3">
					<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-3">
						<div className="col-span-12 flex flex-col justify-start gap-1">
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
								value={
									FormValue.serial_no !== undefined
										? FormValue.serial_no
										: selectedProduct.serial_no || ''
								}
								onChange={e => {
									handleValidator(
										e,
										'serial_no',
										/^[a-zA-Z0-9-]{0,100}$/,
										'Must only contain A-Z, 0-9, and -',
									);
								}}
							/>
							<span
								hidden={
									!(errorInput && errorInput.type === 'serial_no')
								}
								className="text-xs font-bold text-red-600"
							>
								{errorInput?.error}
							</span>
						</div>
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
								value={
									FormValue.name !== undefined
										? FormValue.name
										: selectedProduct.name || ''
								}
								onChange={e => {
									handleValidator(
										e,
										'name',
										/^[0-9a-zA-Z\s\-.,/+:_=]{0,100}$/,
										'Must only contain alphanumeric and limited special characters',
									);
								}}
							/>{' '}
							<span
								hidden={!(errorInput && errorInput.type === 'name')}
								className="max-w-[225px] text-xs font-bold text-red-600"
							>
								{errorInput?.error}
							</span>
						</div>
						<div className="col-span-6 flex flex-col justify-start gap-1">
							<Label
								htmlFor="brand"
								className="text-sm font-bold text-gray-600"
							>
								Brand
							</Label>
							<Input
								id="brand"
								name="brand"
								type="text"
								maxLength={100}
								required
								placeholder="Brand..."
								value={
									FormValue.brand !== undefined
										? FormValue.brand
										: selectedProduct.brand || ''
								}
								onChange={e => {
									handleValidator(
										e,
										'brand',
										/^[0-9a-zA-Z\s\-.,/+:_=]{0,100}$/,
										'Must only contain alphanumeric and limited special characters',
									);
								}}
							/>
							<span
								hidden={!(errorInput && errorInput.type === 'brand')}
								className="max-w-[225px] text-xs font-bold text-red-600"
							>
								{errorInput?.error}
							</span>
						</div>
						<hr className="col-span-12 my-3 border-t border-slate-200" />
						<div className="col-span-6 flex flex-col justify-start gap-1">
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
								value={
									FormValue.size !== undefined
										? FormValue.size
										: selectedProduct.size || ''
								}
								onChange={e => {
									handleValidator(
										e,
										'size',
										/^[0-9a-zA-Z\s\-.,/+:_="']{0,100}$/,
										'Must only contain alphanumeric and limited special characters',
									);
								}}
							/>
							<span
								hidden={!(errorInput && errorInput.type === 'size')}
								className="max-w-[225px] text-xs font-bold text-red-600"
							>
								{errorInput?.error}
							</span>
						</div>
						<div className="col-span-6 flex flex-col justify-start gap-1">
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
								value={
									FormValue.color !== undefined
										? FormValue.color
										: selectedProduct.color || ''
								}
								onChange={e => {
									handleValidator(
										e,
										'color',
										/^[0-9a-zA-Z\s\-.,/+:_="']{0,40}$/,
										'Must only contain alphanumeric and limited special characters',
									);
								}}
							/>
							<span
								hidden={!(errorInput && errorInput.type === 'color')}
								className="max-w-[225px] text-xs font-bold text-red-600"
							>
								{errorInput?.error}
							</span>
						</div>
						<div className="col-span-12 flex flex-col justify-start gap-1">
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
								defaultValue={
									FormValue.notes !== undefined
										? FormValue.notes
										: selectedProduct.notes || ''
								}
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
								errorInput !== undefined ||
								FormValue.name === '' ||
								FormValue.serial_no === ''
							} // Disable button if there are no changes or form is submitting
							className="flex-1 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
						>
							{!isSubmitting ? 'Apply changes' : 'Applying...'}
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
