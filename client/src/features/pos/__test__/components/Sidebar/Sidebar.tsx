import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { usePos } from '../../context/__test__/PosContext';
import { SearchCustomer } from '@/features/customer/__test__/components/SearchCustomer';
import { CustomerInfo } from './Customer/CustomerInfo';

interface SidebarProps {}

export const Sidebar = ({}: SidebarProps) => {
	const { auth } = useAuth();
	const { setFilter } = usePos();
	return (
		<div className="bg-pos-primary-background flex w-full max-w-[350px] flex-col gap-2 p-4">
			{auth.role === 'admin' ? (
				<>
					<Tabs
						defaultValue="CDO"
						onValueChange={(value: string) => {
							if (value === 'ILI') {
								setFilter({
									approval_status: 'approved',
									warehouse_id: 2,
								});
							}
							if (value === 'CDO') {
								setFilter({
									approval_status: 'approved',
									warehouse_id: 1,
								});
							}
						}}
					>
						<TabsList className="flex flex-row">
							<TabsTrigger
								value="CDO"
								className="data-[state=active]:bg-primary w-full rounded-md
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
			{/* <Button
				onClick={() =>
					setFilter({ approval_status: 'approved', warehouse_id: 2 })
				}
			>
				2
			</Button> */}
			<SearchCustomer />
			<CustomerInfo />
			{/* <TotalItems />
			<Payment /> */}
		</div>
	);
};
