import { Spinner } from '@/components/Loader';
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
				<div className="flex h-screen w-screen items-center justify-center">
					<Spinner size="xl" />
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
