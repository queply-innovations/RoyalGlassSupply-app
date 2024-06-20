import { Invoices } from '@/features/invoice/__test__/types';
import { formatUTCDate } from '@/utils/timeUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PendingInvoicesItemsTable } from './table/ItemsTable';

const PendingInvoiceDetails = ({
	selectedInvoice,
}: {
	selectedInvoice: Invoices;
}) => {
	return (
		<>
			<Tabs defaultValue="details" className="w-full">
				<TabsList className="w-full">
					<TabsTrigger value="details" className="flex-1 font-semibold">
						Details
					</TabsTrigger>
					<TabsTrigger value="items" className="flex-1 font-semibold">
						Items
					</TabsTrigger>
				</TabsList>

				<TabsContent value="details">
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
							<div className="relative col-span-3 flex flex-col justify-center	gap-1">
								<h3 className="text-sm font-bold">
									Requested discount
								</h3>
								<p className="text-sm text-gray-800">
									{Intl.NumberFormat('en-US', {
										style: 'currency',
										currency: 'PHP',
									}).format(selectedInvoice.total_discount)}
								</p>
							</div>
						</div>
						<hr className="my-2 h-px w-full border-0 bg-gray-200" />
						<div className="grid w-full grid-flow-row grid-cols-12 gap-4">
							<div className="col-span-4 flex flex-col justify-center gap-1">
								<h3 className="text-sm font-bold">Issued by</h3>
								<p className="text-sm text-gray-800">{`${
									//@ts-ignore
									selectedInvoice.issued_by.firstname
								} ${
									//@ts-ignore
									selectedInvoice.issued_by.lastname
								}`}</p>
							</div>
							<div className="col-span-4 flex flex-col justify-center gap-1">
								<h3 className="text-sm font-bold">Created at</h3>
								<p className="text-sm text-gray-800">
									{formatUTCDate(selectedInvoice.created_at)}
								</p>
							</div>
							<div className="col-span-4 flex flex-col justify-center gap-1">
								<h3 className="text-sm font-bold">Approval status</h3>
								<p className="text-sm text-gray-800">Pending</p>
							</div>
						</div>
					</div>
				</TabsContent>

				<TabsContent value="items" className="min-w-[800px]">
					<PendingInvoicesItemsTable
						//@ts-ignore
						invoiceItems={selectedInvoice?.invoice_items || []}
					/>
				</TabsContent>
			</Tabs>
		</>
	);
};

export default PendingInvoiceDetails;
