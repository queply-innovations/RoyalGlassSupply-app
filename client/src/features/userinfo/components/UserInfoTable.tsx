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
import { Loader2, ArrowUp, ArrowDown, ArrowUpDown, MoreVertical, List } from 'lucide-react';

interface UserTableProps {
	openModal: (data: User, action: string) => void;
}

export const UserInfoTable: FC<UserTableProps> = ({ openModal }: UserTableProps) =>{
	const { users, isFetching, progress, progress2, setSelectedUser } = useUserInfo();

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
			sortingFn: "text",
			enableSorting: true,
			header: ({ column }) => {
				return (
					<div>
						<Button
							onClick={() => {
								column.toggleSorting(column.getIsSorted() === "asc"); 
							}}
							className="bg-transparent text-black flex flex-row items-center ml-auto mr-auto"
						>
							LAST NAME {column.getIsSorted() === "asc" ? <ArrowUp /> : 
										column.getIsSorted() === "desc" ? <ArrowDown /> : <ArrowUpDown />}
						</Button>
					</div>
				)
			},
			cell: ({ row }) => (
				<div className="text-center">{row.original.lastname}</div>
			),
		},

		{
			accessorKey: 'firstname',
			sortingFn: "text",
			enableSorting: true,
			header: ({ column }) => {
				return (
					<div>
						<Button
							onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
							className="bg-transparent text-black flex flex-row items-center ml-auto mr-auto"
						>
							FIRST NAME {column.getIsSorted() === "asc" ? <ArrowUp /> : 
										column.getIsSorted() === "desc" ? <ArrowDown /> : <ArrowUpDown />}
						</Button>
					</div>
				)
			},
			cell: ({ row }) => (
				<div className="text-center">{row.original.firstname}</div>
			),
		},

		{
			accessorKey: 'position',
			sortingFn: "text",
			enableSorting: true,
			header: ({ column }) => {
				return (
					<div>
						<Button
							onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
							className="bg-transparent text-black flex flex-row items-center ml-auto mr-auto"
						>
							ROLE {column.getIsSorted() === "asc" ? <ArrowUp /> : 
										column.getIsSorted() === "desc" ? <ArrowDown /> : <ArrowUpDown />}
						</Button>
					</div>
				)
			},
			cell: ({ row }) => (
				<div className="text-center">{row.original.position}</div>
			),
		},

		{
			accessorKey: 'username',
			header:	() => <div className="text-center">USERNAME</div>,
			cell: ({ row }) => (
				<div className="text-center">{row.original.username}</div>
			),
		},

		{
			accessorKey: 'contact_no',
			header:	() => <div className="text-center">CONTACT</div>,
			cell: ({ row }) => (
				<div className="text-center">{row.original.contact_no}</div>
			),
		},

		{
			accessorKey: 'email',
			header:	() => <div className="text-center">EMAIL ADDRESS</div>,
			cell: ({ row }) => (
				<div className="text-center">{row.original.email}</div>
			),
		},

		{
			// id: 'actions',
			// header:	() => <div className="text-center">ACTION</div>,
			// cell: ({ row }) => {
			// 	const userinfoRow = row.original;
			// 	return (
			// 		<div className="flex flex-row text-xs justify-center font-normal uppercase">
			// 			<Button 
			// 				fill={'yellow'} 
			// 				textColor={'black'}
			// 				onClick={() => handleEditUser(userinfoRow)}
			// 			>
			// 				Edit User
			// 			</Button>
			// 		</div>
			// 	);
			// }
			id: 'actions',
			header:	() => <div></div>,
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

								<DropdownMenuItem
									onClick={() => handleEditUser(userRow)}
									className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
								>
									<span className="flex w-6 items-center justify-center">
										<List size={16} strokeWidth={2.25} />
									</span>
									<span>Edit User</span>
								</DropdownMenuItem>

								<DropdownMenuItem
									onClick={() => handleEditPerms(userRow)}
									className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
								>
									<span className="flex w-6 items-center justify-center">
										<List size={16} strokeWidth={2.25} />
									</span>
									<span>Edit User Permission</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
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
				filterWhat={"username"}
				dataType={"User"}
				openModal={handleAddUser}
				isLoading={isFetching} />
		</>
	);
};

export default UserInfoTable;