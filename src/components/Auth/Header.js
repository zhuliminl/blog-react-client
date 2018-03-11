import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => (
    <div className='auth__header'>
        <NavLink to='/login'>登录</NavLink>
        <NavLink to='/register'>注册</NavLink>
    </div>
);

