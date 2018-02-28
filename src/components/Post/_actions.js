import { postActionTypes } from './_actionType';
import { api } from '../../api';

import { alertActions } from '../Alert/_actions';
const { flash } = alertActions;

export const postActions = {
    fetchPost,
    addPost,
    updatePost,
    deletePost,
    clearCurrentPost,
};

function fetchPost(id) {
    return dispatch => {
        dispatch(request());

        dispatch(flash(
                {
                    alertType: 'good',
                    message: '正在请求文章数据'
                }
            )
        );

        api.get(`/posts/${id}`)
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
        // 暂时请求中并无任何数据内容
        return {
            type: postActionTypes.FETCHPOST
        }
    }
    function success(store) {
        return {
            type: postActionTypes.FETCHPOSTSUCCESS,
            store
        }
    }
    function failure(message) {
        return {
            type: postActionTypes.FETCHPOSTFAILURE,
            message
        }
    }
}

function addPost(title, body) {
    return dispatch => {
        dispatch(request());

        dispatch(flash(
                {
                    alertType: 'good',
                    message: '正在发布文章'
                }
            )
        );

        api.post(`/posts/`, { title, article: body })           // 后端因为很多原因用的是 article 来命名文章的正文
            .then(res => {
                if(res.status === 200) {
                    const store = res.data;                     // 将返回的数据全都储存在 store 上
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
        // 暂时请求中并无任何数据内容
        return {
            type: postActionTypes.ADDPOST
        }
    }
    function success(store) {
        return {
            type: postActionTypes.ADDPOSTSUCCESS,
            postId: store.postId,
            message: store.message
        }
    }
    function failure(message) {
        return {
            type: postActionTypes.ADDPOSTFAILURE,
            message
        }
    }

}

function updatePost(id, title, body) {
    return dispatch => {
        dispatch(request());

        dispatch(flash(
                {
                    alertType: 'good',
                    message: '正在更新文章'
                }
            )
        );

        api.put(`/posts/${id}`, { title, article: body })
            .then(res => {
                if(res.status === 200) {
                    const { message } = res.data;
                    dispatch(success(message));
                    dispatch(flash(
                            {
                                alertType: 'good',
                                message
                            }
                        )
                    );
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
        // 暂时请求中并无任何数据内容
        return {
            type: postActionTypes.UPDATEPOST
        }
    }
    function success(message) {
        return {
            type: postActionTypes.UPDATEPOSTSUCCESS,
            message
        }
    }
    function failure(message) {
        return {
            type: postActionTypes.UPDATEPOSTFAILURE,
            message
        }
    }

}

function deletePost(id) {
    return dispatch => {
        dispatch(request());
        api.delete(`/posts/${id}`)
            .then(res => {
                if(res.status === 200) {
                    const { message } = res.data;             // 将返回的数据全都储存在 store 上
                    dispatch(success());
                    dispatch(flash(
                            {
                                alertType: 'good',
                                message
                            }
                        )
                    );
                }
            })
            .catch(err => {
                const { response } = err;
                if(response.status === 400 || response.status === 404) {        // 用户删除的可能是不属于自己的文章
                        const { message } = response.data;
                        dispatch(failure(message));
                        dispatch(flash({ message }));
                }
            }
        );
    };

    function request() {
        // 暂时请求中并无任何数据内容
        return {
            type: postActionTypes.DELETEPOST
        }
    }
    function success() {
        return {
            type: postActionTypes.DELETEPOSTSUCCESS,
        }
    }
    function failure() {
        return {
            type: postActionTypes.DELETEPOSTFAILURE,
        }
    }

}

function clearCurrentPost() {
    return {
        type: postActionTypes.CLEARCURRENTPOST,
    }
}
