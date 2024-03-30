import { AppProvider } from './provider/app';
// import AppRoutes from './routes';
import AppRouter from './routes/root';
// import { TestRoute } from './routes/testRoute';
import { ToastContainer } from 'react-toastify';

function App() {
	return (
		<AppProvider>
			{/* uncomment this to preview the app routes*/}
			<AppRouter />
			{/* //! PANG TEST LANG NI */}
			{/* <TestRoute /> */}
			<ToastContainer/>
		</AppProvider>
	);
}

export default App;
