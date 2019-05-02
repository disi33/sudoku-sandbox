import React from 'react';
import './EditForm.css';

import ColorPicker from '../ColorPicker/ColorPicker';
import List from '../List/List';
import PlusMinusInput from '../PlusMinusInput/PlusMinusInput';
import PositionsInput from '../PositionsInput/PositionsInput';

export default function LinesEditForm({lines, selectedLineIdx, onLineSelected, onLineRemoved, onLineAdded, onThicknessChanged, onColorChanged, onWayPointRemoved, onWayPointAdded, onWayPointChanged}) {

    const line = lines[selectedLineIdx];

    return (
        <div className="edit-form">
            <div className="edit-form__section">
                <div className="edit-form__section-title">Add/Remove Lines</div>
                <div className="edit-form__field">
                    <div className="edit-form__field-input">
                        <List items={lines} selectedIdx={selectedLineIdx} onItemSelected={onLineSelected} onItemRemoved={onLineRemoved} onItemAdded={() => {onLineSelected(lines.length); onLineAdded();}} itemToText={lineToText}></List>
                    </div>
                </div>
            </div>
            {line !== undefined &&
                <div className="edit-form__section">
                    <div className="edit-form__section-title">Edit Selected Line</div>
                    <p>
                        Click on positions in the puzzle area to add waypoints for the line to pass through. 
                        Use the form below for tweaking and more fine-grained control.
                    </p>
                    <div className="edit-form__field">
                        <span className="edit-form__field-name">Thickness</span>
                        <div className="edit-form__field-input">
                            <PlusMinusInput value={line.thickness} minValue={1} maxValue={99} onValueChanged={value => onThicknessChanged(selectedLineIdx, value)}></PlusMinusInput>
                        </div>
                    </div>
                    <div className="edit-form__field">
                        <span className="edit-form__field-name">Colour</span>
                        <div className="edit-form__field-input">
                            <ColorPicker selectedColor={line.color} onColorSelected={color => onColorChanged(selectedLineIdx, color)}></ColorPicker>
                        </div>
                    </div>
                    <div className="edit-form__field">
                    <span className="edit-form__field-name">Waypoints</span>
                        <div className="edit-form__field-input">
                            <PositionsInput items={line.wayPoints} onItemRemoved={idx => onWayPointRemoved(selectedLineIdx, idx)} onItemAdded={value => onWayPointAdded(selectedLineIdx, value)} onItemChanged={(idx, value) => onWayPointChanged(selectedLineIdx, idx, value)}></PositionsInput>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

const lineToText = line => line.wayPoints.length > 0 
    ? `Line from ${wayPointToText(line.wayPoints[0])} to ${wayPointToText(line.wayPoints[line.wayPoints.length - 1])}`
    : 'Line';

const wayPointToText = wayPoint => `(${wayPoint[0]}, ${wayPoint[1]})`;