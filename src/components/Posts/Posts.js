import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import PostsCell from './PostsCell';
import { connect } from 'react-redux';
import { postsActions } from './_actions';
const { fetchPosts } = postsActions;

const AddPostButton = () => (
    <div>
        <Link to='/write'>添加新文章</Link>
    </div>
);


class Posts extends React.Component {
    componentDidMount() {
        const { dispatch, match } = this.props;
        const targetUserId = match.params.id;
        dispatch(fetchPosts(targetUserId))
    }

    isCurrentUser() {
        const { id, currentUserId } = this.props;
        return parseInt(currentUserId, 10) === id;
    }

    render() {
        const { posts } = this.props;
        const isCurrentUser = this.isCurrentUser();

        return (
            <div>
                { isCurrentUser ? <AddPostButton /> : '' }
                <div>
                    {
                        posts.length !== 0                          // 如果文章数量不为空
                            ? <ul>
                                    {
                                        posts.map((post, i) => (
                                                <PostsCell
                                                    key={i}
                                                    post={ post }           // 文章就不在这里展开了，全都推过去
                                                />
                                            )
                                        )
                                    }
                              </ul>
                            : <div>对不起，你没有文章需要被显示</div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { posts } = state.posts;
    const { currentUserId } = state.auth;
    const { id } = state.user;
    return {
        currentUserId,
        id,
        posts,
    }
}

export default connect(mapStateToProps)(Posts);
