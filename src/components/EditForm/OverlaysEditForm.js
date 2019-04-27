import React, {useState} from 'react';
import './EditForm.css';

import ColorPicker from '../ColorPicker/ColorPicker';
import List from '../List/List';
import PlusMinusInput from '../PlusMinusInput/PlusMinusInput';
import Tabs from '../Tabs/Tabs';
import TextInput from '../TextInput/TextInput';

export default function OverlaysEditForm({overlays, onOverlayRemoved, onOverlayAdded, onCenterChanged, onWidthChanged, onHeightChanged, onBorderColorChanged, onBackgroundColorChanged, onRoundedChanged, onTextChanged, onFontSizeChanged}) {

    const [selectedOverlayIdx, setSelectedOverlayIdx] = useState(0);
    const overlay = overlays[selectedOverlayIdx];

    const shapeTabItems = [
        {key: 'SQUARE', name: 'Square'},
        {key: 'ROUNDED', name: 'Rounded'},
    ];

    return (
        <div className="edit-form">
            <div className="edit-form__section">
                <div className="edit-form__section-title">Add/Remove Overlays</div>
                <div className="edit-form__field">
                    <div className="edit-form__field-input">
                        <List items={overlays} selectedIdx={selectedOverlayIdx} onItemSelected={setSelectedOverlayIdx} onItemRemoved={onOverlayRemoved} onItemAdded={onOverlayAdded} itemToText={overlayToText}></List> 
                    </div>
                </div>
            </div>
            {overlay !== undefined && 
                <div className="edit-form__section">
                    <div className="edit-form__section-title">Edit Selected Overlay</div>
                    <div className="edit-form__field">
                        <div className="edit-form__field-name">Centre</div>
                        <div className="edit-form__field-input edit-form__field-input--spaced">
                            <TextInput label="Row" value={overlay.center[0]} onValueChanged={value => onCenterChanged(selectedOverlayIdx, [value, overlay.center[1]])}></TextInput>
                            <TextInput label="Col" value={overlay.center[1]} onValueChanged={value => onCenterChanged(selectedOverlayIdx, [overlay.center[0], value])}></TextInput>
                        </div>
                    </div>
                    <div className="edit-form__field">
                        <div className="edit-form__field-name">Size</div>
                        <div className="edit-form__field-input edit-form__field-input--spaced">
                            <TextInput label="Width" value={overlay.width} onValueChanged={value => onWidthChanged(selectedOverlayIdx, value)}></TextInput>
                            <TextInput label="Height" value={overlay.height} onValueChanged={value => onHeightChanged(selectedOverlayIdx, value)}></TextInput>
                        </div>
                    </div>
                    <div className="edit-form__field">
                        <div className="edit-form__field-name">Shape</div>
                        <div className="edit-form__field-input">
                            <Tabs items={shapeTabItems} selectedKey={overlay.rounded ? 'ROUNDED' : 'SQUARE'} onItemSelected={key => onRoundedChanged(selectedOverlayIdx, key === 'ROUNDED')}></Tabs>
                        </div>
                    </div>
                    <div className="edit-form__field">
                        <div className="edit-form__field-name">Border</div>
                        <div className="edit-form__field-input">
                            <ColorPicker selectedColor={overlay.borderColor} onColorSelected={color => onBorderColorChanged(selectedOverlayIdx, color)}></ColorPicker>
                        </div>
                    </div>
                    <div className="edit-form__field">
                        <div className="edit-form__field-name">Background</div>
                        <div className="edit-form__field-input">
                            <ColorPicker selectedColor={overlay.backgroundColor} onColorSelected={color => onBackgroundColorChanged(selectedOverlayIdx, color)}></ColorPicker>
                        </div>
                    </div>
                    <div className="edit-form__field">
                        <div className="edit-form__field-name">Text</div>
                        <div className="edit-form__field-input">
                            <TextInput label="" value={overlay.text} onValueChanged={() => onTextChanged(selectedOverlayIdx, value)}></TextInput>
                        </div>
                    </div>
                    <div className="edit-form__field">
                        <div className="edit-form__field-name">Font size</div>
                        <div className="edit-form__field-input">
                            <PlusMinusInput value={overlay.fontSize} minValue={1} maxValue={99} onValueChanged={() => onFontSizeChanged(selectedOverlayIdx, value)}></PlusMinusInput>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

const overlayToText = overlay => `Overlay: ${overlayShape(overlay)} @ (${overlay.center[0]}, ${overlay.center[1]})`;

const overlayShape = overlay => overlay.rounded ? 'Square' : 'Rounded';