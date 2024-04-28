import { pdf } from '@react-pdf/renderer';
import { InvoiceDocument } from '../../Document/InvoiceDocument';
import { Button } from '@/components/ui/button';

export const PrintInvoice = () => {
	const handlePrintPDF = async () => {
		const blob = await pdf(InvoiceDocument()).toBlob();
		const blobURL = URL.createObjectURL(blob);

		const iframe = document.createElement('iframe');
		iframe.style.display = 'none';
		iframe.src = blobURL;
		document.body.appendChild(iframe);

		iframe.onload = () => {
			if (iframe.contentWindow) {
				iframe.contentWindow.print();
			}
		};
	};
	return (
		<div>
			<Button onClick={handlePrintPDF}>Save PDF</Button>
		</div>
	);
};
