import { Invoices } from '@/features/invoice/__test__/types';
import { InvoiceTable } from '../Table/InvoiceTable';
import { useEffect, useState } from 'react';
import { CartItem } from '../../types';
import { formatUTCDate, formatUTCMMDDYYYY } from '@/utils/timeUtils';

interface PrintFormProps {}

declare global {
	interface Window {
		api: any;
	}
}

export const PrintForm = ({}: PrintFormProps) => {
	const [invoiceDetails, setInvoiceDetails] = useState<Invoices | undefined>();
	const [invoiceItems, setInvoiceItems] = useState<CartItem[] | undefined>();

	const getData = async () => {
		return await window.api.receiveInvoice();
	};

	useEffect(() => {
		getData().then(res => {
			if (res.invoiceDetails) {
				setInvoiceDetails(res.invoiceDetails);
			}
			if (res.invoiceItems) {
				setInvoiceItems(res.invoiceItems);
			}
		});
	}, []);

	return (
		<>
			{invoiceDetails && invoiceItems && (
				<div className="h-full w-screen p-3">
					<div className="space-y-4">
						<div className="block text-sm">
							<div className="block w-full">
								<h3 className="inline">
									Date issued:&nbsp;
									<span className="font-bold">
										{formatUTCMMDDYYYY(invoiceDetails.created_at)}
									</span>
								</h3>
								<h3 className="float-right inline">
									Invoice number:&nbsp;
									<span className="font-bold">
										{' '}
										{invoiceDetails.code}{' '}
									</span>
								</h3>
							</div>
							<h3>
								Billed to:&nbsp;
								<span className="font-bold">
									{invoiceDetails.customer.firstname +
										' ' +
										invoiceDetails.customer.lastname}
								</span>
							</h3>
						</div>
						<div className="block">
							<InvoiceTable
								invoiceItems={invoiceItems}
								invoiceDetails={invoiceDetails}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
