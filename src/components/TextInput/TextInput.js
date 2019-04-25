import React from 'react';
import './TextInput.css';

export default function TextInput({label, value, onValueChanged}) {
    return (
        <div className="text-input">
            <div className="text-input__label">{label}</div>
            <input className="text-input__input" value={value} onChange={e => onValueChanged(e.target.value)}></input>
        </div>
    );
}