import Dashboard from '@/pages/Dashboard';
import { UserInfo } from '@/pages/User/UserInfo';
import Warehouse from '@/pages/Warehouse';
import Login from '@pages/Login';
import { HashRouter, Route, Routes } from 'react-router-dom';

export const RoutesWrapper = () => {
	return (
		<>
			<HashRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/Dashboard" element={<Dashboard />} />
					<Route path="/user/information" element={<UserInfo />} />
					<Route path="/Warehouse" element={<Warehouse />} />
				</Routes>
			</HashRouter>
		</>
	);
};

export default RoutesWrapper;
