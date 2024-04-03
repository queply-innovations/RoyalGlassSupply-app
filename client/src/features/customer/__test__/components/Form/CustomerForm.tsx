import { Input } from '@/components/ui/input';
import { MapPinned, Phone } from 'lucide-react';
import { useCustomerMutation } from '../../hooks/useCustomerMutation';
import { useEffect, useState } from 'react';
import { Button as LegacyButton } from '@/components';
import { Label } from '@/components/ui/label';
import { UseModalProps } from '@/utils/Modal';
import { useCustomer } from '../../context/CustomerContext';

interface CustomerFormProps {
	onClose: UseModalProps['closeModal'];
}

export const CustomerForm = ({ onClose }: CustomerFormProps) => {
	const {
		value: FormValue,
		setValue: setFormValue,
		handleChange,
		handleSubmit,
	} = useCustomerMutation();
	const { setSelectedCustomer } = useCustomer();

	useEffect(() => {
		setFormValue(prev => ({
			...prev,
		}));
	}, []);

	// States for form submission and error message
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	return (
		<>
			<form
				onSubmit={async e => {
					setIsSubmitting(!isSubmitting);
					e.preventDefault();
					const response = await handleSubmit(FormValue);
					response?.status === 201 // Status 201 means resource successfully created
						? (setIsSubmitting(!isSubmitting),
							setSelectedCustomer(response.data.data),
							onClose(),
							console.log(response.data))
						: (setIsSubmitting(!isSubmitting),
							setError('Failed to add inventory'));
				}}
			>
				<div className="flex max-w-2xl flex-col gap-2 ">
					<div className="flex flex-col gap-4">
						<div className="flex flex-row gap-2">
							<div className="flex flex-col gap-2">
								<Label
									className="text-sm font-semibold uppercase"
									htmlFor="firstname"
								>
									First Name
								</Label>
								<Input
									id="firstname"
									name="firstname"
									required
									type="text"
									placeholder="First Name"
									onChange={e =>
										handleChange('firstname', e.target.value)
									}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label
									className="text-sm font-semibold uppercase"
									htmlFor="lastname"
								>
									Last Name
								</Label>
								<Input
									id="lastname"
									name="lastname"
									required
									type="text"
									placeholder="Last Name"
									onChange={e =>
										handleChange('lastname', e.target.value)
									}
								/>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<Label
								className="text-sm font-semibold uppercase"
								htmlFor="address"
							>
								Address
							</Label>
							<div className="relative flex flex-col ">
								<MapPinned
									color="#2D2D2D"
									className="absolute top-0 translate-x-3 translate-y-1/2"
									size={20}
								/>
								<Input
									id="address"
									name="address"
									type="text"
									placeholder="Address"
									defaultValue=""
									className="pl-10"
									onChange={e =>
										handleChange('address', e.target.value)
									}
									required
								/>
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<Label
								className="text-sm font-semibold uppercase"
								htmlFor="contact_no"
							>
								Contact Number
							</Label>
							<div className="relative flex flex-col">
								<Phone
									color="#2D2D2D"
									className="absolute top-0 translate-x-3 translate-y-1/2"
									size={20}
								/>
								<Input
									required
									id="contact_no"
									name="contact_no"
									type="text"
									inputMode="numeric"
									placeholder="Contact Number"
									className="pl-10"
									defaultValue=""
									max={11}
									maxLength={11}
									onChange={e =>
										handleChange('contact_no', e.target.value)
									}
								/>
							</div>
						</div>
					</div>
					<div className="flex flex-row justify-end gap-4">
						<LegacyButton
							onClick={() => onClose()}
							type="reset"
							className='hover:text-white"  py-2 text-sm font-bold text-slate-700'
						>
							Cancel
						</LegacyButton>
						<LegacyButton
							type="submit"
							fill={'green'}
							disabled={
								isSubmitting || Object.keys(FormValue).length <= 2
							}
							className="max-w-fit flex-1 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
						>
							{!isSubmitting ? 'Add Customer' : 'Submitting...'}
						</LegacyButton>
					</div>
					{error && (
						<div className="flex w-full flex-row justify-center gap-4">
							<p className="text-sm font-semibold text-red-600">
								{error}
							</p>
						</div>
					)}
				</div>
			</form>
		</>
	);
};
