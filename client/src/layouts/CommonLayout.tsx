import { ReactNode } from 'react';

interface CommonLayoutProps {
	children: ReactNode;
	title: string;
}

export const CommonLayout = ({ children, title }: CommonLayoutProps) => {
	return (
		<>
			<div className="flex h-screen flex-col gap-y-4">
				<h1 className="text-primary-dark-gray text-3xl font-bold">
					{title}
				</h1>
				{children}
			</div>
		</>
	);
};
