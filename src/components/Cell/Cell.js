import React from 'react';
import './Cell.css';

export default function Cell({ size, value, borders, cageBorders, cageValue, candidates, pencilMarks }) {
    return (
        <div className={"cell " + cellClasses(borders)} style={{width: size, height: size}}>
            <div className={"cell__border " + borderClasses(borders)}>
                {cageValue && <span className="cell__cage-value" style={{fontSize: size / 4.5}}>{cageValue}</span>}
            </div>
            <div className={"cell__inner"} style={innerCellPositioning(cageBorders, borders, size)}>
                <div className={"cell__inner-border " + cageBorderClasses(cageBorders)}></div>
                {value && <span className="cell__value" style={{fontSize: size / 1.5}}>{value}</span>}
                {!value && pencilMarks.map((pm, idx) =>
                    <span key={idx} style={{fontSize: size / 4.2}} className={"cell__pm cell__pm--" + pencilMarkModifiers[idx % pencilMarkModifiers.length]}>{pm}</span>
                )}
                {!value && candidates.length > 0 && <span className="cell__candidates" style={{fontSize: size / 4}}>{candidates.join('')}</span>}
            </div>
        </div>
    );
}

const innerCellPositioning = (cageBorders, borders, size) => {
    let [top, left, bottom, right] = [['U', 'u'], ['L', 'l'], ['D', 'd'], ['R', 'r']].map(([x, y]) => borders.includes(x) ? 3 : (borders.includes(y) ? 1 : 0));

    const baseWidth = size - (left + right);
    const baseHeight = size - (top + bottom);
    
    const [uOff, lOff, dOff, rOff] = ['U', 'L', 'D', 'R'].map(x => cageBorders.includes(x) ? 2 : 0);
    return {
        top: uOff,
        left: lOff,
        width: baseWidth - (lOff + rOff),
        height: baseHeight - (uOff + dOff),
    };
};

const cellClasses = borders => 
    borders.map(b => `cell--${b}`).join(' ');
    
const borderClasses = borders => 
    borders.map(b => `cell__border--${b}`).join(' ');

const cageBorderClasses = cageBorders =>
    cageBorders.map(b => `cell__inner-border--${b}`).join(' ');

const pencilMarkModifiers = [
    'ul', 'ur', 'dl', 'dr', 'uu', 'dd', 'll', 'rr',
];