import React, { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import { Button, Loading } from '@/components';
import { useNavigate } from 'react-router-dom';

export const LoginTest = () => {
	const navigate = useNavigate();

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
					<LoginForm />

					<Button onClick={() => navigate('/dashboard')}>Login</Button>
				</div>
			</div>
		</>
	);
};
