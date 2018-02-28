import React from 'react';
import { Link } from 'react-router-dom';


// 文章的更新时间应该根据后端给出的绝对时间来计算出来
// 最后呈现出 一分钟前， 一小时前， 一天前这种格式
// 以后有时间再处理
export default ({...props}) => {
    const { post } = props;
    return (
        <li className='post_item'>
            <h4>{ post.title }</h4>
            <p>{ post.slug }</p>
            <Link to={ `/p/${post.id}` }>阅读更多</Link>
        </li>
    );
}
