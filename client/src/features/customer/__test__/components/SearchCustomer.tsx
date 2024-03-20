import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import { useCustomer } from '../context/CustomerContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserRoundPlus } from 'lucide-react';
import { useModal } from '@/utils/Modal';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import { CustomerForm } from './Form/CustomerForm';

interface SearchCustomerProps {}

export const SearchCustomer = ({}: SearchCustomerProps) => {
	const {
		data: Customers,
		isLoading,
		selectedCustomer,
		setSelectedCustomer,
	} = useCustomer();

	// Command Search handlers
	const [search, setSearch] = useState('');

	// Modal handlers
	const { openModal, isOpen, closeModal } = useModal();
	return (
		<>
			<div>
				<Command className="rounded-lg border p-1 shadow-md">
					<CommandInput
						value={search}
						onValueChange={setSearch}
						placeholder={
							isLoading
								? 'Loading Customers'
								: selectedCustomer.id
									? `${selectedCustomer.firstname} ${selectedCustomer.lastname}`
									: 'Enter Customer Name'
						}
					/>
					<CommandList className="">
						{!search ? null : (
							<>
								<CommandEmpty className="flex flex-col gap-2 py-4 pb-1 text-center text-sm">
									<span className="font-bold uppercase">
										Customer Not Found
									</span>
									<Button
										className="flex flex-row gap-4"
										onClick={openModal}
									>
										<UserRoundPlus color="#fff" />
										<span className="text-white">Add Customer</span>
									</Button>
								</CommandEmpty>
								{Customers.map((customer, index) => {
									return (
										<CommandItem
											className=""
											key={index}
											value={customer.firstname}
											onSelect={() => {
												setSelectedCustomer(customer);
												setSearch('');
											}}
										>
											<div className="flex flex-row gap-2">
												<span className="">
													{customer.firstname}
												</span>
												<span>{customer.lastname}</span>
											</div>
										</CommandItem>
									);
								})}
							</>
						)}
					</CommandList>
				</Command>
			</div>
			<ModalTest isOpen={isOpen} onClose={closeModal} title="Add Customer">
				<CustomerForm onClose={closeModal} />
			</ModalTest>
		</>
	);
};
