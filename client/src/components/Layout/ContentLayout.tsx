import { ReactNode } from 'react';

interface ContentLayoutProps {
	children?: ReactNode;
	title: string;
}

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
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
