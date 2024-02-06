import { LoginCredentials, LoginUser } from '@/features/auth/api/Login';
import { UserResponse, getUserRole } from '@/features/auth';
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';
import storage from '@/utils/storage';
import { useNavigate } from 'react-router-dom';

interface AuthProps {
	user: number | null;
	token: string | null;
	authenticated: boolean | null;
	role: string | null;
	isLoggedIn: boolean;
}
interface AuthContextProps {
	auth: AuthProps;
	login(credentials: LoginCredentials): void;
	logout(): void;
}

interface AuthProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [auth, setAuth] = useState<AuthProps>({
		user: null,
		token: null,
		authenticated: false,
		role: null,
		isLoggedIn: false,
	});
	useEffect(() => {
		console.log('Updated Auth:', auth);
	}, [auth]);

	async function login(credentials: LoginCredentials) {
		try {
			const userResponse = await LoginUser(credentials);
			console.log('userResponse:', userResponse);
			setAuth({
				user: userResponse.user.id,
				token: userResponse.token,
				authenticated: true,
				role: null,
				isLoggedIn: true,
			});
			storage.setToken(userResponse.token);

			const userRole = await getUserRole(userResponse.user.id);
			console.log('userRole:', userRole);

			if (userRole) {
				setAuth(prev => ({
					...prev,
					role: userRole.title,
					isLoggedIn: storage.setLogIn(),
				}));
				storage.setUserSession(`${userRole.title} | ${userResponse.token}`);
				storage.setToken(userResponse.token);
			}

			return userResponse;
		} catch (error) {
			console.error('Login failed:', error);
		}
	}
	function logout() {
		setAuth({
			user: null,
			token: null,
			authenticated: false,
			role: null,
			isLoggedIn: false,
		});
		storage.clearUserSession();
		storage.clearToken();
	}

	const value: AuthContextProps = {
		auth,
		login,
		logout,
	};
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
