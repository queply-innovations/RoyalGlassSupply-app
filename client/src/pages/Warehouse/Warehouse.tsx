import { Modal, Button, Inputbox } from '@/components';
import { WarehouseTable, WarehouseForm } from '@pages/Warehouse';
import LayoutWrapper from '@/layouts/Layout';
import { useWarehouses } from '@/api/Warehouse';
import { useModal } from '@/utils/Modal';

export const Warehouse = () => {
	const { isOpen, openModal, closeModal } = useModal();
	const { data } = useWarehouses();

	return (
		<>
			<LayoutWrapper>
				<div className="flex h-screen flex-col gap-y-4">
					<h1 className="page-title text-primary-dark-gray text-3xl font-bold">
						Warehouse
					</h1>
					<div className="flex flex-auto flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
						<div className="flex flex-row justify-between">
							<Inputbox
								placeholder="Search"
								variant={'searchbar'}
								buttonIcon={'outside'}
								className="w-1/2"
							/>
							<div className="flex flex-row gap-3">
								<Button fill={'green'} onClick={openModal}>
									Add Warehouse
								</Button>
							</div>
						</div>
						<div className="h-full w-full overflow-x-hidden rounded-lg border border-black/10">
							<WarehouseTable data={data} />
						</div>
					</div>
				</div>
				<Modal
					title={'Add Warehouse'}
					isOpen={isOpen}
					onClose={closeModal}
					closeButton
				>
					<WarehouseForm data={data} onClose={closeModal} />
				</Modal>
			</LayoutWrapper>
		</>
	);
};
