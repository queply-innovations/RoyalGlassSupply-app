import { ReactNode, createContext, useContext } from 'react';
import { User } from '../types';
import { useUserInfoQuery } from '../hooks';

interface UserInfoContextProps {
	users: User[];
	isFetching: boolean;
	progress: any;
}

export const UserInfoContext = createContext<UserInfoContextProps | undefined>(
	undefined,
);

interface UserInfoProviderProps {
	children: ReactNode;
}

export const UserInfoProvider = ({ children }: UserInfoProviderProps) => {
	const { users, isFetching, progress } = useUserInfoQuery();

	const value = { users, isFetching, progress };

	return (
		<UserInfoContext.Provider value={value}>
			{children}
		</UserInfoContext.Provider>
	);
};

export function useUserInfo() {
	const context = useContext(UserInfoContext);

	if (!context) {
		throw new Error(
			'useUserInfoContext must be used within UserInfoContext',
		);
	}
	return context;
}
