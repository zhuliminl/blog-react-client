import React from 'react';
import './style.css';
import { connect } from 'react-redux';
import { userActions } from './_actions';
const { fetchUser } = userActions;

/**
 * 如果登录的时候把用户的信息保存在 store 上，可惜一刷新，信息就不见了
 * 所以简单的用户 Id 信息还是放在本地储存里面吧
 * 暂时没空去管样式了。
 * 用户的编辑入口改天再写
 */

const Presentation = ({...props}) => (
    <div className='profile'>
        <div className='profile_avatar'>
            <img src={ 'http://secure.gravatar.com/avatar/' + props.avatarHash + '?s=256&d=identicon&r=g'  } alt="avatar"/>
        </div>
        <div className='profile_infor'>
            <h2>{ props.username }</h2>
            <h2>{ props.isCurrentUser ? '你是当前用户': '' }</h2>
            <a href={ 'mailto:' + props.email }>{ props.email }</a>
            <p>{ props.aboutMe }</p>
            <div className='follow_infor'>
                <p>被关注：<span>{ props.followerCount }</span></p>
                <p>关注：<span>{ props.followingCount }</span></p>
            </div>
        </div>
    </div>
);

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
        const { id, currentUserId } = this.props;
        return parseInt(currentUserId, 10) === id;
    }


    render() {
        const props = this.props;
        // const isCurrentUser = (parseInt(props.currentUserId) === props.id);
        const isCurrentUser = this.isCurrentUser();
        return (
            <Presentation
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
        followingCount
    } = state.user;


    return {
        currentUserId,
        id,
        username,
        email,
        avatarHash,
        aboutMe,
        followerCount,
        followingCount
    }
}


export default connect(mapStateToProps)(Profile);
