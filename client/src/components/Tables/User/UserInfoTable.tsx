import { SortIcon } from '@/assets/icons';
import { Button } from '@/components/Button';
import { User } from '@/entities';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { FC, useState } from 'react';
import { DataTable } from '../DataTable';
import { StringValidation } from 'zod';

interface UserTableProps {
	data: any;
	openModal: (data: User, action: string) => void;
}

export const UserInfoTable: FC<UserTableProps> = ({ data, openModal }) =>{
	type UserInfo = {
		id: number;
		lastname: string;
		firstname: string;
		position: string;
		username: string;
		contact_no: string;
		email: string;
	};

	const UserInfoTableHeader: ColumnDef<UserInfo>[] = [
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
			accessorKey: 'lastname',
			header: ({ column }) => {
				return (
					<div>
						<Button
							onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
							className="bg-transparent text-black flex flex-row"
						>
							LAST NAME <SortIcon />
						</Button>
					</div>
				)
			},
		},

		{
			accessorKey: 'firstname',
			header: ({ column }) => {
				return (
					<div>
						<Button
							onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
							className="bg-transparent text-black flex flex-row"
						>
							FIRST NAME <SortIcon />
						</Button>
					</div>
				)
			},
		},

		{
			accessorKey: 'position',
			header:	() => <div>ROLE</div>,
		},

		{
			accessorKey: 'username',
			header:	() => <div>USERNAME</div>,
		},

		{
			accessorKey: 'contact_no',
			header:	() => <div>CONTACT</div>,
		},

		{
			accessorKey: 'email',
			header:	() => <div>EMAIL ADDRESS</div>,
		},

		{
			id: 'actions',
			header:	() => <div>ACTION</div>,
			cell: ({ row }) => {
				const userinfoRow = row.original;
				return (
					<div className="flex flex-row text-xs font-normal uppercase">
						<Button fill={'yellow'} textColor={'black'}>
							Edit User
						</Button>
					</div>
				);
			}
		}

	];

	return (
		<>
			<DataTable
				data={data}
				columns={UserInfoTableHeader}
				filterWhat={"lastname"}
				dataType={"User"}
				openModal={openModal} />
		</>
	);
};

export default UserInfoTable;