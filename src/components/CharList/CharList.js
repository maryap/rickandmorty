import React, { useEffect, useState } from 'react';
import Char from '../Char/Char';
import Loading from '../Loading/Loading';
import Alert from '../Alert/Alert';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/action';
import * as actionTypes from '../../store/actions/';

const CharList = (props) => {
    const [page, setPage] = useState(1);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        props.chars(page);
        setPage(page + 1);
        return () => {
            window.removeEventListener(null, props.chars());
        }
    }, []);

    useEffect(() => {
        if (!props.loading) {
            function handleScroll() {
                if (window.innerHeight + document.documentElement.scrollTop >= document.body.offsetHeight) {

                    if (errorMessage === "") {
                        setPage(page + 1);
                        props.setLoading(true);
                        setTimeout(() => {
                            props.chars(page);
                            props.setLoading(false);
                        }, 1000);
                    }

                    if (page === props.totalData + 1) {
                        setErrorMessage("No more data");
                        props.setLoading(false);
                    }
                }
            }

            window.addEventListener("scroll", handleScroll);
            return () => {
                window.removeEventListener("scroll", handleScroll);
            }
        }

    }, [props.loading, page]);
    return (
        <>
            <div className="container mt-3 mb-3">
                <div className="row">
                    {props.data.map(char => (
                        <Char chars={char} key={char.id} />
                    ))}
                </div>
                {props.loading ? <Loading /> : null}
            </div>
            {errorMessage !== "" ? <Alert message={errorMessage} alertType="warning" /> : null}
            {errorMessage === "" && props.errorMessage !== "" ? <Alert message={props.errorMessage} alertType="danger" /> : null}
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        data: state.r_and_m.data,
        totalData: state.r_and_m.totalData,
        errorMessage: state.r_and_m.errorMessage,
        loading: state.r_and_m.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        chars: (val) => dispatch(actions.characterList(val)),
        setLoading: (loading) => {
            dispatch({
                type: actionTypes.LOADING,
                loading: loading
            })
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CharList);