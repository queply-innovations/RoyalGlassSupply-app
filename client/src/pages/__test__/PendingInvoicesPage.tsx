import PendingInvoiceTable from '@/features/pos/pending-invoices/PendingInvoiceTable';
import { MainLayout } from '@/layouts/MainLayout';
import { useModal } from '@/utils/Modal';
import { useState } from 'react';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import PendingInvoiceDetails from '@/features/pos/pending-invoices/components/PendingInvoiceDetails';
import DialogPendingInvoice from '@/features/pos/pending-invoices/components/DialogPendingInvoice';
import { useQuery } from '@tanstack/react-query';
import { fetchPendingInvoices } from '@/features/pos/pending-invoices/api/PendingInvoice';
import { Button } from '@/components/ui/button';

export const PendingInvoices = () => {
	const { openModal, isOpen, closeModal } = useModal();
	const [selectedInvoice, setSelectedInvoice] = useState<any>(undefined);

	const [modalAction, setModalAction] = useState<'details' | 'approve'>(
		'details',
	);

	const { data, isFetching, refetch } = useQuery({
		queryKey: ['pending-invoices'],
		queryFn: fetchPendingInvoices,
		refetchOnWindowFocus: false,
	});

	return (
		<>
			<MainLayout title="Pending Invoice">
				<div className="flex h-full flex-1 flex-col gap-4 rounded-xl border border-black/10 bg-white p-4">
					<div className="ml-auto flex flex-none flex-row items-center space-x-4">
						<Button disabled={isFetching} onClick={() => refetch()}>
							{!isFetching ? 'Refresh' : 'Loading...'}
						</Button>
					</div>

					<div className="max-h-[calc(100%-3rem)] w-full flex-1 rounded-md border">
						<PendingInvoiceTable
							data={data}
							isLoading={isFetching}
							openModal={openModal}
							setSelectedInvoice={setSelectedInvoice}
							setModalAction={setModalAction}
						/>
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
			</MainLayout>
		</>
	);
};
