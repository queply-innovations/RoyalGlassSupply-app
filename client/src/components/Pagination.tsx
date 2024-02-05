import { FC } from 'react';

interface PaginationProps{
	nPages: number;
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination: FC<PaginationProps> = ({nPages, currentPage, setCurrentPage}) => {

	const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

	const goToNextPage = () => {
		if(currentPage !== nPages) setCurrentPage(currentPage + 1)
	}
	const goToPrevPage = () => {
		if(currentPage !== 1) setCurrentPage(currentPage - 1)
	}
	return (
		<nav className='d-flex p-4'>
			<ul className='pagination justify-content-center'>
				<li className="page-item">
					<a className="page-link" 
						onClick={goToPrevPage} >
						
						Previous
					</a>
				</li>
				{pageNumbers.map(pgNumber => (
					<li key={pgNumber} 
						className= {`page-item ${currentPage == pgNumber ? 'active' : ''} `} >

						<a onClick={() => setCurrentPage(pgNumber)}  
							className='page-link' >
							
							{pgNumber}
						</a>
					</li>
				))}
				<li className="page-item">
					<a className="page-link" 
						onClick={goToNextPage} >
						
						Next
					</a>
				</li>
			</ul>
		</nav>
	)
}