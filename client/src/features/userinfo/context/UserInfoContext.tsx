import { ReactNode, createContext, useContext } from 'react';
import { User } from '../types';
import { useUserInfoQuery } from '../hooks';

export const UserInfoContext = createContext<User[] | undefined>(
	undefined,
);

interface UserInfoProviderProps {
	children: ReactNode;
}

export const UserInfoProvider = ({ children }: UserInfoProviderProps) => {
	const { users } = useUserInfoQuery();

	return (
		<UserInfoContext.Provider value={users}>
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
