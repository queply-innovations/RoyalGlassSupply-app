import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Spinner } from '@/components/Loader';
import { Dashboard, Warehouse } from '@/pages';

const App = () => {
	return (
		<Suspense
			fallback={
				<div className="flex h-full w-full items-center justify-center">
					<Spinner size="xl" />
				</div>
			}
		>
			<Outlet />
		</Suspense>
	);
};

export const protectedRoutes = [
	{
		path: '/app',
		element: <App />,
		children: [
			{
				path: 'dashboard',
				element: <Dashboard />,
			},
			{
				path: 'warehouse',
				element: <Warehouse />,
			},
		],
	},
];
