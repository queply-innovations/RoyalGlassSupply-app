import { EllipsisIcon } from '@/assets/icons';
import { FC, useState } from 'react';

interface PaginationProps{
	onClickPrev: any;
	onClickNext: any;
	table: any;
}

export const Pagination: FC<PaginationProps> = ({
	onClickPrev, onClickNext, table
}) => {

	const currentPage = table.getState().pagination.pageIndex + 1;
	const nPages = table.getPageCount();
	const canPrevPage = !table.getCanPreviousPage();
	const canNextPage = !table.getCanNextPage();
	const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

	const goToNextPage = () => {
		onClickNext();
	}

	const goToPrevPage = () => {
		onClickPrev();
	}

	//TODO: Clean out error "each child in a list should have a unique key prop"

	return (
		<nav className='flex flex-row p-4' key="navigation">
			<ul className='flex flex-row content-center pagination' key="paginationUL">
				<li className={`page-item ${canPrevPage ? 'bg-slate-200' : ''}`} key="first">
					<a className={`font-semibold page-link ${canPrevPage ? 'text-white' : ''}`}
						onClick={() => table.setPageIndex(0)} key="firstBttn" >
						{`<<`}
					</a>
				</li>

				<li className={`page-item ${canPrevPage ? 'bg-slate-200' : ''}`} key="previous">
					<a className={`page-link ${canPrevPage ? 'text-white' : ''}`}
						onClick={goToPrevPage} key="previousBttn" >
						{`< Previous`}
					</a>
				</li>

				{ pageNumbers.length > 3 
					&& currentPage != 1 
					&& currentPage != 2 ? 
						<li key="ellipsisStart"><EllipsisIcon /></li> : 
						<li key="ellipsisNone"></li> }

				{ pageNumbers.map((pgNumber) => (
					pageNumbers.length > 3 ? (
						<>
							{(currentPage == pgNumber 
							|| currentPage - 1 == pgNumber 
							|| currentPage + 1 == pgNumber 
							|| (currentPage == 1 && pgNumber == currentPage + 2)
							|| (currentPage == table.getPageCount() && pgNumber == currentPage - 2) ? (

								<li key={"pgNumber" + pgNumber} 
									className= {`page-item ${currentPage == pgNumber ? 'active' : ''} `} >

									<a onClick={() => table.setPageIndex(pgNumber - 1)} 
										className='page-link'
										key={"alink" + pgNumber} >

										{pgNumber}

									</a>
								</li>

							) : (''))}
						</>
					) : (
						<li key={"pgNumber" + pgNumber} 
							className= {`page-item ${currentPage == pgNumber ? 'active' : ''} `} >

							<a onClick={() => table.setPageIndex(pgNumber - 1)} 
								className='page-link' 
								key={"alink" + pgNumber} >

								{pgNumber}
							</a>
						</li>
					)
				)) }
				
				{ pageNumbers.length > 3 
					&& !canNextPage 
					&& currentPage != table.getPageCount() - 1 ? 
						<li key="ellipsisEnd"><EllipsisIcon /></li> : 
						<li key="ellipsisNone2"></li> }

				<li className={`page-item ${canNextPage ? 'bg-slate-200' : ''}`} key="next">
					<a className={`page-link ${canNextPage ? 'text-white' : ''}`}
						onClick={goToNextPage} key="nextBttn" >
						{`Next >`}
					</a>
				</li>

				<li className={`page-item ${canNextPage ? 'bg-slate-200' : ''}`} key="last">
					<a className={`font-semibold page-link ${canNextPage ? 'text-white' : ''}`}
						onClick={() => table.setPageIndex(table.getPageCount() - 1)} key="lastBttn" >
						{`>>`}
					</a>
				</li>
			</ul>
		</nav>
	)
}