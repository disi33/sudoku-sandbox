import React, { useState } from 'react';
import './TextInput.css';

export default function TextInput({label, value, onValueChanged, numeric}) {

    const [inputValue, setInputValue] = useState(value);
    const [prevValueProp, setPrevValueProp] = useState(null);

    if (value !== prevValueProp) {
        if (+inputValue !== value) setInputValue(value);
        setPrevValueProp(value);
    }

    return (
        <div className="text-input">
            <div className="text-input__label">{label}</div>
            <input className="text-input__input" value={inputValue} onChange={e => handleChange(setInputValue, onValueChanged, numeric)(e.target.value)}></input>
        </div>
    );
}

const handleChange = (setInputValue, onValueChanged, numeric) => value => {
    setInputValue(value);
    if (numeric && !isNaN(+value)) {
        onValueChanged(+value);
    } else if (!numeric) {
        onValueChanged(value);
    }
}
