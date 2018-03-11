import { userActionTypes } from './_actionType';

const initState = {
    followings: [],
    followers: []
}


export default (state= initState, action) => {
    switch(action.type) {
        case userActionTypes.FETCHUSER:
            return state;
        case userActionTypes.FETCHUSERSUCCESS:
            return {
                ...state,
                ...action.store                             // 为了避免字段修改带来的太多的依赖，这里能不展开就不展开。也不知道这么做对不对
            }
        case userActionTypes.FETCHUSERFAILURE:
            return {
                ...state,                                   // 错误了，应该怎么做
                message: action.message
            }

        case userActionTypes.FETCHFOLLOWINGS:
            return state;
        case userActionTypes.FETCHFOLLOWINGSSUCCESS:
            return {
                ...state,
                followings: action.store
            }
        case userActionTypes.FETCHFOLLOWINGSFAILURE:
            return {
                ...state,
                message: action.message
            }

        case userActionTypes.FETCHFOLLOWERS:
            return state;
        case userActionTypes.FETCHFOLLOWERSSUCCESS:
            return {
                ...state,
                followers: action.store
            }
        case userActionTypes.FETCHFOLLOWERSFAILURE:
            return {
                ...state,
                message: action.message
            }

        // 关注别人
        case userActionTypes.FOLLOW:                    // 很多动作并不需要去影响状态
            return {
                ...state
            }
        case userActionTypes.FOLLOWSUCCESS:
            if(action.isFromProfile) {
                return {
                    ...state,
                    isFollowing: true
                }
            } else {
                return { ...state }
            }
        case userActionTypes.FOLLOWFAILURE:
            return {
                ...state,
            }

        // 取消关注别人
        case userActionTypes.UNFOLLOW:
            return {
                ...state,
            }
        case userActionTypes.UNFOLLOWSUCCESS:
            if(action.isFromProfile) {
                return {
                    ...state,
                    isFollowing: false
                }
            } else {
                return { ...state }
            }
        case userActionTypes.UNFOLLOWFAILURE:
            return {
                ...state,
            }

        default:
            return state;
    }
}


