'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchInvoices } from '../../api';
import { DataTable } from '@/components/Tables/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Invoices } from '../../types';
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components';
import {
    MoreVertical,
    ShoppingBasket,
    ArrowUp,
    ArrowDown,
    ArrowUpDown,
    Clock,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '@/utils/FormatCurrency';

interface InvoicesTableProps {
    openModal: (data: any, action: string) => void;
}

export const InvoicesTable = ({ openModal }: InvoicesTableProps) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, isLoading } = useQuery({
        queryKey: ['invoices', page],
        queryFn: () => fetchInvoices(page, limit),
        placeholderData: (prev) => prev,
    });

    const invoices = data?.data || [];
    const meta = data?.meta;

    const columns: ColumnDef<Invoices>[] = [
        {
            accessorKey: 'code',
            header: ({ column }) => (
                <Button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                    className="flex items-center bg-transparent uppercase text-slate-700"
                >
                    Code{' '}
                    {column.getIsSorted() === 'asc' ? (
                        <ArrowUp size={18} />
                    ) : column.getIsSorted() === 'desc' ? (
                        <ArrowDown size={18} />
                    ) : (
                        <ArrowUpDown size={18} />
                    )}
                </Button>
            ),
            cell: ({ row }) => <span className="font-bold">{row.original.code}</span>,
        },
        {
            accessorKey: 'warehouse.code',
            header: ({ column }) => (
                <Button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                    className="flex items-center bg-transparent uppercase text-slate-700"
                >
                    Warehouse{' '}
                    {column.getIsSorted() === 'asc' ? (
                        <ArrowUp size={18} />
                    ) : column.getIsSorted() === 'desc' ? (
                        <ArrowDown size={18} />
                    ) : (
                        <ArrowUpDown size={18} />
                    )}
                </Button>
            ),
        },
        {
            accessorKey: 'payment_method',
            header: ({ column }) => (
                <Button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                    className="flex items-center bg-transparent uppercase text-slate-700"
                >
                    Type{' '}
                    {column.getIsSorted() === 'asc' ? (
                        <ArrowUp size={18} />
                    ) : column.getIsSorted() === 'desc' ? (
                        <ArrowDown size={18} />
                    ) : (
                        <ArrowUpDown size={18} />
                    )}
                </Button>
            ),
            cell: ({ row }) => (
                <span className="capitalize">
					{row.original.payment_method.split('_').join(' ')}
				</span>
            ),
        },
        {
            accessorKey: 'is_paid',
            header: () => <span>Balance Amount</span>,
            cell: ({ row }) => {
                const status = row.original.is_paid;
                return status === 1 ? (
                    <span>——</span>
                ) : status === 0 ? (
                    <span>{formatCurrency(row.original.balance_amount)}</span>
                ) : (
                    <Clock size={20} className="text-amber-500" />
                );
            },
        },
        {
            accessorKey: 'total_amount_due',
            header: () => <span>Total Amount</span>,
            cell: ({ row }) => formatCurrency(row.original.total_amount_due),
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <div className="text-xs uppercase">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="rounded-full bg-gray-100 p-1.5 hover:bg-gray-300">
                            <MoreVertical size={16} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="z-50 w-44 bg-white">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-gray-200" />
                            <DropdownMenuItem
                                onClick={() => navigate(`/transaction/items/${row.original.id}`)}
                                className="flex items-center gap-3 p-2 hover:bg-gray-200"
                            >
                                <ShoppingBasket size={16} />
                                <span>View Invoice</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ),
        },
    ];

    return (
        <div className="w-full max-w-full px-2 space-y-4 border bg-white rounded-md">
            {/* Make table horizontally scrollable if needed */}
            <div className=" rounded-md border shadow-sm">
                <DataTable
                    columns={columns}
                    data={invoices}
                    filterWhat="code"
                    dataType="Invoices"
                    isLoading={isLoading}
                    openModal={openModal}
                    autoResetPageIndex={false}
                    onPageChange={setPage}
                    page={page}
                    meta={meta} // ✅ Add this line to support pagination
                />
            </div>

        </div>
    );
};
