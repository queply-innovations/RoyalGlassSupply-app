import { Modal, Button, Inputbox } from '@/components';
import Pagination from '@/components/Pagination';
import { WarehouseTable, WarehouseForm } from '@pages/Warehouse';
import LayoutWrapper from '@/layouts/Layout';
import { useWarehouses } from '@/utils/api/Warehouse';
import { useModal } from '@/utils/Modal';
import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

interface WarehouseProps {
	state: Array<unknown>;
}

export const Warehouse: FC<WarehouseProps> = () => {
	const location = useLocation();
	const { from } = location.state
	console.log(from);

	const { isOpen, openModal, closeModal } = useModal();
	const [data, setData] = useState([]);
	const { isLoading } = useWarehouses();

    const [loading, setLoading] = useState(true);

	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage] = useState(15);

	const [indexOfLastRecord, setIndexOfLastRecord] = useState(1);
	const [indexOfFirstRecord, setIndexOfFirstRecord] = useState(1);
	const [currentRecords, setCurrentRecords] = useState();
	const [nPages, setNPages] = useState(1);

	// useEffect(() => {
	// 	try {
	// 		const {data : data2} = useWarehouses();
	// 		setData(data2);
	// 		console.log(data);
	// 		setLoading(false);

	// 		console.log(recordsPerPage);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }, [])

	// useEffect(() => {
	// 	axios.get('https://65956d2504335332df82b67a.mockapi.io/rgs/api/Warehouse')
	// 		.then(res => {
	// 				setData(res.data);
	// 				setLoading(false);

	// 				console.log(loading);

	// 				if (loading == false){
	// 					console.log("second phase");
	// 				}

	// 			})
	// 			.catch(() => {
	// 				console.log('There was an error while retrieving the data')
	// 			})
	// }, [])

	// useEffect(() => {
	// 	setIndexOfLastRecord(currentPage * recordsPerPage);
	// 	setIndexOfFirstRecord(indexOfLastRecord - recordsPerPage);
	// 	setCurrentRecords(data.slice(indexOfFirstRecord, indexOfLastRecord));
	// 	setNPages(Math.ceil(data.length / recordsPerPage));
	// }, [])
	
	// const indexOfLastRecord = currentPage * recordsPerPage;
	// const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	// const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
	// const nPages = Math.ceil(data.length / recordsPerPage)

	return (
		<>
			<LayoutWrapper state={from}>
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
							{isLoading && (
								<></>
							)}
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
