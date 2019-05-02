import React from 'react';
import './Arrow.css';

import Line from '../Line/Line';

export default function Arrow({ cellSize, wayPoints, color, thickness, headLength }) {
    return (
        <div>
            <Line cellSize={cellSize} wayPoints={wayPoints} color={color} thickness={thickness}></Line>
            {wayPoints.length >= 2 && 
                <div className="arrow-head" style={headStyleAttributes({ cellSize, start: wayPoints[wayPoints.length - 2], end: wayPoints[wayPoints.length - 1], color, thickness, headLength })}></div>
            }
        </div>
    );
}

const headPosition = (cellSize, [start_y, start_x], [end_y, end_x], thickness, headLength) => {
    const length = Math.sqrt((end_x - start_x) * (end_x - start_x) + (end_y - start_y) * (end_y - start_y));
    const angle = Math.atan2(end_y - start_y, end_x - start_x) * 180 / Math.PI;

    return {
        left: end_x + thickness * (end_x - start_x) / length / 3,
        top: end_y + thickness * (end_y - start_y) / length / 3,
        padding: cellSize * headLength / 2,
        transform: `rotate(${angle + 135}deg)`,
        WebkitTransform: `rotate(${angle + 135}deg)`,
        transformOrigin: 'top left',
        WebkitTransformOrigin: 'top left',
    };
}

const headStyleAttributes = ({ cellSize, start, end, color, thickness, headLength }) => (
    {
        borderTop: `${thickness}px solid ${color}`,
        borderLeft: `${thickness}px solid ${color}`,
        ...headPosition(cellSize, start.map(x => x * cellSize), end.map(x => x * cellSize), thickness, headLength),
    }
);