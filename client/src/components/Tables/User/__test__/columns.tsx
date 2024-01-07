import { Button } from '@/components/Button';
import { createColumnHelper } from '@tanstack/react-table';

export const columnDef = [
	{
		id: 'checkbox',
		width: 50,
		Cell: (row: JSX.Element) => {
			return <input type="checkbox" className="" />;
		},
	},
	{
		Header: 'Complete Name',
		accessorFn: (row: string) => `${row.last_name} ${row.first_name}`,
	},
	{
		Header: 'Role',
		accessor: 'role',
	},
	{
		Header: 'Username',
		accessor: 'username',
	},
	{
		Header: 'Contact',
		accessor: 'contact_number',
	},
	{
		Header: 'Emergency #',
		accessor: 'emergency_number',
	},
	{
		Header: 'Action',
		accessor: 'action',
		Cell: () => {
			return (
				<Button fill={'yellow'} textColor={'black'}>
					Edit User
				</Button>
			);
		},
	},
];
