import React from 'react';
import { connect } from 'react-redux';

import FollowCell from './FollowCell';
import { userActions } from './_actions';
const { fetchFollowings } = userActions;


class Followings extends React.Component {
    componentDidMount() {
        const { dispatch, match } = this.props;
        const userId = match.params.id;
        dispatch(fetchFollowings(userId))
    }

    render() {
        const { followings } = this.props;
        if(followings.length !== 0) {
            return (
                <ul className='follow'>
                    {
                        followings.map((user, i) => (
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
            return (<div className='nocontent'>还没有关注任何用户</div>);
        }
    }
}

const mapStateToProps = (state) => {
    const { followings } = state.user;
    return {
        followings
    }
}



export default connect(mapStateToProps)(Followings);
