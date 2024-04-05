import { NavIcons } from './NavIcons';
import { HiUser } from 'react-icons/hi2';
import { GoHomeFill } from 'react-icons/go';
import { IoNotifications } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { Inputbox } from '../Inputbox';
import { Button } from '..';
import { useAuth } from '@/context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { useInventoryQuery } from '@/features/inventory/hooks';
import { useTransferQuery } from '@/features/transfer/hooks';
import { useProductPricesQuery } from '@/features/product/__test__/hooks';

export const Navbar = () => {
	const { logout } = useAuth();

	const { data: productPrices, isLoading } = useProductPricesQuery();
	const { transfers, transferProducts, isFetching, progress } = useTransferQuery();

	const pendingProductPrices = productPrices.filter((prodPrice) => prodPrice.approval_status === 'pending');
	const pendingTransfers = transfers.filter((transfer) => transfer.approval_status === 'pending');

	const numberNotif = pendingProductPrices.length + pendingTransfers.length;

	return (
		// <div className="navbar-container flex flex-row items-end place-content-end justify-between">
			<div className="nav-icon flex flex-row items-end justify-end gap-x-5">
				<Link to="/dashboard">
					<NavIcons
						icon={
							<GoHomeFill className="text-primary-dark-gray text-xl" />
						}
						title={'Home'}
					/>
				</Link>
				{/* <Link> */}
				
				<NavIcons
					icon={
						<IoNotifications className="text-primary-dark-gray text-xl" />
					}
					title={'Notifications'}
					dropdown={true}
					pendingProdPrices={pendingProductPrices}
					pendingTransfers={pendingTransfers}
				/>

				<div className={`absolute w-5 h-5 top-5 right-6 rounded-full bg-red-500 mr-2 text-white font-bold`}>
					<div className={`w-5 h-5 top-5 right-5 rounded-full bg-red-500 ${numberNotif !== 0 && 'animate-ping'} mr-2`}></div>
					<p className="absolute left-1.5 -bottom-0.5">{numberNotif}</p>
				</div>
				{/* </Link> */}
			</div>
		// </div>
	);
};
