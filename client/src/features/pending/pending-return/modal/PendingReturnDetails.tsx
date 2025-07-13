import { UseModalProps } from '@/utils/Modal';
import { Button } from '@/components';
import { formatUTCDate } from '@/utils/timeUtils';
import { useReturn } from '../context';
import { Clock } from 'lucide-react';

interface ReturnDetailsProps {
	onClose: UseModalProps['closeModal'];
}

export const PendingReturnDetails = ({ onClose }: ReturnDetailsProps) => {
	const { selectedReturn } = useReturn();

	return (
		<>
			<div className="flex max-w-6xl flex-col gap-4">
				<div className="mt-3 grid w-full grid-flow-row grid-cols-9 gap-4">
					<div className="col-span-6 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">Return Code</h3>
						<p className="text-sm text-gray-800">{selectedReturn.code ? selectedReturn.code : 'N/A'}</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">
							Invoice Code
						</h3>
						<p className="text-sm text-gray-800">{selectedReturn.invoice.code}</p>
					</div>
				</div>
				<div className="mt-3 grid w-full grid-flow-row grid-cols-9 gap-4">
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">
							Customer
						</h3>
						<p className="text-sm text-gray-800">
							{selectedReturn.invoice.customer.firstname + ' ' +
							selectedReturn.invoice.customer.lastname}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">
							Warehouse
						</h3>
						<p className="text-sm text-gray-800">
							{selectedReturn.invoice.customer.firstname + ' ' +
							selectedReturn.invoice.customer.lastname}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">
							Issued by
						</h3>
						<p className="text-sm text-gray-800">
							{selectedReturn.issued_by.firstname + ' ' +
							selectedReturn.issued_by.lastname}
						</p>
					</div>
				</div>
				<hr className="my-2 h-px w-full border-0 bg-gray-200" />
				<div className="grid w-full grid-flow-row grid-cols-9 gap-4">
					<div className="relative col-span-3 flex flex-col justify-center	gap-1">
						<h3 className="text-sm font-bold">
							Payment method
						</h3>
						<p className="text-sm text-gray-800">
							{selectedReturn.invoice.payment_method.charAt(0).toUpperCase() +
							selectedReturn.invoice.payment_method.slice(1)}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center	gap-1">
						<h3 className="text-sm font-bold">
							Reference number
						</h3>
						<p className="text-sm text-gray-800">
							{selectedReturn.invoice.reference_no}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center	gap-1">
						<h3 className="text-sm font-bold">Refundable amount</h3>
						<p className="text-sm text-gray-800">
							{	new Intl.NumberFormat("en-US", {
									style: "currency",
									currency: "PHP",
								}).format(selectedReturn.refundable_amount)}
						</p>
					</div>
				</div>
				<hr className="my-2 h-px w-full border-0 bg-gray-200" />
				<div className="grid w-full grid-flow-row grid-cols-12 gap-4">
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">
							Created at
						</h3>
						<p className="text-sm text-gray-800">
							{formatUTCDate(selectedReturn.created_at)}
						</p>
					</div>
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">
							Approval status
						</h3>
						<p className="text-sm text-amber-600">
							{selectedReturn.refund_status.charAt(0).toUpperCase() + 
							selectedReturn.refund_status.slice(1)}
						</p>
					</div>
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">
							Updated at
						</h3>
						<p className="text-sm text-gray-800">
							{formatUTCDate(selectedReturn.updated_at)}
						</p>
					</div>
				</div>
			</div>
		</>
	);
};
