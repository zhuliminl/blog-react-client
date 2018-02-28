import React from 'react';
import { connect } from 'react-redux';

import FollowCell from './FollowCell';
import { userActions } from './_actions';
const { fetchFollowers } = userActions;


class Followers extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;
        const userId  = localStorage.getItem('userId');
        dispatch(fetchFollowers(userId))
    }

    render() {
        const { followers } = this.props;
        if(followers.length !== 0) {
            return (
                <ul>
                    {
                        followers.map((user, i) => (
                                <FollowCell
                                    targetUserId={user.id}
                                    key={i}
                                    username={ user.username }
                                    avatarHash={ user.avatarHash }
                                    isFollowing={ user.isFollowing }
                                />
                            )
                        )
                    }
                </ul>
            )
        } else {
            return (<div>你还没有被任何人关注</div>);
        }
    }
}

const mapStateToProps = (state) => {
    const { followers } = state.user;
    return {
        followers
    }
}



export default connect(mapStateToProps)(Followers);
