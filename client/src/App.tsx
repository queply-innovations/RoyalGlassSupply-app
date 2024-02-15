import { AppProvider } from './provider/app';
// import AppRoutes from './routes';
import AppRouter from './routes/root';
import { TestRoute } from './routes/testRoute';

function App() {
	return (
		<AppProvider>
			{/* <AppRoutes /> */}
			{/* Error in protectedRoutes in routes/index.tsx */}

			{/* <AppRouter /> */}
			{/* uncomment this to preview the app routes */}

			{/*
            uncomment this to preview the app routes
            */}
			{/* <AppRouter /> */}

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
