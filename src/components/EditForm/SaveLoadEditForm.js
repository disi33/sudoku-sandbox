import React, { useState, useRef } from 'react';

import { uploadPuzzle } from '../../firebase/storePuzzle';

import './EditForm.css';
import './SaveLoadEditForm.css';

import DownloadLink from 'react-download-link';
import TextInput from '../TextInput/TextInput';

export default function SaveLoadEditForm({ getContent, onContentLoaded }) {

    const [filename, setFilename] = useState('puzzle');
    const fileInputRef = useRef(null);
    
    const [uploading, setUploading] = useState(false);
    const [uploadedKey, setUploadedKey] = useState(null);

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
            <div className="edit-form__section">
                <div className="edit-form__section-title">Share</div>
                <div className="edit-form__field edit-form__field--save-load">
                    {!uploading && uploadedKey && 
                        <div className="edit-form__share-url">
                            <span>Share link:</span>
                            <input value={shareUrl(uploadedKey)} readOnly></input>
                        </div>
                    }
                    {uploading && <div className="edit-form__loading-spinner"></div>}
                    <button className="edit-form__download-button" onClick={handleShare(getContent, setUploading, setUploadedKey)}>Share Puzzle</button>
                </div>
            </div>
        </div>
    );
}

const shareUrl = key => `${window.location.origin}/${key}`;

const handleUpload = onContentLoaded => fileInputRef => {
    if (fileInputRef && fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0]) {
        const fileReader = new FileReader();
        fileReader.onload = e => onContentLoaded(e.target.result);
        fileReader.readAsText(fileInputRef.current.files[0]);
    }
};

const handleShare = (getContent, setUploading, onUploaded) => () => {
    
    const content = getContent();
    setUploading(true);

    const attemptUpload = retries => {
        if (retries === 0) return Promise.reject();
        else return uploadPuzzle(content)
            .then(snapshot => { onUploaded(snapshot.ref.name); setUploading(false); })
            .catch(() => attemptUpload(retries - 1));
    }
    
    attemptUpload(5);
};
