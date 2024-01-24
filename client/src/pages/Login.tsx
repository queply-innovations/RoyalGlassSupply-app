import { Button, Form, Inputbox } from '@/components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { loginUser, useUserInfo } from '@/api/User';
import { useNavigate } from 'react-router-dom';
import { fetchUserInformation } from '@/api/User/Users';

export const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const { data } = useUserInfo();
	const handleLogin = async () => {
		if (username && password) {
			const data = await loginUser(username, password);
			if (data) {
				console.log(data);
				alert('Welcome, ' + data.datas[0]['firstname'] + '!');
				navigate('/Dashboard', {
					state: {
						warehouseList: data2,
						productList: data3,
					}
				});
			} else {
				alert('Invalid username or password');
			}
		}
	};

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
					<Form
						className="py-6"
						onSubmit={e => {
							e.preventDefault();
						}}
					>
						<Inputbox
							id="username"
							name="username"
							placeholder={'Username'}
							value={username}
							required
							onChange={e => setUsername(e.target.value)}
						/>
						<Inputbox
							id="password"
							name="password"
							placeholder={'Password'}
							type="password"
							value={password}
							required
							onChange={e => setPassword(e.target.value)}
						/>
						<Button
							className="w-1/2"
							fill={'green'}
							onClick={handleLogin}
						>
							{/* This part, specifically. Need i-insert type="button" and delete again to run. */}
							{/* onClick={handleLogin} */}
							Login
						</Button>
					</Form>
<<<<<<< HEAD
=======
					<Link to="/Dashboard">
						<Button>Dashboard</Button>
					</Link>
>>>>>>> ef36e6dc9133ce8cfc252830e8a196712511fe83
					{/* <Link to="/Dashboard">
						<Button>Register</Button>
					</Link> */}
				</div>
			</div>
		</>
	);
};
