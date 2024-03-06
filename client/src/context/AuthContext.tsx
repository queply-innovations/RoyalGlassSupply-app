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
	login(credentials: LoginCredentials, updateProgress: any): Promise<UserResponse>;
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

	async function login(credentials: LoginCredentials, updateProgress: any): Promise<UserResponse> {
		try {
			// Log user in using credentials
			const response = await LoginUser(credentials);
			if (response) {
				// Set user token
				storage.setToken(response.token);
				// Get user role and store to local storage
				const userRole = await getUserRole(response.user.id, updateProgress);
				if (userRole) {
					storage.setUserRole(userRole);
				}

				setAuth({
					username: response.user.username,
					user: response.user.id,
					token: response.token,
					authenticated: true,
					role: userRole,
				});
			}
			return response;
		} catch (error: any) {
			throw new Error(error);
		}
	}

	// Nullify user data and clear local storage
	function logout() {
		setAuth({
			user: null,
			token: null,
			authenticated: false,
			role: null,
			isLoggedIn: false,
		});
		storage.clearUserSession();
		storage.clearLogIn();
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
