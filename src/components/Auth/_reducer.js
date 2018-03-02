import { authActionTypes } from './_actionType';

const initState = {
    isLoggingIn: false,
    isRegistering: false,
    currentUserId: ''
}


export default (state = initState, action) => {
    switch(action.type) {
        case authActionTypes.LOGIN_REQUEST:
            return {
                ...state,
                isLoggingIn: true
            }

        case authActionTypes.LOGIN_SUCCESS:
            const { message, token, refreToken, userId } = action;
            return {
                ...state,
                message,
                token,
                refreToken,
                userId,
                isLoggingIn: false
            }

        case authActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                message: action.message,
                token: '',
                refreToken: '',
                isLoggingIn: false
            }

        case authActionTypes.REGISTER_REQUEST:
            return {
                ...state,
                isRegistering: true
            }
        case authActionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                message: action.message,
                isRegistering: false
            }
        case authActionTypes.REGISTER_FAILURE:
            return {
                ...state,
                message: action.message,
                isRegistering: false,
                token: '',
                refreToken: '',
                isLoggingIn: false
            }
        // 注销动作未完成

        case authActionTypes.UPDATECURRENTUSERID:
            return {
                ...state,
                currentUserId: localStorage.getItem('userId')
            }

        default:
            return state;
    }
}
