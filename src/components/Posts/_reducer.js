import { postsActionTypes } from './_actionType';

const initState = {
    posts: [],
    activities: []
}

export default (state=initState, action) => {
    switch(action.type) {
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
        default:
            return state;
    }
}
