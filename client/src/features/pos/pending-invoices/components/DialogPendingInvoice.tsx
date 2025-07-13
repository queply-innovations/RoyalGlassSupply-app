import React from 'react';
import { Invoice } from '@/features/usersales/types';
import { Button } from '@/components';
import { useMutation } from '@tanstack/react-query';
import { approvePendingInvoice } from '../api/PendingInvoice';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const DialogPendingInvoice = ({
	selectedInvoice,
	closeModal,
}: {
	selectedInvoice: Invoice;
	closeModal: () => void;
}) => {
	const queryClient = useQueryClient();
	const { mutate: approveInvoice, isPending } = useMutation({
		mutationKey: ['approve-invoice'],
		mutationFn: approvePendingInvoice,
		onSuccess: data => {
			queryClient.invalidateQueries({
				queryKey: ['pending-invoices'],
			});
			toast.success('Invoice has been approved');
			closeModal();
		},
		onError: error => {
			toast.error('There was something wrong in approving the invoice');
		},
	});

	return (
		<div className="flex flex-col items-center justify-center ">
			<h1 className="font-bold">
				Are you sure you want to approve {selectedInvoice.code}
			</h1>
			<p className=" opacity-70">This process cannot be undone.</p>
			<div className="mt-5 flex gap-3 self-end pb-0">
				<Button
					className="bg-red-500 hover:bg-red-600 disabled:opacity-50"
					onClick={closeModal}
					disabled={isPending}
				>
					Cancel
				</Button>
				<Button
					className="bg-green-500 hover:bg-green-600 disabled:opacity-50"
					onClick={() => {
						approveInvoice(selectedInvoice.id);
					}}
					disabled={isPending}
				>
					{isPending ? 'Approving...' : 'Confirm'}
				</Button>
			</div>
		</div>
	);
};

export default DialogPendingInvoice;
