import { ProgressBar } from '@/components';
import { Spinner } from '@/components/Loader';
import { Loading } from '@/components/Loading';
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
			<div className="flex flex-col w-full h-screen px-20 space-y-0 justify-center items-center">
				{/* <Spinner size="xl" /> */}
				{/* <Loading /> */}
				<ProgressBar />
				<h2 className='text-primary-dark-gray text-2xl font-bold'>Loading App....</h2>
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
