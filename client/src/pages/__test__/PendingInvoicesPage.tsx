import PendingInvoiceTable from '@/features/pos/pending-invoices/PendingInvoiceTable';
import { MainLayout } from '@/layouts/MainLayout';
import { useModal } from '@/utils/Modal';
import { useState } from 'react';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import PendingInvoiceDetails from '@/features/pos/pending-invoices/components/PendingInvoiceDetails';

export const PendingInvoices = () => {
	const { openModal, isOpen, closeModal } = useModal();
	const [selectedInvoice, setSelectedInvoice] = useState<any>(undefined);
	return (
		<>
			<MainLayout title="Pending Invoice">
				<>
					<div className="flex max-h-full flex-1 flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
						<div className="h-full w-full overflow-x-hidden rounded-lg border border-black/10">
							<PendingInvoiceTable
								openModal={openModal}
								setSelectedInvoice={setSelectedInvoice}
								viewFrom="dashboard"
							/>
						</div>
					</div>
					{/* <ModalTest isOpen onClose={closeModal} title="Add Products">
						<Form onClose={closeModal} />
					</ModalTest> */}
					<ModalTest
						title={'Invoice Details'}
						isOpen={isOpen}
						onClose={closeModal}
						closeOnOverlayClick={false}
					>
						<PendingInvoiceDetails selectedInvoice={selectedInvoice} />
					</ModalTest>
				</>
			</MainLayout>
		</>
	);
};
