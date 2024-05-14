import { UseModalProps } from '@/utils/Modal';
import { useNewTransfer } from '../context/NewTransferContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DetailsTab } from './tabs/DetailsTab';

interface TransferFormProps {
	onClose: UseModalProps['closeModal'];
}

export const TransferForm2 = ({ onClose }: TransferFormProps) => {
	const { newTransfer, activeTab, setActiveTab } = useNewTransfer();

	return (
		<>
			<Tabs
				value={activeTab}
				onValueChange={value => setActiveTab(value)}
				className="w-full"
			>
				<TabsList className="mb-4 flex w-full">
					<TabsTrigger value="details" className="flex-1 font-semibold">
						Details
					</TabsTrigger>
					<TabsTrigger
						value="items"
						className="flex-1 font-semibold"
						disabled={
							!newTransfer.source ||
							!newTransfer.destination ||
							!newTransfer.transfer_schedule
						}
					>
						Items
					</TabsTrigger>
				</TabsList>

				<TabsContent value="details" className="min-w-[540px]">
					<DetailsTab onClose={onClose} />
				</TabsContent>
			</Tabs>
		</>
	);
};
