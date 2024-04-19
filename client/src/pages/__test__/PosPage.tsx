import { Navbar } from '@/features/pos/__test__/components/Navbar/Navbar';
import { CreateOrderTable } from '@/features/pos/__test__/components/Table/CreateOrderTable';
import { Sidebar } from '@/features/pos/__test__/components/Sidebar/Sidebar';
import { usePos } from '@/features/pos/__test__/context/__test__/PosContext';
import { SearchProducts } from '@/features/pos/__test__/components/SearchProducts';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface PointOfSalePageProps {}

export const PointOfSalePage = ({}: PointOfSalePageProps) => {
	const { selectedWarehouse, setSelectedWarehouse } = usePos();
	const navigate = useNavigate();
	useEffect(() => {
		if (selectedWarehouse === '') {
			navigate('/pos');
		}
	}, []);
	return (
		<>
			<div className="flex flex-row">
				<Navbar />
				<div id="main" className="flex w-screen flex-row">
					<div className="flex flex-1 flex-col gap-6 p-6">
						<SearchProducts />
						<CreateOrderTable />
					</div>
					<Sidebar />
				</div>
			</div>
		</>
	);
};
