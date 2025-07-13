import { ProgressBar } from '@/components/ProgressBar';
import { AuthProvider } from '@/context/AuthContext';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, Suspense } from 'react';
import { HashRouter } from 'react-router-dom';

interface AppProviderProps {
	children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
	const queryClient = new QueryClient();

	return (
		<Suspense
			fallback={
				<div className="flex h-screen w-full flex-col items-center justify-center space-y-0 px-20">
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
