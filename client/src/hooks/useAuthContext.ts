import React, { ReactNode, createContext, useContext, useState } from 'react';

import { User } from '../entities/User';

export const AuthContext = createContext<User | undefined>(undefined);

export function useAuthContext() {
	const auth = useContext(AuthContext);

	if (auth === undefined) {
		throw new Error('useAuthContext must be used within a AuthProvider');
	}
	return auth;
}
