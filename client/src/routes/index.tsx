import { useRoutes } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { protectedRoutes } from './protected';
import { Login } from '@/features/auth';

const AppRoute = () => {
	const auth = useAuth();
	const commonRoute = [{ path: '/', element: <Login /> }];

	const routes = auth.authenticated ? protectedRoutes : commonRoute;
	const element = useRoutes([...routes]);
	return <>{element}</>;
};
export default AppRoute;
