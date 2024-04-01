// import { useAuth } from '@/context/__test__AuthContext';
import { ProtectedRoutes } from './protected';
import { PublicRoutes } from './public';
import { useAuth } from '@/context/AuthContext';

const AppRouter = () => {
	const { auth, logout } = useAuth();
	logout;

	return auth.authenticated ? <ProtectedRoutes /> : <PublicRoutes />;
};

export default AppRouter;
