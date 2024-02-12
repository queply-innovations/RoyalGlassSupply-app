import { Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import {
	Dashboard,
	Expenses,
	Finance,
	Inventory,
	PendingInventory,
	PendingReturn,
	PendingTransfer,
	Products,
	Reports,
	Return,
	Supplier,
	Transaction,
	Transfer,
	UserInfo,
	UserSales,
	Warehouse,
} from '@/pages';
import { SupplierPage } from '@/pages/SupplierPage';

export const TestRoute = () => {
	const { auth, logout } = useAuth();
	logout;
	const location = useLocation();
	console.log('location:', location);
	useEffect(() => {
		// 	console.log('user:', auth.user);
	}, [auth, location]);
	const protectedRoutesConfig = [
		// { path: '*', element: <Navigate to="." /> },
		{ path: '/dashboard', element: <Dashboard /> },
		{ path: '/user/information', element: <UserInfo /> },
		{ path: '/user/sales', element: <UserSales /> },
		{ path: '/pending/inventory', element: <PendingInventory /> },
		{ path: '/pending/return', element: <PendingReturn /> },
		{ path: '/pending/transfer', element: <PendingTransfer /> },
		{ path: '/transfer', element: <Transfer /> },
		{ path: '/transaction', element: <Transaction /> },
		{ path: '/transaction/expenses', element: <Expenses /> },
		{ path: '/return', element: <Return /> },
		{ path: '/inventory', element: <Inventory /> },
		{ path: '/finance', element: <Finance /> },
		{ path: '/reports', element: <Reports /> },
		{ path: '/warehouse', element: <Warehouse /> },
		{ path: '/products', element: <Products /> },
		// { path: '/supplier', element: <Supplier /> },
		{ path: '/supplier', element: <SupplierPage /> },
	];

	return (
		<>
			<Routes>
				<Route path="/" element={<Dashboard />}></Route>
				{protectedRoutesConfig.map(({ path, element }) => (
					<Route key={path} path={path} element={element} />
				))}
			</Routes>
		</>
	);
};
