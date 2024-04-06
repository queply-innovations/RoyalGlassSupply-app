import { Navbar } from '@/features/pos/__test__/components/Navbar/Navbar';
import { ReturnTable } from '@/features/pos/__test__/components/Table/ReturnTable';

export const PosReturnsPage = () => {
	return (
		<>
			<div className="flex flex-row">
				<Navbar />
				<div id="main" className="flex w-screen flex-row">
					<div className="flex flex-1 flex-col gap-6 p-6">
						<div className="flex w-full flex-row justify-between">
							<h1 className="text-primary-dark-gray text-2xl font-bold">
								Return Item
							</h1>
						</div>
						<ReturnTable />
					</div>
				</div>
			</div>
		</>
	);
};
