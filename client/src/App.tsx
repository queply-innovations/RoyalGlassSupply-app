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
		toast.loading('Checking internet connection....', { autoClose: 2000 });
		setTimeout(() => {
			toast.dismiss();
			if (online) {
				toast.success('You are currently online!', { autoClose: 5000 });
			} else {
				toast.error('You are currently offline.', {
					autoClose: false,
					closeButton: false,
				});
			}
		}, 2500);
	}, [online]);

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
