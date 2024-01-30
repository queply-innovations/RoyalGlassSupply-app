import { Inputbox } from '@/components/Inputbox';
import { Button } from '@/components/Button';
import LayoutWrapper from '@/layouts/Layout';
import React, { useEffect, useState } from 'react';
import UserInfoTable from '@/components/Tables/User/__test__/UserInfoTable';
import { getUsers } from '@/api/User/Users';
import { Loading } from '@/components/Loading';

export const UserInfo = () => {
	const [data, setData] = useState(Array<unknown>);
	const [notLoading, setNotLoading] = useState(false);

	useEffect(() => {
		async function gettingUsers(){
			try {
				const data2 = await getUsers();
				setData(data2.data);
				setNotLoading(true);
				console.log(data2.data);
			} catch (error) {
				console.log(error);
			}
		}
		gettingUsers();
	}, []);

	const layout = (
		<div className="flex h-full flex-col gap-y-4">
			<h1 className="page-title text-primary-dark-gray text-3xl font-bold">
				User Info
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
						<Button fill={'green'}>Add User</Button>
						<Button fill={'red'}>Remove User</Button>
					</div>
				</div>
				<div className="h-full w-full overflow-x-hidden rounded-lg border border-black/10">
					<UserInfoTable data={data} />
				</div>
			</div>
		</div>
	);

	return (
		<>
			<LayoutWrapper>
				{!notLoading && <Loading />}
				{notLoading && layout}
			</LayoutWrapper>
		</>
	);
};
