import * as actionTypes from '../actions';

const initialState = {
    loading: false,
    searchResult: [],
    searchResultLength: 0,
    currentPage: 1,
    data: [],
    totalData: 0,
    charInfo: [],
    errorMessage: ""
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOADING:
            return {
                ...state,
                loading: action.loading
            }
        case actionTypes.ON_SEARCH:
            if (action.payload) {
                return {
                    ...state,
                    searchResult: action.payload.data.results,
                    searchResultLength: action.payload.data.info.count,
                    currentPage: action.currentPage,
                    errorMessage: ""
                }
            } else {
                return {
                    ...state,
                    searchResult: [],
                    searchResultLength: 0,
                    currentPage: 1,
                    errorMessage: action.err.message
                }
            }

        case actionTypes.CHARACTER_LIST:
            if (location.pathname === '/') {
                let oldData = [...state.data];
                let newData = action.payload.data.results;
                let newArr = oldData.concat(newData);
                return {
                    ...state,
                    data: newArr,
                    totalData: action.payload.data.info.pages
                }
            } else {
                return {
                    ...state,
                    data: [],
                    totalData: 0
                }
            }
        case actionTypes.CHAR_INFO:
            return {
                ...state,
                charInfo: action.payload
            }
        case actionTypes.ERROR:
            return {
                ...state,
                errorMessage: action.message
            }
        default:
    }
    return state;
}

export default reducer;