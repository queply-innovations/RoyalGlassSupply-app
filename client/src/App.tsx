import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import RoutesWrapper from '@utils/Routes';

const queryClient = new QueryClient();

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<RoutesWrapper />
				<ReactQueryDevtools />
			</QueryClientProvider>
		</>
	);
}

export default App;
