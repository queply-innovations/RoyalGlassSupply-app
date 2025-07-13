import { Button } from '@/components/ui/button';
import { InvoiceItemsTable } from '@/features/invoice/__test__/components/table/InvoiceItemsTable';
import {
	useInvoiceItemQueryById,
	useInvoiceQueryById,
} from '@/features/invoice/__test__/hooks/useInvoiceQuery';
import { MainLayout } from '@/layouts/MainLayout';
import { formatCurrency } from '@/utils/FormatCurrency';
import { formatUTCMMDDYYYY } from '@/utils/timeUtils';
import { ChevronLeft } from 'lucide-react';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface InvoiceItemsProps {}

export const InvoiceItems = ({}: InvoiceItemsProps) => {
	const navigate = useNavigate();
	const { id: invoiceId } = useParams();

	const { data: invoice, isLoading: isInvoiceLoading } = useInvoiceQueryById(
		Number(invoiceId),
	);

	const { invoiceItems, isLoading: isItemsLoading } = useInvoiceItemQueryById(
		Number(invoiceId),
	);

	const handleNavigateBack = () => {
		navigate(-1);
	};

	const formattedPaymentMethod = (paymentMethod: string | undefined) => {
		if (paymentMethod) {
			return paymentMethod
				.split('_')
				.map(word => word.charAt(0).toUpperCase() + word.slice(1))
				.join(' ');
		}
		return '';
	};

	console.log('items', invoiceItems);
	const totalCapital = useMemo(() => {
		return invoiceItems.reduce(
			(acc, item) =>
				// @ts-expect-error 'type not updated'
				acc + (item.product_price.capital_price ?? 0) * item.quantity,
			0,
		);
	}, [invoiceItems]);

	return (
		<>
			<MainLayout title="Transaction Items">
				<div className="flex h-full flex-1 flex-col gap-5 rounded-xl border border-black/10 bg-white p-4">
					<div className="text-primary-dark-gray flex flex-row items-center gap-6 text-sm font-medium">
						<Button
							onClick={() => handleNavigateBack()}
							className="flex flex-row items-center gap-3 whitespace-nowrap bg-gray-200 pr-6 font-bold text-gray-700 hover:bg-gray-300 hover:text-gray-700"
						>
							<ChevronLeft size={22} strokeWidth={2.25} />
							<span>Go back</span>
						</Button>

						{!isInvoiceLoading && (
							<div className="flex w-full flex-row justify-between gap-4 text-xs font-medium text-slate-800">
								<div className="flex flex-col gap-1">
									<InvoiceDetail
										label="Code"
										type="string"
										value={invoice?.code}
									/>

									<InvoiceDetail
										label="Billed to"
										type="string"
										value={
											invoice?.customer.firstname +
											' ' +
											invoice?.customer.lastname
										}
									/>
								</div>

								<div className="flex flex-col gap-1">
									<InvoiceDetail
										label="Date issued"
										type="string"
										//@ts-expect-error 'type not updated'
										value={`${formatUTCMMDDYYYY(invoice?.created_at ?? '')} (${invoice?.warehouse.code})`}
									/>

									<InvoiceDetail
										label="Issued by"
										type="string"
										value={
											//@ts-expect-error 'type not updated'
											invoice?.issued_by.firstname +
											' ' +
											//@ts-expect-error 'type not updated'
											invoice?.issued_by.lastname
										}
									/>
								</div>

								<div className="flex flex-col gap-1">
									<InvoiceDetail
										label="Delivery"
										type="currency"
										value={invoice?.delivery_charge}
									/>

									<InvoiceDetail
										label="Discount"
										type="currency"
										value={invoice?.total_discount}
									/>
								</div>

								<div className="flex flex-col gap-1">
									<InvoiceDetail
										label="Total capital"
										type="currency"
										value={totalCapital}
									/>

									<InvoiceDetail
										label="Total due"
										type="currency"
										value={invoice?.total_amount_due}
									/>
								</div>

								<div className="flex flex-col gap-1">
									<InvoiceDetail
										label="Balance"
										type="currency"
										value={invoice?.balance_amount}
									/>

									<InvoiceDetail
										label="Paid amount"
										type="string"
										value={`${formatCurrency(invoice?.paid_amount ?? 0)} (${formattedPaymentMethod(
											invoice?.payment_method,
										)})`}
									/>
								</div>
							</div>
						)}
					</div>

					<div className="max-h-[calc(100%-4rem)] w-full flex-1 rounded-md border">
						{!isItemsLoading && (
							<>
								<InvoiceItemsTable items={invoiceItems} />
							</>
						)}
					</div>
				</div>
			</MainLayout>
		</>
	);
};

interface InvoiceDetailProps {
	type: 'string' | 'number' | 'date' | 'currency';
	label: string;
	value: string | number | undefined;
}
const InvoiceDetail = ({
	type = 'string',
	label,
	value,
}: InvoiceDetailProps) => {
	const formatted = (valueParam: typeof value) => {
		switch (type) {
			case 'string':
				return valueParam;
			case 'number':
				return Number(valueParam);
			case 'date':
				return formatUTCMMDDYYYY(valueParam as string);
			case 'currency':
				return formatCurrency(valueParam as number);
			default:
				return valueParam;
		}
	};

	return value !== undefined ? (
		<div className="flex flex-1 gap-1">
			<h3 className="font-extrabold">{label}:</h3>
			<p>{formatted(value)}</p>
		</div>
	) : null;
};
