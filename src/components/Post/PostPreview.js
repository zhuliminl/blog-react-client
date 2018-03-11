import React from 'react';
import ReactMarkdown from 'react-markdown';

const PostPreview = ({...props, title, body}) => (
    <div className='write__preview'>
        <h1 className='preview__title'>{ title }</h1>
        <ReactMarkdown className='markdown' source={ body } />
    </div>
);

export default PostPreview;
