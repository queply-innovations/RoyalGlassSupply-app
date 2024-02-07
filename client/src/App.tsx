import { AppProvider } from './provider/app';
import AppRoutes from './routes';
import AppRouter from './routes/root';

function App() {
	return (
		<AppProvider>
			{/* <AppRoutes /> */}
			<AppRouter />
		</AppProvider>
	);
}

export default App;
