import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';
import { Invoice, Customer, CustomerSales } from '../types';
import { useCustomersQuery } from '../hooks';
import { useCustomer } from '@/features/customer/__test__/context/CustomerContext';
import { useCustomerQuery } from '@/features/customer/__test__/hooks/useCustomerQuery';

interface CustomersContextProps {
	customersList: CustomerSales[];
	// invoices: Invoice[];
	isFetching: boolean;
	// customers: Customer[];
	selectedInvoice: Invoice[];
	setSelectedInvoice: (invoice: Invoice[]) => void;
}

export const CustomersContext = createContext<
	CustomersContextProps | undefined
>(undefined);

interface CustomersProviderProps {
	children: ReactNode;
}

export const CustomersProvider = ({ children }: CustomersProviderProps) => {
	const [selectedInvoice, setSelectedInvoice] = useState<Invoice[]>([]);
	// const [ customersList, setCustomersList ] = useState<any>([]);
	const { invoices, isFetching: isInvoicesFetching } = useCustomersQuery();
	// const [ customers, setCustomers ] = useState<Customer[]>([])
	const { data: customers, isLoading: isCustomersFetching } =
		useCustomerQuery();
	const [customersList, setCustomersList] = useState<CustomerSales[]>([]);
	const isFetching = isInvoicesFetching || isCustomersFetching;

	useEffect(() => {
		setCustomersList(
			customers.map(customer => {
				const customerSales = invoices.reduce((acc, invoice) => {
					if (
						invoice.customer.id === customer.id &&
						invoice.type === 'payment'
					) {
						return acc + invoice.total_amount_due;
					}
					return acc;
				}, 0);

				const customerTransactions =
					invoices.filter(invoice => invoice.customer.id === customer.id)
						?.length ?? 0;

				return {
					customer: customer,
					total_sales: customerSales,
					total_transactions: customerTransactions,
				};
			}),
		);
	}, [invoices, customers]);

	// const customerSales = invoices.reduce((acc, invoice) => {
	//     if (invoice.customer.id === customer.id) {
	//         return acc + invoice.total_amount_due;
	//     }
	//     return acc;
	// }, 0);

	// invoices.map((invoice: any) => {
	// 	if (!customersList.includes(invoice.customer.id)) {
	// 		setCustomersList([...customersList, invoice.customer.id ]);
	// 	}
	// });

	// useEffect(() => {
	// 	customersList.map((customer: number) => {
	// 		setCustomers([...customers, {
	// 			id: customer,
	// 			invoices: invoices.filter((invoice: any) => invoice.customer.id === customer)
	// 		}]);
	// 	});
	// }, [customersList]);

	const value = {
		customersList,
		// invoices,
		isFetching,
		// customers,
		selectedInvoice,
		setSelectedInvoice,
	};

	return (
		<CustomersContext.Provider value={value}>
			{children}
		</CustomersContext.Provider>
	);
};

export function useCustomers() {
	const context = useContext(CustomersContext);

	if (!context) {
		throw new Error(
			'useCustomersContext must be used within CustomersContext',
		);
	}
	return context;
}
