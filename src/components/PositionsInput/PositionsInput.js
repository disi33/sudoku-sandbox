import React, { useState } from 'react';
import './PositionsInput.css';

import TextInput from '../TextInput/TextInput';

export default function PositionsInput({items, onItemRemoved, onItemAdded, onItemChanged}) {

    const [addingItem, setAddingItem] = useState(false);
    const [newItem, setNewItem] = useState([0, 0]);

    return (
        <div className="positions-input">
            <div className="positions-input__items">
                {items.map((item, idx) =>
                    <div key={idx} className="positions-input__item">
                        <div className="positions-input__inputs">
                            <TextInput label="Row" value={item[0]} onValueChanged={value => onItemChanged(idx, [value, item[1]])}></TextInput>
                            <TextInput label="Col" value={item[1]} onValueChanged={value => onItemChanged(idx, [item[0], value])}></TextInput>
                        </div>
                        <div className="positions-input__button-container">
                            <button className="positions-input__button positions-input__button--remove" onClick={() => onItemRemoved(idx)}>X</button>
                        </div>
                    </div>
                )}
                {addingItem && <div className="positions-input__item">
                    <div className="positions-input__inputs">
                        <TextInput label="New row" value={newItem[0]} onValueChanged={value => setNewItem([value, newItem[1]])}></TextInput>
                        <TextInput label="New col" value={newItem[1]} onValueChanged={value => setNewItem([newItem[0], value])}></TextInput>
                    </div>
                    <div className="positions-input__button-container">
                        <button className="positions-input__button positions-input__button--confirm" onClick={() => { setAddingItem(false); onItemAdded(newItem); }}>{'\u2713'}</button>
                    </div>
                </div>}
                {!addingItem && <div className="positions-input__item">
                    <div className="positions-input__inputs hidden" style={{visibility: 'hidden'}}>
                        <TextInput label="Row" value={0} onValueChanged={() => {}}></TextInput>
                        <TextInput label="Col" value={0} onValueChanged={() => {}}></TextInput>
                    </div>
                    <div className="positions-input__button-container">
                        <button className="positions-input__button positions-input__button--add" onClick={() => setAddingItem(true)}>+</button>
                    </div>
                </div>}
            </div>
        </div>
    );
}
