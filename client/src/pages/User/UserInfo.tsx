import { Inputbox } from '@/components/Inputbox';
import { Button } from '@/components/Button';
import LayoutWrapper from '@/layouts/Layout';
import React, { useEffect, useState } from 'react';
import UserInfoTable from '@/components/Tables/User/UserInfoTable';
import { getRoles, getUsers } from '@/features/auth/api/getUser';
import { ProgressBar } from '@/components';

export const UserInfo = () => {
	const [data, setData] = useState(Array<unknown>);
	const [notLoading, setNotLoading] = useState(false);

	useEffect(() => {
		async function gettingUsers() {
			try {
				const data2 = await getUsers();
				setData(data2.data.data);
				setNotLoading(true);
				// console.log(roles);
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
				<div className="h-full w-full overflow-x-hidden rounded-lg border border-black/10">
					<UserInfoTable data={data} />
				</div>
			</div>
		</div>
	);

	const loading = (
		<div className="flex h-full w-full flex-col items-center justify-center space-y-0 px-20">
			<ProgressBar />
			<h2 className="text-primary-dark-gray pb-5 text-2xl font-bold">
				Loading Users...
			</h2>
		</div>
	);

	return (
		<>
			<LayoutWrapper>
				{!notLoading && loading}
				{notLoading && layout}
			</LayoutWrapper>
		</>
	);
};
