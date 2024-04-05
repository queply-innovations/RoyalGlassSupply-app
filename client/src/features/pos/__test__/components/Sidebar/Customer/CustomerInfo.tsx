import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useCustomer } from '@/features/customer/__test__/context/CustomerContext';
import { Search } from 'lucide-react';

interface CustomerInfoProps {}

export const CustomerInfo = ({}: CustomerInfoProps) => {
	const { selectedCustomer, setOpenSearchCustomer } = useCustomer();

	return (
		<>
			<div className="flex max-w-2xl flex-col gap-1 rounded-md bg-white p-3">
				<div className="flex flex-row items-center justify-between">
					<Label className="text-lg font-bold uppercase text-slate-900">
						Customer Info
					</Label>
					<Button
						onClick={() => setOpenSearchCustomer(true)}
						size={'icon'}
					>
						<Search size={18} />
					</Button>
				</div>
				{Object.keys(selectedCustomer).length === 0 ? (
					<></>
				) : (
					<>
						<div className="flex flex-col gap-2">
							<div>
								<Label className="text-slate-900">Full Name: </Label>
								<span className="font-medium uppercase text-slate-950">
									{selectedCustomer.firstname +
										' ' +
										selectedCustomer.lastname}
								</span>
							</div>
							<div>
								<Label className="text-slate-900">
									Address: {selectedCustomer.address}
								</Label>
							</div>
							<div>
								<Label className="text-slate-900">
									Contact Number: {selectedCustomer.contact_no}
								</Label>
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
};
