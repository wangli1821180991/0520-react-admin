import React, { Component } from 'react';
// import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import PropTypes from 'prop-types';
// import htmlToDraft from 'html-to-draftjs';

import './index.less';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


class RichTextEditor extends Component {
    state = {
        detail: PropTypes.string.isRequired,
    };

    onEditorStateChange =(editorState) => {
        this.setState({
            editorState,
        });
    };

    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    editorState={editorState}
                    // wrapperClassName="demo-wrapper"
                    editorClassName="rich-text-editor"
                    onEditorStateChange={this.onEditorStateChange}
                />
                {/*<textarea*/}
                    {/*disabled*/}
                    {/*value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}*/}
                {/*/>*/}
            </div>
        );
    }
}

export default RichTextEditor;