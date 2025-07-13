import { useRef } from 'react';
import { useInvoicePos } from '../../../context/__test__/InvoicePosContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface UpdateDiscountContainerProps {
	setPage: React.Dispatch<React.SetStateAction<any>>;
}

export const UpdateDiscountContainer = ({
	setPage,
}: UpdateDiscountContainerProps) => {
	const discountRef = useRef<HTMLInputElement>(null);
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
						total_discount: Number(
							discountRef.current?.value ??
								currentInvoicePos.total_discount,
						),
					};
				});
				setPage('awaitingApproval');
			}}
		>
			<div className="relative flex flex-col gap-2">
				<h2 className="mb-2 text-sm text-slate-500">
					Input the discount as <strong>advised by the admin</strong>.
				</h2>
				<Label htmlFor="discount" className="font-bold text-slate-800">
					Discount
				</Label>
				<Input
					id="discount"
					ref={discountRef}
					type="number"
					min={0}
					max={currentInvoicePos.subtotal}
					step={0.01}
					defaultValue={currentInvoicePos.total_discount}
					placeholder={currentInvoicePos.total_discount?.toString()}
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
					Update discount
				</Button>
			</div>
		</form>
	);
};
