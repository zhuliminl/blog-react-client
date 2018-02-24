import { alertActionTypes } from './_actionType';

export default (state={ isOpen: false }, action) => {
    switch(action.type) {
        case alertActionTypes.OPEN_ALERT:
            return {
                ...state,
                isOpen: true,
                alertType: action.alertType,
                message: action.message
            }
        case alertActionTypes.CLOSE_ALERT:
            return {
                ...state,
                isOpen: false,
                alertType: action.alertType,
                message: action.message
            }
        default:
            return state;
    }
}
