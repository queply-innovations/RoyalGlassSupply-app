import Dashboard from '@/pages/Dashboard';
import Page404 from '@/pages/Page404';
import { PendingInventory } from '@/pages/Pending/PendingInventory';
import { PendingTransfer } from '@/pages/Pending/PendingTransfer';
import { PendingReturn } from '@/pages/Pending/PendingReturn';
import Transfer from '@/pages/Transfer';
import { UserInfo } from '@/pages/User/UserInfo';
import { UserSales } from '@/pages/User/UserSales';
import Warehouse from '@/pages/Warehouse';
import Login from '@pages/Login';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Transaction } from '@/pages/Transactions/Transaction';
import { Expenses } from '@/pages/Transactions/Expenses';
import { Return } from '@pages/Return';
import { Inventory } from '@pages/Inventory';
import { Finance } from '@pages/Finance';
import { Reports } from '@pages/Reports';

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
					<Route
						path="/pending/PendingInventory"
						element={<PendingInventory />}
					/>
					<Route
						path="/pending/PendingReturn"
						element={<PendingReturn />}
					/>
					<Route
						path="/pending/PendingTransfer"
						element={<PendingTransfer />}
					/>
					<Route
						path="/transactions/transaction"
						element={<Transaction />}
					/>
					<Route path="/transactions/expenses" element={<Expenses />} />
					<Route path="/return" element={<Return />} />
					<Route path="/inventory" element={<Inventory />} />
					<Route path="/finance" element={<Finance />} />
					<Route path="/reports" element={<Reports />} />
				</Routes>
			</HashRouter>
		</>
	);
};

export default RoutesWrapper;
