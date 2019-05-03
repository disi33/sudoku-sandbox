import React from 'react';
import './EditForm.css';

import ColorPicker from '../ColorPicker/ColorPicker';
import List from '../List/List';
import Tabs from '../Tabs/Tabs';
import TextInput from '../TextInput/TextInput';

export default function UnderlaysEditForm({underlays, selectedUnderlayIdx, onUnderlaySelected, onUnderlayRemoved, onUnderlayAdded, onCenterChanged, onWidthChanged, onHeightChanged, onBorderColorChanged, onBackgroundColorChanged, onRoundedChanged}) {

    const underlay = underlays[selectedUnderlayIdx];

    const shapeTabItems = [
        {key: 'SQUARE', name: 'Square'},
        {key: 'ROUNDED', name: 'Rounded'},
    ];

    return (
        <div className="edit-form">
            <div className="edit-form__section">
                <div className="edit-form__section-title">Add/Remove Underlays</div>
                <p>
                    Click in the puzzle area to add a new underlay at that position.
                    Hold Shift when clicking to instead move the currently-selected underlay.
                </p>
                <div className="edit-form__field">
                    <div className="edit-form__field-input">
                        <List items={underlays} selectedIdx={selectedUnderlayIdx} onItemSelected={onUnderlaySelected} onItemRemoved={onUnderlayRemoved} onItemAdded={() => {onUnderlaySelected(underlays.length); onUnderlayAdded();}} itemToText={underlayToText}></List> 
                    </div>
                </div>
            </div>
            {underlay !== undefined && 
                <div className="edit-form__section">
                    <div className="edit-form__section-title">Edit Selected Underlay</div>
                    <p>
                        Click on the puzzle area to reposition this underlay with its top-left corner at the clicked point.
                        Use the form below for tweaking and more fine-grained control.
                    </p>
                    <div className="edit-form__field">
                        <div className="edit-form__field-name">Centre</div>
                        <div className="edit-form__field-input edit-form__field-input--spaced">
                            <TextInput numeric label="Row" value={underlay.center[0]} onValueChanged={value => onCenterChanged(selectedUnderlayIdx, [value, underlay.center[1]])}></TextInput>
                            <TextInput numeric label="Col" value={underlay.center[1]} onValueChanged={value => onCenterChanged(selectedUnderlayIdx, [underlay.center[0], value])}></TextInput>
                        </div>
                    </div>
                    <div className="edit-form__field">
                        <div className="edit-form__field-name">Size</div>
                        <div className="edit-form__field-input edit-form__field-input--spaced">
                            <TextInput numeric label="Width" value={underlay.width} onValueChanged={value => onWidthChanged(selectedUnderlayIdx, value)}></TextInput>
                            <TextInput numeric label="Height" value={underlay.height} onValueChanged={value => onHeightChanged(selectedUnderlayIdx, value)}></TextInput>
                        </div>
                    </div>
                    <div className="edit-form__field">
                        <div className="edit-form__field-name">Shape</div>
                        <div className="edit-form__field-input">
                            <Tabs items={shapeTabItems} selectedKey={underlay.rounded ? 'ROUNDED' : 'SQUARE'} onItemSelected={key => onRoundedChanged(selectedUnderlayIdx, key === 'ROUNDED')}></Tabs>
                        </div>
                    </div>
                    <div className="edit-form__field">
                        <div className="edit-form__field-name">Border</div>
                        <div className="edit-form__field-input">
                            <ColorPicker selectedColor={underlay.borderColor} onColorSelected={color => onBorderColorChanged(selectedUnderlayIdx, color)}></ColorPicker>
                        </div>
                    </div>
                    <div className="edit-form__field">
                        <div className="edit-form__field-name">Background</div>
                        <div className="edit-form__field-input">
                            <ColorPicker selectedColor={underlay.backgroundColor} onColorSelected={color => onBackgroundColorChanged(selectedUnderlayIdx, color)}></ColorPicker>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

const underlayToText = underlay => `Underlay: ${underlayShape(underlay)} @ (${underlay.center[0]}, ${underlay.center[1]})`;

const underlayShape = underlay => underlay.rounded ? 'Rounded' : 'Square';