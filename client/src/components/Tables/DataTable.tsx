import * as React from 'react';
import { Button } from '@/components';
import { VscSearch } from "react-icons/vsc";
import { IoMdClose } from "react-icons/io";  // close icon

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { Loader2, Plus } from 'lucide-react';

interface MetaType {
    current_page: number;
    last_page: number;
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    setData?: any;
    filterWhat: string;
    dataType: string;
    openModal?: any;
    isLoading?: boolean;
    hidePagination?: boolean;
    hideFilter?: boolean;
    autoResetPageIndex?: boolean;
    onPageChange?: (page: number) => void;
    onSearchChange?: (value: string) => void;
    onClearSearch?: () => void;
    searchValue?: string;
    page?: number;
    meta?: MetaType;
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                             setData,
                                             filterWhat,
                                             dataType,
                                             openModal,
                                             isLoading,
                                             hidePagination,
                                             hideFilter,
                                             autoResetPageIndex = false,
                                             onPageChange,
                                             onSearchChange,
                                             onClearSearch,
                                             searchValue = "",
                                             page,
                                             meta,
                                         }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        enableSortingRemoval: false,
        state: {
            sorting,
            columnFilters,
        },
        autoResetPageIndex: autoResetPageIndex,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onSearchChange?.(value);
    };

    const label =
        (filterWhat.split('_')[0] === 'or' ? 'OR' : filterWhat.split('_')[0]) +
        ' ' +
        (filterWhat.split('_')[1] === 'no' ? 'number' : filterWhat.split('_')[1] ?? '');

    const placeholderLabel = `Filter ${label.trim()}...`;

    return (
        <div className="flex max-h-full flex-col divide-y w-full border">
            {!hideFilter && (
                <div className="flex flex-none justify-between p-4 ">
                    <div className="w-1/2">
                        <div className="flex items-center bg-slate-100 rounded-full px-3 relative">
                            <input
                                type="text"
                                placeholder={placeholderLabel}
                                value={searchValue}
                                onChange={handleInputChange}
                                className="flex-1 bg-slate-100 focus:outline-none py-2 pr-8"
                            />
                            {/* Clear Button */}
                            {searchValue && (
                                <button
                                    onClick={onClearSearch}
                                    className="absolute right-10 text-gray-500 hover:text-black"
                                >
                                    <IoMdClose size={18} />
                                </button>
                            )}
                            <button className="rounded-r-full relative left-2 flex justify-self-center items-center p-2 bg-gray-400">
                                <VscSearch className='text-white' />
                            </button>
                        </div>
                    </div>
                    {openModal && (
                        <div className="flex flex-row-reverse">
                            <Button
                                fill={'green'}
                                onClick={openModal}
                                disabled={isLoading}
                                className="flex h-8 flex-row items-center pl-2 pr-3 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <Plus size={26} strokeWidth={2} /> {`Add ${dataType}`}
                            </Button>
                        </div>
                    )}
                </div>
            )}

            {/* Table */}
            <div className="w-full overflow-x-auto">
                <Table className="w-full table-fixed">
                    <TableHeader className="z-10 bg-slate-50 hover:bg-slate-50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="text-xs font-bold uppercase text-slate-800"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                    className="text-xs font-medium text-slate-950"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="py-3">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : isLoading ? (
                            <TableRow className="hover:bg-white">
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 items-center justify-center space-y-0 px-20 text-center"
                                >
                                    <div className="flex items-center justify-center text-slate-800/60">
                                        <Loader2 size={28} strokeWidth={2} className="animate-spin" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center font-medium hover:bg-white"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {!hidePagination && meta && (
                <div className="flex flex-row items-center justify-between p-4 gap-2">
                    <div className="text-sm font-semibold">
                        {table.getFilteredSelectedRowModel().rows?.length > 0 ? (
                            <>
                                {table.getFilteredSelectedRowModel().rows?.length} of{' '}
                                {table.getFilteredRowModel().rows?.length} row(s) selected
                            </>
                        ) : (
                            <>
                                Total Records: {meta?.total ?? 0}
                            </>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {meta.current_page > 1 && (
                            <Button
                                className="bg-white text-black flex flex-row gap-1 items-center"
                                onClick={() => onPageChange?.(1)}
                            >
                                <span>«</span> First
                            </Button>
                        )}
                        {meta.current_page > 3 && <span className="text-gray-500">...</span>}
                        {meta.current_page > 1 && (
                            <Button
                                className="w-8 h-8 px-0 bg-white text-black"
                                onClick={() => onPageChange?.(meta.current_page - 1)}
                            >
                                {meta.current_page - 1}
                            </Button>
                        )}
                        <div className="border-[3px] p-0.5 border-slate-400 rounded-md">
                            <button className="w-10 h-10 rounded-md bg-slate-900 text-white">
                                {meta.current_page}
                            </button>
                        </div>
                        {meta.current_page < meta.last_page && (
                            <Button
                                className="w-8 h-8 px-0 bg-white text-black"
                                onClick={() => onPageChange?.(meta.current_page + 1)}
                            >
                                {meta.current_page + 1}
                            </Button>
                        )}
                        {meta.current_page + 1 < meta.last_page && meta.current_page == 1 && (
                            <Button
                                className="w-8 h-8 px-0 bg-white text-black"
                                onClick={() => onPageChange?.(meta.current_page + 1)}
                            >
                                {meta.current_page + 2}
                            </Button>
                        )}
                        {meta.current_page + 2 < meta.last_page && (
                            <span className="text-gray-500">...</span>
                        )}
                        {meta.current_page < meta.last_page && (
                            <Button
                                className="bg-white text-black flex flex-row items-center"
                                onClick={() => onPageChange?.(meta.last_page)}
                            >
                                Last »
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
