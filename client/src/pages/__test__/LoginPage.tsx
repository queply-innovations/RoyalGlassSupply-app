import { LoginForm } from '@/features/auth';
import { MainLayout } from '@/layouts/MainLayout';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
	// const navigate = useNavigate();

	return (
		<MainLayout>
			<LoginForm
				// onSuccess={() => {
				// 	navigate('/dashboard');
				// }}
			/>
		</MainLayout>
	);
};
