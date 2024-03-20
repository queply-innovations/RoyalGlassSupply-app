import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { CustomerForm } from '../Form/CustomerForm';
import { TotalItems } from './TotalItems';
import { useAuth } from '@/context/AuthContext';
import { usePos } from '../../context/PosContext';
import { Payment } from './Payment';
import { SearchCustomer } from '@/features/customer/__test__/components/SearchCustomer';
import { CustomerInfo } from './Customer/CustomerInfo';

interface SidebarProps {}

export const Sidebar = ({}: SidebarProps) => {
	const { auth } = useAuth();
	const { setSelectedProducts, selectWarehouse, selectedWarehouse } = usePos();
	return (
		<div className="bg-pos-primary-background flex w-full max-w-[350px] flex-col gap-2 p-4">
			{auth.role === 'admin' ? (
				<>
					<Tabs
						defaultValue={selectedWarehouse.code}
						onValueChange={(value: string) => {
							if (value === 'ILI') {
								selectWarehouse({ id: 2, code: value });
								setSelectedProducts([]);
							}
							if (value === 'CDO') {
								selectWarehouse({ id: 1, code: value });
								setSelectedProducts([]);
							}
						}}
					>
						<TabsList className="flex flex-row">
							<TabsTrigger
								value="CDO"
								className="data-[state=active]:bg-primary w-full  rounded-md
                                text-slate-800 hover:bg-slate-200 data-[state=active]:text-white"
							>
								CDO
							</TabsTrigger>
							<TabsTrigger
								value="ILI"
								className="data-[state=active]:bg-primary w-full rounded-md text-slate-800 hover:bg-slate-200 data-[state=active]:text-white"
							>
								ILI
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</>
			) : null}
			<SearchCustomer />
			<CustomerInfo />
			<TotalItems />
			<Payment />
		</div>
	);
};
