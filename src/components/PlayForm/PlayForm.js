import React, { useState } from 'react';
import useTimer from '../../hooks/useTimer';

import ColorPicker from '../ColorPicker/ColorPicker';
import Tabs from '../Tabs/Tabs';

import './PlayForm.css';
import '../EditForm/EditForm.css';

export default function PlayForm({entryMode, onSetEntryMode, onStartOver, onMarkRepeats, canUndo, onUndo, canRedo, onRedo, onColorSelected}) {

    const [startOverActive, setStartOverActive] = useState(false);
    const { elapsedTime, isTimerStarted, toggleTimer, resetTimer } = useTimer();

    const entryModes = [
        { key: 'NORMAL', name: 'Normal' },
        { key: 'CORNERS', name: 'Corners' },
        { key: 'CENTERS', name: 'Centres' },
    ];

    return (
        <div className="edit-form play-form">
            <div className="edit-form__section">
                <div className="edit-form__section-title">Instructions</div>
                <p>
                    Select a cell by clicking on it and then use the keyboard to enter values.
                    You can move between cells of the grid using the arrow keys.
                </p>
                <p>
                    To place small numbers in the center of the cell (candidates), hold Ctrl.
                    To place small numbers in the corners of the cell (pencil marks), hold Shift.
                </p>
            </div>
            <div className="edit-form__section">
                <div className="edit-form__section-title">Additional controls</div>
                <div className="edit-form__field play-form__entry-mode">
                    <span className="edit-form__field-name">Entry mode</span>
                    <div className="edit-form__field-input">
                        <Tabs items={entryModes} selectedKey={entryMode} onItemSelected={onSetEntryMode}></Tabs>
                    </div>
                </div>
                <div className="edit-form__field">
                    <span className="edit-form__field-name">Highlight Cell</span>
                    <div className="edit-form__field-input">
                        <ColorPicker selectedColor={'NOT_A_COLOR'} onColorSelected={onColorSelected}></ColorPicker>
                    </div>
                </div>
                <div className="edit-form__field">
                    <div className="edit-form__field-input play-form__undo-buttons">
                        <button className={"play-form__button play-form__undo-redo " + (canUndo ? '' : 'play-form__undo-redo--disabled')} disabled={!canUndo} onClick={onUndo}>Undo</button>
                        <button className={"play-form__button play-form__undo-redo " + (canRedo ? '' : 'play-form__undo-redo--disabled')} disabled={!canRedo} onClick={onRedo}>Redo</button>
                    </div>
                </div>
                <div className="edit-form__field">
                    <button className="play-form__button play-form__repeats-button" onClick={onMarkRepeats}>Check for repeats</button>
                </div>
                <div className="edit-form__field">
                    {!startOverActive && <button className="play-form__button play-form__start-over" onClick={() => setStartOverActive(true)}>Start over!</button>}
                    {startOverActive && <button className="play-form__button play-form__start-over play-form__start-over--danger" onClick={onStartOver} onMouseLeave={() => setStartOverActive(false)}>Really start over?</button>}
                </div>
            </div>
            <div className="edit-form__section">
                <div className="edit-form__section-title">Timer</div>
                <div className="play-form__timer">{timerString(elapsedTime)}</div>
                <div className="edit-form__field">
                    <div className="play-form__timer-buttons">
                        {!isTimerStarted && <button className="play-form__button play-form__start-button" onClick={toggleTimer}>Start</button>}
                        {isTimerStarted && <button className="play-form__button play-form__stop-button" onClick={toggleTimer}>Stop</button>}
                        <button className="play-form__button" onClick={resetTimer}>Reset</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const timerString = ({hours, minutes, seconds}) => {
    const paddedSeconds = seconds.toString().length < 2 ? '0' + seconds.toString() : seconds.toString();
    const paddedMinutes = minutes.toString().length < 2 ? '0' + minutes.toString() : minutes.toString();
    const paddedHours = hours === 0 ? '' : hours.toString().padStart(2, '0');

    return [paddedHours, paddedMinutes, paddedSeconds].filter(x => x !== '').join(':');
};