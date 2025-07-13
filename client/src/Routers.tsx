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
import { useContext } from 'react';
import {
	Routes as HashRouter,
	Navigate,
	Outlet,
	Route,
} from 'react-router-dom';
import { AuthContext } from './components/Auth';
const routesConfig = [
	{ path: '/', element: <Login /> },
	{ path: '*', element: <Page404 /> },
	{ path: '/app/dashboard', element: <Dashboard /> },
	{ path: '/app/user/information', element: <UserInfo /> },
	{ path: '/app/user/sales', element: <UserSales /> },
	{ path: '/app/pending/inventory', element: <PendingInventory /> },
	{ path: '/app/pending/return', element: <PendingReturn /> },
	{ path: '/app/pending/transfer', element: <PendingTransfer /> },
	{ path: '/app/transaction', element: <Transaction /> },
	{ path: '/app/transaction/expenses', element: <Expenses /> },
	{ path: '/app/return', element: <Return /> },
	{ path: '/app/inventory', element: <Inventory /> },
	{ path: '/app/finance', element: <Finance /> },
	{ path: '/app/reports', element: <Reports /> },
	{ path: '/app/warehouse', element: <Warehouse /> },
	{ path: '/app/products', element: <Products /> },
	{ path: '/app/supplier', element: <Supplier /> },
];

const PrivateRoutes = () => {
	const { authenticated } = useContext(AuthContext);

	if (!authenticated) return <Navigate to="/login" replace />;

	return <Outlet />;
};

const Routes = () => {
	return (
		<HashRouter>
			<Route path="/" element={<PrivateRoutes />} />
			{routesConfig.map(({ path, element }) => (
				<Route key={path} path={path} element={element} />
			))}
		</HashRouter>
	);
};

export default Routes;
