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
				toast.error('You are currently offline.', { autoClose: false, closeButton: false });
			}
		}, 5500);
		
	}, [online]);

	return (
		<>
			{ !auth.auth.authenticated && (<ToastContainer position="bottom-right" className="text-2xl" />) }
			{auth.auth.authenticated ? ( //checks if logged in
				<div className="flex h-screen w-screen overflow-hidden">
					<Sidebar />
					<div className="flex h-screen max-h-screen flex-auto flex-col p-5">
						<CommonLayout title={title!}>
							{children}
							<div className="flex flex-row justify-end text-sm pt-4">
								<div className={`w-4 h-4 rounded-full ${online ? 'bg-green-500' : 'bg-gray-500'} mr-2`}>
									<div className={`w-4 h-4 rounded-full ${online ? 'bg-green-500 animate-ping' : 'bg-gray-500'} mr-2`}>
									</div>
								</div>
								{online ? "You're currently online" : "You're currently offline"}
							</div>
						</CommonLayout>
					</div>
				</div>
			) : (
				// if not logged in, return loginlayout
				<div className="flex h-screen w-screen items-center justify-center align-center">
					<div className="flex flex-row rounded-lg border-[0.5px] bg-white shadow-md max-h-[80vh]">
						<div className="flex flex-row justify-start">
							{children}
						</div>
						<div className="relative h-max flex flex-col row-span-6 justify-end">
								<div className="rounded-lg" style={{
									backgroundImage: `url(${Sidebg})`,
									backgroundSize: `cover`,
									backgroundRepeat: `no-repeat`,
									width: `680px`,
									maxHeight: `80vh`,
									paddingTop: `100%`,
								}}>
									<blockquote className="space-y-4 ml-12 mb-4 items-end text-white">
										<p className="text-6xl font-bold" style={{zIndex: 2}}>
											Welcome back!
										</p>
										<p className="text-2xl font-medium" style={{zIndex: 2}}>
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
