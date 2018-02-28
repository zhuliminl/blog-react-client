import React from 'react';
import { connect } from 'react-redux';

import { userActions } from './_actions';
const { follow, unfollow } = userActions;

class FollowCell extends React.Component {
    constructor(props) {
        super(props);
        const { isFollowing } = this.props;
        this.state = {
            isFollowing
        }
    }

    // componentDidMount() {
        // const { isFollowing } = this.props;
    // }

    handleClick() {
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


    render() {
        const { username, avatarHash } = this.props;
        const { isFollowing } = this.state;                 // 注意 isFolowing 必须从 state 中取过来。因为它是依据逻辑动态变化的
        return (
            <li className='follow_item'>
                <div className='follow_avatar'>
                    <img src={ 'http://secure.gravatar.com/avatar/' + avatarHash + '?s=80'  } alt="avatar"/>
                </div>
                <p>{ username }</p>
                <button className='follow_button' onClick={ this.handleClick.bind(this) }>{ isFollowing ? '取消关注' : '关注' }</button>
            </li>
        );
    }
}

export default connect(null)(FollowCell);
