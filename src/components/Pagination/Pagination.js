import React from 'react';

const Pagination = ({ resultsPerPage, totalResults, paginate, nextPage, prevPage, activePageNumber }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalResults / resultsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav aria-label="Page navigation example" className="m-3">
            <ul className="pagination justify-content-center">
                <li onClick={() => prevPage()} className="page-link">
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                </li>
                {pageNumbers.map((number,index) => (
                    <li
                        onClick={() => paginate(number)}
                        key={number}
                        className={`page-link ${activePageNumber == index+1? "active": ""}`}>{number}</li>
                ))}
                <li onClick={() => nextPage()} className="page-link">
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination;