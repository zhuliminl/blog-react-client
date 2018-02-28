import React from 'react';
import { Link } from 'react-router-dom';


// 文章的更新时间应该根据后端给出的绝对时间来计算出来
// 最后呈现出 一分钟前， 一小时前， 一天前这种格式
// 以后有时间再处理
export default ({...props}) => {
    const { activity } = props;
    return (
        <li className='activity_item'>
            <div className='activity_avatar'>
                <Link to={ '/users/' + activity.authorId }>
                    <img src={ 'http://secure.gravatar.com/avatar/' + activity.avatarHash + '?s=256&d=identicon&r=g'  } alt="avatar"/>
                </Link>
            </div>
            <p>{ activity.author }<span>发布了文章</span></p>
            <Link to={ '/p/' + activity.postId }>
                <h4>{ activity.title }</h4>
            </Link>
        </li>
    );
}
