import { useCustomer } from '../context/CustomerContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
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

  // Command Search handlers
  // const [search, setSearch] = useState('');
  // const { currentInvoicePos, setCurrentInvoicePos } = useInvoicePos();

  // useEffect(() => {
  // 	if (selectedCustomer) {
  // 		setSearch('');
  // 	}
  // }, [selectedCustomer, openSearchCustomer]);

  const [customerName, setCustomerName] = useState<string>('');

  function searchCustomer() {
    setSearchFullName(customerName);
  }
  return (
    <>
      <Dialog open={openSearchCustomer} onOpenChange={setOpenSearchCustomer}>
        <DialogContent>
          <DialogHeader className="items-start">
            {selectedCustomer.firstname}
            <DialogTitle>Search Customer</DialogTitle>
            <DialogDescription>Customers</DialogDescription>
          </DialogHeader>
          <form
            className="flex flex-col"
            onSubmit={e => {
              e.preventDefault();
              searchCustomer();
            }}>
            <div className="flex flex-row gap-2">
              <Input
                onChange={e => {
                  console.log(e.target.value);
                  setCustomerName(e.target.value);
                }}
                className="w-[90%]"
              />
              <Button type="submit" size="icon">
                <Search size={18} />
              </Button>
            </div>
            {/* {!isLoading ? (
              <Select>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Customers.map((customer, index) => {
                      return (
                        <SelectItem
                          value={customer.firstname + ' ' + customer.lastname}
                          key={index}
                          onClick={() => {
                            setSelectedCustomer(customer);
                            setCustomerName('');
                          }}>
                          {customer.firstname} {customer.lastname}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <>
                <Loader2 className="animate-spin" />
              </>
            )} */}
          </form>
          {Customers.length !== 0 && !isLoading ? (
            <>
              <Select>
                <SelectTrigger className="text-left ">
                  <SelectValue placeholder="Select Customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Customers.map((customer, index) => {
                      return (
                        <SelectItem
                          value={
                            customer.firstname +
                            ' ' +
                            customer.lastname +
                            '' +
                            customer.id
                          }
                          key={index}
                          onClick={() => {
                            setSelectedCustomer(customer);
                            setCustomerName('');
                          }}>
                          <div className="flex w-full flex-col">
                            <span className="w-full">
                              {customer.firstname} {customer.lastname}
                            </span>
                            <span className="w-full">
                              {customer.contact_no} {customer.address}
                            </span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </>
          ) : null}
        </DialogContent>
      </Dialog>

      {/* <CommandDialog
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
							<CommandEmpty className="flex flex-col gap-2 py-4 pb-1 text-sm text-center">
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
											setCurrentInvoicePos({
												...currentInvoicePos,
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
			</ModalTest> */}
    </>
  );
};
