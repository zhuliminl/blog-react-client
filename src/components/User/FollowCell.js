import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from './_actions';
const { follow, unfollow, fetchUser } = userActions;

class FollowCell extends React.Component {
    constructor(props) {
        super(props);
        const { isFollowing } = this.props;
        this.state = {
            isFollowing
        }
    }


    handleFollowClick() {
        const { isFollowing } = this.state;
        const { dispatch } = this.props;

        const userId  = localStorage.getItem('userId');
        const { targetUserId } = this.props;
        if(isFollowing) {                                           // 依据不同的关注状态来派发不同的动作
            this.setState({ isFollowing: false });
            dispatch(unfollow(userId, targetUserId));
        } else {
            this.setState({ isFollowing: true });
            dispatch(follow(userId, targetUserId));;
        }
    }

    handleAvatarClick() {
        const { dispatch, targetUserId } = this.props;
        dispatch(fetchUser(targetUserId))
    }




    render() {
        const { username, avatarHash, targetUserId } = this.props;
        const { isFollowing } = this.state;                 // 注意 isFolowing 必须从 state 中取过来。因为它是依据逻辑动态变化的

        return (
            <li className='follow__item'>
                <Link
                    onClick={ this.handleAvatarClick.bind(this) }
                    to={ `/users/${targetUserId}/posts` }
                    className='follow__avatar'>
                    <img src={ 'http://secure.gravatar.com/avatar/' + avatarHash + '?s=80'  } alt="avatar"/>
                </Link>
                <p className='follow__username'>{ username }</p>
                <button className={ isFollowing ? 'follow-btn follow-btn_followed' : 'follow-btn' } onClick={ this.handleFollowClick.bind(this) }>{ isFollowing ? '取消关注' : '关注' }</button>
            </li>
        );
    }
}

export default connect(null)(FollowCell);
