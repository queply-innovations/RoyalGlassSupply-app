import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCustomer } from '@/features/customer/__test__/context/CustomerContext';
import { Search } from 'lucide-react';

interface CustomerInfoProps {}

export const CustomerInfo = ({}: CustomerInfoProps) => {
	const { selectedCustomer, setOpenSearchCustomer } = useCustomer();

	return (
		<>
			<div className="flex max-w-2xl flex-col gap-1 border-y-[1px] border-slate-200 bg-white px-2 py-4 pb-5">
				<div className="flex flex-row items-start justify-between">
					<div className="flex flex-col">
						<Label className="text-[16px] font-bold text-slate-700">
							Customer
						</Label>
						{Object.keys(selectedCustomer).length === 0 ? (
							<span className="text-sm font-medium">
								Select Customer
							</span>
						) : (
							<>
								<div className="flex flex-col gap-2 pt-2 ">
									<div className="flex flex-col ">
										<Label className="text-normal font-medium text-slate-800">
											Full Name:{' '}
										</Label>
										<span className="text-sm font-bold capitalize text-slate-800">
											{selectedCustomer.firstname +
												' ' +
												selectedCustomer.lastname}
										</span>
									</div>
									<div className="flex flex-col ">
										<Label className="text-normal font-medium text-slate-800">
											Address:
										</Label>
										<span className="text-sm font-bold capitalize text-slate-800">
											{selectedCustomer.address}
										</span>
									</div>
									<div className="flex flex-col ">
										<Label className="text-normal font-medium text-slate-800">
											Contact Number:
										</Label>
										<span className="text-sm font-bold capitalize text-slate-800">
											{selectedCustomer.contact_no}
										</span>
									</div>
								</div>
							</>
						)}
					</div>
					<Button
						onClick={() => setOpenSearchCustomer(true)}
						size={'icon'}
					>
						<Search size={18} />
					</Button>
				</div>

				{/* <Input /> */}
			</div>
		</>
	);
};
