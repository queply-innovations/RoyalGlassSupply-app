import { AppProvider } from './provider/app';
// import AppRoutes from './routes';
import AppRouter from './routes/root';
// import { TestRoute } from './routes/testRoute';
import { ToastContainer, toast } from 'react-toastify';
import useNetwork from './useNetwork';
import { useEffect } from 'react';

function App() {
	const networkState = useNetwork();
	const { online } = networkState;
	
	useEffect(() => {
		toast.dismiss();
		if (online) {
			toast.success('You are currently online!', { autoClose: 3000, closeButton: false });
		} 
		else {
			toast.error('You are currently offline.', {
				autoClose: false,
				closeButton: false,
			});
		}
	}, [online]);

	return (
		<AppProvider>
			{/* uncomment this to preview the app routes*/}
			<AppRouter />
			{/* //! PANG TEST LANG NI */}
			{/* <TestRoute /> */}
			<ToastContainer />
		</AppProvider>
	);
}

export default App;
