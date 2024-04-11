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
import { usePendingTransfersQuery, useTransferQuery } from '@/features/transfer/hooks';
import { usePendingProductPricesQuery, useProductPricesQuery } from '@/features/product/__test__/hooks';
import { usePendingReturnQuery, useReturnQuery } from '@/features/pending/pending-return/hooks';

export const Navbar = () => {
	const { logout } = useAuth();

	const { data: productPrices, isLoading } = usePendingProductPricesQuery();
	const { transfers, isFetching } =
		usePendingTransfersQuery();
	const { returns, isFetching: isFetching2 } = usePendingReturnQuery();

	const allIsFetching = isLoading && isFetching && isFetching2;

	const pendingProductPrices = productPrices.filter(
		prodPrice => prodPrice.approval_status === 'pending',
	);
	const pendingTransfers = transfers.filter(
		transfer => transfer.approval_status === 'pending',
	);
	const pendingReturns = returns.filter(
		returnItem => returnItem.refund_status === 'pending',
	);

	const numberNotif = pendingProductPrices.length + pendingTransfers.length;

	return (
		// <div className="flex flex-row items-end justify-between navbar-container place-content-end">
		<div className="nav-icon flex flex-row items-end justify-end gap-x-5">
			<Link to="/dashboard">
				<NavIcons
					icon={<GoHomeFill className="text-primary-dark-gray text-xl" />}
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
				pendingReturns={pendingReturns}
				allIsFetching={allIsFetching}
			/>

			<div
				className={`absolute right-6 top-5 mr-2 h-5 w-5 rounded-full bg-red-500 font-bold text-white`}
			>
				<div
					className={`flex h-5 w-5 content-center items-center justify-center rounded-full bg-red-500 ${numberNotif !== 0} mr-2`}
				>
					<p className="text-[12px] ">{numberNotif}</p>
				</div>
			</div>
			{/* </Link> */}
		</div>
		// </div>
	);
};
