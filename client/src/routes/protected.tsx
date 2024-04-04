import { Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

// import { Spinner } from '@/components/Loader';
// import { Loading } from '@/components/Loading';
import { lazyImport } from '@/utils/lazyImport';
import { ProgressBar } from '@/components';

const { Dashboard } = lazyImport(() => import('@/pages'), 'Dashboard');
const { Expenses } = lazyImport(() => import('@/pages'), 'Expenses');
const { Finance } = lazyImport(() => import('@/pages'), 'Finance');
// const { Inventory } = lazyImport(() => import('@/pages'), 'Inventory');
const { Inventory } = lazyImport(() => import('@/pages/__test__'), 'Inventory');
const { InventoryItemsPage } = lazyImport(
	() => import('@/pages/__test__'),
	'InventoryItemsPage',
);
const { Invoice } = lazyImport(() => import('@/pages/__test__'), 'Invoice');
const { PointOfSalePage } = lazyImport(
	() => import('@/pages/__test__'),
	'PointOfSalePage',
);
const { PendingInventory } = lazyImport(
	() => import('@/pages'),
	'PendingInventory',
);
const { PendingReturn } = lazyImport(() => import('@/pages'), 'PendingReturn');
// const { PendingTransfer } = lazyImport(
// 	() => import('@/pages'),
// 	'PendingTransfer',
// );
const { PendingTransfer } = lazyImport(
	() => import('@/pages/__test__'),
	'PendingTransfer',
);
const { Products } = lazyImport(() => import('@/pages/__test__'), 'Products');
const { ProductPrices } = lazyImport(
	() => import('@/pages/__test__'),
	'ProductPrices',
);
const { Reports } = lazyImport(() => import('@/pages'), 'Reports');
const { Return } = lazyImport(() => import('@/pages'), 'Return');
// const { Supplier } = lazyImport(() => import('@/pages'), 'Supplier');
const { Supplier } = lazyImport(() => import('@/pages/__test__'), 'Supplier');
// const { Transaction } = lazyImport(() => import('@/pages'), 'Transaction');
const { Transaction } = lazyImport(
	() => import('@/pages/__test__'),
	'Transaction',
);
// const { UserInfo } = lazyImport(() => import('@/pages'), 'UserInfo');
const { UserInfo } = lazyImport(() => import('@/pages/__test__'), 'UserInfo');
// const { UserSales } = lazyImport(() => import('@/pages'), 'UserSales');
const { UserSales } = lazyImport(() => import('@/pages/__test__'), 'UserSales');
const { RolePermissions } = lazyImport(
	() => import('@/pages/__test__'),
	'RolePermissions',
);
// const { Warehouse } = lazyImport(() => import('@/pages'), 'Warehouse');
const { Warehouse } = lazyImport(() => import('@/pages/__test__'), 'Warehouse');
// const { Transfer } = lazyImport(() => import('@/pages'), 'Transfer');
const { Transfer } = lazyImport(() => import('@/pages/__test__'), 'Transfer');

const App = () => {
	return (
		<Suspense
			fallback={
				<div className="flex h-screen w-full flex-col items-center justify-center space-y-0 px-20">
					{/* <Spinner size="xl" /> */}
					{/* <Loading /> */}
					<ProgressBar />
					<h2 className="text-primary-dark-gray text-2xl font-bold">
						Loading Routes....
					</h2>
				</div>
			}
		>
			<Outlet />
		</Suspense>
	);
};

const protectedRoutesConfig = [
	{ path: '*', element: <Navigate to="." /> },
	{ path: '/', element: <Navigate to="/dashboard" /> },
	{ path: '/dashboard', element: <Dashboard /> },
	{ path: '/user/information', element: <UserInfo /> },
	{ path: '/user/sales', element: <UserSales /> },
	{ path: '/user/role-perms', element: <RolePermissions /> },
	{ path: '/invoice', element: <Invoice /> },
	// TODO ! add POS PAGE
	{ path: '/pos', element: <Navigate to="/pos/add-order" /> },
	{ path: '/pos/add-order', element: <PointOfSalePage /> },
	{ path: '/pos/add-product', element: <PointOfSalePage /> },
	{ path: '/pos/add-invoice', element: <PointOfSalePage /> },
	{ path: '/pending/inventory', element: <PendingInventory /> },
	{ path: '/pending/return', element: <PendingReturn /> },
	{ path: '/pending/transfer', element: <PendingTransfer /> },
	{ path: '/transfer', element: <Transfer /> },
	{ path: '/transaction', element: <Transaction /> },
	{ path: '/transaction/expenses', element: <Expenses /> },
	{ path: '/returns', element: <Return /> },
	{ path: '/inventory', element: <Inventory /> },
	{ path: '/inventory/items/:id', element: <InventoryItemsPage /> },
	// { path: '/finance', element: <Finance /> },
	// { path: '/reports', element: <Reports /> },
	{ path: '/warehouse', element: <Warehouse /> },
	{ path: '/products', element: <Products /> },
	{ path: '/products/listings', element: <ProductPrices /> },
	{ path: '/supplier', element: <Supplier /> },
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
