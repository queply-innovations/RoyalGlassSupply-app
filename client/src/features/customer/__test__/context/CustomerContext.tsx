import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';
import { Customer, Voucher } from '../types';
import { useCustomerQueryFullname } from '../hooks/useCustomerQuery';
import { useInvoicePos } from '@/features/pos/__test__/context/__test__/InvoicePosContext';
import { fetchVouchersByCustomerId } from '../api/Vouchers';

interface CustomerContextProps {
	data: Customer[];
	isLoading: boolean;
	selectedCustomer: Customer;
	setSelectedCustomer: (customer: Customer) => void;
	openSearchCustomer: boolean;
	setOpenSearchCustomer: (open: boolean) => void;
	setSearchFullName: React.Dispatch<React.SetStateAction<string>>;
	vouchers: Voucher[] | undefined;
	isVouchersFetching: boolean;
	selectedVoucher: Voucher | undefined;
	setSelectedVoucher: React.Dispatch<
		React.SetStateAction<Voucher | undefined>
	>;
}

interface CustomerProviderProps {
	children: ReactNode;
}

const CustomerContext = createContext<CustomerContextProps | undefined>(
	undefined,
);

export const CustomerProvider = ({ children }: CustomerProviderProps) => {
	const [searchFullName, setSearchFullName] = useState('');
	const { data, isLoading } = useCustomerQueryFullname(searchFullName);

	const { currentInvoicePos, setCurrentInvoicePos } = useInvoicePos();

	const [selectedCustomer, setSelectedCustomer] = useState<Customer>(
		{} as Customer,
	);
	useEffect(() => {
		if (Object.keys(selectedCustomer).length !== 0) {
			setCurrentInvoicePos({
				...currentInvoicePos,
				customer_id: selectedCustomer.id,
			});
		}
	}, [selectedCustomer]);
	const [openSearchCustomer, setOpenSearchCustomer] = useState(false);

	// Fetching voucher by customer id
	const [vouchers, setVouchers] = useState<Voucher[] | undefined>();
	const [isVouchersFetching, setIsVouchersFetching] = useState<boolean>(false);
	const [selectedVoucher, setSelectedVoucher] = useState<
		Voucher | undefined
	>();
	useEffect(() => {
		if (selectedCustomer.id) {
			setIsVouchersFetching(true);
			fetchVouchersByCustomerId(selectedCustomer.id)
				.then(res => {
					setVouchers(res);
					setIsVouchersFetching(false);
				})
				.catch(() => {
					setIsVouchersFetching(false);
					throw new Error('Failed to fetch vouchers');
				});
		}
	}, [selectedCustomer.id]);

	const value = {
		data,
		isLoading,
		selectedCustomer,
		setSelectedCustomer,
		openSearchCustomer,
		setOpenSearchCustomer,
		setSearchFullName,
		vouchers,
		isVouchersFetching,
		selectedVoucher,
		setSelectedVoucher,
	};
	return (
		<CustomerContext.Provider value={value}>
			{children}
		</CustomerContext.Provider>
	);
};

export const useCustomer = () => {
	const context = useContext(CustomerContext);
	if (context === undefined) {
		throw new Error('usePos must be used within a PosProvider');
	}
	return context;
};
