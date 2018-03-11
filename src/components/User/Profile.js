import React from 'react';
// import { Link, Redirect } from 'react-router-dom';
import './style.css';
import { connect } from 'react-redux';
import { userActions } from './_actions';
import { alertActions } from '../Alert/_actions';
const { flash } = alertActions;
const { follow, unfollow, fetchUser } = userActions;

/**
 * 如果登录的时候把用户的信息保存在 store 上，可惜一刷新，信息就不见了
 * 所以简单的用户 Id 信息还是放在本地储存里面吧
 * 暂时没空去管样式了。
 * 用户的编辑入口改天再写
 */

        // <a className='profile__email' href={ 'mailto:' + props.email }>{ props.email }</a>
const Presentation = ({...props, isCurrentUser, isFollowing}) => (
    <div className='profile'>
        <div className='profile__avatar'>
            <img src={ 'http://secure.gravatar.com/avatar/' + props.avatarHash + '?s=256&d=identicon&r=g'  } alt="avatar"/>
        </div>
        <h2 className='profile__username'>{ props.username }</h2>
        <p className='profile__aboutme'>{ props.aboutMe }</p>
        <a className='profile__email' >{ props.email }</a>
        <div className='profile__follow-infor'>
            <p>被关注：<span>{ props.followerCount }</span></p>
            <p>关注：<span>{ props.followingCount }</span></p>
        </div>
        { isCurrentUser
                    ? <button
                        className='logout-btn'
                        onClick={ props.handleLogoutClick }
                        >登出</button>
                    : <button
                            className={ isFollowing ? 'profile__follow-btn profile__follow-btn_followed' : 'profile__follow-btn'  }
                            onClick={ props.handleFollowClick }
                            >{ isFollowing ? '取消关注' : '关注' }</button> }
    </div>
);


// class Logout extends React.Component {
    // constructor() {
        // super();
        // this.state = {
            // isLogin: true
        // }
    // }

    // handleLogoutClick() {
        // localStorage.clear();
        // this.setState({ isLogin: false })
    // }
    // render() {
        // const { isLogin } = this.state;
        // return (
            // isLogin
                  // ? <button
                        // className='logout-btn'
                        // onClick={ this.handleLogoutClick.bind(this) }
                    // >登出</button>
                // : <Redirect to='/'/>
        // );
    // }
    // // render() {
        // // return (
            // // <Redirect to='/' />
        // // );
    // // }
// }


class Profile extends React.Component {
    componentDidMount() {
        // const userId  = localStorage.getItem('userId');             // 用户id 到底是应该从本地去拿还是从路由去拿呢？ URL !!!!!!!
        const { match } = this.props;
        const userId = match.params.id;
        this.fetchUser(userId);
    }


    fetchUser(id) {
        const { dispatch } = this.props;
        dispatch(fetchUser(id))
    }

    isCurrentUser() {
        const { targetUserId, currentUserId } = this.props;
        return parseInt(currentUserId, 10) === targetUserId;
    }

    handleFollowClick() {
        const { isFollowing } = this.props;
        const { dispatch } = this.props;

        const userId  = localStorage.getItem('userId');
        const { targetUserId } = this.props;
        console.log(targetUserId)
        if(isFollowing) {
            dispatch(unfollow(userId, targetUserId, true));
        } else {
            dispatch(follow(userId, targetUserId, true));           // true 代表 fromProfile
            // 有个明显的 bug ，用户点击关注列表中的按钮的会实时影响到简介中的关注按钮的状态。
            // 原因是虽然简介中的请求和关注列表中的请求语义上相同，但是他们应该影响的状态是不应该相同的。于是，点击另外一个操作，就破坏了另一个组件的状态
            // 目前的改进方法是判断请求来源的出处，按照请求模块的出处去影响状态
        }
    }

    handleLogoutClick() {
        localStorage.clear();
        const { dispatch } = this.props;
        dispatch(flash({ message: '正在登出......' }));
        setTimeout(() => {
            window.location.reload();
        }, 1000);               // 故意制造延迟，停留1秒
    }


    render() {
        const props = this.props;
        const isCurrentUser = this.isCurrentUser();
        // console.log(isCurrentUser)
        return (
            <Presentation
                handleLogoutClick={ this.handleLogoutClick.bind(this) }
                handleFollowClick={ this.handleFollowClick.bind(this) }
                isFollowing={ props.isFollowing }
                isCurrentUser={ isCurrentUser }
                id={ props.id }
                username={ props.username }
                email={ props.email }
                avatarHash={ props.avatarHash }
                aboutMe={ props.aboutMe }
                followerCount={ props.followerCount }
                followingCount={ props.followingCount }
            />
        );
    }
}

const mapStateToProps = (state) => {
    const { currentUserId } = state.auth;
    const {
        id,
        username,
        email,
        avatarHash,
        aboutMe,
        followerCount,
        followingCount,
        isFollowing
    } = state.user;


    return {
        currentUserId,
        targetUserId: id,
        username,
        email,
        avatarHash,
        aboutMe,
        followerCount,
        followingCount,
        isFollowing
    }
}


export default connect(mapStateToProps)(Profile);
