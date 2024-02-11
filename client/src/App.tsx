import { AppProvider } from './provider/app';
// import AppRoutes from './routes';
// import AppRouter from './routes/root';
import { TestRoute } from './routes/testRoute';

function App() {
	return (
		<AppProvider>
			{/* <AppRoutes /> */}

			{/*
            <AppRouter />
            uncomment this to preview the app routes
            */}

			{/*
            added testroutes to bypass auth
            since auto refresh ang auth kung naa changes
            source file

            //! PANG TEST LANG NI
            */}
			<TestRoute />
		</AppProvider>
	);
}

export default App;
