import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Header } from './Header';

import { authActions } from './_actions';
const { login } = authActions;

const Presentation = ({ ...props }) => (
    <div>
        <Header />
        <form onSubmit={ props.handleSubmit }>
            <div>
                <label htmlFor="email">邮箱</label>
                <input
                    onChange={ props.handleEmailChange }
                    type="text"
                    name="email"
                    placeholder="请输入邮箱"/>
            </div>
            <div>
                <label htmlFor="password">密码</label>
                <input
                    onChange={ props.handlePasswordChange }
                    type="password"
                    name="password"
                    placeholder="请输入密码"/>
            </div>
            <div>
                <input
                    disabled={ props.isLoggingIn }
                    type="submit"
                    value={ props.isLoggingIn ? '正在登录' : '登录'}/>
            </div>
        </form>
    </div>
);

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'zhuliminl@gmail.com',
            password: '123456'
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        // 后期这里仍然需要给字段做一定的验证

        const { email, password } = this.state;
        this.login(email, password);
    }

    login(email, password) {
        const { dispatch } = this.props;
        dispatch(login(email, password));                   // 派遣登录动作
    }

    // 字段验证以后再做
    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        })
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        // const { isLoggingIn, token, userId } = this.props;
        const { isLoggingIn, token } = this.props;
        return (
            token
                ? <Redirect to='/' />
                : <div>
                    <Presentation
                        isLoggingIn={ isLoggingIn }
                        handleSubmit={ this.handleSubmit.bind(this) }
                        handleEmailChange={ this.handleEmailChange.bind(this) }
                        handlePasswordChange={ this.handlePasswordChange.bind(this) }
                    />
                </div>
        );
    }

}

// 总是通过 token 是否存在来判断登录状态。
// 如果页面被手动刷新了，则 token 要从本地储存提取
// 其他情况则一致从程序 state 中获取
const mapStateToProps = (state) => {
    const { isLoggingIn, token, userId } = state.auth;
    return {
        isLoggingIn,
        token,
        userId,
    }
}

export default connect(mapStateToProps)(Login);
