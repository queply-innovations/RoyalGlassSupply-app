import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import Page404 from '@/pages/Page404';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { UserInfo } from '@/pages/User/UserInfo';
import { PendingInventory } from '@/pages/Pending/PendingInventory';
import { PendingReturn } from '@/pages/Pending/PendingReturn';
import { UserSales } from '@/pages/User/UserSales';
import { PendingTransfer } from '@/pages/Pending/PendingTransfer';
import { Transaction } from '@/pages/Transactions/Transaction';
import { Expenses } from '@/pages/Transactions/Expenses';
import { Reports } from '@/pages/Reports';
import { Finance } from '@/pages/Finance';
import { Inventory } from '@/pages/Inventory';
import { Return } from '@/pages/Return';
import { Products } from '@/pages/Products/Products';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Warehouse from './pages/Warehouse/Warehouse';

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

	// ... other routes
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
