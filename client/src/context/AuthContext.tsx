import { LoginCredentials, LoginUser } from '@/features/auth/api/Login';
import { UserResponse, getUserRole } from '@/features/auth';
import { ReactNode, createContext, useContext, useState } from 'react';

interface AuthContextProps {
	user: number | null;
	token: string | null;
	authenticated: boolean | null;
	role: string | null;
	login: (credentials: LoginCredentials) => Promise<UserResponse | null>;
}

interface AuthProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [auth, setAuth] = useState<AuthContextProps>({
		user: null,
		token: null,
		authenticated: false,
		role: null,
		login: async (credentials: LoginCredentials) => {
			try {
				const userResponse = await LoginUser(credentials);

				if (!userResponse) {
					console.error('Login failed: userResponse is undefined');
					return null;
				}

				const userRole = await getUserRole(userResponse.user.id);

				console.log('userRole:', userRole);

				if (userRole) {
					setAuth(prev => {
						const newAuth = {
							...prev,
							user: userResponse.user.id,
							token: userResponse.token,
							authenticated: true,
							role: userRole.title,
						};
						console.log('LOGGED IN:', newAuth);
						return newAuth;
					});
				}

				return userResponse;
			} catch (error) {
				console.error('Login failed:', error);
				return null;
			}
		},
	});

	const value: AuthContextProps = {
		...auth,
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
