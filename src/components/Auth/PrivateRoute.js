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






















































// import decode from 'jwt-decode';
// import { browserHistory } from 'react-router';
// import auth0 from 'auth0-js';
// const ID_TOKEN_KEY = 'id_token';
// const ACCESS_TOKEN_KEY = 'access_token';

// const CLIENT_ID = '{AUTH0_CLIENT_ID}';
// const CLIENT_DOMAIN = 'AUTH0_DOMAIN';
// const REDIRECT = 'YOUR_CALLBACK_URL';
// const SCOPE = 'YOUR_SCOPE';
// const AUDIENCE = 'AUDIENCE_ATTRIBUTE';

// var auth = new auth0.WebAuth({
  // clientID: CLIENT_ID,
  // domain: CLIENT_DOMAIN
// });

// export function login() {
  // auth.authorize({
    // responseType: 'token id_token',
    // redirectUri: REDIRECT,
    // audience: AUDIENCE,
    // scope: SCOPE
  // });
// }

// export function logout() {
  // clearIdToken();
  // clearAccessToken();
  // browserHistory.push('/');
// }

// export function requireAuth(nextState, replace) {
  // if (!isLoggedIn()) {
    // replace({pathname: '/'});
  // }
// }

// export function getIdToken() {
  // return localStorage.getItem(ID_TOKEN_KEY);
// }

// export function getAccessToken() {
  // return localStorage.getItem(ACCESS_TOKEN_KEY);
// }

// function clearIdToken() {
  // localStorage.removeItem(ID_TOKEN_KEY);
// }

// function clearAccessToken() {
  // localStorage.removeItem(ACCESS_TOKEN_KEY);
// }

// // Helper function that will allow us to extract the access_token and id_token
// function getParameterByName(name) {
  // let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  // return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
// }

// // Get and store access_token in local storage
// export function setAccessToken() {
  // let accessToken = getParameterByName('access_token');
  // localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
// }

// // Get and store id_token in local storage
// export function setIdToken() {
  // let idToken = getParameterByName('id_token');
  // localStorage.setItem(ID_TOKEN_KEY, idToken);
// }

// export function isLoggedIn() {
  // const idToken = getIdToken();
  // return !!idToken && !isTokenExpired(idToken);
// }

// function getTokenExpirationDate(encodedToken) {
  // const token = decode(encodedToken);
  // if (!token.exp) { return null; }

  // const date = new Date(0);
  // date.setUTCSeconds(token.exp);

  // return date;
// }

// function isTokenExpired(token) {
  // const expirationDate = getTokenExpirationDate(token);
  // return expirationDate < new Date();
// }
