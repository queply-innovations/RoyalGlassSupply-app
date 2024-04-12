import { Button } from '@/components/Button';
import { DataTable } from '@/components/Tables/DataTable';
import {
	Expenses,
	ExpensesRaw
} from '../../types';
import { ColumnDef } from '@tanstack/react-table';
import { FC, useEffect, useState } from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components';

import {
	MoreVertical,
	Pencil,
	List,
	ArrowDown,
	ArrowUp,
	ArrowUpDown,
	Ban,
	Check,
	Clock,
} from 'lucide-react';
import { useExpenses } from '../../context';
import { set } from 'date-fns';
import { FaPencilAlt } from 'react-icons/fa';

interface ExpensesTableProps {
	openModal: (data: ExpensesRaw[] | Expenses, action: string) => void;
}

export const ExpensesTable: FC<ExpensesTableProps> = ({ openModal }: ExpensesTableProps) =>{
	const { expenses,
		isFetching,
		selectedExpenses,
		setSelectedExpenses,
		dateToday } = useExpenses();

	const handleAddExpenses = () => {
		openModal({} as Expenses, 'add');
	};

	const handleEditExpenses = (expenses: ExpensesRaw[]) => {
		setSelectedExpenses(expenses[0]);
		openModal(expenses, 'edit');
	};
	
	const ExpensesTableHeader: ColumnDef<ExpensesRaw>[] = [
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
			accessorKey: 'date_of_operation',
			sortingFn: "datetime",
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
							DATE OF OPERATION {column.getIsSorted() === "asc" ? <ArrowUp /> : 
										column.getIsSorted() === "desc" ? <ArrowDown /> : <ArrowUpDown />}
						</Button>
					</div>
				)
			},
			cell: ({ row }) => {
				const sched: any = row.getValue('date_of_operation');
				if (sched.toString() !== '0000-00-00') {
					const details = { 
						year: 'numeric', 
						month: 'long', 
						day: 'numeric' };
					const format = new Date(sched).toLocaleDateString([], details);
					return (
						<div className="text-center">{format}</div>
					);
				} else {
					return (
						<div className="text-center">N/A</div>
					);
				}
			},
		},

		{
			accessorKey: 'title',
			header:	({ column }) => {
				return ( <div className="text-center"> TITLE </div> );
			},
			cell: ({ row }) => {
				return(
					<div className="text-center">
						{row.original.title}
					</div>
				);
			},
		},

		{
			accessorKey: 'amount',
			header:	({ column }) => {
				return ( <div className="text-center"> AMOUNT </div> );
			},
			cell: ({ row }) => {
				const formatted = new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "PHP",
				}).format(row.original.amount);

				return(
					<div className="text-center">
						{formatted}
					</div>
				);
			},
		},

		{
			accessorKey: 'notes',
			header:	({ column }) => {
				return ( <div className="text-center"> NOTES </div> );
			},
			cell: ({ row }) => {
				return(
					<div className="text-center">
						{row.original.notes}
					</div>
				);
			},
		},

		{
			accessorKey: 'created_by',
			header:	({ column }) => {
				return ( <div className="text-center"> CREATED BY </div> );
			},
			cell: ({ row }) => {
				return(
					<div className="text-center">
						{row.original.created_by.firstname} {row.original.created_by.lastname}
					</div>
				);
			},
		},

		{
			id: 'actions',
			header: () => (
				<div className="flex flex-row justify-center">ACTIONS</div>
			),
			cell: ({ row }) => {
				const expensesRow = row.original;
				if (expensesRow.date_of_operation === dateToday) {
					return (
						<div className="flex flex-row justify-center text-xs font-normal uppercase">
							<Button
								fill="empty"
								textColor={'black'}
								onClick={() => handleEditExpenses([expensesRow])}
								className="flex flex-row items-center gap-2"
							>
								<FaPencilAlt /> Edit
							</Button>
						</div>
					);
				}
			},
		},

	];

	const checkerDate = expenses.some((expense) => {
		return expense.date_of_operation === dateToday;
	});

	expenses.sort((a, b) => {
		let fa = a.date_of_operation,
			fb = b.date_of_operation;
	
		if (fa < fb) {
			return 1;
		}
		if (fa > fb) {
			return -1;
		}
		return 0;
	});

	return (
		<>
			<DataTable
				data={expenses}
				columns={ExpensesTableHeader}
				filterWhat={"notes"}
				dataType={"Today's Expenses"}
				openModal={checkerDate ? undefined : handleAddExpenses}
				isLoading={isFetching} />
		</>
	);
};

export default ExpensesTable;