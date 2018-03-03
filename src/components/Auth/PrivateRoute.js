import React from 'react';
import { Redirect, Route } from 'react-router-dom';



// 私有的路由起到授权渲染的作用，如果没有认证，就重定向到登录页面
// 通过本地储存是否存在 token 来判断登录状态，目前最简单粗暴的方法
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        { ...rest }
        render={
                props => (
                    localStorage.getItem('token')
                        // false                                        // 预设已经成功登录
                        ? <Component { ...props } />
                        : <Redirect to={{ pathname: '/login'}} />
                    )
                }
    />
);



