import React from 'react';
import { Link } from 'react-router-dom';


// 文章的更新时间应该根据后端给出的绝对时间来计算出来
// 最后呈现出 一分钟前， 一小时前， 一天前这种格式
// 以后有时间再处理
export default ({...props}) => {
    const { post } = props;
    return (
        <li className='entry'>
            <Link title={ post.title } className='entry__link' to={ `/p/${post.id}` } >
                <h3 className='entry__title'>{ post.title }</h3>
                <p className='entry__slug'>{ post.slug }</p>
            </Link>
        </li>
    );
}
