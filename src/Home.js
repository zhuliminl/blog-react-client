/**
 * 导入首页的模块们
 */

import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import './style.css';

import Profile from './components/User/Profile';
// import Footer from './components/Footer/Footer';
import Posts from './components/Posts/Posts';
import Activities from './components/Posts/Activities';
import Followings from './components/User/Followings';
import Followers from './components/User/Followers';

import { authActions } from './components/Auth/_actions';
const { updateCurrentUserId } = authActions;


const Tabs = ({ ...propss, match }) => (
  <nav className='nav'>
    <Link to={`${match.url}/posts`}>全部文章</Link>
    <Link to={`${match.url}/activities`}>动态</Link>
    <Link to={`${match.url}/followings`}>正在关注</Link>
    <Link to={`${match.url}/followers`}>被关注</Link>
  </nav>
)


class Home extends React.Component {
    componentWillMount() {
        // 由于如果页面一手动刷新，store 就会丢失当前用户的信息。所以需要在首页中补发这个更新用户id信息的动作
        // 注意当前模块并不需要使用它,只负责更新当前用户的 ID 以便其他模块使用
        // 而这个用户 id 信息，将来则会用于一切的当前登录用户和普通用户的区别判断
        this.props.dispatch(updateCurrentUserId());
    }

    // 路由 / 意味着页面来自当前用户的首页
    isFromCurrentUser() {
        return this.props.match.path === '/'
    }

    render() {

        // 注意:虽然从上面代码中我们能从 store 中去拿当前登录用户的 ID，但是在初次渲染的时候，该数据总是为空。所以不能满足我们的需求
        // 于是只好临时从本地去取
        // 而为了保持统一，其他场景中要求一律从 store 中去取
        const currentUserId = localStorage.getItem('userId');

        // 为了实现首页路由为空，但是下级模块却能拿到 /users/:id 的 id 参数
        // 需要我们手动为 / 路由添加 /users/:id 匹配模式下的 macth 信息
        const match = this.isFromCurrentUser()
                        ? {
                            path: `/users/${currentUserId}`,
                            url: `/users/${currentUserId}`,
                            params: {
                                id: currentUserId,
                            }
                        }
                        : this.props.match;

        return (
            <div>
                <Profile match={ match }/>
                <div>
                    <Tabs match={ match }/>
                    <Switch>
                        <Route exact path='/' component={ Posts }/>         {/* 我们想一登录用户首页就渲染文章 */}
                        <Route path={ `${match.path}/posts` } component={ Posts }/>
                        <Route path={ `${match.path}/activities` } component={ Activities }/>
                        <Route path={ `${match.path}/followings` } component={ Followings }/>
                        <Route path={ `${match.path}/followers` } component={ Followers }/>
                    </Switch>
                </div>
            </div>
        );
    }
}


export default connect(null)(Home);
