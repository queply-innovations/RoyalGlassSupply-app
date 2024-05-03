import { Button } from '@/components/ui/button';
import { useReturnInvoice } from '../../context/ReturnInvoiceContext';
import { toast } from 'react-toastify';

export const SubmitReturnButton = () => {
	const { returnInvoice, handleSubmit, isSubmitting } = useReturnInvoice();

	return (
		<Button
			variant={'default'}
			disabled={
				isSubmitting ||
				!returnInvoice.return_items ||
				returnInvoice.return_items?.length === 0
			}
			onClick={() => {
				handleSubmit()
					.then(message => {
						toast.success(message);
					})
					.catch(err => {
						toast.error(err);
					});
			}}
		>
			{!isSubmitting ? 'Submit Return' : 'Submitting...'}
		</Button>
	);
};
