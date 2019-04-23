import React from 'react';
import './PlusMinusInput.css';

export default function PlusMinusInput({value, minValue, maxValue, onValueChanged}) {
    return (
        <div className="plus-minus-input">
            <div className="plus-minus-input__button" 
                    disabled={value <= minValue}
                    onClick={() => onValueChanged(value - 1)}>
                -
            </div>
            <span className="plus-minus-input__value">{value}</span>
            <div className="plus-minus-input__button" 
                    disabled={value >= maxValue}
                    onClick={() => onValueChanged(value + 1)}>
                +
            </div>
        </div>
    );
}