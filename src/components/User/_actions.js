import { userActionTypes } from './_actionType';
import { api } from '../../api';

import { alertActions } from '../Alert/_actions';
const { flash } = alertActions;

export const userActions = {
    fetchUser
};

function fetchUser(id) {
    return dispatch => {
        dispatch(request());
        api.get(`/users/${id}`)
            .then(res => {
                if(res.status === 200) {
                    const store = res.data;             // 将返回的数据全都储存在 store 上
                    dispatch(success(store));
                }
            })
            .catch(err => {
                const { response } = err;
                if(response.status === 400) {
                    const { message } = response.data;
                    dispatch(failure(message));
                    dispatch(flash({ message }))
                }
            })


        dispatch(flash({
            alertType: 'good',
            message: '正在获取用户信息'
        }));
    }


    function request() {
        // 暂时请求中并无任何数据内容
        return {
            type: userActionTypes.FETCHUSER
        }
    }
    function success(store) {
        return {
            type: userActionTypes.FETCHUSERSUCCESS,
            store
        }
    }
    function failure(message) {
        return {
            type: userActionTypes.FETCHUSERFAILURE,
            message
        }
    }
}
