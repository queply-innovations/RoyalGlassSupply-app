import { DataTable } from '@/components/Tables/DataTable';
import { useReturns } from '../../context/ReturnsContext';
import { ReturnsTableCols } from './ReturnsTableCols';
import { useNavigate } from 'react-router-dom';

export const ReturnsTable = () => {
	const { data, isFetching } = useReturns();
	const navigate = useNavigate();

	const handleViewItems = (returnTransactionId: number) => {
		navigate(`/returns/${returnTransactionId}`);
	};

	return (
		<>
			<DataTable
				columns={ReturnsTableCols({ handleViewItems })}
				data={data ?? []}
				isLoading={isFetching}
				dataType="Returns"
				filterWhat="code"
				// openModal={() => {}}
			/>
		</>
	);
};
