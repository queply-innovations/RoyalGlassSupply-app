import Dashboard from '@/pages/Dashboard';
import Page404 from '@/pages/Page404';
import Transfer from '@/pages/Transfer';
import { UserInfo } from '@/pages/User/UserInfo';
import { UserSales } from '@/pages/User/UserSales';
import Warehouse from '@/pages/Warehouse';
import Login from '@pages/Login';
import { HashRouter, Route, Routes } from 'react-router-dom';

export const RoutesWrapper = () => {
	return (
		<>
			<HashRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="*" element={<Page404 />} />
					<Route path="/Dashboard" element={<Dashboard />} />
					<Route path="/user/information" element={<UserInfo />} />
					<Route path="/user/sales" element={<UserSales />} />
					<Route path="/Warehouse" element={<Warehouse />} />
					<Route path="/transfer" element={<Transfer />} />
				</Routes>
			</HashRouter>
		</>
	);
};

export default RoutesWrapper;
