import React from 'react';
import './Cell.css';

export default function Cell({ coords: { row, col }, value, borders, candidates, pencilMarks }) {
    return (
        <div className={"cell " + borderClasses(borders)}>
            {value && <span className="cell__value">{value}</span>}
            {!value && pencilMarks.map((pm, idx) =>
                <span key={idx} className={"cell__pm cell__pm--" + pencilMarkModifiers[idx % pencilMarkModifiers.length]}>{pm}</span>
            )}
            {!value && candidates.length > 0 && <span className="cell__candidates">{candidates.join('')}</span>}
        </div>
    );
}

const borderClasses = borders => 
    borders.map(b => `cell--border-${b}`).join(' ');

const pencilMarkModifiers = [
    'ul', 'ur', 'dl', 'dr', 'uu', 'dd', 'll', 'rr',
];