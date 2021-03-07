import * as actionTypes from '../../actions';

const initialState = {
    alertMessage: "",
    alertType: ""
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ALERT_CLOSE:
            return {
                ...state,
                alertMessage: "",
                alertType: ""
            }
        case actionTypes.ALERT_OPEN:
            return {
                ...state,
                alertMessage: action.alertMsg,
                alertType: action.alertType
            }
        default:
    }
    return state;
}

export default reducer;