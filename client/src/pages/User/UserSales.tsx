import { Inputbox } from '@/components/Inputbox';
import LayoutWrapper from '@/layouts/Layout';
import { Selectbox } from '@/components/Selectbox';
import UserSalesTable from '@/components/Tables/User/__test__/UserSalesTable';

export const UserSales = () => {
	const saleFrequency = ['Daily', 'Weekly', 'Monthly', 'Yearly'];
	return (
		<>
			<LayoutWrapper>
				<div className="flex h-full flex-col gap-y-4">
					<h1 className="page-title text-primary-dark-gray text-3xl font-bold">
						User Sales
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
								<div className="bg-primary-white flex flex-row gap-2 rounded border border-black/10 p-3">
									<Selectbox
										options={saleFrequency}
										className="w-32"
									/>
								</div>
							</div>
						</div>
						<div className="h-full w-full overflow-x-hidden rounded-lg border border-black/10">
							<UserSalesTable />
						</div>
					</div>
				</div>
			</LayoutWrapper>
		</>
	);
};
