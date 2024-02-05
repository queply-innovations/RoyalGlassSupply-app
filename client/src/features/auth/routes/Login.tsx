import { useNavigate } from 'react-router-dom';

import { Layout } from '../components/Layout';
import { LoginForm } from '../components/LoginForm';
import storage from '@/utils/storage';

export const Login = () => {
	const navigate = useNavigate();
	const loggedIn = storage.getLogIn();
	console.log('loggedIn:', loggedIn);
	return (
		<Layout>
			<LoginForm
				onSuccess={() => {
					if (loggedIn === true) {
						navigate('/app/dashboard');
					}
				}}
			/>
		</Layout>
	);
};
