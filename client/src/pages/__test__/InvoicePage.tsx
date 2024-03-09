import { ModalTest } from '@/components/__test__/Modal/Modal';
import { InvoiceForm } from '@/features/invoice/__test__/components/InvoiceForm';
import { InvoiceTable } from '@/features/invoice/__test__/components/InvoiceTable';
import { InvoiceProvider } from '@/features/invoice/__test__/context/InvoiceContext';
import { Invoices } from '@/features/invoice/__test__/types';
import { MainLayout } from '@/layouts/MainLayout';
import { useModal } from '@/utils/Modal';
import { getDateNow } from '@/utils/timeUtils';
import { useState } from 'react';

interface InvoiceProps {}

export const Invoice = ({}: InvoiceProps) => {
	const { isOpen, openModal, closeModal } = useModal();
	const [modalAction, setModalAction] = useState<string>('');

	const modalHandler = (data: Invoices, action: string) => {
		openModal();
		setModalAction(action);
		console.log('modalAction:', modalAction);
	};
	console.log(getDateNow());
	return (
		<>
			<MainLayout title="Invoice">
				<InvoiceProvider>
					<div className="flex flex-auto flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
						<div className="h-full w-full overflow-x-hidden rounded-lg border border-black/10">
							<InvoiceTable modalHandler={modalHandler} />
						</div>
					</div>
					<ModalTest
						isOpen={isOpen}
						onClose={closeModal}
						title={
							modalAction === 'update'
								? 'Edit Invoice'
								: modalAction === 'remove'
									? 'Remove Invoice'
									: 'Add Invoice'
						}
					>
						<InvoiceForm onClose={closeModal} formAction={modalAction} />
					</ModalTest>
				</InvoiceProvider>
			</MainLayout>
		</>
	);
};
