import React from 'react';
import './Cell.css';

export default function Cell({ size, value, borders, candidates, pencilMarks }) {
    return (
        <div className={"cell " + borderClasses(borders)} style={{width: size, height: size}}>
            {value && <span className="cell__value" style={{fontSize: size / 1.25}}>{value}</span>}
            {!value && pencilMarks.map((pm, idx) =>
                <span key={idx} style={{fontSize: size / 4}} className={"cell__pm cell__pm--" + pencilMarkModifiers[idx % pencilMarkModifiers.length]}>{pm}</span>
            )}
            {!value && candidates.length > 0 && <span className="cell__candidates" style={{fontSize: size / 4}}>{candidates.join('')}</span>}
        </div>
    );
}

const borderClasses = borders => 
    borders.map(b => `cell--border-${b}`).join(' ');

const pencilMarkModifiers = [
    'ul', 'ur', 'dl', 'dr', 'uu', 'dd', 'll', 'rr',
];