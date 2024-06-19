import PendingInvoiceTable from '@/features/pos/pending-invoices/PendingInvoiceTable';
import { MainLayout } from '@/layouts/MainLayout';
import { useModal } from '@/utils/Modal';
import { useState } from 'react';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import PendingInvoiceDetails from '@/features/pos/pending-invoices/components/PendingInvoiceDetails';
import DialogPendingInvoice from '@/features/pos/pending-invoices/components/DialogPendingInvoice';

export const PendingInvoices = () => {
	const { openModal, isOpen, closeModal } = useModal();
	const [selectedInvoice, setSelectedInvoice] = useState<any>(undefined);

	const [modalAction, setModalAction] = useState<'details' | 'approve'>(
		'details',
	);

	return (
		<>
			<MainLayout title="Pending Invoice">
				<>
					<div className="flex max-h-full flex-1 flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
						<div className="h-full w-full overflow-x-hidden rounded-lg border border-black/10">
							<PendingInvoiceTable
								openModal={openModal}
								setSelectedInvoice={setSelectedInvoice}
								setModalAction={setModalAction}
							/>
						</div>
					</div>
					{/* <ModalTest isOpen onClose={closeModal} title="Add Products">
						<Form onClose={closeModal} />
					</ModalTest> */}
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
			</MainLayout>
		</>
	);
};
