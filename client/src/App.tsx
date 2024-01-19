import {
	Login,
	Finance,
	Inventory,
	Reports,
	Return,
	Supplier,
	Page404,
	Dashboard,
	Warehouse,
	UserInfo,
	UserSales,
	Transaction,
	Expenses,
	PendingInventory,
	PendingReturn,
	PendingTransfer,
	Products,
} from '@/pages';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HashRouter, Route, Routes } from 'react-router-dom';

const routesConfig = [
	{ path: '/', element: <Login /> },
	{ path: '*', element: <Page404 /> },
	{ path: '/dashboard', element: <Dashboard /> },
	{ path: '/user/information', element: <UserInfo /> },
	{ path: '/user/sales', element: <UserSales /> },
	{ path: '/pending/inventory', element: <PendingInventory /> },
	{ path: '/pending/return', element: <PendingReturn /> },
	{ path: '/pending/transfer', element: <PendingTransfer /> },
	{ path: '/transaction', element: <Transaction /> },
	{ path: '/transaction/expenses', element: <Expenses /> },
	{ path: '/return', element: <Return /> },
	{ path: '/inventory', element: <Inventory /> },
	{ path: '/finance', element: <Finance /> },
	{ path: '/reports', element: <Reports /> },
	{ path: '/warehouse', element: <Warehouse /> },
	{ path: '/products', element: <Products /> },
	{ path: '/supplier', element: <Supplier /> },
];

const queryClient = new QueryClient();

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<HashRouter>
					<Routes>
						{routesConfig.map(({ path, element }) => (
							<Route key={path} path={path} element={element} />
						))}
					</Routes>
					<ReactQueryDevtools />
				</HashRouter>
			</QueryClientProvider>
		</>
	);
}

export default App;
