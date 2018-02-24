import React from 'react';
import './style.css';
import PostsCell from './PostsCell';
import { connect } from 'react-redux';
import { postsActions } from './_actions';
const { fetchPosts } = postsActions;


class Posts extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchPosts())
    }
    render() {
        const { posts } = this.props;
        return (
            posts.length !== 0                          // 如果文章数量不为空
                ? <ul>
                    {
                        posts.map((post, i) => (
                            <PostsCell
                                key={i}
                                post={ post }           // 文章就不在这里展开了，全都推过去
                            />
                        ))
                    }
                  </ul>
                : <div>对不起，你没有文章需要被显示</div>
        );
    }
}

const mapStateToProps = (state) => {
    const { posts } = state.posts;
    return {
        posts
    }
}

export default connect(mapStateToProps)(Posts);
