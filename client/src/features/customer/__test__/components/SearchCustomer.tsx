import {
	CommandDialog,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import { useCustomer } from '../context/CustomerContext';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserRoundPlus } from 'lucide-react';
import { useModal } from '@/utils/Modal';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import { CustomerForm } from './Form/CustomerForm';
import { useInvoice } from '@/features/invoice/__test__/context/InvoiceContext';

interface SearchCustomerProps {}

export const SearchCustomer = ({}: SearchCustomerProps) => {
	const {
		data: Customers,
		isLoading,
		selectedCustomer,
		setSelectedCustomer,
		openSearchCustomer,
		setOpenSearchCustomer,
	} = useCustomer();

	// Command Search handlers
	const [search, setSearch] = useState('');
	const { invoice, setInvoice } = useInvoice();

	useEffect(() => {
		if (selectedCustomer) {
			setSearch('');
		}
	}, [selectedCustomer, openSearchCustomer]);

	// Modal handlers
	const { openModal, isOpen, closeModal } = useModal();
	return (
		<>
			<CommandDialog
				open={openSearchCustomer}
				onOpenChange={setOpenSearchCustomer}
			>
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
				<CommandList>
					{!search ? null : (
						<>
							<CommandEmpty className="flex flex-col gap-2 py-4 pb-1 text-center text-sm">
								<span className="font-bold uppercase">
									Customer Not Found
								</span>
								<Button
									className="flex flex-row gap-4"
									onClick={() => {
										openModal();
										setOpenSearchCustomer(false);
									}}
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
										value={
											customer.id +
											'' +
											customer.firstname +
											' ' +
											customer.lastname
										}
										onSelect={() => {
											setSelectedCustomer(customer);
											setOpenSearchCustomer(false);
											setSearch('');
											setInvoice({
												...invoice,
												customer_id: customer.id,
											});
										}}
									>
										<div className="flex flex-row gap-2">
											<span>{customer.firstname}</span>
											<span>{customer.lastname}</span>
										</div>
									</CommandItem>
								);
							})}
						</>
					)}
				</CommandList>
			</CommandDialog>
			<ModalTest isOpen={isOpen} onClose={closeModal} title="Add Customer">
				<CustomerForm onClose={closeModal} />
			</ModalTest>
		</>
	);
};
