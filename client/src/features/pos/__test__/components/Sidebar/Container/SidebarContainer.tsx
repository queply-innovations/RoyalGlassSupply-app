import { SearchCustomer } from '@/features/customer/__test__/components/SearchCustomer';
import { SidebarWarehouseContainer } from './SidebarWarehouseContainer';
import { CustomerInfoContainer } from './CustomerInfoContainer';
import { DialogButtonsContainer } from './DialogButtonsContainer';
import { PaymentInfoContainer } from './PaymentInfoContainer';

export const SidebarContainer = () => {
	return (
		<>
			<div className="bg-pos-primary-background flex h-screen w-full max-w-[375px] flex-col gap-2 overflow-auto p-5">
				<div className="flex flex-col rounded-md bg-white p-2 px-4">
					<SidebarWarehouseContainer />
					<SearchCustomer />
					<CustomerInfoContainer />
					<PaymentInfoContainer />
					<DialogButtonsContainer />
				</div>
			</div>
		</>
	);
};
