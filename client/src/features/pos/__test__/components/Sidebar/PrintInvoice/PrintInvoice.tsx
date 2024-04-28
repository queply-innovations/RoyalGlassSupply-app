import { pdf } from '@react-pdf/renderer';
import { InvoiceDocument } from '../../Document/InvoiceDocument';
import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';

export const PrintInvoice = () => {
	// ref to iframe element
	const iframeRef = useRef<HTMLIFrameElement>();

	// Function to print invoice
	// Works by creating a blob URL of the generated PDF and attaching it to an iframe
	// Then prints the iframe using the contentWindow.print() method
	const handlePrintInvoice = async () => {
		// Check if iframe does not exist in the DOM
		// If it does not exist, create a new iframe and attach it to the DOM
		if (!iframeRef.current) {
			const blob = await pdf(InvoiceDocument()).toBlob();
			const blobURL = URL.createObjectURL(blob);

			const iframe = document.createElement('iframe');
			iframe.style.display = 'none';
			iframe.src = blobURL;
			document.body.appendChild(iframe);
			iframeRef.current = iframe;

			iframe.onload = () => {
				if (iframe.contentWindow) {
					iframe.contentWindow.print();
				}
			};
		} else {
			// If iframe already exists, print the content of the iframe
			if (iframeRef.current && iframeRef.current.contentWindow) {
				iframeRef.current.contentWindow.print();
			}
		}
	};

	// Cleanup function to remove iframe when component unmounts
	useEffect(() => {
		return () => {
			// Remove iframe when component unmounts
			if (iframeRef.current) {
				document.body.removeChild(iframeRef.current);
			}
		};
	}, []);

	return (
		<div>
			<Button onClick={handlePrintInvoice}>Save PDF</Button>
		</div>
	);
};
