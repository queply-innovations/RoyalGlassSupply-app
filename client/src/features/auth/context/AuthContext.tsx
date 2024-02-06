import { LoginCredentials, LoginUser } from '@/features/auth';
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
	user: object | null;
	login(user: object): Promise<void>;
	logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<object | null>(null);

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
			setUser(response.user);
			storage.setUserSession(JSON.stringify(response.user.position));
			storage.setToken(response.token);
		} catch (error) {
			console.log('Login failed:', error);
			throw error;
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
