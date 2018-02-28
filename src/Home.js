/**
 * 导入首页的模块们
 */

import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './style.css';

import Profile from './components/User/Profile';
// import Footer from './components/Footer/Footer';
import Posts from './components/Posts/Posts';
import Activities from './components/Posts/Activities';
import Followings from './components/User/Followings';
import Followers from './components/User/Followers';


const Tabs = () => (
  <nav className='nav'>
    <Link to="/">全部文章</Link>
    <Link to="/activities">动态</Link>
    <Link to="/following">正在关注</Link>
    <Link to="/follower">被关注</Link>
  </nav>
)

// 能默认导出的就默认导出
// 他人的主页的 URL 暂时就不考虑了。从简单的做起
// export default () => (
    // <div>
        // <Profile />
        // <div>
            // <Tabs />
            // <Switch>
                // <Route exact path='/' component={ Posts }/>
                // <Route path='/activities' component={ Activities }/>
                // <Route path='/following' component={ Followings } />
                // <Route path='/follower' component={ Followers } />
            // </Switch>
        // </div>
    // </div>
// );

// 尝试写他人主页 URL
export default class Home extends React.Component {
    render() {
        return (
            <div>
                <Profile />
                <div>
                    <Tabs />
                    <Switch>
                        <Route exact path='/' component={ Posts }/>
                        <Route path='/activities' component={ Activities }/>
                        <Route path='/following' component={ Followings } />
                        <Route path='/follower' component={ Followers } />
                    </Switch>
                </div>
            </div>
        );
    }
}
