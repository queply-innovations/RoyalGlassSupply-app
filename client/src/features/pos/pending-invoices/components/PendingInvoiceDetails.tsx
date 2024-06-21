import { Invoices } from '@/features/invoice/__test__/types';
import { formatUTCDate } from '@/utils/timeUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PendingInvoicesItemsTable } from './table/ItemsTable';
import { useMemo } from 'react';

const PendingInvoiceDetails = ({
	selectedInvoice,
}: {
	selectedInvoice: Invoices;
}) => {
	const totalCapital = useMemo(() => {
		//@ts-ignore
		if (selectedInvoice?.invoice_items) {
			//@ts-ignore
			return selectedInvoice.invoice_items.reduce(
				//@ts-ignore
				(acc, item) =>
					acc + item.inventory_product.capital_price * item.quantity,
				0,
			);
		}
		return 0;
	}, [selectedInvoice]);

	return (
		<Tabs defaultValue="details" className="w-full">
			<TabsList className="w-full">
				<TabsTrigger value="details" className="flex-1 font-semibold">
					Details
				</TabsTrigger>
				<TabsTrigger value="items" className="flex-1 font-semibold">
					Items
				</TabsTrigger>
			</TabsList>

			<TabsContent value="details" className="w-[500px]">
				<div className="flex max-w-4xl flex-col gap-4 font-medium">
					<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-4">
						<div className="col-span-6 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold">Invoice code</h3>
							<p className="text-sm text-gray-800">
								{selectedInvoice.code ? selectedInvoice.code : 'N/A'}
							</p>
						</div>
						<div className="col-span-6 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold">Customer</h3>
							<p className="text-sm text-gray-800">
								{selectedInvoice.customer
									? `${selectedInvoice.customer.firstname} ${selectedInvoice.customer.lastname}`
									: 'N/A'}
							</p>
						</div>
					</div>

					<hr className="my-2 h-px w-full border-0 bg-gray-200" />
					<div className="grid w-full grid-flow-row grid-cols-6 gap-4">
						<div className="relative col-span-3 flex flex-col justify-center	gap-1">
							<h3 className="text-sm font-bold">Subtotal</h3>
							<p className="text-sm text-gray-800">
								{Intl.NumberFormat('en-US', {
									style: 'currency',
									currency: 'PHP',
								}).format(selectedInvoice.subtotal)}
							</p>
						</div>
						<div className="col-span-3 flex flex-col justify-center	gap-1">
							<h3 className="text-sm font-bold">Delivery charge</h3>
							<p className="text-sm text-gray-800">
								{Intl.NumberFormat('en-US', {
									style: 'currency',
									currency: 'PHP',
								}).format(selectedInvoice.delivery_charge)}
							</p>
						</div>
						<div className="col-span-3 flex flex-col justify-center	gap-1">
							<h3 className="text-sm font-bold">Total amount due</h3>
							<p className="text-sm text-gray-800">
								{Intl.NumberFormat('en-US', {
									style: 'currency',
									currency: 'PHP',
								}).format(selectedInvoice.total_amount_due)}
							</p>
						</div>
						<div className="col-span-3 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold">Requested discount</h3>
							<p className="text-sm text-gray-800">
								{Intl.NumberFormat('en-US', {
									style: 'currency',
									currency: 'PHP',
								}).format(selectedInvoice.total_discount)}
							</p>
						</div>
					</div>
					<hr className="my-2 h-px w-full border-0 bg-gray-200" />
					<div className="grid w-full grid-flow-row grid-cols-2 gap-4">
						<div className="flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold">Issued by</h3>
							<p className="text-sm text-gray-800">{`${
								//@ts-ignore
								selectedInvoice.issued_by.firstname
							} ${
								//@ts-ignore
								selectedInvoice.issued_by.lastname
							}`}</p>
						</div>
						<div className="flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold">Created at</h3>
							<p className="text-sm text-gray-800">
								{formatUTCDate(selectedInvoice.created_at)}
							</p>
						</div>
					</div>
				</div>
			</TabsContent>

			<TabsContent
				value="items"
				className="flex h-auto max-h-[calc(100vh-12rem)] flex-col gap-4"
			>
				<div className="w-full flex-1 overflow-y-auto rounded-md border">
					<PendingInvoicesItemsTable
						//@ts-ignore
						invoiceItems={selectedInvoice?.invoice_items || []}
					/>
				</div>

				<div className="grid grid-cols-2 gap-4 text-sm font-medium">
					<p className="flex flex-col gap-1">
						<span className="font-bold">Total capital</span>
						<span>
							{Intl.NumberFormat('en-PH', {
								style: 'currency',
								currency: 'PHP',
							}).format(totalCapital)}
						</span>
					</p>
					<p className="flex flex-col gap-1">
						<span className="font-bold">Requested discount</span>
						<span>
							{Intl.NumberFormat('en-PH', {
								style: 'currency',
								currency: 'PHP',
							}).format(selectedInvoice.total_discount || 0)}
						</span>
					</p>
				</div>
			</TabsContent>
		</Tabs>
	);
};

export default PendingInvoiceDetails;
