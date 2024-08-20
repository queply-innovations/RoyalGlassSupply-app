import { Button } from '@/components';
import { useReturn } from '../../context';
import { InvoiceDetails } from './InvoiceDetails';
import { useApproveReturnMutation } from '../../hooks/useApproveReturnMutation';
import { UseModalProps } from '@/utils/Modal';
import { toast } from 'react-toastify';
import { useState } from 'react';

interface ApproveReturnProps {
	onClose: UseModalProps['closeModal'];
}

export const ApproveReturn = ({ onClose }: ApproveReturnProps) => {
	const { selectedReturn } = useReturn();
	const { approveReturnMutation } = useApproveReturnMutation();
	// Submitting state handler
	const [isSubmitting, setIsSubmitting] = useState(false);

	function handleApproveReturn(approval: 'approve' | 'deny') {
		setIsSubmitting(true);
		approveReturnMutation({
			returnId: selectedReturn.id,
			approval: approval,
		})
			.then(res => {
				toast.success(res.message);
				onClose();
			})
			.catch(err => {
				console.error(err);
				toast.error('An error occured while updating return transaction.');
			})
			.finally(() => {
				setIsSubmitting(false);
			});
	}

	return (
		<>
			<InvoiceDetails selectedReturn={selectedReturn} />

			<div className="mt-4 flex w-full flex-row gap-3">
				<Button
					disabled={isSubmitting}
					fill={'green'}
					className="flex-1 py-2 text-sm font-semibold text-white"
					onClick={() => {
						handleApproveReturn('approve');
					}}
				>
					Approve
				</Button>
				<Button
					disabled={isSubmitting}
					className="flex-1 text-sm font-semibold text-slate-800"
					onClick={() => {
						handleApproveReturn('deny');
					}}
				>
					Deny
				</Button>
			</div>
		</>
	);
};
