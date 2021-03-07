import axios from 'axios';
import * as actionTypes from './index';

const apiURL = 'https://rickandmortyapi.com/api/character';

export const characterList = (page) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${apiURL}/?page=${page}`);
            dispatch({
                type: actionTypes.CHARACTER_LIST,
                payload: res
            })
        } catch (error) {
            dispatch({
                type: actionTypes.ERROR,
                message: "Something went wrong"
            })
        }
    }
}

export const charInfoAction = (id) => {
    return async (dispatch) => {
        let newList = [];
        try {
            const res = await axios.get(`${apiURL}/${id}`);
            let createdDate = res.data.created.split("T");
            createdDate = new Date(createdDate[0]);
            createdDate = (createdDate.getMonth() + 1) + '/' + createdDate.getDate() + '/' + createdDate.getFullYear();
            let newData = {
                ...res.data,
                created: createdDate
            }
            newList.push(newData);
            dispatch({
                type: actionTypes.CHAR_INFO,
                payload: newList
            })
        } catch { }
    }
}

export const charSearch = (keyword, page) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${apiURL}/?page=${page}&name=${keyword}`);
            dispatch({
                type: actionTypes.ON_SEARCH,
                payload: res,
                currentPage: page
            })
        } catch (err) {
            if (err.response.status === 404) {
                console.clear();
            }
            dispatch({
                type: actionTypes.ON_SEARCH,
                err: { message: "There were no results !" }
            })
            // setTimeout(() => {
            //     dispatch({
            //         type: actionTypes.ON_SEARCH,
            //         err: { message: "" }
            //     })
            // }, 2000)
        }
    }
}