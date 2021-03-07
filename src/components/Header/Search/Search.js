import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions';
import * as actions from '../../../store/actions/action';
import { useHistory } from 'react-router-dom';

const Search = (props) => {
    const [value, setValue] = useState('');
    const [disabled, setDisabled] = useState(false);
    const valueChangeHandler = (event) => {
        setValue(event.target.value);
    }
    let history = useHistory();

    const formSubmit = (e) => {
        e.preventDefault();
        if (value.trim() != '') {
            props.setLoading(true);
            setDisabled(true);
            setTimeout(() => {
                props.charSearch(value, 1);
                history.push(`/searchresult/${value}`);
                props.setLoading(false);
                setDisabled(false);
            }, 1000);

            setValue('');
        } else {
            props.alertOpen("Please enter a word", "warning")
        }
    }
    return (
        <div className="search-wrapper">
            <form onSubmit={formSubmit}>
                <div className="input-group mb-0">
                    <input
                        type="text"
                        className="form-control form-control-success"
                        placeholder="Search"
                        value={value}
                        onChange={valueChangeHandler} />
                    <div className="input-group-append">
                        <button
                            className="btn btn-dark"
                            type="submit"
                            disabled={disabled}>
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        alertOpen: (alertMsg, alertType) => {
            dispatch({
                type: actionTypes.ALERT_OPEN,
                alertMsg: alertMsg,
                alertType: alertType
            })
            setTimeout(() => {
                dispatch({ type: actionTypes.ALERT_CLOSE })
            }, 2000)
        },
        setLoading: (loading) => {
            dispatch({
                type: actionTypes.LOADING,
                loading: loading
            })
        },
        charSearch: (keyword, page) => dispatch(actions.charSearch(keyword, page))
    };
};
export default connect(null, mapDispatchToProps)(Search);