import { authActionTypes } from './_actionType';
import { api } from '../../api';


/**
 * 定义登录和登出以及注册的三个动作
 * 必须区别开发送请求、请求成功、请求失败这三种状态
 * 在每种状态中，发出消息提示的动作
 *
 * 于是这里的动作是异步的，复合的动作
 *
 * 所有的拒绝操作，最好遵循 RFC 一致性，而不是全都用 200 来处理。这个需要和服务器端约定好
 *
 */
import { alertActions } from '../Alert/_actions';
const { flash } = alertActions;

export const authActions = {
    login,
    logout,
    register,
    updateCurrentUserId
};

function login(email, password) {
    return dispatch => {
        dispatch(request());
        api.post('/api/login', { email, password })
            .then(res => {
                if(res.status === 200) {
                    const { token, refreToken } = storeTokens(res);               // 本地储存 tokens

                    const { message, userId } = res.data;
                    localStorage.setItem('userId', JSON.stringify(userId));                     // 用户 ID 应该本地持久化

                    // 注意登录成功应该让后端返回更多的信息，包括用户 ID ，认证过期时间。这个以后完成
                    dispatch(success(
                            {
                                message,
                                token,
                                refreToken,
                                userId
                            }
                        )
                    );

                    dispatch(flash(
                            {
                                alertType: 'good',
                                message
                            }
                        )
                    );


                    // 因为调试关系，需要立即返回未登录的状态。所以在此设定定时清除 tokens
                    // setTimeout(() => {
                        // localStorage.clear();
                        // dispatch(flash({ alertType: 'bad', message: '已经自动退出登录'}))
                        // console.log('xxx')
                    // }, 4000)
                }
            })
            .catch(err => {
                const { response } = err;
                if(response.status === 404) {
                    const { message } = response.data;

                    dispatch(failure(
                            {
                                message
                            }
                        )
                    );

                    dispatch(flash(
                            {
                                alertType: 'bad',
                                message
                            }
                        )
                    );
                }
            }
        );
    }

    function request() {
        return {
            type: authActionTypes.LOGIN_REQUEST,
        }
    }

    function success(store) {
        return {
            type: authActionTypes.LOGIN_SUCCESS,
            message: store.message,
            userId: store.userId,
            token: store.token,
            refreToken: store.refreToken,
        }
    }

    function failure(store) {
        return {
            type: authActionTypes.LOGIN_FAILURE,
            message: store.message
        }
    }

}



// 注销可以在用户简介中开始做起
function logout() {

}

function register(newUser) {
    return dispatch => {
        dispatch(request());

        api.post('/api/register', newUser)
            .then(res => {
                if(res.status === 200) {                                        // 注册成功，应该在发出提示消息之后自动登录
                    const { message } = res.data;

                    dispatch(success(
                            {
                                message,
                            }
                        )
                    );

                    dispatch(flash(
                            {
                                alertType: 'good',
                                message
                            }
                        )
                    );

                    dispatch(login(
                            newUser.email,
                            newUser.password
                        )
                    );           // 记得派发后继的登录操作
                }
            })
            .catch(err => {
                const { response } = err;
                if(response.status === 400) {
                    const { message, errorType } = response.data;

                    dispatch(failure(
                            {
                                message,
                                errorType
                            }
                        )
                    );
                    dispatch(flash(
                            {
                                alertType: 'bad',
                                message
                            }
                        )
                    );
                }
            }
        );
    }

    function request() {
        return {
            type: authActionTypes.REGISTER_REQUEST
        }
    }

    function success(store) {
        return {
            type: authActionTypes.REGISTER_SUCCESS,
            message: store.message,
        }
    }

    function failure(store) {
        return {
            type: authActionTypes.REGISTER_FAILURE,
            message: store.message,
            errorType: store.errorType
        }
    }
}

function storeTokens(res) {
    // 从请求头取出 tokens 并存入本地
    const token = res.headers['x-token'];
    const refreToken = res.headers['x-refresh-token'];
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('refreshToken', JSON.stringify(refreToken));
    return {
        token,
        refreToken
    }
}

function updateCurrentUserId() {
    return {
        type: authActionTypes.UPDATECURRENTUSERID
    }
}
