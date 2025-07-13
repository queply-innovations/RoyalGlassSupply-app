/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginCredentials, LoginUser } from '@/features/auth/api/Login';
import {
	User,
	UserResponse,
	getUserAssignedAt,
	getUserRole,
	getUserRolePermissions,
} from '@/features/auth';
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import storage from '@/utils/storage';
import { RolePermissions } from '@/features/userinfo/types';
import { fetchRolePermissions } from '@/api/RolePermissions/RolePermissions';

interface AuthProps {
	user: User;
	authenticated: boolean | null;
	id: number;
	role: string | null;
	token: string | null;
	username: number | null;
	rolePermissions: RolePermissions[];
	assignedAt: number;
}
interface AuthContextProps {
	auth: AuthProps;
	login(
		credentials: LoginCredentials,
		updateProgress: any,
	): Promise<UserResponse>;
	logout(): void;
	permissionListNames: string[] | undefined;
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
		const updatePermissions = async () => {
			try {
				const userRole = await getUserRole(auth.user.id);
				const roleDetails = await getUserRolePermissions(userRole.id);
				setAuth((prev: any) => ({
					...prev,
					rolePermissions: roleDetails,
				}));
			} catch (error) {
				console.error('Error fetching role permissions:', error);
			}
		};

		if (auth.user) {
			updatePermissions();
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('auth', JSON.stringify(auth));
	}, [auth]);

	async function login(
		credentials: LoginCredentials,
		updateProgress: any,
	): Promise<UserResponse> {
		try {
			// Log user in using credentials
			const response = await LoginUser(credentials);
			if (response) {
				// Set user token
				storage.setToken(response.token);
				// Get user role and store to local storage
				const userRole = await getUserRole(
					response.user.id,
					updateProgress,
				);
				if (userRole) {
					storage.setUserRole(userRole.title);
				}

				const roleDetails = await getUserRolePermissions(userRole.id);
				// const assignedAt = await getUserAssignedAt(userRole.id);

				//TODO IMPORTANT: get assigned_at from user_warehouse table, verify when data is filled

				setAuth({
					user: {
						id: response.user.id,
						firstname: response.user.firstname,
						lastname: response.user.lastname,
					},
					token: response.token,
					authenticated: true,
					role: userRole.title,
					rolePermissions: roleDetails,
					// assignedAt: assignedAt ? assignedAt[0].warehouse_id : 0,
				} as AuthProps);
			}
			return response;
		} catch (error: any) {
			throw new Error(error);
		}
	}

	const permissionListNames = useMemo(() => {
		//@ts-expect-error WOW
		return auth.rolePermissions?.map(permission => {
			return permission.permission.title;
		});
	}, [auth]);

	// Nullify user data and clear local storage
	function logout() {
		setAuth({
			user: null,
			token: null,
			authenticated: false,
			role: null,
			isLoggedIn: false,
			rolePermissions: null,
		});
		storage.clearUserSession();
		storage.clearLogIn();
	}

	const value: AuthContextProps = {
		auth,
		login,
		logout,
		permissionListNames,
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
