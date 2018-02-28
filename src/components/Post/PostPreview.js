import React from 'react';
import ReactMarkdown from 'react-markdown';

const PostPreview = ({...props, title, body}) => (
    <div className='write_preview'>
        <h1>{ title }</h1>
        <ReactMarkdown source={ body } />
    </div>
);

export default PostPreview;
