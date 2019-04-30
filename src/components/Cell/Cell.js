import React from 'react';
import './Cell.css';

export default function Cell({ size, givenValue, userValue, selected, highlight, borders, cageBorders, cageValue, userCandidates, givenPencilMarks, userPencilMarks, onClick }) {
    return (
        <div onClick={onClick} className={"cell " + cellClasses(borders)} style={{width: size, height: size}}>
            {highlight && <div className="cell__highlight" style={{backgroundColor: highlight}}></div>}
            {selected && <div className="cell__highlight" style={{backgroundColor: 'rgba(255, 215, 0, 0.5)'}}></div>}
            <div className={"cell__border " + borderClasses(borders)}>
                {cageValue !== undefined && <span className="cell__cage-value" style={{fontSize: size / 4.5}}>{cageValue}</span>}
            </div>
            <div className={"cell__inner"} style={innerCellPositioning(cageBorders, borders, size)}>
                <div className={"cell__inner-border " + cageBorderClasses(cageBorders)}></div>
                {givenValue && <span className="cell__value cell__value--given" style={{fontSize: size / 1.5}}>{givenValue}</span>}
                {!givenValue && userValue && <span className="cell__value cell__value--user" style={{fontSize: size / 1.5}}>{userValue}</span>}
                {!givenValue && !userValue && givenPencilMarks.map((pm, idx) =>
                    <span key={idx} style={{fontSize: size / 4.2}} className={"cell__pm cell__pm--given cell__pm--" + pencilMarkModifiers[idx % pencilMarkModifiers.length]}>{pm}</span>
                )}
                {!givenValue && !userValue && userPencilMarks.map((pm, idx) =>
                    <span key={idx} style={{fontSize: size / 4.2}} className={"cell__pm cell__pm--given cell__pm--" + pencilMarkModifiers[(givenPencilMarks.length + idx) % pencilMarkModifiers.length]}>{pm}</span>
                )}
                {!givenValue && !userValue && userCandidates.length > 0 && <span className="cell__candidates cell__candidates--user" style={{fontSize: size / 4}}>{userCandidates.join('')}</span>}
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