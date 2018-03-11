import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import PostsCell from './PostsCell';
import { connect } from 'react-redux';
import { postsActions } from './_actions';
const { fetchPosts } = postsActions;

const AddPostButton = () => (
    <Link className='post-add' to='/write' title='点击添加文章'>
        <div className='post-add__button'></div>
    </Link>
);

class Posts extends React.Component {
    componentDidMount() {
        const { dispatch, match } = this.props;
        const targetUserId = match.params.id;
        dispatch(fetchPosts(targetUserId ? targetUserId : localStorage.getItem('userId'))); // 如果目标用户的id 拿不到，则肯定是在渲染当前登录用户
    }

    isCurrentUser() {
        const { id, currentUserId } = this.props;
        return parseInt(currentUserId, 10) === id;
    }

    render() {
        const { posts } = this.props;
        const isCurrentUser = this.isCurrentUser();
        console.log(isCurrentUser)
        if(posts.length !== 0) {
            return (
                <div className='posts'>
                    { isCurrentUser ? <AddPostButton /> : '' }
                    <ul className='post-entry'>
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
                </div>
            );
        } else {
            return (
                <div className='nocontent'>
                    { isCurrentUser ? <AddPostButton /> : '' }
                    <div>对不起，你没有文章需要被显示</div>
                </div>
            );
        }
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
