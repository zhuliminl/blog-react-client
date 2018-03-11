import React from 'react';

const PostEditor = ({...props }) => (
    <div className='write__editor'>
        <form>
            <div className='editor__title'>
                <input
                    onChange={ props.handleTitleChange }
                    type="text"
                    name="title"
                    value={ props.title }
                    placeholder="标题"/>
            </div>
            <div className='editor__body'>
                <textarea
                    onChange={ props.handleBodyChange }
                    name="body"
                    value={ props.body }
                    placeholder={ props.body }>
                </textarea>
            </div>
        </form>
    </div>
);

export default PostEditor;
