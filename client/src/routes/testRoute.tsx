import { Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { Dashboard } from '@/pages';

export const TestRoute = () => {
	const { auth, logout } = useAuth();
	logout;
	const location = useLocation();
	console.log('location:', location);
	useEffect(() => {
		// 	console.log('user:', auth.user);
	}, [auth, location]);

	return (
		<>
			<Routes>
				<Route path="/" element={<Dashboard />}></Route>
			</Routes>
		</>
	);
};
