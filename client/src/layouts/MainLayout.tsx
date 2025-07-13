import Sidebar from '@/components/Sidebar/__test__/Sidebar';
import { useAuth } from '@/context/AuthContext';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { CommonLayout } from './CommonLayout';
import Logo from '/RGS-logo.png';
import Sidebg from '@/assets/images/Sidebg.png';
import { LoginForm } from '@/features/auth';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { API_BASE_URL, API_URLS } from '@/api';
import useNetwork from '@/useNetwork';
import { set } from 'react-hook-form';

interface MainLayoutProps {
	children: ReactNode;
	title?: string;
}

export const MainLayout = ({ children, title }: MainLayoutProps) => {
	const auth = useAuth();
	const networkState = useNetwork();
	const { online } = networkState;

	return (
		<>
			{!auth.auth.authenticated && (
				<>
					{/* // <ToastContainer position="bottom-right" className="text-2xl" /> */}
				</>
			)}
			{auth.auth.authenticated ? ( //checks if logged in
				<div className="flex h-screen w-screen">
					<Sidebar />
					<div className="flex max-h-full flex-auto flex-col p-5">
						<CommonLayout title={title!}>{children}</CommonLayout>
						<div className="mt-auto flex flex-shrink-0 flex-grow-0 flex-row items-center justify-end gap-3 pt-4 text-sm font-medium text-slate-700">
							<div
								className={`h-3 w-3 rounded-full ${online ? 'bg-green-500' : 'bg-gray-500'}`}
							>
								<div
									className={`h-3 w-3 rounded-full ${online ? 'animate-ping bg-green-500' : 'bg-gray-500'}`}
								></div>
							</div>
							{online
								? "You're currently online"
								: "You're currently offline"}
						</div>
					</div>
				</div>
			) : (
				// if not logged in, return loginlayout
				<div className="flex h-screen w-screen items-center justify-center bg-slate-50 p-6">
					<div className="flex h-full max-h-[896px] w-full max-w-[1280px] flex-row gap-4 overflow-clip rounded-lg border-[0.5px] bg-white shadow-lg">
						<div className="flex basis-1/2 flex-row justify-start">
							{children}
						</div>
						<div
							className="relative flex h-full basis-1/2 flex-col justify-end p-8 pb-12"
							style={{
								backgroundImage: `url(${Sidebg})`,
								backgroundSize: `cover`,
								backgroundRepeat: `no-repeat`,
								backgroundPosition: `center center`,
							}}
						>
							<div className="absolute left-0 top-0 z-0 h-full w-full bg-gradient-to-t from-black/20 via-black/0 to-black/0"></div>
							<blockquote className="z-10 items-end space-y-4 text-white">
								<p
									className="text-6xl font-semibold tracking-tight"
									style={{ zIndex: 2 }}
								>
									Welcome back!
								</p>
								<p
									className="text-xl font-normal"
									style={{ zIndex: 2 }}
								>
									The faster you log in, the faster we get to work
								</p>
							</blockquote>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
