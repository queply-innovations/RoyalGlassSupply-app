import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { CustomerForm } from '../Form/CustomerForm';
import { SidebarPopover } from './SidebarPopover';
import { useAuth } from '@/context/AuthContext';
import { usePos } from '../../context/PosContext';
import { Button } from '@/components/ui/button';
import { useInvoice } from '@/features/invoice/__test__/context/InvoiceContext';

interface SidebarProps {}

export const Sidebar = ({}: SidebarProps) => {
	const { auth } = useAuth();
	const { selectedProducts, selectWarehouse, selectedWarehouse } = usePos();
	const { generateInvoice } = useInvoice();
	return (
		<div className="bg-pos-primary-background flex w-full max-w-[350px] flex-col p-4">
			{auth.role === 'admin' ? (
				<>
					<Tabs
						defaultValue={selectedWarehouse.code}
						onValueChange={(value: string) => {
							if (value === 'ILI') {
								selectWarehouse({ id: 2, code: value });
							}
							if (value === 'CDO') {
								selectWarehouse({ id: 1, code: value });
							}
						}}
					>
						<TabsList className="flex flex-row">
							<TabsTrigger
								value="CDO"
								className="data-[state=active]:bg-primary w-full rounded-l-md rounded-r-none
                                text-slate-800 hover:bg-slate-200 data-[state=active]:text-white"
							>
								CDO
							</TabsTrigger>
							<TabsTrigger
								value="ILI"
								className="data-[state=active]:bg-primary w-full rounded-l-none rounded-r-md  text-slate-800 hover:bg-slate-200 data-[state=active]:text-white"
							>
								ILI
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</>
			) : null}
			<SidebarPopover />
			<CustomerForm />

			<Button
				onClick={() => {
					console.log('selected Products:', selectedProducts);
				}}
			>
				TEST PRODUCTS
			</Button>
			<Button
				onClick={() => {
					console.log('Invoice:', generateInvoice(selectedWarehouse));
				}}
			>
				TEST Invoice
			</Button>
		</div>
	);
};
