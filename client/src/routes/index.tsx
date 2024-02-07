import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
// import { useAuth } from '@/context/AuthContext';
import { protectedRoutes } from './protected';
import { Login } from '@/features/auth';
// import { useAuth } from '@/features/auth/context/AuthContext';
import { useAuth } from '@/context/__test__AuthContext';

const AppRoute = () => {
	// const navigate = useNavigate();
	const { isSignedIn, logout } = useAuth();
	const location = useLocation();
	console.log('location:', location);

	logout();

	const commonRoute = [{ path: '/', element: <Login /> }];
	const routes = isSignedIn ? protectedRoutes : commonRoute;
	const element = useRoutes([...routes]);
	return <>{element}</>;
};
export default AppRoute;
