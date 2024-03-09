import { Navbar } from '@/components';
import Sidebar from '@/components/Sidebar/__test__/Sidebar';
import { useAuth } from '@/context/AuthContext';
import { ReactNode } from 'react';
import { CommonLayout } from './CommonLayout';
import Logo from '/RGS-logo.png';

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
						<div className="flex flex-col items-center gap-5 rounded-md border-[0.5px] bg-white px-16 py-5 shadow-md">
							<div>
								<img src={Logo} alt="RGS Logo" className="h-20 w-20" />
							</div>
							<div className="text-3xl font-bold">
								Royal Glass Supply
							</div>
							{children}
						</div>
					</div>
				</>
			)}
		</>
	);
};
