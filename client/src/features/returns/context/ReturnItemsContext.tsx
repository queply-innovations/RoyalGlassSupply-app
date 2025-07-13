import { createContext, useContext } from 'react';
import { ReturnItems } from '../types';
import { useReturnItemsQuery } from '../hooks/useReturnItemsQuery';

interface ReturnItemsContextProps {
	data: ReturnItems[];
	isFetching: boolean;
	// selectedReturnItem: ReturnItems
	// setSelectedReturnItem: (returnItem: ReturnItems) => void
}

interface ReturnItemsProviderProps {
	children: React.ReactNode;
	returnTransactionId: number;
}

const ReturnItemsContext = createContext<ReturnItemsContextProps | undefined>(
	undefined,
);

export const ReturnItemsProvider = ({
	children,
	returnTransactionId,
}: ReturnItemsProviderProps) => {
	// const [selectedReturnItem, setSelectedReturnItem] = useState<ReturnItems>({} as ReturnItems);
	const { data, isFetching } = useReturnItemsQuery(returnTransactionId);
	const value = {
		data: data ?? [],
		isFetching: isFetching,
		// selectedReturnItem,
		// setSelectedReturnItem,
	};

	return (
		<ReturnItemsContext.Provider value={value}>
			{children}
		</ReturnItemsContext.Provider>
	);
};

export function useReturnItems() {
	const context = useContext(ReturnItemsContext);

	if (!context) {
		throw new Error(
			'useReturnItems hook must be used within ReturnItemsProvider',
		);
	}
	return context;
}
