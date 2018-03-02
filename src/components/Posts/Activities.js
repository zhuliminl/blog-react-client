import React from 'react';
import './style.css';
import { connect } from 'react-redux';
import ActivitiesCell from './ActivitiesCell';
import { postsActions } from './_actions';
const { fetchActivities  } = postsActions;


class Activities extends React.Component {
    componentDidMount() {
        const { dispatch, match } = this.props;
        // const userId = localStorage.getItem('userId');
        const userId = match.params.id;
        dispatch(fetchActivities(userId))
    }
    render() {
        const { activities } = this.props;
        console.log(this.props.match.params)
        return (
            activities.length !== 0                          // 如果文章数量不为空
                ? <ul>
                    {
                        activities.map((activity, i) => (
                                <ActivitiesCell
                                    key={i}
                                    activity={ activity }           // 文章就不在这里展开了，全都推过去
                                />
                            )
                        )
                    }
                  </ul>
                : <div>没有动态需要被显示</div>
        );
    }
}

const mapStateToProps = (state) => {
    const { activities } = state.posts;
    return {
        activities
    }
}

export default connect(mapStateToProps)(Activities);
