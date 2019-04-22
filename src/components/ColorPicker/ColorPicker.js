import React from 'react';
import './ColorPicker.css';

export default function ColorPicker({selectedColor, onColorSelected}) {
    return (
        <div className="color-picker">
            {COLORS.map((color, idx) =>
                <button key={idx} 
                        className={"color-picker__button " + selectedClassName(color, selectedColor)}
                        style={{backgroundColor: color}}
                        onClick={() => onColorSelected(color)}>
                </button>
            )}
        </div>
    );
}

const selectedClassName = (color, selectedColor) => 
    color === selectedColor ? 'color-picker__button--selected' : '';

const COLORS = [
    '#000000', '#575757', '#AD2323', '#2A4BD7', '#1D6914', '#814A19', '#8126C0', '#B0B0B0',
    '#81C57A', '#9DAFFF', '#29D0D0', '#FF9229', '#FFEE1F', '#E9DEBB', '#FFCDF3', '#FFFFFF',
];