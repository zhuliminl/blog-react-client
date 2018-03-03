import { postsActionTypes } from './_actionType';
import { api } from '../../api';

import { alertActions } from '../Alert/_actions';
const { flash } = alertActions;

export const postsActions = {
    fetchPosts,
    fetchActivities,
};

function fetchPosts(targetUserId) {
    return dispatch => {
        dispatch(request())
        api.get(`/posts/?user=${targetUserId}&slug=true`)            // 默认首页的获取不包括文章的详情
            .then(res => {
                if(res.status === 200) {
                    const posts = res.data;
                    dispatch(success({ posts }));
                }
            })
            .catch(err => {
                const { response } = err;
                const { message } = response.data;
                if(response.status === 400) {
                    dispatch(failure({ message }));

                    // 发送错误通知
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
    };

    function request() {
        return {
            type: postsActionTypes.FETCHPOSTS
        }
    }
    function success(store) {                       // 既然目的是为了缓存数据，这里的形式参数还是一律用储存这个概念代替
        return {
            type: postsActionTypes.FETCHPOSTSSUCCESS,
            posts: store.posts
        }
    }
    function failure(message) {
        return {
            type: postsActionTypes.FETCHPOSTSFAILURE,
            message
        }
    }
}

function fetchActivities(userId) {
    return dispatch => {
        dispatch(request())
        api.get(`/users/${userId}/activities/`)            // 默认首页的获取不包括文章的详情
            .then(res => {
                if(res.status === 200) {
                    const activities = res.data;
                    dispatch(success({
                        activities
                    }))
                }
            })
            .catch(err => {
                const { response } = err;
                const { message } = response.data;
                if(response.status === 400) {
                    dispatch(failure({
                        message
                    }))
                    // 发送错误通知
                    dispatch(flash(
                        {
                            alertType: 'bad',
                            message
                        }
                    ))
                }
            })
    }

    function request() {
        return {
            type: postsActionTypes.FETCHACTIVITIES
        }
    }
    function success(store) {                       // 既然目的是为了缓存数据，这里的形式参数还是一律用储存这个概念代替
        return {
            type: postsActionTypes.FETCHACTIVITIESSUCCESS,
            activities: store.activities
        }
    }
    function failure(message) {
        return {
            type: postsActionTypes.FETCHACTIVITIESFAILURE,
            message
        }
    }
}
