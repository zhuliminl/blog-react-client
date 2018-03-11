import { userActionTypes } from './_actionType';
import { api } from '../../api';

import { alertActions } from '../Alert/_actions';
const { flash } = alertActions;

export const userActions = {
    fetchUser,
    fetchFollowings,
    fetchFollowers,

    follow,
    unfollow,
};

function fetchUser(id) {
    return dispatch => {
        dispatch(request());
        api.get(`/api/users/${id}`)
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
                        dispatch(flash({ message }));
                    }
                }
            );
        dispatch(flash(
                {
                    alertType: 'good',
                    message: '正在获取用户信息'
                }
            )
        );
    };

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


function fetchFollowings(id) {
    return dispatch => {
        dispatch(request());
        api.get(`/api/users/${id}/followings`)
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
                        dispatch(flash({ message }));
                    }
                }
            );
    };
    function request() {
        return {
            type: userActionTypes.FETCHFOLLOWINGS
        }
    }
    function success(store) {
        return {
            type: userActionTypes.FETCHFOLLOWINGSSUCCESS,
            store
        }
    }
    function failure(message) {
        return {
            type: userActionTypes.FETCHFOLLOWINGSFAILURE,
            message
        }
    }
}

function fetchFollowers(id) {
    return dispatch => {
        dispatch(request());
        api.get(`/api/users/${id}/followers`)
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
                        dispatch(flash({ message }));
                    }
                }
            );
    };

    function request() {
        return {
            type: userActionTypes.FETCHFOLLOWERS
        }
    }
    function success(store) {
        return {
            type: userActionTypes.FETCHFOLLOWERSSUCCESS,
            store
        }
    }
    function failure(message) {
        return {
            type: userActionTypes.FETCHFOLLOWERSFAILURE,
            message
        }
    }
}


function follow(userId, targetUserId, isFromProfile) {
    return dispatch => {
        dispatch(request())
        api.post(`/api/users/${userId}/followings/${targetUserId}`)
            .then(res => {
                if(res.status === 200) {
                    const { message } = res.data;
                    dispatch(success(isFromProfile));
                    dispatch(flash({
                                alertType: 'good',
                                message
                            }
                        )
                    )
                }
            })
            .catch(err => {
                const { response } = err;
                if(response.status === 400) {
                        const { message } = response.data;
                        dispatch(failure(isFromProfile));            // 失败了，暂时就啥都不做吧。和发出请求一样，暂时保持为空
                        dispatch(flash({ message }));   // 但是错误提示要发出来
                    }
                }
            )
    }

    function request() {
        return {
            type: userActionTypes.FOLLOW
        }
    }
    function success(isFromProfile) {
        return {
            type: userActionTypes.FOLLOWSUCCESS,
            isFromProfile
        }
    }
    function failure(isFromProfile) {
        return {
            type: userActionTypes.FOLLOWFAILURE,
            isFromProfile
        }
    }


}

function unfollow(userId, targetUserId, isFromProfile) {
    return dispatch => {
        dispatch(request())
        api.delete(`/api/users/${userId}/followings/${targetUserId}`)
            .then(res => {
                if(res.status === 200) {
                    const { message } = res.data;
                    dispatch(success(isFromProfile));
                    dispatch(flash(                                 // 发送关注成功的提示
                                {
                                    alertType: 'good',
                                    message
                                }
                            )
                        );                                              }
                }
            )
            .catch(err => {
                const { response } = err;
                if(response.status === 400) {
                        const { message } = response.data;
                        dispatch(failure());            // 失败了，暂时就啥都不做吧。和发出请求一样，暂时保持为空
                        dispatch(flash({ message }));   // 但是错误提示要发出来
                    }
                }
            )
    }

    function request() {
        return {
            type: userActionTypes.UNFOLLOW
        }
    }
    function success(isFromProfile) {
        return {
            type: userActionTypes.UNFOLLOWSUCCESS,
            isFromProfile
        }
    }
    function failure(isFromProfile) {
        return {
            type: userActionTypes.UNFOLLOWFAILURE,
            isFromProfile
        }
    }
}

