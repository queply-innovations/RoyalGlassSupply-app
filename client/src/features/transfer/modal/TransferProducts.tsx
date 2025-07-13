import { UseModalProps, useModal } from '@/utils/Modal';
import { Button, Inputbox, Loading, Selectbox } from '@/components';
import { useTransferMutation } from '../hooks';
import { useAuth } from '@/context/AuthContext';
import { TransferProductFull as ITransferProductFull } from '@/features/transfer/types';
import { TransferProduct as ITransferProduct } from '@/features/transfer/types';
import DateTimePicker from 'react-datetime-picker';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { Textarea } from '@/components/ui/textarea';
import { useTransfer } from '../context/TransferContext';
import TransferProductsTable from '../components/TransferProductsTable';
import { useState } from 'react';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import { TransferProductsForm } from './TransferProductsForm';

interface TransferProductsProps {
	onClose: UseModalProps['closeModal'];
}

export const TransferProducts = ({ onClose }: TransferProductsProps) => {
	// const { transfers, transferProducts, isFetching, selectedTransfer, setSelectedTransfer } = useTransfer();
	const { isOpen, openModal, closeModal } = useModal();
	const [modalAction, setModalAction] = useState<string>('');
	const { auth } = useAuth();

	// const filteredTransferProducts = transferProducts.filter((prod) => prod.transfer_id === selectedTransfer.id);

	const openTransferModal = (
		products: ITransferProductFull | ITransferProduct,
		action: string,
	) => {
		openModal();
		setModalAction(action);
	};

	return (
		<>
			{/* <TransferProductsProvider> */}
			<div className="flex flex-col gap-5">
				<TransferProductsTable openModal={openTransferModal} />
			</div>
			<ModalTest
				title={
					modalAction === 'edit'
						? 'Edit Transfer Product'
						: 'Add Transfer Product'
				}
				isOpen={isOpen}
				onClose={closeModal}
			>
				<>
					{modalAction === 'edit' && (
						<TransferProductsForm onClose={closeModal} />
					)}
					{modalAction === 'add' && (
						<TransferProductsForm onClose={closeModal} />
					)}
					{/* {(modalAction === 'add' || modalAction === 'edit') && (
							<TransferProductsForm onClose={closeModal} />
						)} */}
				</>
			</ModalTest>
		</>
	);
};
