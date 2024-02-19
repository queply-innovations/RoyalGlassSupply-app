import { Spinner } from '@/components/Loader';
import { Loading } from '@/components/Loading';
import { ProgressBar } from '@/components/ProgressBar';
// import { AuthProvider } from '@/context/__test__AuthContext';
import { AuthProvider } from '@/context/AuthContext';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, Suspense, useEffect, useState } from 'react';
import { HashRouter } from 'react-router-dom';

interface AppProviderProps {
	children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
	const queryClient = new QueryClient();
	const [completed, setCompleted] = useState(0);
	// const [progress, setProgress] = useState(0);

	// useEffect(() => {
	// 	setInterval(() => setCompleted(completed + 10), 500);
	// 	//setCompleted((completed) => (completed < 100 ? completed + 2 : completed));
	// }, []);

	return (
		<Suspense
			fallback={
				<div className="flex h-screen w-full flex-col items-center justify-center space-y-0 px-20">
					{/* <Spinner size="xl" /> */}
					{/* <Loading /> */}
					<ProgressBar />
					<h2 className="text-primary-dark-gray text-2xl font-bold">
						Loading Dashboard....
					</h2>
				</div>
			}
		>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<HashRouter>{children}</HashRouter>
				</AuthProvider>
			</QueryClientProvider>
		</Suspense>
	);
};
