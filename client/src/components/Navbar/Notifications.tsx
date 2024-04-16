import { ExternalLink, Boxes, Divide, Undo2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Loading } from '..';

interface NotificationsProps {
	pendingTransfers: number;
	pendingProdPrices: number;
	pendingReturns: number;
	allIsFetching: boolean;
}

export const Notifications = ({
	pendingTransfers,
	pendingProdPrices,
	pendingReturns,
	allIsFetching
}: NotificationsProps) => {
	return (
		<>
			<h1 className="mx-2 mb-1 text-lg font-bold">Notifications</h1>
			{allIsFetching ? (
				<div className="flex flex-col flex-wrap items-start"> 
					<Loading width={30} height={30} /> 
				</div>
			) : (
				<div className="flex flex-col">
					{pendingTransfers > 0 && (
						<Link
							to="/pending/transfer"
							className="flex flex-row items-center gap-3 rounded-md px-2 py-3 hover:bg-slate-200/50"
						>
							<div className="flex items-center justify-center rounded-full bg-slate-100 p-2">
								<ExternalLink size={20} strokeWidth={1.75} />
							</div>
							<div>
								<p className="text-sm font-bold">Pending transfers</p>
								<p className="text-sm font-medium">
									{pendingTransfers}{' '}
									{pendingTransfers === 1 ? 'transfer' : 'transfers'}{' '}
									waiting for approval.
								</p>
							</div>
						</Link>
					)}
					{pendingReturns > 0 && (
						<Link 
							to="/pending/return"
							className="flex flex-row items-center gap-3 rounded-md px-2 py-3 hover:bg-slate-200/50">
							<div className="flex items-center justify-center rounded-full bg-slate-100 p-2">
								<Undo2 size={20} strokeWidth={1.75} />
							</div>
							<div>
								<p className="text-sm font-bold">Pending returns</p>
								<p className="text-sm font-medium">
									{pendingReturns}{' '}
									{pendingReturns === 1 ? 'return' : 'returns'} waiting
									for approval.
								</p>
							</div>
						</Link>
					)}
					{pendingProdPrices > 0 && (
						<Link
							to="/products/listings"
							className="flex flex-row items-center gap-3 rounded-md px-2 py-3 hover:bg-slate-200/50"
						>
							<div className="flex items-center justify-center rounded-full bg-slate-100 p-2">
								<Boxes size={20} strokeWidth={1.75} />
							</div>
							<div>
								<p className="text-sm font-bold">Pending product prices</p>
								<p className="text-sm font-medium">
									{pendingProdPrices} product{' '}
									{pendingProdPrices === 1 ? 'price' : 'prices'} waiting
									for approval.
								</p>
							</div>
						</Link>
					)}
					{pendingTransfers === 0 && pendingProdPrices === 0 && pendingReturns == 0 && (
						<div className="flex flex-row items-center px-20 py-6">
							<p className="text-sm font-medium">No new notifications</p>
						</div>
					)}
				</div>
			)}
			
		</>
	);
};
