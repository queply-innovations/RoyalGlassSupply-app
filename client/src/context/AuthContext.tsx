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
	const [auth, setAuth] = useState(() => {
		return JSON.parse(localStorage.getItem('auth') || '{}');
	});

	useEffect(() => {
		localStorage.setItem('auth', JSON.stringify(auth));
	}, [auth]);

	console.log('LOCAL-STORAGE AUTH', localStorage.getItem('auth'));
	console.log('AUTH:', JSON.parse(localStorage.getItem('auth') || '{}'));

	async function login(credentials: LoginCredentials) {
		try {
			const userResponse = await LoginUser(credentials);
			if (userResponse) {
				//TODO 1 get user role
				// const userRole = await getUserRole(userResponse.user.id);
				// console.log('USER-ROLE:', userRole);
				setAuth({
					user: userResponse.user.id,
					token: userResponse.token,
					authenticated: true,
					//TODO 2 user role
					// role: userRole.title,
				});
			} //TODO 3 catch server errors

			// console.log('userResponse:', userResponse);
			// setAuth({
			// 	user: userResponse.user.id,
			// 	token: userResponse.token,
			// 	authenticated: true,
			// 	role: null,
			// 	isLoggedIn: true,
			// });
			// storage.setToken(userResponse.token);

			// const userRole = await getUserRole(userResponse.user.id);
			// console.log('userRole:', userRole);

			// if (userRole) {
			// 	setAuth({
			// 		...auth,
			// 		role: userRole.title,
			// 		isLoggedIn: storage.setLogIn(),
			// 	});
			// 	storage.setUserSession(`${userRole.title} | ${userResponse.token}`);
			// 	storage.setToken(userResponse.token);
			// }
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
