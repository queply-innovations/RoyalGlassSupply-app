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
