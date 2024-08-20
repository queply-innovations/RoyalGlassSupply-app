import { Link } from 'react-router-dom';
import { usePendingTransfersQuery } from '@/features/transfer/hooks';
import { usePendingReturnQuery } from '@/features/pending/pending-return/hooks';
import { useState } from 'react';
import { NavItem } from './NavItem';
import { Bell, Home } from 'lucide-react';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Notifications } from './Notifications';

export const Navbar = () => {
	const [notifsOpen, setNotifsOpen] = useState(false);

	const { transfers, isFetching } = usePendingTransfersQuery();
	const { returns: pendingReturns, isFetching: isFetching2 } =
		usePendingReturnQuery();

	const allIsFetching = isFetching && isFetching2;

	const pendingTransfers = transfers.filter(
		transfer => transfer.approval_status === 'pending',
	);

	const numberNotif = pendingTransfers.length + (pendingReturns?.length || 0);

	return (
		<div className="nav-icon flex flex-row items-end justify-end gap-x-2">
			<Link to="/dashboard">
				<NavItem title="Home" icon={<Home size={20} />} />
			</Link>
			<div className="relative">
				<Popover onOpenChange={() => setNotifsOpen(!notifsOpen)}>
					<PopoverTrigger asChild>
						<NavItem
							title="Notifications"
							icon={<Bell size={20} />}
							isActive={notifsOpen}
						/>
					</PopoverTrigger>
					<PopoverContent className="w-fit -translate-x-5 rounded-lg px-2 pb-2 shadow-xl">
						<Notifications
							pendingTransfers={pendingTransfers.length}
							pendingReturns={pendingReturns?.length || 0}
							allIsFetching={allIsFetching}
						/>
					</PopoverContent>
				</Popover>
				{numberNotif > 0 && (
					<span className="pointer-events-none absolute right-0 top-0 flex -translate-y-1/3 translate-x-1/3 items-center justify-center rounded-full bg-red-500 px-2 py-1 ">
						<p className="line-clamp-1 text-xs font-medium leading-tight text-white">
							{numberNotif <= 100 ? numberNotif : '100+'}
						</p>
					</span>
				)}
			</div>
		</div>
	);
};
