// import { ReactNode, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// import { Spinner } from '@/components/Loader';
// import { Loading } from '@/components/Loading';
import { lazyImport } from '@/utils/lazyImport';
// import { ProgressBar } from '@/components';
import { PosProvider } from '@/features/pos/__test__/context/__test__/PosContext';
import { InvoiceProvider } from '@/features/invoice/__test__/context/InvoiceContext';
import { CustomerProvider } from '@/features/customer/__test__/context/CustomerContext';
import { InventoryProdsProvider } from '@/features/inventory/context';
import { ProductPricesProvider } from '@/features/product/__test__';
import { JSX } from 'react/jsx-runtime';
import { InvoicePosProvider } from '@/features/pos/__test__/context/__test__/InvoicePosContext';

const { Dashboard } = lazyImport(() => import('@/pages'), 'Dashboard');
const { ExpensesPage } = lazyImport(
   () => import('@/pages/__test__'),
   'ExpensesPage',
);
// const { Finance } = lazyImport(() => import('@/pages'), 'Finance');
// const { Inventory } = lazyImport(() => import('@/pages'), 'Inventory');
const { Inventory } = lazyImport(() => import('@/pages/__test__'), 'Inventory');
const { InventoryItemsPage } = lazyImport(
   () => import('@/pages/__test__'),
   'InventoryItemsPage',
);
const { Invoice } = lazyImport(() => import('@/pages/__test__'), 'Invoice');
const { InvoiceItems } = lazyImport(
   () => import('@/pages/__test__'),
   'InvoiceItems',
);

const { SelectWarehousePos } = lazyImport(
   () => import('@/pages/__test__/pos'),
   'SelectWarehousePos',
);

const { PointOfSalePage } = lazyImport(
   () => import('@/pages/__test__'),
   'PointOfSalePage',
);
const { PosReturnsPage } = lazyImport(
   () => import('@/pages/__test__'),
   'PosReturnsPage',
);
const { AddProductPOSPage } = lazyImport(
   () => import('@/pages/__test__/pos'),
   'AddProductPOSPage',
);

const { ReturnItemsPosPage } = lazyImport(
   () => import('@/pages/__test__/pos'),
   'ReturnItemsPosPage',
);

const { PendingInventoryProduct } = lazyImport(
   () => import('@/pages/__test__/'),
   'PendingInventoryProduct',
);
// const { PendingReturn } = lazyImport(() => import('@/pages'), 'PendingReturn');
const { PendingReturn } = lazyImport(
   () => import('@/pages/__test__'),
   'PendingReturn',
);
// const { PendingTransfer } = lazyImport(
// 	() => import('@/pages'),
// 	'PendingTransfer',
// );
const { PendingTransfer } = lazyImport(
   () => import('@/pages/__test__'),
   'PendingTransfer',
);
const { PendingProductPrice } = lazyImport(
   () => import('@/pages/__test__'),
   'PendingProductPrice',
);
const { Products } = lazyImport(() => import('@/pages/__test__'), 'Products');
const { ProductPrices } = lazyImport(
   () => import('@/pages/__test__'),
   'ProductPrices',
);
const { Reports } = lazyImport(() => import('@/pages/__test__'), 'Reports');
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
const { Customers } = lazyImport(() => import('@/pages/__test__'), 'Customers');
const { PrintForm } = lazyImport(
   () => import('@/features/pos/__test__/components/Form/PrintForm'),
   'PrintForm',
);

// const App = () => {
// 	return (
// 		<Suspense
// 			fallback={
// 				<div className="flex flex-col items-center justify-center w-full h-screen px-20 space-y-0">
// 					{/* <Spinner size="xl" /> */}
// 					{/* <Loading /> */}
// 					<ProgressBar />
// 					<h2 className="text-2xl font-bold text-primary-dark-gray">
// 						Loading Routes....
// 					</h2>
// 				</div>
// 			}
// 		>
// 			<Outlet />
// 		</Suspense>
// 	);
// };

const protectedRoutesConfig = [
   { path: '*', element: <Navigate to="." /> },
   { path: '/', element: <Navigate to="/dashboard" /> },
   { path: '/dashboard', element: <Dashboard /> },
   { path: '/user/information', element: <UserInfo /> },
   { path: '/user/sales', element: <UserSales /> },
   { path: '/user/role-perms', element: <RolePermissions /> },
   { path: '/invoice', element: <Invoice /> },
   // TODO ! add POS PAGE
   { path: '/pos', element: <SelectWarehousePos /> },
   { path: '/pos/add-order', element: <PointOfSalePage /> },
   { path: '/pos/return/:code', element: <PosReturnsPage /> },
   { path: '/pos/add-product', element: <AddProductPOSPage /> },
   { path: '/pos/add-invoice', element: <PointOfSalePage /> },
   { path: '/pos/return-items', element: <ReturnItemsPosPage /> },

   { path: '/pending/inventory', element: <PendingInventoryProduct /> },
   { path: '/pending/return', element: <PendingReturn /> },
   { path: '/pending/transfer', element: <PendingTransfer /> },
   // { path: '/pending/product-listing', element: <PendingProductPrice /> },
   { path: '/transfer', element: <Transfer /> },
   { path: '/transaction', element: <Invoice /> },
   { path: '/transaction/items/:id', element: <InvoiceItems /> },

   // { path: '/transaction/expenses', element: <Expenses /> },
   { path: '/returns', element: <Return /> },
   { path: '/inventory', element: <Inventory /> },
   { path: '/inventory/items/:id', element: <InventoryItemsPage /> },
   // { path: '/finance', element: <Finance /> },
   { path: '/expenses', element: <ExpensesPage /> },
   { path: '/customers', element: <Customers /> },
   { path: '/reports', element: <Reports /> },
   { path: '/warehouse', element: <Warehouse /> },
   { path: '/products', element: <Products /> },
   { path: '/products/listings', element: <ProductPrices /> },
   { path: '/supplier', element: <Supplier /> },
   { path: '/pos/print-invoice', element: <PrintForm /> },
];

export const ProtectedRoutes = () => {
   return (
      <>
         <Routes>
            {protectedRoutesConfig.map(({ path, element }) => (
               <Route
                  key={path}
                  path={path}
                  element={wrapWithProviders(path, element)}
               />
            ))}
         </Routes>
      </>
   );
};
const wrapWithProviders = (
   path: string,
   element: JSX.Element | null | undefined,
) => {
   if (path.startsWith('/pos')) {
      return (
         <InvoicePosProvider>
            <CustomerProvider>
               <PosProvider>{element}</PosProvider>
            </CustomerProvider>
         </InvoicePosProvider>
      );
   } else {
      return element;
   }
};
