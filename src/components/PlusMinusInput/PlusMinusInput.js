import React from 'react';
import './PlusMinusInput.css';

export default function PlusMinusInput({value, minValue, maxValue, onValueChanged}) {
    return (
        <div className="plus-minus-input">
            <button className="plus-minus-input__button" 
                    disabled={value <= minValue}
                    onClick={() => onValueChanged(value - 1)}>
                -
            </button>
            <span className="plus-minus-input__value">{value}</span>
            <button className="plus-minus-input__button" 
                    disabled={value >= maxValue}
                    onClick={() => onValueChanged(value + 1)}>
                +
            </button>
        </div>
    );
}