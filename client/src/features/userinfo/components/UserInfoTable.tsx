import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components';
import { DataTable } from '@/components/Tables/DataTable';
import { User } from '../types';
import { ColumnDef } from '@tanstack/react-table';
import { FC } from 'react';
import { useUserInfo } from '../context/UserInfoContext';
import {
	ArrowUp,
	ArrowDown,
	ArrowUpDown,
	MoreVertical,
	List,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface UserTableProps {
	openModal: (data: User, action: string) => void;
}

export const UserInfoTable: FC<UserTableProps> = ({
	openModal,
}: UserTableProps) => {
	const { permissionListNames } = useAuth();
	const { users, isFetching, setSelectedUser } = useUserInfo();

	const handleEditUser = (user: User) => {
		setSelectedUser(user);
		openModal(user, 'edit');
	};

	const handleEditPerms = (user: User) => {
		setSelectedUser(user);
		openModal(user, 'editPerms');
	};

	const handleAddUser = () => {
		openModal({} as User, 'add');
	};

	const UserInfoTableHeader: ColumnDef<User>[] = [
		{
			accessorKey: 'lastname',
			sortingFn: 'text',
			enableSorting: true,
			header: ({ column }) => {
				return (
					<div>
						<Button
							onClick={() => {
								column.toggleSorting(column.getIsSorted() === 'asc');
							}}
							className="ml-auto mr-auto flex flex-row items-center bg-transparent text-black"
						>
							LAST NAME{' '}
							{column.getIsSorted() === 'asc' ? (
								<ArrowUp />
							) : column.getIsSorted() === 'desc' ? (
								<ArrowDown />
							) : (
								<ArrowUpDown />
							)}
						</Button>
					</div>
				);
			},
			cell: ({ row }) => (
				<div className="text-center">{row.original.lastname}</div>
			),
		},

		{
			accessorKey: 'firstname',
			sortingFn: 'text',
			enableSorting: true,
			header: ({ column }) => {
				return (
					<div>
						<Button
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === 'asc')
							}
							className="ml-auto mr-auto flex flex-row items-center bg-transparent text-black"
						>
							FIRST NAME{' '}
							{column.getIsSorted() === 'asc' ? (
								<ArrowUp />
							) : column.getIsSorted() === 'desc' ? (
								<ArrowDown />
							) : (
								<ArrowUpDown />
							)}
						</Button>
					</div>
				);
			},
			cell: ({ row }) => (
				<div className="text-center">{row.original.firstname}</div>
			),
		},

		{
			accessorKey: 'position',
			sortingFn: 'text',
			enableSorting: true,
			header: ({ column }) => {
				return (
					<div>
						<Button
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === 'asc')
							}
							className="ml-auto mr-auto flex flex-row items-center bg-transparent text-black"
						>
							ROLE{' '}
							{column.getIsSorted() === 'asc' ? (
								<ArrowUp />
							) : column.getIsSorted() === 'desc' ? (
								<ArrowDown />
							) : (
								<ArrowUpDown />
							)}
						</Button>
					</div>
				);
			},
			cell: ({ row }) => (
				<div className="text-center">{row.original.position}</div>
			),
		},

		{
			accessorKey: 'username',
			header: () => <div className="text-center">USERNAME</div>,
			cell: ({ row }) => (
				<div className="text-center">{row.original.username}</div>
			),
		},

		{
			accessorKey: 'email',
			header: () => <div className="text-center">EMAIL ADDRESS</div>,
			cell: ({ row }) => (
				<div className="text-center">{row.original.email}</div>
			),
		},

		{
			id: 'actions',
			header: () => <div></div>,
			cell: ({ row }) => {
				const userRow = row.original;
				return (
					<div className="flex flex-row text-xs font-normal uppercase">
						<DropdownMenu>
							<DropdownMenuTrigger className="overflow-clip rounded-full bg-gray-100 p-1.5 hover:bg-gray-300">
								<MoreVertical size={16} strokeWidth={2.25} />
							</DropdownMenuTrigger>
							<DropdownMenuContent className="relative z-50 w-44 bg-white">
								<DropdownMenuLabel>Actions</DropdownMenuLabel>
								<DropdownMenuSeparator className="bg-gray-200" />

								{permissionListNames?.includes('modify_users') && (
									<DropdownMenuItem
										onClick={() => handleEditUser(userRow)}
										className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
									>
										<span className="flex w-6 items-center justify-center">
											<List size={16} strokeWidth={2.25} />
										</span>
										<span>Edit User</span>
									</DropdownMenuItem>
								)}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				);
			},
		},
	];

	return (
		<>
			<DataTable
				data={users}
				columns={UserInfoTableHeader}
				filterWhat={'username'}
				dataType={'User'}
				openModal={
					permissionListNames?.includes('manage_users')
						? handleAddUser
						: undefined
				}
				isLoading={isFetching}
			/>
		</>
	);
};

export default UserInfoTable;
