import { User } from '@/entities/User';
import React, { ReactNode, createContext, useState } from 'react';

interface AuthProviderProps {
	children: ReactNode;
}

interface AuthContextProps {
	authenticated: boolean;
	setAuthenticated: (newState: boolean) => void;
}

const initialValue = {
	authenticated: false,
	setAuthenticated: () => {},
};

const AuthContext = createContext<AuthContextProps>(initialValue);

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [authenticated, setAuthenticated] = useState(false);

	return (
		<AuthContext.Provider value={{ authenticated, setAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
