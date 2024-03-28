import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCustomer } from '@/features/customer/__test__/context/CustomerContext';
import { MapPinned, Phone } from 'lucide-react';

interface CustomerInfoProps {}

export const CustomerInfo = ({}: CustomerInfoProps) => {
	const { selectedCustomer } = useCustomer();
	return (
		<>
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
							readOnly
							defaultValue={selectedCustomer.firstname}
							disabled={selectedCustomer.firstname ? false : true}
						/>
						<Input
							id="lastname"
							name="lastname"
							type="text"
							placeholder="Last Name"
							readOnly
							defaultValue={selectedCustomer.lastname}
							disabled={selectedCustomer.lastname ? false : true}
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
							className="pl-10"
							readOnly
							defaultValue={selectedCustomer.address}
							disabled={selectedCustomer.address ? false : true}
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
							readOnly
							defaultValue={selectedCustomer.contact_no}
							disabled={selectedCustomer.contact_no ? false : true}
							max={11}
							maxLength={11}
						/>
					</div>
				</div>
			</div>
		</>
	);
};
