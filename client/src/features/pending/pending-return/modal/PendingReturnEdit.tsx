import { UseModalProps } from '@/utils/Modal';
import { Button, Loading } from '@/components';
import { formatUTCDate } from '@/utils/timeUtils';
import { useReturn } from '../context';
import { Clock } from 'lucide-react';
import { useReturnMutation } from '../hooks';

interface ReturnDetailsProps {
	onClose: UseModalProps['closeModal'];
}

export const PendingReturnEdit = ({ onClose }: ReturnDetailsProps) => {
	const { selectedReturn, success, error, isSubmitting, handleSubmit } = useReturnMutation();

	success && setTimeout(() => {
		onClose();
	}, 1000);

	return (
		<>
			<div className="flex max-w-4xl flex-col gap-4">
				<p className="font-bold text-red-900"> Are you sure you want to set this return as done? </p>

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
				
				<div className="flex flex-row justify-center gap-1">
					<div className="mt-3 grid w-full grid-flow-row grid-cols-10 gap-4 text-center">
						<div className="flex flex-col col-span-5 items-start">
							{success && (
								<div className="font-bold text-green-700">{success}</div>
							)}
							{error && (
								<div className="font-bold text-red-700">{error}</div>
							)}
							{!isSubmitting ? '' : 
								<div className="flex flex-col flex-wrap items-start"> 
									<Loading width={30} height={30} /> 
								</div>}
						</div>
						<div className="flex flex-col col-span-5 gap-4 items-end">
							<div className="flex flex-row">
								<Button
									type="reset"
									fill={'default'}
									className="flex-1 py-2 text-sm font-bold text-gray-700 hover:text-white"
									onClick={onClose}
								>
									Cancel
								</Button>

								<Button
									type="submit"
									onClick={handleSubmit}
									fill={'green'}
								>
									{!isSubmitting ? 'Mark as done' : 'Submitting'}
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
