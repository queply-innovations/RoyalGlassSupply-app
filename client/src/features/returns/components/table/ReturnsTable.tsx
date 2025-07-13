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
				data={
					data
						? data.sort((a, b) => {
								return (
									new Date(b.created_at).getTime() -
									new Date(a.created_at).getTime()
								);
							})
						: []
				}
				isLoading={isFetching}
				dataType="Returns"
				filterWhat="code"
				// openModal={() => {}}
			/>
		</>
	);
};
