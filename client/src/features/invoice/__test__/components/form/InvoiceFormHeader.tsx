import { useAuth } from '@/context/AuthContext';
import { useInvoiceMutation } from '../../hooks/useInvoiceMutation';
import {
	formatUTCDate,
	formatUTCDateOnly,
	getDateNow,
} from '@/utils/timeUtils';

export const InvoiceFormHeader = () => {
	const { value: invoiceForm } = useInvoiceMutation();
	const { auth } = useAuth();
	const getReceiptNumber = () => {
		const date = new Date().toISOString();
		const userId = auth.user.id;
		const invoiceId = invoiceForm.id;
		return `${formatUTCDateOnly(date)}-${invoiceId}${userId}`;
	};
	const getReferenceNumber = () => {
		const date = new Date().toISOString();
		const invoiceId = invoiceForm.id;
		return `ILI-${formatUTCDateOnly(date)}-${invoiceId}`;
	};
	return (
		<div className="flex flex-row justify-between gap-10">
			<div className="flex flex-col ">
				<div className="flex min-w-0 flex-row gap-1">
					<p className="text-base font-bold uppercase">Invoice ID:</p>
					<span className="text-base">{invoiceForm.id}</span>
				</div>
				<div className="flex min-w-0 flex-row gap-1">
					<p className="text-base font-bold uppercase">Issued By:</p>
					<span className="text-base">
						{auth.user.firstname.toUpperCase()}
					</span>
				</div>
			</div>
			<div className="flex flex-col justify-between">
				<div className="flex min-w-0 flex-row gap-1">
					<p className="text-base font-bold uppercase">Created At:</p>
					<span className="text-base">{formatUTCDate(getDateNow())}</span>
				</div>
				<div className="flex min-w-0 flex-row gap-1">
					<p className="text-base font-bold uppercase">OR #:</p>
					<span className="text-base">{getReceiptNumber()}</span>
				</div>
				<div className="flex min-w-0 flex-row gap-1">
					<p className="text-base font-bold uppercase">Reference #:</p>
					<span className="text-base">{getReferenceNumber()}</span>
				</div>
			</div>
		</div>
	);
};
