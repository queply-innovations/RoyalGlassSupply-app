import { Navbar } from '@/features/pos/__test__/components/Navbar/Navbar';
import PendingInvoiceTable from '@/features/pos/pending-invoices/PendingInvoiceTable';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import DialogPendingInvoice from '@/features/pos/pending-invoices/components/DialogPendingInvoice';
import { useModal } from '@/utils/Modal';
import { useState } from 'react';
import PendingInvoiceDetails from '@/features/pos/pending-invoices/components/PendingInvoiceDetails';

export const PosPendingInvoices = () => {
	const { isOpen, closeModal, openModal } = useModal();
	const [selectedInvoice, setSelectedInvoice] = useState<any>(undefined);
	const [modalAction, setModalAction] = useState<'details' | 'approve'>(
		'details',
	);

	return (
		<>
			<div className="flex h-screen w-screen flex-row">
				<Navbar />
				<div className="flex max-h-full w-full flex-col gap-4 overflow-y-auto p-6 pt-12 text-slate-700">
					<div className="mx-auto w-full max-w-[1024px] space-y-6">
						<div className="flex w-full flex-row items-start justify-between">
							<h1 className="text-3xl font-bold">Pending Invoices</h1>
						</div>
						<div className="rounded-md bg-white">
							<PendingInvoiceTable
								openModal={openModal}
								setSelectedInvoice={setSelectedInvoice}
								setModalAction={setModalAction}
							/>
						</div>
					</div>
				</div>
			</div>

			<ModalTest
				title={
					modalAction === 'details'
						? 'Invoice Details'
						: modalAction === 'approve'
							? 'Approve Invoice'
							: ''
				}
				isOpen={isOpen}
				onClose={closeModal}
				closeOnOverlayClick={false}
			>
				{modalAction === 'approve' ? (
					<DialogPendingInvoice
						selectedInvoice={selectedInvoice}
						closeModal={closeModal}
					/>
				) : modalAction === 'details' ? (
					<PendingInvoiceDetails selectedInvoice={selectedInvoice} />
				) : (
					<></>
				)}
			</ModalTest>
		</>
	);
};
