import { useNavigate } from 'react-router-dom';

import { Layout } from '../components/Layout';
import { LoginForm } from '../components/LoginForm';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

export const Login = () => {
	const navigate = useNavigate();
	const auth = useAuth();

	useEffect(() => {
		if (auth.role === 'super_admin') {
			navigate('/app/dashboard');
		}
		if (auth.role === 'admin') {
			navigate('/app/dashboard');
		}
		if (auth.role === 'manager') {
			navigate('/app/dashboard');
		}
		if (auth.role === 'encoder') {
			navigate('/app/dashboard');
		}
		if (auth.role === 'sales_person') {
			navigate('/app/dashboard');
		}
	}, [auth.role, navigate]);

	return (
		<Layout>
			<LoginForm onSuccess={() => navigate('/app/dashboard')} />
		</Layout>
	);
};
