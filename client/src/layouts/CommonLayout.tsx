import { ReactNode } from 'react';
import { Navbar } from '@/components';

interface CommonLayoutProps {
	children: ReactNode;
	title: string;
}

export const CommonLayout = ({ children, title }: CommonLayoutProps) => {
	return (
		<>
			<div className="flex h-screen flex-col gap-y-4">
				<div className=" flex flex-row justify-between">
					<h1 className="text-primary-dark-gray text-3xl font-bold self-center">
						{title}
					</h1>
					<Navbar />
				</div>
				{children}
			</div>
		</>
	);
};
