import { Label } from '@/components/ui/label';
import { useInvoice } from '@/features/invoice/__test__/context/InvoiceContext';

export const PaymentType = () => {
	const { invoice } = useInvoice();
	return (
		<>
			<div className="flex flex-row justify-between w-full">
				<Label className="font-medium text-medium text-slate-700">
					Payment Type
				</Label>
				<Label className="font-bold capitalize text-slate-700">
					{invoice.type?.replace('_', ' ')}
				</Label>
			</div>
			{invoice.type !== 'exit' && (
				<>
					<div className="flex flex-row justify-between w-full">
						<Label className="font-medium text-medium text-slate-700">
							Payment Method
						</Label>
						<Label className="font-bold capitalize text-slate-700">
							{invoice.payment_method?.replace('_', ' ')}
						</Label>
					</div>
					{invoice.payment_method !== 'cash' &&
						invoice.payment_method !== '' && (
							<>
								<div className="flex flex-row justify-between w-full">
									<Label className="font-medium text-medium text-slate-700">
										Reference Number
									</Label>
									<Label className="font-bold capitalize text-slate-700">
										{invoice.reference_no}
									</Label>
								</div>
							</>
						)}
				</>
			)}
		</>
	);
};
