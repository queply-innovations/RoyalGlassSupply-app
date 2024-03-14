import { Navbar } from '@/components';
import Sidebar from '@/components/Sidebar/__test__/Sidebar';
import { useAuth } from '@/context/AuthContext';
import { ReactNode } from 'react';
import { CommonLayout } from './CommonLayout';
import Logo from '/RGS-logo.png';
import Sidebg from '@/assets/images/Sidebg.png';
import { LoginForm } from '@/features/auth';

interface MainLayoutProps {
	children: ReactNode;
	title?: string;
}

export const MainLayout = ({ children, title }: MainLayoutProps) => {
	const auth = useAuth();
	return (
		<>
			{auth.auth.authenticated ? ( //checks if logged in
				<>
					<div className="flex h-screen w-screen overflow-hidden">
						<Sidebar />
						<div className="flex h-screen max-h-screen flex-auto flex-col p-5">
							<Navbar />
							<CommonLayout title={title!}>{children}</CommonLayout>
						</div>
					</div>
				</>
			) : (
				// if not logged in, return loginlayout
				<>
					<div className="flex h-screen w-screen items-center justify-center">
						<div className="flex flex-row rounded-lg border-[0.5px] bg-white shadow-md">
							<div className="flex flex-row justify-start">
								{children}
							</div>
							<div className="relative h-max flex flex-col row-span-6 justify-end">
									<div className="rounded-lg" style={{
										backgroundImage: `url(${Sidebg})`,
										backgroundSize: `cover`,
										backgroundRepeat: `no-repeat`,
										width: `680px`,
										height: `960px`,
										paddingTop: `100%`,
									}}>
										<blockquote className="space-y-4 ml-12 pt-28 items-end text-white">
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
				</>
			)}
		</>
	);
};
