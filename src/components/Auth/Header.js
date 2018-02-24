import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => (
    <div>
        <Link to='/login'>登录</Link>
        <Link to='/register'>注册</Link>
    </div>
);

