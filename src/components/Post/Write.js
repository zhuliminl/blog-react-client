import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import './style.css';

import PostPreview from './PostPreview';
import PostEditor from './PostEditor';

import { postActions } from './_actions';
import { alertActions } from '../Alert/_actions';
const {
    addPost,
    updatePost,
    clearCurrentPost
    } = postActions;
const { flash } = alertActions;

/**
 * 编辑区和预览区分开
 * 在导航中提供返回上一页和发布文章的入口
 * 后期可以考虑在文章未发布的情况下，阻止退出。并弹出提示框。暂时没时间做了
 *
 * 注意在文章仅仅为初始状态时，应该禁用发布按钮。或者说，在文章未达到一定字数的时候，不显示按钮
 * 注意如果文章已经发布了。那再次发布的入口就应该改为更新入口
 * 注意返回主页的时候，得清空本页面的状态。否则再次回到这个页面的时候仍然是更新文章，而不是创建新的文章
 */


const Header = ({...props, isPublished}) => (
    <div>
    <Link
        to='/'
        onClick={ props.handleBackClick }
        >返回</Link>
    <Link
        to='/write'
        className='write_publish'
        onClick={ props.handleClick }
        >
        {
            isPublished
                ? '更新文章'
                : '发布文章'
        }
    </Link>
    </div>
);


// 更新文章需要从 store 中拿到数据填充到 局部的 state 这样会影响到所有的设计
//
class Write extends React.Component {
    constructor(props) {
        super(props);
        const { isPublished } = this.props;
        if(isPublished) {                                   // 如果文章已经发布了
            const { id, title, body } = this.props.detail;
            this.state = {
                id,
                title,
                body,
                category: ''
            }
        } else {
            this.state = {                                      // 初始化文章格式。用最简单的那种
                title: '',
                body: '',
                category: ''
            }
        }
    }


    handleClick() {                                         // 暂时想不到更确切的名字。就用这个好了
        const { dispatch } = this.props;
        const {
            title,
            body
        } = this.state;

        const { isPublished, postId} = this.props;          // 注意文章的 ID 总是从 store 上面去取。
                                                            // 如果有哪里有问题想不通，那大多数问题是状态树没设计好，或者没有及时同步。你突破了框架限制带来的好处，肯定不好过

        if(title.trim() && body.trim()) {                   // 字段必须完整

            // 如果文章已经发布了，就不能再发布文章动作。而是应该改用更新文章的动作
            dispatch(
                isPublished
                    ? updatePost(postId, title, body)
                    : addPost(title, body)
            );
        } else {
            dispatch(flash({ message: '字段不完整,无法提交' }));
        }

    }

    handleBackClick() {
        this.clearCurrentPostData();
    }
    clearCurrentPostData() {
        const { dispatch } = this.props;
        dispatch(clearCurrentPost())
        console.log('正在清除本地的文章数据')
    }

    handleTitleChange(e) {
        this.setState({
            title: e.target.value
        })
    }

    handleBodyChange(e) {
        this.setState({
            body: e.target.value
        })
    }

    render() {
        return (
            <div>
                <Header
                    isPublished={ this.props.isPublished }
                    handleClick={ this.handleClick.bind(this) }
                    handleBackClick={ this.handleBackClick.bind(this) }
                 />
                <div className='write'>
                    <PostEditor
                        title={ this.state.title }
                        body={ this.state.body }
                        handleTitleChange={ this.handleTitleChange.bind(this) }
                        handleBodyChange={ this.handleBodyChange.bind(this) }
                    />
                    <PostPreview
                        title={ this.state.title }
                        body={ this.state.body }
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { post } = state;
    return {
        postId: post.postId,
        isPublished: post.isPublished,
        detail: post.detail
    }
}

const WriteWithRouter = withRouter(Write);


export default connect(mapStateToProps)(WriteWithRouter);
