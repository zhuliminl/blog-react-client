import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group' // ES6
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Header } from './Header';

import { authActions } from './_actions';
const { login } = authActions;

const Presentation = ({ ...props }) => (
    <div className='auth__login'>
        <Header />
        <CSSTransitionGroup
            transitionName="login__animate"
            transitionAppearTimeout={500}
            transitionAppear={true}
            transitionEnter={false}
            transitionLeave={false}>

            <form className='login' onSubmit={ props.handleSubmit }>
                <div className='login__email'>
                    <label htmlFor="email">邮箱</label>
                    <input
                        onChange={ props.handleEmailChange }
                        type="text"
                        name="email"
                        placeholder="请输入邮箱"/>
                </div>
                <div className='login__password'>
                    <label htmlFor="password">密码</label>
                    <input
                        onChange={ props.handlePasswordChange }
                        type="password"
                        name="password"
                        placeholder="请输入密码"/>
                </div>
                <div className='login__submit'>
                    <input
                        disabled={ props.isLoggingIn }
                        type="submit"
                        value={ props.isLoggingIn ? '正在登录' : '登录'}/>
                </div>
            </form>
        </CSSTransitionGroup>
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
                            : <div className='auth'>
                                <Presentation
                                    isLoggingIn={ isLoggingIn }
                                    handleSubmit={ this.handleSubmit.bind(this) }
                                    handleEmailChange={ this.handleEmailChange.bind(this) }
                                    handlePasswordChange={ this.handlePasswordChange.bind(this) }
                                />
                                <p className='debug_guide'>提示：可注册后使用注册的账号登录。为了方便查看和调试，可以直接点击登录进入默认账号</p>
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
