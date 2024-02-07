import { Button } from '@/components/Button';
import { Inputbox } from '@/components/Inputbox';
import UserInfoTable from '@/components/Tables/User/__test__/UserInfoTable';
import LayoutWrapper from '@/layouts/Layout';
import React from 'react';

export const Transfer = () => {
	return (
		<LayoutWrapper>
			<div className="flex flex-auto flex-col gap-y-4">
				<h1 className="page-title text-primary-dark-gray text-3xl font-bold">
					Add Transfer
				</h1>
				<div className="flex h-full flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
					<div className="flex flex-row justify-between">
						<Inputbox
							placeholder="Search"
							variant={'searchbar'}
							buttonIcon={'outside'}
							className="w-1/2"
						/>
					</div>
					<div className="flex h-full w-full rounded-lg ">
						<UserInfoTable />
						<div className="bg-primary-white flex h-full w-[30%] flex-col items-center justify-between rounded-md border border-black/10 p-4">
							<p className="add-transfer-receipt-title font-Inter text-base font-light uppercase">
								Item Review
							</p>
							<div className="add-transfer-receipt-table h-full w-full overflow-y-auto"></div>
							<div className="add-transfer-receipt-total-container border-primary-dark-gray flex w-full flex-col gap-y-12 border-t">
								<div className="add-transfer-receipt-total flex w-full flex-row justify-between">
									<p className="add-transfer-receipt-total-title font-Inter text-base font-light uppercase">
										Total
									</p>
									<span className="add-transfer-receipt-total-amount text-lg font-bold">
										999.00
									</span>
								</div>
								<Button fill={'green'}>Produce Receipt</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</LayoutWrapper>
	);
};
