import { ReactNode } from 'react';
import { Navbar } from '@/components';
import useNetwork from '@/useNetwork';

interface CommonLayoutProps {
	children: ReactNode;
	title: string;
}

export const CommonLayout = ({ children, title }: CommonLayoutProps) => {
	const networkState = useNetwork();
	const { online } = networkState;

	return (
		<>
			<div className="flex h-full max-h-[calc(100%-40px)] flex-1 flex-col gap-y-4">
				<div className="flex flex-initial flex-row justify-between">
					<h1 className="text-primary-dark-gray self-center text-3xl font-bold">
						{title}
					</h1>
					<Navbar />
				</div>
				<div className="h-full max-h-[calc(100%-4rem)] flex-auto">
					{children}
				</div>
			</div>
		</>
	);
};
