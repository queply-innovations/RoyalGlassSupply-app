import React from 'react';
import { Table } from '@tanstack/react-table';
import { Button } from './ui/button';
import { ChevronsLeft, MoreHorizontal, ChevronsRight } from 'lucide-react';

interface PaginationProps {
	onClickPrev: () => void;
	onClickNext: () => void;
	table: Table<any>;
}

export const Pagination2 = ({
	onClickPrev,
	onClickNext,
	table,
}: PaginationProps) => {
	const currentPage = table.getState().pagination.pageIndex + 1;
	const nPages = table.getPageCount();
	const canPreviousPage = table.getCanPreviousPage();
	const canNextPage = table.getCanNextPage();
	const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

	const toNextPage = () => {
		if (canNextPage) {
			onClickNext();
		}
	};

	const toPreviousPage = () => {
		if (canPreviousPage) {
			onClickPrev();
		}
	};

	return (
		<nav key="pagination-nav">
			<ul className="flex flex-row gap-1">
				<li key="to-first">
					<Button
						key="to-first-button"
						variant="ghost"
						className={`gap-1 px-3 ${currentPage < 3 && 'hidden'}`}
						onClick={() => table.setPageIndex(0)}
					>
						<ChevronsLeft key="chevrons-left" size={16} strokeWidth={2} />{' '}
						<span>First</span>
					</Button>
				</li>

				{pageNumbers.length > 3 && currentPage > 2 && (
					<li key="ellipsis-left" className="flex items-center p-2">
						<MoreHorizontal
							key="ellipsis-left-icon"
							size={16}
							strokeWidth={1.5}
						/>
					</li>
				)}

				{pageNumbers.map(page =>
					pageNumbers.length > 2 ? (
						<React.Fragment key={`frag-${page}`}>
							{currentPage == page ||
							currentPage - 1 == page ||
							currentPage + 1 == page ||
							(currentPage == 1 && page == currentPage + 2) ||
							(currentPage == table.getPageCount() &&
								page == currentPage - 2) ? (
								<li key={`to-${page}`}>
									<Button
										key={`to-${page}-button`}
										variant={
											currentPage == page ? 'default' : 'ghost'
										}
										onClick={() => table.setPageIndex(page - 1)}
									>
										<span>{page}</span>
									</Button>
								</li>
							) : (
								''
							)}
						</React.Fragment>
					) : (
						<li key={`to-${page}`}>
							<Button
								key={`to-${page}-button`}
								variant={currentPage == page ? 'default' : 'ghost'}
								onClick={() => table.setPageIndex(page - 1)}
							>
								{page}
							</Button>
						</li>
					),
				)}

				{pageNumbers.length > 3 &&
				canNextPage &&
				currentPage != table.getPageCount() - 1 ? (
					<li key="ellipsis-right" className="flex items-center p-2">
						<MoreHorizontal
							key="ellipsis-right-icon"
							size={16}
							strokeWidth={1.5}
						/>
					</li>
				) : (
					<li key="ellipsisNone2" className="hidden"></li>
				)}

				{/* <li key="to-next">
					<Button
						key="to-next-button"
						variant="ghost"
						className={`gap-1 px-3 ${canNextPage && 'hidden'}`}
						disabled={canPreviousPage}
						onClick={toNextPage}
					>
						<ChevronRight size={16} strokeWidth={2} />{' '}
					</Button>
				</li> */}

				<li key="to-last">
					<Button
						key="to-last-button"
						variant="ghost"
						className={`gap-1 px-3
						${(table.getPageCount() < 3 || table.getPageCount() - currentPage < 2) && 'hidden'}`}
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
					>
						<span>Last</span>{' '}
						<ChevronsRight
							key="chevrons-right"
							size={16}
							strokeWidth={2}
						/>
					</Button>
				</li>
			</ul>
		</nav>
	);
};
