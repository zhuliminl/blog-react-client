import { alertActionTypes } from './_actionType';


export const alertActions = {
    flash
};

function flash(msgObj) {
    return dispatch => {
        dispatch(openAlert(msgObj));

        // 消息总是在三秒后关闭,并清空
        setTimeout(() => {
            dispatch(closeAlert());
        }, 3000)
    }
}

function openAlert(msgObj) {
    return {
        type: alertActionTypes.OPEN_ALERT,
        alertType: msgObj.alertType,
        message: msgObj.message,
    }

}

function closeAlert() {
    return {
        type: alertActionTypes.CLOSE_ALERT,
    }

}
