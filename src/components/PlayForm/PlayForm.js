import React from 'react';

import ColorPicker from '../ColorPicker/ColorPicker';

import './PlayForm.css';
import '../EditForm/EditForm.css';

export default function PlayForm({onStartOver, onColorSelected}) {
    return (
        <div className="edit-form play-form">
            <div className="edit-form__section">
                <div className="edit-form__section-title">Instructions</div>
                <p>
                    To place numbers in the grid, select a cell by clicking on it and then use the keyboard to enter values.
                    You can move between cells of the grid using the arrow keys.
                </p>
                <p>To place small numbers in the center of the cell (candidates), hold Ctrl.</p>
                <p>To place small numbers in the corners of the cell (pencil marks), hold Alt.</p>
            </div>
            <div className="edit-form__section">
                <div className="edit-form__section-title">Additional controls</div>
                <div className="edit-form__field">
                    <button className="play-form__start-over" onClick={() => onStartOver()}>Start over!</button>
                </div>
                <div className="edit-form__field">
                    <span className="edit-form__field-name">Highlight Cell</span>
                    <div className="edit-form__field-input">
                        <ColorPicker selectedColor={'NOT_A_COLOR'} onColorSelected={onColorSelected}></ColorPicker>
                    </div>
                </div>
            </div>
        </div>
    );
}
