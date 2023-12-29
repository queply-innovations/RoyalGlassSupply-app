import { Inputbox } from '@/components/Inputbox';
import { Button } from '@/components/Button';
import LayoutWrapper from '@/layouts/Layout';
import React from 'react';
import UserInfoTable from '@/components/Tables/User/__test__/UserInfoTable';

export const UserInfo = () => {
	return (
		<>
			<LayoutWrapper>
				<div className="flex flex-auto flex-col gap-y-4">
					<h1 className="page-title text-primary-dark-gray text-3xl font-bold">
						User Info
					</h1>
					<div className="flex h-full flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
						<div className="flex flex-row justify-between">
							<Inputbox
								placeholder="Search"
								variant={'searchbar'}
								buttonIcon={'outside'}
								className="w-1/2"
							/>
							<div className="flex flex-row gap-3">
								<Button fill={'green'}>Add User</Button>
								<Button fill={'red'}>Remove User</Button>
							</div>
						</div>
						<div className="flex h-full w-full rounded-lg border border-black/10">
							<UserInfoTable />
						</div>
					</div>
				</div>
			</LayoutWrapper>
		</>
	);
};
