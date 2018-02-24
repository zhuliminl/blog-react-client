import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Header } from './Header';

import { authActions } from './_actions';
const { register } = authActions;

const Presentation = ({ ...props }) => (
    <div>
        <Header />
        <form onSubmit={ props.handleSubmit }>
            <div>
                <label htmlFor="username">昵称</label>
                <input
                    onChange={ props.handleUsernameChange }
                    type="text"
                    name="username"
                    placeholder="昵称"/>
            </div>
            <div>
                <label htmlFor="email">邮箱</label>
                <input
                    onChange={ props.handleEmailChange }
                    type="text"
                    name="email"
                    placeholder="请输入邮箱"/>
            </div>
            <div>
                <label htmlFor="passwordForSure">密码</label>
                <input
                    onChange={ props.handlePasswordForSureChange }
                    type="password"
                    name="passwordForSure"
                    placeholder="请输入密码"/>
            </div>
            <div>
                <label htmlFor="password">确认密码</label>
                <input
                    onChange={ props.handlePasswordChange }
                    type="password"
                    name="password"
                    placeholder=""/>
            </div>
            <div>
                <input
                    disabled={ props.isLoggingIn }
                    type="submit"
                    value={ props.isRegistering ? '正在注册' : '提交'}/>
            </div>
        </form>
    </div>
);

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordForSure: ''
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const { username, email, password } = this.state;
        const newUser = {
            username,
            email,
            password
        }
        this.validatePassword();
        this.register(newUser);
    }

    register(newUser) {
        const { dispatch } = this.props;
        // dispatch(register(newUser));                   // 派遣登录动作
        dispatch(register({ username: 'ssskdfj', email: 'xiaoshitou@gmail.com', password: 'xiaoshitou' }));                   // 测试一个新用户
    }

    handleUsernameChange(e) {
        this.setState({
            username: e.target.value
        })

    }

    // 字段验证以后再做
    // 这里字段如果可以归一化处理，那就尝试归一化
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

    handlePasswordForSureChange(e) {
        this.setState({
            passwordForSure: e.target.value
        })
    }

    validatePassword() {
        // 不止需要前后密码一致
        // 其他各种验证错误都需要一一考虑
        const { password, passwordForSure } = this.state;
        if(password !== passwordForSure) {
            console.log('两次密码输入不一致');
        }

    }

    render() {
        const { isRegistering, token } = this.props;
        return (
            token
                ? <Redirect to='/' />
                : <div>
                    <Presentation
                        isRegistering={ isRegistering }
                        handleSubmit={ this.handleSubmit.bind(this) }
                        handleUsernameChange={ this.handleUsernameChange.bind(this) }
                        handleEmailChange={ this.handleEmailChange.bind(this) }
                        handlePasswordChange={ this.handlePasswordChange.bind(this) }
                        handlePasswordForSureChange={ this.handlePasswordForSureChange.bind(this) }
                    />
                </div>
        );
    }

}

// 总是通过 token 是否存在来判断登录状态。
// 如果页面被手动刷新了，则 token 要从本地储存提取
// 其他情况则一致从程序 state 中获取
const mapStateToProps = (state) => {
    const { isRegistering, token } = state.auth;
    return {
        isRegistering,
        token
    }
}

export default connect(mapStateToProps)(Register);
