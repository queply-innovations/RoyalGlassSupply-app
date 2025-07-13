import { useRef } from 'react';
import { useInvoicePos } from '../../../context/__test__/InvoicePosContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useInvoiceMutation } from '@/features/invoice/__test__/hooks/useInvoiceMutation';

interface UpdatePaidAmountContainerProps {
	setPage: React.Dispatch<React.SetStateAction<any>>;
}

export const UpdatePaidAmountContainer = ({
	setPage,
}: UpdatePaidAmountContainerProps) => {
	const paidAmountRef = useRef<HTMLInputElement>(null);
	const { currentInvoicePos, setCurrentInvoicePos } = useInvoicePos();

	return (
		<form
			className="flex flex-col gap-4"
			onSubmit={e => {
				e.preventDefault();
				//@ts-ignore
				setCurrentInvoicePos(prev => {
					return {
						...prev,
						paid_amount: Number(
							paidAmountRef.current?.value ??
								currentInvoicePos.paid_amount,
						),
					};
				});
				setPage('awaitingApproval');
			}}
		>
			<div className="relative flex flex-col gap-2">
				<Label htmlFor="discount" className="font-bold text-slate-800">
					Paid amount
				</Label>
				<Input
					id="discount"
					ref={paidAmountRef}
					type="number"
					min={0}
					step={0.01}
					defaultValue={currentInvoicePos.paid_amount}
					placeholder={currentInvoicePos.paid_amount?.toString()}
					className="pl-8"
					required
					autoFocus
				/>
				<span className="absolute bottom-0 left-0 -translate-y-2 translate-x-3">
					₱
				</span>
			</div>

			<div className="flex flex-row gap-2">
				<Button
					type="reset"
					variant={'outline'}
					className={'flex-1 font-medium'}
					onClick={() => setPage('awaitingApproval')}
				>
					Cancel
				</Button>
				<Button type="submit" className={'flex-1'}>
					Update paid amount
				</Button>
			</div>
		</form>
	);
};
