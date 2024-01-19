import { Button, Form, Inputbox } from '@/components';
import { Link } from 'react-router-dom';

export const Login = () => {
	return (
		<>
			<div className="flex h-screen w-screen items-center justify-center">
				<div className="flex flex-col items-center gap-5 rounded-md border-[0.5px] bg-white px-16 py-5 shadow-md">
					<div>
						<img
							src="/RGS-logo.png"
							alt="RGS Logo"
							className="h-20 w-20"
						/>
					</div>
					<div className="text-3xl font-bold">Royal Glass Supply</div>
					<Form>
						<Inputbox placeholder={'Username'} required />
						<Inputbox placeholder={'Password'} type="password" required />
						<Button className="w-1/2" fill={'green'} type="submit">
							Login
						</Button>
					</Form>
					<Link to="/Dashboard">
						<Button>Register</Button>
					</Link>
				</div>
			</div>
		</>
	);
};
