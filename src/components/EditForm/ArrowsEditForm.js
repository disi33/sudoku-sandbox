import React from 'react';
import './EditForm.css';

import ColorPicker from '../ColorPicker/ColorPicker';
import List from '../List/List';
import PlusMinusInput from '../PlusMinusInput/PlusMinusInput';
import PositionsInput from '../PositionsInput/PositionsInput';
import TextInput from '../TextInput/TextInput';

export default function ArrowsEditForm({arrows, selectedArrowIdx, onArrowSelected, onArrowRemoved, onArrowAdded, onThicknessChanged, onColorChanged, onHeadLengthChanged, onWayPointRemoved, onWayPointAdded, onWayPointChanged}) {

    const arrow = arrows[selectedArrowIdx];

    return (
        <div className="edit-form">
            <div className="edit-form__section">
                <div className="edit-form__section-title">Add/Remove Arrows</div>
                <div className="edit-form__field">
                    <div className="edit-form__field-input">
                        <List items={arrows} selectedIdx={selectedArrowIdx} onItemSelected={onArrowSelected} onItemRemoved={onArrowRemoved} onItemAdded={() => {onArrowSelected(arrows.length); onArrowAdded();}} itemToText={arrowToText}></List>
                    </div>
                </div>
            </div>
            {arrow !== undefined &&
                <div className="edit-form__section">
                    <div className="edit-form__section-title">Edit Selected Arrow</div>
                    <p>
                        Click on positions in the puzzle area to add waypoints for the arrow to pass through.
                        Hold Shift when clicking to change the position of the last waypoint.
                        Use the form below for tweaking and more fine-grained control.
                    </p>
                    <div className="edit-form__field">
                        <span className="edit-form__field-name">Thickness</span>
                        <div className="edit-form__field-input">
                            <PlusMinusInput value={arrow.thickness} minValue={1} maxValue={99} onValueChanged={value => onThicknessChanged(selectedArrowIdx, value)}></PlusMinusInput>
                        </div>
                    </div>
                    <div className="edit-form__field">
                        <span className="edit-form__field-name">Head Length</span>
                        <div className="edit-form__field-input">
                            <TextInput numeric label="" value={arrow.headLength} onValueChanged={value => onHeadLengthChanged(selectedArrowIdx, value)}></TextInput>
                        </div>
                    </div>
                    <div className="edit-form__field">
                        <span className="edit-form__field-name">Colour</span>
                        <div className="edit-form__field-input">
                            <ColorPicker selectedColor={arrow.color} onColorSelected={color => onColorChanged(selectedArrowIdx, color)}></ColorPicker>
                        </div>
                    </div>
                    <div className="edit-form__field">
                    <span className="edit-form__field-name">Waypoints</span>
                        <div className="edit-form__field-input">
                            <PositionsInput items={arrow.wayPoints} onItemRemoved={idx => onWayPointRemoved(selectedArrowIdx, idx)} onItemAdded={value => onWayPointAdded(selectedArrowIdx, value)} onItemChanged={(idx, value) => onWayPointChanged(selectedArrowIdx, idx, value)}></PositionsInput>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

const arrowToText = arrow => arrow.wayPoints.length > 0
    ? `Arrow from ${wayPointToText(arrow.wayPoints[0])} to ${wayPointToText(arrow.wayPoints[arrow.wayPoints.length - 1])}`
    : 'Arrow';

const wayPointToText = wayPoint => `(${wayPoint[0]}, ${wayPoint[1]})`;