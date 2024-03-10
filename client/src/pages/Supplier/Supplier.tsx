import LayoutWrapper from '@/layouts/Layout';
import { getSuppliers } from '@/features/auth/api/getSuppliers';
import { Button, Modal, Inputbox } from '@/components';
import { useModal } from '@/utils/Modal';
import { SupplierForm, SupplierTable } from '@/pages';
import { useEffect, useState } from 'react';

export const Supplier = () => {
	const [data, setData] = useState(Array<unknown>);
	const [notLoading, setNotLoading] = useState(false);
	const { isOpen, openModal, closeModal } = useModal();

	useEffect(() => {
		async function gettingSuppliers() {
			try {
				const data2 = await getSuppliers();
				setData(data2.data.data);
				setNotLoading(true);
			} catch (error) {
				console.log(error);
			}
		}
		gettingSuppliers();
	}, []);

	return (
		<>
			<LayoutWrapper>
				<div className="flex h-full flex-col gap-y-4">
					<h1 className="page-title text-primary-dark-gray text-3xl font-bold">
						Supplier
					</h1>
					<div className="flex flex-auto flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
						<div className="h-full w-full overflow-x-hidden rounded-lg border border-black/10">
							<SupplierTable data={data} onOpen={openModal}/>
						</div>
					</div>
				</div>
				<Modal
					title={'Add Supplier'}
					isOpen={isOpen}
					onClose={closeModal}
					closeButton
				>
					<SupplierForm data={data} onClose={closeModal} />
				</Modal>
			</LayoutWrapper>
		</>
	);
};
