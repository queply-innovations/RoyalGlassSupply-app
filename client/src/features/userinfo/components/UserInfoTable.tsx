import { SortIcon } from '@/assets/icons';
import { Button } from '@/components/Button';
import { DataTable } from '@/components/Tables/DataTable';
import { User } from '../types';
import { ColumnDef } from '@tanstack/react-table';
import { FC } from 'react';
import { useUserInfo } from '../context/UserInfoContext';

interface UserTableProps {
	openModal: (data: User, action: string) => void;
}

export const UserInfoTable: FC<UserTableProps> = ({ openModal }: UserTableProps) =>{
	const { users, isFetching, progress, setSelectedUser } = useUserInfo();

	const handleEditUser = (user: User) => {
		setSelectedUser(user);
		openModal(user, 'edit');
	};
	
	const UserInfoTableHeader: ColumnDef<User>[] = [
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
							className="bg-transparent text-black flex flex-row items-center ml-auto mr-auto"
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
							className="bg-transparent text-black flex flex-row items-center ml-auto mr-auto"
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
						<Button fill={'yellow'} textColor={'black'} onClick={() => handleEditUser(userinfoRow)}>
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
				data={users}
				columns={UserInfoTableHeader}
				filterWhat={"lastname"}
				dataType={"User"}
				openModal={openModal}
				isLoading={isFetching}
				progress={progress} />
		</>
	);
};

export default UserInfoTable;