import { AppProvider } from './provider/app';
import AppRoutes from './routes';

function App() {
	return (
		<AppProvider>
			<AppRoutes />
		</AppProvider>
	);
}

export default App;
