import { LoginForm } from '@/features/auth';
import { MainLayout } from '@/layouts/MainLayout';
import Logo from '/RGS-logo.png';

export const Login = () => {
	return (
		<MainLayout>
			<div className="mx-auto flex w-full flex-col justify-center space-y-10">
				<div className="flex flex-col space-y-2 text-center">
					<img src={Logo} alt="RGS Logo" className="mx-auto h-24 w-24" />
				</div>
				<LoginForm />
				<p className="text-muted-foreground px-8 text-center text-sm font-medium">
					Contact administration if you have any issues logging in
				</p>
			</div>
			{/* <LoginForm /> */}
		</MainLayout>
	);
};
