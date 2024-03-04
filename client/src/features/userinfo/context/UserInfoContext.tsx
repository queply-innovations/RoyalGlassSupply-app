import { ReactNode, createContext, useContext, useState } from 'react';
import { Roles, User } from '../types';
import { useUserInfoQuery } from '../hooks';
import { getRoles } from '../api/UserInfo';

interface UserInfoContextProps {
	users: User[];
	isFetching: boolean;
	progress: any;
	selectedUser: User;
	setSelectedUser: (user: User) => void;
	roles: Roles[];
}

export const UserInfoContext = createContext<UserInfoContextProps | undefined>(
	undefined,
);

interface UserInfoProviderProps {
	children: ReactNode;
}

export const UserInfoProvider = ({ children }: UserInfoProviderProps) => {
	const [selectedUser, setSelectedUser] =
		useState<User>({} as User);

	const { users, isFetching, progress, roles } = useUserInfoQuery();

	const value = { users, isFetching, progress, selectedUser, setSelectedUser, roles};

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
