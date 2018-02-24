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
    componentWillMount() {
        const userId  = localStorage.getItem('userId');
        this.fetchUser(userId);
    }

    fetchUser(id) {
        const { dispatch } = this.props;
        dispatch(fetchUser(id))
    }

    render() {
        const props = this.props;
        return (
            <Presentation
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
    const { id, username, email, avatarHash, aboutMe, followerCount, followingCount } = state.user;
    return {
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
