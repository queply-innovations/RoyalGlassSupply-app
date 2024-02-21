// import { useAuth } from '@/context/__test__AuthContext';
import { useLocation } from 'react-router-dom';
import { ProtectedRoutes } from './protected';
import { PublicRoutes } from './public';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

const AppRouter = () => {
	const { auth, logout } = useAuth();
	logout;
	const location = useLocation();
	console.log('location:', location);
	useEffect(() => {
		// 	console.log('user:', auth.user);
	}, [auth, location]);

	return auth.authenticated ? <ProtectedRoutes /> : <PublicRoutes />;
};

export default AppRouter;
