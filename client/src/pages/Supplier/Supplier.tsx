import LayoutWrapper from '@/layouts/Layout';
import { useSupplier } from '@/utils/api/Supplier';
import { Button, Modal, Inputbox } from '@/components';
import { useModal } from '@/utils/Modal';
import { SupplierForm, SupplierTable } from '@/pages';

export const Supplier = () => {
	const { data: supplier } = useSupplier();
	const { isOpen, openModal, closeModal } = useModal();

	return (
		<>
			<LayoutWrapper>
				<div className="flex h-full flex-col gap-y-4">
					<h1 className="page-title text-primary-dark-gray text-3xl font-bold">
						Supplier
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
									Add Supplier
								</Button>
							</div>
						</div>
						<div className="h-full w-full overflow-x-hidden rounded-lg border border-black/10">
							<SupplierTable data={supplier} />
						</div>
					</div>
				</div>
				<Modal
					title={'Add Warehouse'}
					isOpen={isOpen}
					onClose={closeModal}
					closeButton
				>
					<SupplierForm data={supplier} onClose={closeModal} />
				</Modal>
			</LayoutWrapper>
		</>
	);
};
