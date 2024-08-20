import { formatUTCDate } from '@/utils/timeUtils';
import { ReturnTransactionsRaw } from '../../types';

interface InvoiceDetailsProps {
	selectedReturn: ReturnTransactionsRaw;
}

export const InvoiceDetails = ({ selectedReturn }: InvoiceDetailsProps) => {
	const paymentMethod = selectedReturn.invoice.payment_method
		.split('_')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');

	return (
		<>
			<div className="mt-3 grid w-full grid-flow-row grid-cols-9 gap-4">
				<div className="col-span-3 flex flex-col justify-center gap-1">
					<h3 className="text-sm font-bold">Invoice code</h3>
					<p className="text-sm text-gray-800">
						{selectedReturn.invoice.code}
					</p>
				</div>

				<div className="col-span-3 flex flex-col justify-center gap-1">
					<h3 className="text-sm font-bold">Billed to</h3>
					<p className="text-sm text-gray-800">
						{selectedReturn.invoice.customer.firstname +
							' ' +
							selectedReturn.invoice.customer.lastname}
					</p>
				</div>

				<div className="col-span-3 flex flex-col justify-center gap-1">
					<h3 className="text-sm font-bold">Warehouse</h3>
					<p className="text-sm text-gray-800">
						{selectedReturn.invoice.warehouse.code}
					</p>
				</div>
			</div>

			<div className="mt-3 grid w-full grid-flow-row grid-cols-9 gap-4">
				<div className="col-span-3 flex flex-col justify-center gap-1">
					<h3 className="text-sm font-bold">Issued at</h3>
					<p className="text-sm text-gray-800">
						{
							//@ts-expect-error 'created_at' does not exist on type 'Invoice'
							formatUTCDate(selectedReturn.invoice.created_at)
						}
					</p>
				</div>

				<div className="col-span-3 flex flex-col justify-center gap-1">
					<h3 className="text-sm font-bold">Issued by</h3>
					<p className="text-sm text-gray-800">
						{selectedReturn.issued_by.firstname +
							' ' +
							selectedReturn.issued_by.lastname}
					</p>
				</div>

				<div className="col-span-3 flex flex-col justify-center	gap-1">
					<h3 className="text-sm font-bold">Returned at</h3>
					<p className="text-sm text-gray-800">
						{formatUTCDate(selectedReturn.created_at)}
					</p>
				</div>
			</div>
			<hr className="my-2 h-px w-full border-0 bg-gray-200" />
			<div className="grid w-full grid-flow-row grid-cols-9 gap-4">
				<div className="col-span-3 flex flex-col justify-center	gap-1">
					<h3 className="text-sm font-bold">Delivery fee</h3>
					<p className="text-sm text-gray-800">
						{new Intl.NumberFormat('en-US', {
							style: 'currency',
							currency: 'PHP',
							//@ts-expect-error 'delivery_charge' does not exist on type 'Invoice'
						}).format(selectedReturn.invoice.delivery_charge ?? 0)}
					</p>
				</div>

				<div className="col-span-3 flex flex-col justify-center	gap-1">
					<h3 className="text-sm font-bold">Discount</h3>
					<p className="text-sm text-gray-800">
						{new Intl.NumberFormat('en-US', {
							style: 'currency',
							currency: 'PHP',
							//@ts-expect-error 'total_discount' does not exist on type 'Invoice'
						}).format(selectedReturn.invoice.total_discount ?? 0)}
					</p>
				</div>

				<div className="col-span-3 flex flex-col justify-center	gap-1">
					<h3 className="text-sm font-bold">Subtotal</h3>
					<p className="text-sm text-gray-800">
						{new Intl.NumberFormat('en-US', {
							style: 'currency',
							currency: 'PHP',
							//@ts-expect-error 'subtotal' does not exist on type 'Invoice'
						}).format(selectedReturn.invoice.subtotal)}
					</p>
				</div>
			</div>

			<div className="mt-3 grid w-full grid-flow-row grid-cols-9 gap-4">
				<div className="col-span-3 flex flex-col justify-center	gap-1">
					<h3 className="text-sm font-bold">Total amount due</h3>
					<p className="text-sm text-gray-800">
						{new Intl.NumberFormat('en-US', {
							style: 'currency',
							currency: 'PHP',
						}).format(selectedReturn.invoice.total_amount_due)}
					</p>
				</div>

				<div className="col-span-3 flex flex-col justify-center	gap-1">
					<h3 className="text-sm font-bold">Amount paid</h3>
					<p className="text-sm text-gray-800">
						{`${new Intl.NumberFormat('en-US', {
							style: 'currency',
							currency: 'PHP',
						}).format(
							selectedReturn.invoice.paid_amount,
						)} (${paymentMethod})`}
					</p>
				</div>

				<div className="col-span-3 flex flex-col justify-center	gap-1">
					<h3 className="text-sm font-bold">Refundable amount</h3>
					<p className="text-sm text-gray-800">
						{new Intl.NumberFormat('en-US', {
							style: 'currency',
							currency: 'PHP',
						}).format(selectedReturn.refundable_amount)}
					</p>
				</div>
			</div>
		</>
	);
};
