import { useLocation, useNavigate } from 'react-router-dom';

import { Layout } from '../components/Layout';
import { LoginForm } from '../components/LoginForm';
// import storage from '@/utils/storage';
// import { useAuth } from '@/context/__test__AuthContext';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

export const Login = () => {
	const navigate = useNavigate();
	const { auth, logout } = useAuth();
	// logout;
	// const location = useLocation();
	// useEffect(() => {
	// console.log('location:', location);
	// 	console.log('user:', auth.user);
	// }, [auth, location]);

	return (
		<Layout>
			<LoginForm
				onSuccess={() => {
					navigate('/app/dashboard');
				}}
			/>
		</Layout>
	);
};
