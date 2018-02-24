import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { reducer as alterReducer } from './components/Alert';
import { reducer as authReducer } from './components/Auth';
import { reducer as postsReducer } from './components/Posts';
import { reducer as postReducer } from './components/Post';
import { reducer as userReducer } from './components/User';


// 暂时散布的 规约函数还没写好
const reducer = combineReducers({
    alert: alterReducer,
    auth: authReducer,
    posts: postsReducer,
    post: postReducer,
    user: userReducer
});


const middlewares = [ thunkMiddleware ];                    // 中间件
const win = window;
const storeEnhancers = compose(
    applyMiddleware(...middlewares),
    (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

// 导出创建好的状态
export default createStore( reducer, {}, storeEnhancers );
