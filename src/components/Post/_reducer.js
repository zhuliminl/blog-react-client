import { postActionTypes } from './_actionType';

const initState = {
    isPublished: false,
    detail: {
    }
}

export default (state=initState, action) => {
    switch(action.type) {
        // 添加文章
        case postActionTypes.ADDPOST:
            return { ...state }
        case postActionTypes.ADDPOSTSUCCESS:
            return {
                ...state,
                isPublished: true,
                message: action.message,
                postId: action.postId,
            }
        case postActionTypes.ADDPOSTFAILURE:
            return {
                ...state,
                message: action.message
            }

        // 获取文章
        case postActionTypes.FETCHPOST:
            return { ...state }
        case postActionTypes.FETCHPOSTSUCCESS:
            return {
                ...state,
                postId: action.store.id,
                message: action.message,
                isPublished: true,
                detail: action.store,
            }
        case postActionTypes.FETCHPOSTFAILURE:
            return { ...state }

        // 更新文章
        case postActionTypes.UPDATEPOST:
            return { ...state }
        case postActionTypes.UPDATEPOSTSUCCESS:
            return {
                ...state,
                message: action.message
            }
        case postActionTypes.UPDATEPOSTFAILURE:
            return {
                ...state,
                message: action.message
            }

        // 删除文章
        case postActionTypes.DELETEPOST:
            return { ...state }
        case postActionTypes.DELETEPOSTSUCCESS:
            return { ...state }
        case postActionTypes.DELETEPOSTFAILURE:
            return { ...state }

        // 清除当前文章的数据,如果页面即将离去
        case postActionTypes.CLEARCURRENTPOST:
            return {
                ...state,
                isPublished: false,
                postId: '',
                message: '',
                detail: { }
            }

        default:
            return state;
    }
}
