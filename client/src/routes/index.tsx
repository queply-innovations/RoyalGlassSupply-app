import { useNavigate, useRoutes } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { protectedRoutes } from './protected';
import { Login } from '@/features/auth';
import { useEffect } from 'react';

const AppRoute = () => {
	const navigate = useNavigate();
	const auth = useAuth();

	// const location = useLocation();
	// console.log('location:', location);

	useEffect(() => {
		if (!auth.isLoggedIn) {
			navigate('/');
		} else {
			navigate('/app/dashboard');
		}
	}, [auth.isLoggedIn, navigate]);

	const commonRoute = [{ path: '/', element: <Login /> }];
	const routes = auth.isLoggedIn ? protectedRoutes : commonRoute;
	const element = useRoutes([...routes, ...commonRoute]);

	return <>{element}</>;
};
export default AppRoute;
