import { FC } from 'react';

interface PaginationProps{
	nPages: number;
	currentPage: number;
	canPrevPage: boolean;
	canNextPage: boolean;
	onClickPrev: any;
	onClickNext: any;
	table: any;
}

export const Pagination: FC<PaginationProps> = ({
	nPages, currentPage, canPrevPage, canNextPage, onClickPrev, onClickNext, table
}) => {

	const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

	const goToNextPage = () => {
		onClickNext();
	}
	const goToPrevPage = () => {
		onClickPrev();
	}

	return (
		<nav className='d-flex p-4'>
			<ul className='pagination justify-content-center'>
				<li className={`page-item ${canPrevPage ? 'bg-slate-300' : ''}`}>
					<a className={`page-link ${canPrevPage ? 'text-white' : ''}`}
						onClick={goToPrevPage} >
						Previous
					</a>
				</li>
				{pageNumbers.map(pgNumber => (
					<li key={pgNumber} 
						className= {`page-item ${currentPage == pgNumber ? 'active' : ''} `} >

						<a onClick={() => table.setPageIndex(pgNumber - 1)} 
							className='page-link' >
							
							{pgNumber}
						</a>
					</li>
				))}
				<li className={`page-item ${canNextPage ? 'bg-slate-300' : ''}`}>
					<a className={`page-link ${canNextPage ? 'text-white' : ''}`}
						onClick={goToNextPage} >
						Next
					</a>
				</li>
			</ul>
		</nav>
	)
}