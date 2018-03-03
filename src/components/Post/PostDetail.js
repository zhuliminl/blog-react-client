import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postActions } from './_actions';
import { authActions } from '../Auth/_actions';
const {
    fetchPost,
    clearCurrentPost,
    deletePost,
    } = postActions;
const { updateCurrentUserId } = authActions;


// 导航应该包含编辑文章和删除文章的入口
// 如果文章不是当前用户的则不能提供这个两个入口。暂时考虑不了这么多了
// 注意这里的返回仍然要负责清除数据工作
const Header = ({...props, isCurrentUser}) => (
    <div>
    <Link
        to='/'
        onClick={ props.handleBackClick }
        >返回</Link>
        {
            isCurrentUser
                        ?
                            <div>
                                <Link
                                    to='/write'
                                    onClick={ props.handleEditorClick }
                                    >编辑</Link>
                                <Link
                                    to='/'
                                    onClick={ props.handleDeleteClick }
                                    >删除</Link>
                            </div>
                        : ''

        }
    </div>
);


class PostDetail extends React.Component {
    componentDidMount() {
        const { dispatch, match } = this.props;
        const postId = match.params.id;
        dispatch(updateCurrentUserId());            // 保证页面刷新还能自动获取数据
        dispatch(fetchPost(postId));
    }

    // 返回时需要清除本页的数据
    handleBackClick() {
        this.clearCurrentPostData();
    }
    clearCurrentPostData() {
        const { dispatch } = this.props;
        dispatch(clearCurrentPost())
    }

    // 进入编辑的入口
    handleEditorClick() {
    }

    // 删除文章，删除文章后进入首页(按道理说，是否进入首页应该由删除动作是否成功为依据，此处暂不考虑）
    // 后期考虑用上询问窗口
    handleDeleteClick() {
        const { dispatch, postId } = this.props;
        dispatch(deletePost(postId));
    }

    isCurrentUser() {
        const { id, currentUserId } = this.props;
        return parseInt(currentUserId, 10) === id;
    }

    render() {
        const { title, body, createdAt } = this.props;          // 关于时间的格式，以后在优化
        const isCurrentUser = this.isCurrentUser();
        return (
            <div>
                <Header
                    isCurrentUser={ isCurrentUser }
                    handleBackClick={ this.handleBackClick.bind(this) }
                    handleEditorClick={ this.handleEditorClick.bind(this) }
                    handleDeleteClick={ this.handleDeleteClick.bind(this) }
                />
                <div className='post_detail'>
                    <h1>{ title }</h1>
                    <div className='post_infor'>
                        <p>创建时间<span>{ createdAt }</span></p>
                    </div>
                    <ReactMarkdown source={ body } />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { detail } = state.post;
    const { currentUserId } = state.auth;
    return {
        id: detail['author_id'],
        currentUserId,
        postId: detail.id,
        title: detail.title,
        body: detail.body,
        createdAt: detail.createdAt,
        updatedAt: detail.updatedAt,
    }
};

export default connect(mapStateToProps)(PostDetail);
