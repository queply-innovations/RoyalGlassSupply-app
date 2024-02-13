import { Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { Spinner } from '@/components/Loader';
import { Loading } from '@/components/Loading';
import { lazyImport } from '@/utils/lazyImport';
import { ProgressBar } from '@/components';

const { Dashboard } = lazyImport(() => import('@/pages'), 'Dashboard');
const { Expenses } = lazyImport(() => import('@/pages'), 'Expenses');
const { Finance } = lazyImport(() => import('@/pages'), 'Finance');
const { Inventory } = lazyImport(() => import('@/pages'), 'Inventory');
const { PendingInventory } = lazyImport(
	() => import('@/pages'),
	'PendingInventory',
);
const { PendingReturn } = lazyImport(() => import('@/pages'), 'PendingReturn');
const { PendingTransfer } = lazyImport(
	() => import('@/pages'),
	'PendingTransfer',
);
const { Products } = lazyImport(() => import('@/pages'), 'Products');
const { Reports } = lazyImport(() => import('@/pages'), 'Reports');
const { Return } = lazyImport(() => import('@/pages'), 'Return');
const { Supplier } = lazyImport(() => import('@/pages'), 'Supplier');
const { Transaction } = lazyImport(() => import('@/pages'), 'Transaction');
const { UserInfo } = lazyImport(() => import('@/pages'), 'UserInfo');
const { UserSales } = lazyImport(() => import('@/pages'), 'UserSales');
const { Warehouse } = lazyImport(() => import('@/pages'), 'Warehouse');
const { Transfer } = lazyImport(() => import('@/pages'), 'Transfer');

const App = () => {
	return (
		<Suspense
		fallback={
			<div className="flex flex-col w-full h-screen px-20 space-y-0 justify-center items-center">
				{/* <Spinner size="xl" /> */}
				{/* <Loading /> */}
				<ProgressBar />
				<h2 className='text-primary-dark-gray text-2xl font-bold'>Loading Routes....</h2>
			</div>
		}
		>
			<Outlet />
		</Suspense>
	);
};

// export const protectedRoutes = [
// 	{
// 		path: '/app',
// 		element: <App />,
// 		children: [
// 			{ path: '*', element: <Navigate to="." /> },
// 			{ path: 'dashboard', element: <Dashboard /> },
// 			{ path: 'user/information', element: <UserInfo /> },
// 			{ path: 'user/sales', element: <UserSales /> },
// 			{ path: 'pending/inventory', element: <PendingInventory /> },
// 			{ path: 'pending/return', element: <PendingReturn /> },
// 			{ path: 'pending/transfer', element: <PendingTransfer /> },
// 			{ path: 'transfer', element: <Transfer /> },
// 			{ path: 'transaction', element: <Transaction /> },
// 			{ path: 'transaction/expenses', element: <Expenses /> },
// 			{ path: 'return', element: <Return /> },
// 			{ path: 'inventory', element: <Inventory /> },
// 			{ path: 'finance', element: <Finance /> },
// 			{ path: 'reports', element: <Reports /> },
// 			{ path: 'warehouse', element: <Warehouse /> },
// 			{ path: 'products', element: <Products /> },
// 			{ path: 'supplier', element: <Supplier /> },
// 		],
// 	},
// ];

const protectedRoutesConfig = [
	// { path: '*', element: <Navigate to="." /> },
	{ path: '/app/dashboard', element: <Dashboard /> },
	{ path: '/app/user/information', element: <UserInfo /> },
	{ path: '/app/user/sales', element: <UserSales /> },
	{ path: '/app/pending/inventory', element: <PendingInventory /> },
	{ path: '/app/pending/return', element: <PendingReturn /> },
	{ path: '/app/pending/transfer', element: <PendingTransfer /> },
	{ path: '/app/transfer', element: <Transfer /> },
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

export const ProtectedRoutes = () => {
	return (
		<>
			<Routes>
				{protectedRoutesConfig.map(({ path, element }) => (
					<Route key={path} path={path} element={element} />
				))}
			</Routes>
		</>
	);
};
