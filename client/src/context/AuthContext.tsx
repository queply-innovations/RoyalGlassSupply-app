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
import { User } from '@/features/auth/types';

interface AuthProps {
	user: User;
	authenticated: boolean | null;
	id: number;
	role: string | null;
	token: string | null;
	username: number | null;
}
interface AuthContextProps {
	auth: AuthProps;
	login(credentials: LoginCredentials): Promise<UserResponse>;
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

	async function login(credentials: LoginCredentials): Promise<UserResponse> {
		try {
			// Log user in using credentials
			const response = await LoginUser(credentials);
			if (response) {
				// Set user token
				storage.setToken(response.token);
				// Get user role and store to local storage
				const userRole = await getUserRole(response.user.id);
				if (userRole) {
					storage.setUserRole(userRole);
				}

				setAuth({
					user: {
						id: response.user.id,
						firstname: response.user.firstname,
						lastname: response.user.lastname,
					},
					token: response.token,
					authenticated: true,
					role: userRole,
				} as AuthProps);
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
