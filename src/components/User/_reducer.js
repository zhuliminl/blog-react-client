import { userActionTypes } from './_actionType';

export default (state={}, action) => {
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
        default:
            return state;
    }
}


