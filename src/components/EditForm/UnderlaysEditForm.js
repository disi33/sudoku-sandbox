import React, {useState} from 'react';
import './EditForm.css';

import ColorPicker from '../ColorPicker/ColorPicker';
import List from '../List/List';
import Tabs from '../Tabs/Tabs';
import TextInput from '../TextInput/TextInput';

export default function UnderlaysEditForm({underlays, onUnderlayRemoved, onUnderlayAdded, onOriginChanged, onWidthChanged, onHeightChanged, onBorderColorChanged, onBackgroundColorChanged, onRoundedChanged}) {

    const [selectedUnderlayIdx, setSelectedUnderlayIdx] = useState(0);
    const underlay = underlays[selectedUnderlayIdx];

    const shapeTabItems = [
        {key: 'SQUARE', name: 'Square'},
        {key: 'ROUNDED', name: 'Rounded'},
    ];

    return (
        <div className="edit-form">
            <div className="edit-form__section">
                <div className="edit-form__section-title">Add/Remove Underlays</div>
                <div className="edit-form__field">
                    <div className="edit-form__field-input">
                        <List items={underlays} selectedIdx={selectedUnderlayIdx} onItemSelected={setSelectedUnderlayIdx} onItemRemoved={onUnderlayRemoved} onItemAdded={onUnderlayAdded} itemToText={underlayToText}></List> 
                    </div>
                </div>
            </div>
            {underlay !== undefined && 
                <div className="edit-form__section">
                    <div className="edit-form__section-title">Edit Selected Underlay</div>
                    <div className="edit-form__field">
                        <div className="edit-form__field-name">Top-left</div>
                        <div className="edit-form__field-input edit-form__field-input--spaced">
                            <TextInput label="Row" value={underlay.origin[0]} onValueChanged={value => onOriginChanged(selectedUnderlayIdx, [value, underlay.origin[1]])}></TextInput>
                            <TextInput label="Col" value={underlay.origin[1]} onValueChanged={value => onOriginChanged(selectedUnderlayIdx, [underlay.origin[0], value])}></TextInput>
                        </div>
                    </div>
                    <div className="edit-form__field">
                        <div className="edit-form__field-name">Size</div>
                        <div className="edit-form__field-input edit-form__field-input--spaced">
                            <TextInput label="Width" value={underlay.width} onValueChanged={value => onWidthChanged(selectedUnderlayIdx, value)}></TextInput>
                            <TextInput label="Height" value={underlay.height} onValueChanged={value => onHeightChanged(selectedUnderlayIdx, value)}></TextInput>
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

const underlayToText = underlay => `Underlay: ${underlayShape(underlay)} @ (${underlay.origin[0]}, ${underlay.origin[1]})`;

const underlayShape = underlay => underlay.rounded ? 'Square' : 'Rounded';