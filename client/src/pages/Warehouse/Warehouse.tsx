import { Modal, Button, Inputbox, Pagination, ProgressBar } from '@/components';
// import Pagination from '@/components/Pagination';
import { WarehouseTable, WarehouseForm } from '@pages/Warehouse';
import LayoutWrapper from '@/layouts/Layout';
import { getWarehouses } from '@/features/auth/api/getWarehouses';
import { useModal } from '@/utils/Modal';
import { FC, useEffect, useState } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';

export const Warehouse = () => {

	const { isOpen, openModal, closeModal } = useModal();
	const [data, setData] = useState(Array<unknown>);
	const [notLoading, setNotLoading] = useState(false);

	useEffect(() => {
		async function gettingWarehouses(){
			try {
				const data2 = await getWarehouses();
				setData(data2.data.data);
				setNotLoading(true);
			} catch (error) {
				console.log(error);
			}
		}
		gettingWarehouses();
	}, []);

	const layout = (
		<div className="flex h-screen flex-col gap-y-4">
			<h1 className="page-title text-primary-dark-gray text-3xl font-bold">
				Warehouse
			</h1>
			<div className="flex flex-auto flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
				<div className="h-full w-full overflow-x-hidden rounded-lg border border-black/10">
					<WarehouseTable data={data} />
				</div>
			</div>
		</div>
	);

	const modal = (
		<Modal
			title={'Add Warehouse'}
			isOpen={isOpen}
			onClose={closeModal}
			closeButton
		>
			<WarehouseForm data={data} onClose={closeModal} />
			
		</Modal>
	);

	const loading = (
		<div className="flex w-full h-full flex-col items-center justify-center space-y-0 px-20">
			<ProgressBar />
			<h2 className="text-primary-dark-gray text-2xl font-bold pb-5">
				Loading Warehouses...
			</h2>
		</div>
	);

	return (
		<>
			<LayoutWrapper >
				{!notLoading && loading}
				{notLoading && layout}
				{/* {notLoading && modal} */}
			</LayoutWrapper>
		</>
	);

	//Optional: add a loading screen
};
