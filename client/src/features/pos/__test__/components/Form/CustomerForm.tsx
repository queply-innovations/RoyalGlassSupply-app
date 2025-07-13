import { Input } from '@/components/ui/input';
import { MapPinned, Phone } from 'lucide-react';
import { useCustomerMutation } from '../../hooks/useCustomerMutation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface CustomerFormProps {}

export const CustomerForm = ({}: CustomerFormProps) => {
	const {
		value: FormValue,
		setValue: setFormValue,
		handleChange,
		handleSubmit,
		addCustomersMutation,
	} = useCustomerMutation();

	useEffect(() => {
		setFormValue(prev => ({
			...prev,
		}));
	}, []);

	// States for form submission and error message
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	return (
		<>
			<form
				onSubmit={async e => {
					setIsSubmitting(!isSubmitting);
					e.preventDefault();
					// const response = await handleSubmit(FormValue);
				}}
			>
				<div className="flex max-w-2xl flex-col gap-1 ">
					<Label className="text-lg uppercase text-white">
						Customer Info
					</Label>
					<div className="flex flex-col gap-2">
						<div className="flex flex-row gap-2">
							<Input
								id="firstname"
								name="firstname"
								type="text"
								placeholder="First Name"
								onChange={e =>
									handleChange('firstname', e.target.value)
								}
							/>
							<Input
								id="lastname"
								name="lastname"
								type="text"
								placeholder="Last Name"
								onChange={e => handleChange('lastname', e.target.value)}
							/>
						</div>
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
								onChange={e => handleChange('address', e.target.value)}
							/>
						</div>
						<div className="relative flex flex-col">
							<Phone
								color="#2D2D2D"
								className="absolute top-0 translate-x-3 translate-y-1/2"
								size={20}
							/>
							<Input
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
			</form>
		</>
	);
};
