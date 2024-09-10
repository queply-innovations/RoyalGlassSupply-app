import { useAuth } from '@/context/AuthContext';
import { InvoiceItems } from '@/features/invoice/__test__/types';
import { useProductPricesPOSQuery } from '@/features/product/__test__/hooks';
import { ProductPricesPOS } from '@/features/product/__test__/types';
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvoicePos } from './InvoicePosContext';

interface PosContextProps {
	searchFilterItems: { warehouse_id: number };
	setSearchFilterItems: React.Dispatch<
		React.SetStateAction<{ warehouse_id: number }>
	>;

	sellableItems: ProductPricesPOS[] | null;
	isFetching: boolean;

	customerCart: InvoiceItems[];
	setCustomerCart: React.Dispatch<React.SetStateAction<InvoiceItems[]>>;

	dialogOptions: DialogOptions;
	setDialogOptions: React.Dispatch<React.SetStateAction<DialogOptions>>;
}

interface PosProviderProps {
	children: ReactNode;
}

interface DialogOptions {
	open: boolean;
	title: string;
}

const PosContext = createContext<PosContextProps | undefined>(undefined);

export const PosProvider = ({ children }: PosProviderProps) => {
	const { auth } = useAuth();
	const navigate = useNavigate();

	const { currentInvoicePos, setCurrentInvoicePos } = useInvoicePos();

	const [searchFilterItems, setSearchFilterItems] = useState<{
		warehouse_id: number;
	}>({ warehouse_id: 0 });

	const [customerCart, setCustomerCart] = useState<InvoiceItems[]>([]);

	const [dialogOptions, setDialogOptions] = useState<DialogOptions>(
		{} as DialogOptions,
	);

	useEffect(() => {
		if (auth.role?.includes('admin')) {
			navigate('/pos');
		} else {
			const warehouseCode = auth.role?.split('_').slice(-1)[0].toLowerCase();
			setSearchFilterItems({
				warehouse_id: warehouseCode === 'cdo' ? 1 : 2,
			});
			setCurrentInvoicePos({
				...currentInvoicePos,
				warehouse_id: warehouseCode === 'cdo' ? 1 : 2,
			});
			navigate('/pos/add-order');
		}
	}, [auth.role]);

	// Fetching products for POS, paginated
	const {
		data,
		isFetching,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
		isError,
		refetch,
	} = useProductPricesPOSQuery({
		warehouse_id: searchFilterItems.warehouse_id,
	});

	// Fetch next page if there is a next page and done fetching the current page
	useEffect(() => {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}

		// Refetch if there is an error
		if (isError) {
			refetch();
		}
	}, [hasNextPage, isFetchingNextPage, fetchNextPage, isError, refetch]);

	// Flatten the paginated data
	const sellableItems = useMemo(() => {
		return data?.pages.flatMap(page => page.data) || [];
	}, [data]);

	const value = {
		searchFilterItems,
		setSearchFilterItems,

		sellableItems,
		isFetching,

		customerCart,
		setCustomerCart,

		dialogOptions,
		setDialogOptions,
	};
	return <PosContext.Provider value={value}>{children}</PosContext.Provider>;
};

export const usePos = () => {
	const context = useContext(PosContext);
	if (context === undefined) {
		throw new Error('usePos must be used within a PosProvider');
	}
	return context;
};
