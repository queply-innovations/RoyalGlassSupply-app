import { Button } from '@/components/Button';
import { useQuery } from '@tanstack/react-query';

import axios from 'axios';
import { FC, useState } from 'react';

interface UserTableProps {
	data: any;
	roles: any,
}

export const UserInfoTable: FC<UserTableProps> = ({ data, roles }) =>{
	const userInfoTableHeader: string[] = [
		'',
		'Complete Name',
		'Role',
		'Username',
		'Contact',
		'Email Address',
		'Action',
	];

	type UserInfo = {
		id: number;
		name: string;
		location: string;
	};

	const UserInfoTableHeader: ColumnDef<Warehouse>[] = [
		{
			id: "select",
			header: ({ table }) => (
				<input type="checkbox" 
					checked={table.getIsAllPageRowsSelected()}
					onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<input type="checkbox" 
					checked={row.getIsSelected()}
					onChange={(e) => row.toggleSelected(!!e.target.checked)}
					aria-label="Select row"
					className="justify-center"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},

		{
			accessorKey: 'id',
			header:	() => <div className='justify-center'>WAREHOUSE ID</div>,
		},

		{
			accessorKey: 'name',
			header: ({ column }) => {
				return (
					<div className='justify-center'>
						<Button
							onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
							className="bg-transparent text-black flex flex-row"
						>
							WAREHOUSE NAME <SortIcon />
						</Button>
					</div>
				)
			},
		},

		{
			accessorKey: 'location',
			header:	() => <div className='justify-center'>LOCATION</div>,
		},

		{
			id: 'actions',
			header:	() => <div className='flex flex-row justify-center'>ACTIONS</div>,
			cell: ({ row }) => {
				const warehouseRow = row.original;
				return (
					<div className="flex flex-row justify-center text-xs font-normal uppercase">
						<Button
							fill="empty"
							textColor={'black'}
							onClick={() => handleEditWarehouse(warehouseRow)}
							className="flex flex-row items-center gap-2"
						>
							<FaPencilAlt /> Edit
						</Button>
						<Button
							fill={'red'}
							onClick={() => handleRemoveWarehouse(warehouseRow)}
						>
							Remove
						</Button>
					</div>
				);
			}
		}

	];

	return (
		<>
			<table className="w-full overflow-y-scroll">
				<thead className="table-head border-b border-black/10 bg-white ">
					<tr>
						{userInfoTableHeader.map(header => (
							<th
								key={header}
								className="py-5 text-xs font-bold uppercase"
							>
								{header}
							</th>
						))}
					</tr>
				</thead>

				<tbody className="bg-primary-white h-full overflow-y-auto">
					{data?.map((userInfo: any) => {
						const personRole = roles.find(role => role.user_id === userInfo.id);
						return (
							<tr key={userInfo.id} className="text-center">
								<td className="w-16">
									<input type="checkbox" />
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									<span>
										{`${userInfo.lastname}, ${userInfo.firstname}`}
									</span>
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									{personRole ? personRole.role.title : 'No Role'}
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									{userInfo.username}
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									{userInfo.contact_no}
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									{userInfo.email}
								</td>
								<td className="py-2 text-xs font-normal uppercase">
									<Button fill={'yellow'} textColor={'black'}>
										Edit User
									</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

export default UserInfoTable;
