import { Spinner } from '@/components/Loader';
import { useAuth } from '@/context/AuthContext';
// import { Login } from '@/features/auth';
import { Login } from '@/pages/__test__';
import { Suspense, useEffect } from 'react';
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';

const App = () => {
	// useEffect(() => {
	// 	if (!auth.isLoggedIn) {
	// 		navigate('/login');
	// 	}
	// }, [auth.isLoggedIn, navigate]);

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
