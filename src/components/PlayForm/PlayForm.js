import React, { useState } from 'react';
import { useStopwatch } from 'react-timer-hook';

import ColorPicker from '../ColorPicker/ColorPicker';

import './PlayForm.css';
import '../EditForm/EditForm.css';

export default function PlayForm({onStartOver, canUndo, onUndo, canRedo, onRedo, onColorSelected}) {

    const [startOverActive, setStartOverActive] = useState(false);
    const { hours, minutes, seconds, start, pause, reset } = useStopwatch();

    return (
        <div className="edit-form play-form">
            <div className="edit-form__section">
                <div className="edit-form__section-title">Instructions</div>
                <p>
                    To place numbers in the grid, select a cell by clicking on it and then use the keyboard to enter values.
                    You can move between cells of the grid using the arrow keys.
                </p>
                <p>To place small numbers in the center of the cell (candidates), hold Ctrl.</p>
                <p>To place small numbers in the corners of the cell (pencil marks), hold Shift.</p>
            </div>
            <div className="edit-form__section">
                <div className="edit-form__section-title">Additional controls</div>
                <div className="edit-form__field">
                    <span className="edit-form__field-name">Highlight Cell</span>
                    <div className="edit-form__field-input">
                        <ColorPicker selectedColor={'NOT_A_COLOR'} onColorSelected={onColorSelected}></ColorPicker>
                    </div>
                </div>
                <div className="edit-form__field">
                    <div className="edit-form__field-input play-form__undo-buttons">
                        <button className={"play-form__button play-form__undo-redo " + (canUndo ? '' : 'play-form__undo-redo--disabled')} disabled={!canUndo} onClick={() => onUndo()}>Undo</button>
                        <button className={"play-form__button play-form__undo-redo " + (canRedo ? '' : 'play-form__undo-redo--disabled')} disabled={!canRedo} onClick={() => onRedo()}>Redo</button>
                    </div>
                </div>
                <div className="edit-form__field">
                    {!startOverActive && <button className="play-form__button play-form__start-over" onClick={() => setStartOverActive(true)}>Start over!</button>}
                    {startOverActive && <button className="play-form__button play-form__start-over play-form__start-over--danger" onClick={() => onStartOver()} onMouseLeave={() => setStartOverActive(false)}>Really start over?</button>}
                </div>
            </div>
            <div className="edit-form__section">
                <div className="edit-form__section-title">Timer</div>
                <div className="play-form__timer">{timerString(hours, minutes, seconds)}</div>
                <div className="edit-form__field">
                    <div className="edit-form__field-input play-form__timer-buttons">
                        <button className="play-form__button" onClick={() => start()}>Start</button>
                        <button className="play-form__button" onClick={() => pause()}>Stop</button>
                        <button className="play-form__button" onClick={() => reset()}>Clear</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


const timerString = (hours, minutes, seconds) => {
    const paddedSeconds = seconds.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');
    const paddedHours = hours === 0 ? '' : hours.toString().padStart(2, '0');

    return [paddedHours, paddedMinutes, paddedSeconds].filter(x => x !== '').join(':');
};