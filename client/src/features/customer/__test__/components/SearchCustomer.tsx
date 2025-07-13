import { useCustomer } from '../context/CustomerContext';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Search } from 'lucide-react';

import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import { CustomerForm } from './Form/CustomerForm';
import { useModal } from '@/utils/Modal';

interface SearchCustomerProps {}

export const SearchCustomer = ({}: SearchCustomerProps) => {
	const {
		data: Customers,
		isLoading,
		selectedCustomer,
		setSelectedCustomer,
		openSearchCustomer,
		setOpenSearchCustomer,
		setSearchFullName,
	} = useCustomer();

	const [customerName, setCustomerName] = useState<string>('');

	const [selectBoxCustomer, setSelectBoxCustomer] = useState<string>('');

	const { isOpen, closeModal, openModal } = useModal();
	function searchCustomer() {
		setSearchFullName(customerName);
	}
	useEffect(() => {
		if (selectBoxCustomer !== '') {
			const selectedCustomer = Customers.find(
				customer => customer.id === parseInt(selectBoxCustomer),
			);
			if (selectedCustomer) {
				setSelectedCustomer(selectedCustomer);
			}
		}
	}, [selectBoxCustomer]);
	return (
		<>
			<Dialog open={openSearchCustomer} onOpenChange={setOpenSearchCustomer}>
				<DialogContent>
					<DialogHeader className="items-start">
						<DialogTitle>Search Customer</DialogTitle>
					</DialogHeader>
					<form
						className="flex flex-col"
						onSubmit={e => {
							e.preventDefault();
							searchCustomer();
						}}
					>
						<div className="flex flex-row gap-2">
							<Input
								placeholder="Enter customer name"
								onChange={e => {
									setCustomerName(e.target.value);
								}}
								className="w-[90%]"
							/>
							<Button type="submit" size="icon">
								{isLoading ? (
									<Loader2 className="animate-spin" />
								) : (
									<Search size={18} />
								)}
							</Button>
						</div>
					</form>
					{Customers.length !== 0 && !isLoading && (
						<>
							<Select onValueChange={setSelectBoxCustomer}>
								<SelectTrigger className="h-15 text-left ">
									<SelectValue placeholder="Select Customer" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{Customers.map((customer, index) => {
											return (
												<SelectItem
													value={customer.id.toString()}
													key={index}
													onClick={() => {
														setCustomerName('');
													}}
												>
													<div className="flex w-full flex-col">
														<span className="w-full font-bold">
															{customer.firstname}{' '}
															{customer.lastname}
														</span>
														<span className="w-full">
															{customer.contact_no} •{' '}
															{customer.address}
														</span>
													</div>
												</SelectItem>
											);
										})}
									</SelectGroup>
								</SelectContent>
							</Select>
						</>
					)}

					<DialogFooter className="flex flex-row gap-2">
						<Button
							variant={'outline'}
							className="flex-1 font-medium"
							onClick={() => {
								setOpenSearchCustomer(false);
								openModal();
							}}
						>
							Add new customer
						</Button>
						<Button
							className="flex-1"
							onClick={() => {
								setOpenSearchCustomer(false);
							}}
						>
							Close
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			<ModalTest isOpen={isOpen} onClose={closeModal} title="Add Customer">
				<CustomerForm onClose={closeModal} />
			</ModalTest>
		</>
	);
};
