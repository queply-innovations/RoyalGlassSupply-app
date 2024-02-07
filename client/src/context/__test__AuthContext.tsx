import { LoginCredentials, LoginUser, User } from '@/features/auth';
import storage from '@/utils/storage';
import {
	ReactNode,
	createContext,
	useEffect,
	useState,
	useContext,
} from 'react';

interface AuthContextData {
	isSignedIn: boolean;
	user: User | null;
	login(user: User): Promise<void>;
	logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const storagedUser = storage.getUserSession();
		const storagedToken = storage.getToken();

		if (storagedToken && storagedUser) {
			setUser(JSON.parse(storagedUser));
		}
	}, []);

	async function login(credentials: LoginCredentials) {
		try {
			const response = await LoginUser(credentials);
			console.log('response:', response);
			setUser(response.user);
			storage.setUserSession(JSON.stringify(response.user.position));
			storage.setToken(response.token);
		} catch (error) {
			console.error('Login failed:', error);
		}
	}

	function logout() {
		setUser(null);
		storage.clearToken();
		storage.clearUserSession();
	}
	const value: AuthContextData = {
		isSignedIn: Boolean(user),
		user,
		login,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
	const context = useContext(AuthContext);

	return context;
}
