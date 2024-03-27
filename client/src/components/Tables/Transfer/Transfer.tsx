import { FC } from 'react';
import { BsFillEyeFill } from 'react-icons/bs';
import { TransferProvider } from '@/features/transfer/context/TransferContext';
import MiniTransferTable from './MiniTransferTable';

export const TransferStatus: FC = () => {
	return (
		<TransferProvider>
		<div className="flex w-full flex-1 flex-col items-center gap-y-5 rounded-md border border-black/10 bg-white p-4">
			<h2 className="uppercase text-black">Transfer Status</h2>
			<div className="h-full w-full rounded-md border border-solid">
				<MiniTransferTable />
			</div>
		</div>
		</TransferProvider>
	);
};

export default TransferStatus;
