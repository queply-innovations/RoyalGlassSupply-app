import { LoginForm } from '@/features/auth';
import { MainLayout } from '@/layouts/MainLayout';
import Logo from '/RGS-logo.png';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

	return (
		<MainLayout>
			<div className="mx-auto flex w-full flex-col justify-center space-y-6">
				<div className="flex flex-col w-[680px] space-y-2 text-center">
					<img src={Logo} alt="RGS Logo" className="w-24 h-24 mx-auto" />
				</div>
				<LoginForm />
				<p className="px-8 text-center text-m text-muted-foreground">
					Contact administration if you have any issues in logging in
				</p>
			</div>
			{/* <LoginForm /> */}
		</MainLayout>
	);
};
