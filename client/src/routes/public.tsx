import { Spinner } from '@/components/Loader';
import { Loading } from '@/components/Loading';
import { useAuth } from '@/context/AuthContext';
import { Login } from '@/features/auth';
import { Suspense, useEffect } from 'react';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';

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
					{/* <Spinner size="xl" /> */}
					<Loading />
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
			</Routes>
		</>
	);
};
