/**
 * 定义公开和私有的路由
 * 将 store 状态放入 Provider 容器
 */

import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from './components/Auth/PrivateRoute';
import { PublicRoute } from './components/Auth/PublicRoute';

import { Provider } from 'react-redux';
import store from './store';

import Home from './Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Alert from './components/Alert/Alert';
import Write from './components/Post/Write';
import PostDetail from './components/Post/PostDetail';


ReactDOM.render(
    <Provider store={ store }>
        <div className='container'>
            <Router>
                <Switch>
                    <PublicRoute path='/login' component={ Login } />
                    <PublicRoute path='/register' component={ Register } />
                    <PrivateRoute path='/write' component={ Write } />
                    <PrivateRoute path='/p/:id' component={ PostDetail } />
                    <PrivateRoute path='/users/:id' component={ Home } />
                    <PrivateRoute path='/' exact component={ Home } />
                    {/* 如果将 / 和 /users/:id 指向相同的 Home 页面，则 / 的匹配情况下 match 数据需要按着 /users/:id 的 match 重写 */}
                    <Redirect to='/' />
                </Switch>
            </Router>
            <Alert/>
        </div>
    </Provider>
    , document.getElementById('root'));






























/**
 *
 * [用户想登录博客，查看自己的主页]
 * 登录
 *     ! 注意用户输入错误和输入不全的提示
 *     ! 注意如果用户不存在，提供点击进入注册的页面
 *     ! 注意用户如果存在但密码错误，给出密码错误提示，请重新输入密码
 *     ! 注意提交按钮的禁用
 *     ! 注册和登录是相互切换的
 *     -> 提示登录成功后转入个人主页 / 进入注册页面
 * => 注册 (注意邮箱和密码的要求和密码的两次验证失败等提示；提交前和提交后，禁用按钮) -> 提示注册成功并转入登录界面继续登录
 * => 主页
 *     ! 主页展示用户的简要信息,用户的头像，用户名字，关注和被关注的数量信息
 *           ! 在个人简单的信息下面提供新建文章的大按钮，一个 ➕  这种
 *           ! 在创建文章的入口下面提供最近文章的简单列表
 *     ! 在个人信息下面提供默认的自己文章的入口和动态入口，是选项卡来实现
 *     ! 对于未显示的文章，给出更多文章的入口，规定每次点击加载一定数量的文章。
 *           ! 后期可以改成滚动加载的请求
 *
 *
 * [用户想要写文章并发表]
 * 写文章
 *     ! 提供输入文章标题和文章内容区
 *     ! 按钮禁用
 *     ! 假如用户有离开此页面的动作，必须提示文章该如何处理，是否需要放弃本次编辑
 *     -> 发表成功提示 / 进入刚发表的文章的查看页面
 * => 当前文章 (如果是当前用户，提供编辑文章的入口) -> 再次编辑文章 (文章的内容必须预先加载到表单)
 *     ! 在详细文章的页面应该隐去多余大的个人信息，仅在左上角提供返回到主页的入口
 *     ! 在文章首部给出文章的详细信息，包括创建日期更新日期，多少人阅读，点赞
 *     ! 注意在文章底部提供下一个文章和上一个文章入口
 *     -> 文章评论
 * => 文章评论
 *     ! 首先一定是提供个人的评论框，然后就是发表成功提示等
 *     ! 评论列表和文章列表类似，提供他人入口
 *           ! 后期可以改成滚动加载的请求
 *
 *
 * [用户想看自己创建的所有文章]
 *     ! 这点就算了。不必单独创建页面。在首页就可以完成
 *
 * [用户想要删除文章]
 * 当前文章
 *     ! 这个当前文章页面提供删除按钮就好了。一般来说不存在一次性删除多篇文章的需求
 *     ! 在当前文章也添加一个不显眼的删除按钮，当文章删除后，给出删除成功的提示，并跳转到个人主页
 *
 *
 * [用户想要修改自己的个别信息]
 * 个人信息编辑
 *     ! 在主页的个人信息的背景图提供修改个人信息的入口。但是得低调
 *           ! 当点击个人信息编辑以后，将文章区替换为个人信息的编辑
 *           ! 在右下角提供保存按钮
 *           ! 注意保存后直接发送更新成功的信息，然后自动定向回到个人主页
 *           ! 注意各类的信息验证和之前的要求要一致
 *           ! 注意我们可以修改个人签名之类的信息。这些信息是初始化在数据库里面的
 *      -> 保存修改成功提示 / 个人主页
 *
 *
 * [用户想要查看有多少问关注自己，并进入他人的主页]
 * 关注
 *     ! 在顶部的个人信息中使用最简格式的关注。比如 89 / 34 这种。当点击这个入口之后，将文章区替换为关注的页面
 *     ! 关注分为被关注和我关注。可以做成二栏的选项卡，样式与 动态和文章的一致
 *     ! 在关注的列表中提供取消关注的入口，并在相应的动作之后提供消息弹窗提示
 *     ! 当然，需要在所有的关注头像上提供进入该用户主页的入口
 *     -> 动作消息提示 / 他人的主页
 *
 *
 * [用户想看看自己关注的人最近的文章]
 * 动态
 *     ! 动态的组织和个人文章的列表相近。主要区别在于要在卡片中加入他人的头像和名字已经文章创建时间等信息
 *     ! 他人文章的加载和个人的加载方法一致
 *     -> 他人的文章详情 / 他人的主页
 * => 文章详情
 *     ! 他人文章的详情页和个人的一样。当然，编辑是不可能的
 *           ! 注意在他人文章详情不要提供下一个篇的的入口，而是提供返回到动态就可以了
 * => 他人的主页
 *     ! 最重要的是权限问题
 *     ! 不提供个人信息修改，文章修改等入口，还有他人的动态入口
 *     ! 他人的关注需要和自己的关注区别开
 *     ! 好吧。写到这里，感觉有必要设定权限问题了。这段有点空白
 *
 *
 *
 *
 * { 好了。暂时就这些吧。编写边看有哪些需要补充的 }
 *
 */
