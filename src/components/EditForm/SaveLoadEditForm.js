import React, { useState, useRef } from 'react';
import './EditForm.css';
import './SaveLoadEditForm.css';

import DownloadLink from 'react-download-link';
import TextInput from '../TextInput/TextInput';

export default function SaveLoadEditForm({ getContent, onContentLoaded }) {

    const [filename, setFilename] = useState('puzzle');
    const fileInputRef = useRef(null);

    return (
        <div className="edit-form">
            <div className="edit-form__section">
                <div className="edit-form__section-title">Save</div>
                <div className="edit-form__field edit-form__field--save-load">
                    <TextInput label="Filename" value={filename} onValueChanged={setFilename}></TextInput>
                    <DownloadLink className="edit-form__download-button" style={{}} label="Save Puzzle" tagName="button" filename={`${filename}.puz`} exportFile={getContent}></DownloadLink>
                </div>
            </div>
            <div className="edit-form__section">
                <div className="edit-form__section-title">Load</div>
                <div className="edit-form__field edit-form__field--save-load">
                    <input type="file" ref={fileInputRef}/>
                    <button className="edit-form__download-button" onClick={() => handleUpload(onContentLoaded)(fileInputRef)}>Load Puzzle</button>
                </div>
            </div>
        </div>
    );
}

const handleUpload = onContentLoaded => fileInputRef => {
    if (fileInputRef && fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0]) {
        const fileReader = new FileReader();
        fileReader.onload = e => onContentLoaded(e.target.result);
        fileReader.readAsText(fileInputRef.current.files[0]);
    }
};
