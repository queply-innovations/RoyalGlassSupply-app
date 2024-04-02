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

	useEffect(() => {
		toast.dismiss();
		toast.loading('Checking internet connection....', { autoClose: 5000 });
		setTimeout(() => {
			toast.dismiss();
			if (online) {
				toast.success('You are currently online!', { autoClose: 5000 });
			} else {
				toast.error('You are currently offline.', {
					autoClose: false,
					closeButton: false,
				});
			}
		}, 5500);
	}, [online]);

	return (
		<>
			{!auth.auth.authenticated && (
				<ToastContainer position="bottom-right" className="text-2xl" />
			)}
			{auth.auth.authenticated ? ( //checks if logged in
				<div className="flex h-screen w-screen">
					<Sidebar />
					<div className="flex max-h-full flex-auto flex-col overflow-hidden p-5">
						<CommonLayout title={title!}>{children}</CommonLayout>
						<div className="mt-auto flex flex-shrink-0 flex-grow-0 flex-row items-center justify-end gap-3 pt-4 text-base text-slate-700">
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
				<div className="flex h-screen w-screen items-center justify-center">
					<div className="flex flex-row rounded-lg border-[0.5px] bg-white shadow-md">
						<div className="flex flex-row justify-start">{children}</div>
						<div className="relative row-span-6 flex h-max flex-col justify-end">
							<div
								className="rounded-lg"
								style={{
									backgroundImage: `url(${Sidebg})`,
									backgroundSize: `cover`,
									backgroundRepeat: `no-repeat`,
									width: `680px`,
									maxHeight: `80vh`,
									paddingTop: `100%`,
								}}
							>
								<blockquote className="ml-12 items-end space-y-4 text-white">
									<p
										className="text-6xl font-bold"
										style={{ zIndex: 2 }}
									>
										Welcome back!
									</p>
									<p
										className="text-2xl font-medium"
										style={{ zIndex: 2 }}
									>
										The faster you log in, the faster we get to work
									</p>
								</blockquote>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
