import { fetchUser } from '@/api/User/Users';
import React, { useEffect, useState } from 'react';
import { Login } from '..';
import { loginUser } from '@/api/User/Users';

export const LoginTest = () => {
	const [login, setLogin] = useState({ username: '', password: '' });

	const handleLogin = async () => {
		const token = await loginUser(login.username, login.password);

		if (token) {
			localStorage.setItem('token', token);
		}
	};

	return <div>Login</div>;
};
