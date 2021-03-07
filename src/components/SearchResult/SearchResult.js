import React, { useEffect } from 'react';
import * as actions from '../../store/actions/action';
import { connect } from 'react-redux';
import Char from '../Char/Char';
import Pagination from '../Pagination/Pagination';
import Alert from '../Alert/Alert'

const SearchResult = (props) => {
    const resultPerPage = 20
    const totalPage = Math.ceil(props.searchResultLength / resultPerPage);

    useEffect(() => {
        props.charSearch(props.match.params.name, props.currentPage);
    }, []);

    const nextPage = () => {
        if (props.currentPage < totalPage) {
            props.charSearch(props.match.params.name, props.currentPage + 1);
        }
    }
    const prevPage = () => {
        if (props.currentPage > 1) {
            props.charSearch(props.match.params.name, props.currentPage - 1);
        }
    }
    const paginate = pageNumber => {
        props.charSearch(props.match.params.name, pageNumber);
    };
    return (
        <div className="container mt-3 mb-3">
            <div className="row">
                {props.searchResultLength > 0 ?
                    <div className="col-md-12">
                        <div className="alert alert-success" role="alert">
                            {props.searchResultLength} result found
                            </div>
                    </div>
                    :
                    null
                }
                {props.errorMessage !== "" ? <Alert message={props.errorMessage} alertType="danger" /> :
                    props.searchResult.map(char => (
                        <Char chars={char} key={char.id} />
                    ))}


            </div>
            {props.searchResultLength > 20 ?
                <Pagination
                    resultsPerPage={resultPerPage}
                    totalResults={props.searchResultLength}
                    paginate={paginate}
                    nextPage={nextPage}
                    prevPage={prevPage}
                    activePageNumber={props.currentPage} />
                : null}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        searchResult: state.r_and_m.searchResult,
        currentPage: state.r_and_m.currentPage,
        keyword: state.r_and_m.keyword,
        searchResultLength: state.r_and_m.searchResultLength,
        errorMessage: state.r_and_m.errorMessage
    };
};
const mapDispatchToProps = dispatch => {
    return {
        charSearch: (keyword, page) => dispatch(actions.charSearch(keyword, page))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);