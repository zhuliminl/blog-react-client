/**
 * 封装 restful 服务需要的常用请求
 *
 * 在设计请求的时候， 应该保证 token 信息都会附到请求头里面
 * 但是对于登录和注册的请求，其实是不需要 token 的
 * 但是目前看来，即便携带了多余的认证信息其实不妨碍后端的工作。暂时就不去解决这个
 *
 * token 信息应该随时从本地储存中拿出
 * 它的第一次保存则应该是通过表单登录成功之后，而在这之前，应该给 token 设定空字符串，以便认证的判断
 * 用户的注销动作则通过销毁本地 token 信息来达成
 *
 */


import axios from 'axios';

// 获取本地的 tokens，注意每次发送请求的时候都必须重新从本地取出
// 而不是通过第一次的引用。否则 token 永远都是初始值，除非你刷新了页面
function getToken() {
    let token = JSON.parse(localStorage.getItem('token'));
    if(!token) {
        return 'no token'
    }
    return token;
}

function getRefreshToken() {
    let refreToken = JSON.parse(localStorage.getItem('refreshToken'));
    if(!refreToken) {
        return 'no refreshToken'
    }
    return refreToken;
}


const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export const api = {
    get: (url) => axios.get(
        url,
        {
            headers: {
                ...headers,
                'x-token': getToken(),
                'x-refresh-token': getRefreshToken(),
            }
        }
    ),
    post: (url, data) => axios.post(
        url,
        data,
        {
            headers: {
                ...headers,
                'x-token': getToken(),
                'x-refresh-token': getRefreshToken(),
            }
        }
    ),
    put: (url, data) => axios.put(
        url,
        data,
        {
            headers: {
                ...headers,
                'x-token': getToken(),
                'x-refresh-token': getRefreshToken(),
            }
        }
    ),
    delete: (url) => axios.delete(
        url,
        {
            headers: {
                ...headers,
                'x-token': getToken(),
                'x-refresh-token': getRefreshToken(),
            }
        }
    ),
}
