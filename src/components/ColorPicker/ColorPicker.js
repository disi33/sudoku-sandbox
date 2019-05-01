import React from 'react';
import './ColorPicker.css';

export default function ColorPicker({selectedColor, onColorSelected}) {
    return (
        <div className="color-picker">
            <button className={"color-picker__button color-picker__button--none " + selectedClassName(undefined, selectedColor)}
                    onMouseDown={e => { e.preventDefault(); e.stopPropagation(); }}
                    onClick={() => onColorSelected(undefined)}
                    tabIndex="-1">
            </button>
            <div className="color-picker__main-buttons">
                {COLORS.map((color, idx) =>
                    <button key={idx} 
                            className={"color-picker__button " + selectedClassName(color, selectedColor)}
                            style={{backgroundColor: color}}
                            onMouseDown={e => { e.preventDefault(); e.stopPropagation(); }}
                            onClick={() => onColorSelected(color)}
                            tabIndex="-1">
                    </button>
                )}
            </div>
        </div>
    );
}

const selectedClassName = (color, selectedColor) => 
    color === selectedColor ? 'color-picker__button--selected' : '';

const COLORS = [
    '#000000', '#CFCFCF', '#EB7532', '#A3E048', '#D23BE7',
    '#FFFFFF', '#E6261F', '#F7D038', '#34BBE6',
];