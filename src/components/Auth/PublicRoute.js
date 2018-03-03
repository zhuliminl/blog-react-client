import React from 'react';
import { Redirect, Route } from 'react-router-dom';


// 公共路由的作用在于如果用户已经登录了，就立刻把用户引导到主页
export const PublicRoute = ({ component: Component, ...rest }) => (
    <Route
        { ...rest }
        render={
                props => (
                    localStorage.getItem('token')
                        // true                                        // 假设已经成功登录
                        // false                                        // 还没有登录
                        ? <Redirect to={'/'} />
                        : <Component { ...props } />
                        )
                }
    />
);
