import { Inputbox } from '@/components/Inputbox';
import LayoutWrapper from '@/layouts/Layout';

export const Supplier = () => {
	return (
		<>
			<LayoutWrapper>
				<div className="flex h-full flex-col gap-y-4">
					<h1 className="page-title text-primary-dark-gray text-3xl font-bold">
						Supplier
					</h1>
					<div className="flex flex-auto flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
						<div className="flex flex-row justify-between">
							<Inputbox
								placeholder="Search"
								variant={'searchbar'}
								buttonIcon={'outside'}
								className="w-1/2"
							/>
						</div>
						<div className="h-full w-full overflow-x-hidden rounded-lg border border-black/10">
							{/* <UserSalesTable /> */}
						</div>
					</div>
				</div>
			</LayoutWrapper>
		</>
	);
};
