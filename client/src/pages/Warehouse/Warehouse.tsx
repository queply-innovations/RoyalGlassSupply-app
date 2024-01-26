import { Modal, Button, Inputbox } from '@/components';
import Pagination from '@/components/Pagination';
import { WarehouseTable, WarehouseForm } from '@pages/Warehouse';
import LayoutWrapper from '@/layouts/Layout';
import { useWarehouses, getWarehouses } from '@/api/Warehouse';
import { useModal } from '@/utils/Modal';
import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export const Warehouse = () => {
	const API_BASE_URL = 'https://65956d2504335332df82b67a.mockapi.io/rgs/api';

	const { isOpen, openModal, closeModal } = useModal();
	const [data, setData] = useState(Array<unknown>);
	const [notLoading, setNotLoading] = useState(false);

	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage] = useState(15);

	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

	useEffect(() => {
		async function gettingWarehouses(){
			try {
				const data2 = await getWarehouses();
				setData(data2.data);
				setNotLoading(true);
			} catch (error) {
				console.log(error);
			}
		}
		gettingWarehouses();
	}, []);
	
	const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
	const nPages = Math.ceil(data.length / recordsPerPage);

	const layout = (
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
					<WarehouseTable data={currentRecords} />
					<Pagination
						nPages={nPages}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
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

	return (
		<>
			<LayoutWrapper >
				{notLoading && layout}
				{notLoading && modal}
			</LayoutWrapper>
		</>
	);

	//Optional: add a loading screen
};
