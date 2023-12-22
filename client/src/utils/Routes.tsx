import Login from '@pages/Login';
import { HashRouter, Route, Routes } from 'react-router-dom';

export const RoutesWrapper = () => {
	return (
		<>
			<HashRouter>
				<Routes>
					<Route path="/" element={<Login />} />
				</Routes>
			</HashRouter>
		</>
	);
};

export default RoutesWrapper;
