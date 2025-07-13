import { ProgressBar } from '@/components';
// import { Login } from '@/features/auth';
import { Login } from '@/pages/__test__';
import { Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

const App = () => {
	// useEffect(() => {
	// 	if (!auth.isLoggedIn) {
	// 		navigate('/login');
	// 	}
	// }, [auth.isLoggedIn, navigate]);

	return (
		<Suspense
			fallback={
				<div className="flex h-screen w-full flex-col items-center justify-center space-y-0 px-20">
					{/* <Spinner size="xl" /> */}
					{/* <Loading /> */}
					<ProgressBar />
					<h2 className="text-primary-dark-gray text-2xl font-bold">
						Loading App....
					</h2>
				</div>
			}
		>
			<Outlet />
		</Suspense>
	);
};

export const publicRoutes = [
	{
		path: '/',
		element: <App />,
		children: [{ path: 'login', element: <Login /> }],
	},
];

export const PublicRoutes = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</>
	);
};
