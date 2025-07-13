import { useQuery } from '@tanstack/react-query';
import { fetchVouchersByCustomerId } from '../api/Vouchers';
import { Voucher } from '../types';

export const useVoucherQuery = (customerId: number | null | undefined) => {
	const { data, isFetching } = useQuery({
		queryKey: ['vouchersByCustomerId'],
		queryFn: () => {
			if (!customerId) return Promise.resolve([] as Voucher[]);
			fetchVouchersByCustomerId(customerId);
		},
		refetchOnWindowFocus: false,
	});

	return { data, isFetching };
};
