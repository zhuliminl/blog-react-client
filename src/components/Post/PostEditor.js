import React from 'react';

const PostEditor = ({...props }) => (
    <div className='write_editor'>
        <form>
            <div>
                <input
                    onChange={ props.handleTitleChange }
                    type="text"
                    name="title"
                    value={ props.title }
                    placeholder="标题"/>
            </div>
            <div>
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
