import { Button } from '@/components/Button';
import { Form } from '@/components/Form';
import { Inputbox } from '@/components/Inputbox';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { loginUser } from '@/utils/api/User';
import { useNavigate } from "react-router-dom";

const Login = () => {

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async () => {
		//For some reason, this function and/or the button breaks after launching for the first time.
		if (username && password){
			const data = await loginUser(username, password);
			if (data){
				// console.log(data.datas[0]["first_name"]); 
				//Also for some reason, above line is marked as an error. Working tho.
				alert("Welcome, " + data.datas[0]["first_name"] + "!");
				navigate("/Dashboard");
			} else {
				alert("Invalid username or password");
			}
		}
		// console.log(data);

		// if (data != null){
		// 	alert("Welcome!");
		// 	navigate("/Dashboard");
		// }
		// else if (data == null) {
		// 	alert("Invalid username or password");
		// }
	}

	// const handleLogin = getUserInfo(username, password);

	// const { data } = getUserInfo(username, password);
	// console.log(handleLogin.result);

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
					<Form className="py-6">
						<Inputbox 
							id="username" 
							name="username"
							placeholder={'Username'} 
							value={username}
							required 
							onChange={(e) => setUsername(e.target.value)} 
						/>
						<Inputbox 
							id="password"
							name="password"
							placeholder={'Password'} 
							type="password"
							value={password} 
							required 
							onChange={(e) => setPassword(e.target.value)} 
						/>
						<Button className="w-1/2" fill={'green'} onClick={handleLogin}> 
						{/* onClick={handleLogin} */}
							Login
						</Button>
					</Form>
					{/* <Link to="/Dashboard">
						<Button>Register</Button>
					</Link> */}
				</div>
			</div>
		</>
	);
};

export default Login;
