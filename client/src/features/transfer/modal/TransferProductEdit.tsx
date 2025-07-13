import { UseModalProps } from '@/utils/Modal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TransferItemTab } from './tabs/TransferItemTab';
import { useTransfer } from '../context/TransferContext';
import { useProductAddition } from '../hooks';

interface TransferFormProps {
	onClose: UseModalProps['closeModal'];
}

export const TransferProductEdit = ({ onClose }: TransferFormProps) => {
	return (
		<>
			<TransferItemTab onClose={onClose} />
		</>
	);
};
