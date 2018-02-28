import { postsActionTypes } from './_actionType';

const initState = {
    posts: [],
    activities: []
}

export default (state=initState, action) => {
    switch(action.type) {
        // 请求文章列表
        case postsActionTypes.FETCHPOSTS:
            return {
                ...state,
            }
        case postsActionTypes.FETCHPOSTSSUCCESS:
            return {
                ...state,
                posts: action.posts
            }
        case postsActionTypes.FETCHPOSTSFAILURE:
            return {
                ...state,
                message: action.message
            }

        // 请求动态列表
        case postsActionTypes.FETCHACTIVITIES:
            return {
                ...state,
            }
        case postsActionTypes.FETCHACTIVITIESSUCCESS:
            return {
                ...state,
                activities: action.activities
            }
        case postsActionTypes.FETCHACTIVITIESFAILURE:
            return {
                ...state,
                message: action.message
            }
        default:
            return state;
    }
}
