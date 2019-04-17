import React from 'react';
import './Arrow.css';

export default function Arrow({ cellSize, wayPoints, color, thickness }) {
    return (
        <div>
            {wayPoints.slice(1).map((wayPoint, idx) => 
                <div class="arrow-body" key={idx} style={bodyStyleAttributes({ cellSize, start: wayPoints[idx], end: wayPoint, color, thickness})}></div>
            )}
            <div class="arrow-head" style={headStyleAttributes({ cellSize, start: wayPoints[wayPoints.length - 2], end: wayPoints[wayPoints.length - 1], color, thickness })}></div>
        </div>
    );
}

const bodyPosition = ([start_x, start_y], [end_x, end_y], thickness) => {
    const [centre_x, centre_y] = [(start_x + end_x) / 2, (start_y + end_y) / 2];
    const length = Math.sqrt((end_x - start_x) * (end_x - start_x) + (end_y - start_y) * (end_y - start_y)) + thickness;
    const angle = Math.atan2(end_y - start_y, end_x - start_x) * 180 / Math.PI;

    return {
        left: centre_x - length / 2,
        top: centre_y - thickness / 2,
        width: length,
        height: thickness,
        transform: `rotate(${angle}deg)`,
        WebkitTransform: `rotate(${angle}deg)`,
    };
};

const bodyStyleAttributes = ({ cellSize, start, end, color, thickness }) => (
    {
        ... bodyPosition(start.map(x => x * cellSize), end.map(x => x * cellSize), thickness),
        backgroundColor: color,
        borderRadius: thickness,
    }
);

const headPosition = ([start_x, start_y], [end_x, end_y], cellSize, thickness) => {
    const length = Math.sqrt((end_x - start_x) * (end_x - start_x) + (end_y - start_y) * (end_y - start_y));
    const angle = Math.atan2(end_y - start_y, end_x - start_x) * 180 / Math.PI;

    return {
        left: end_x + 2 * thickness * (end_x - start_x) / length,
        top: end_y + 2 * thickness * (end_y - start_y) / length,
        borderWidth: `${thickness}px 0 0 ${thickness}px`,
        padding: cellSize / 4,
        transform: `rotate(${angle + 135}deg)`,
        WebkitTransform: `rotate(${angle + 135}deg)`,
        transformOrigin: 'top left',
        WebkitTransformOrigin: 'top left',
    };
}

const headStyleAttributes = ({ cellSize, start, end, color, thickness }) => (
    {
        border: `solid ${color}`,
        ...headPosition(start.map(x => x * cellSize), end.map(x => x * cellSize), cellSize, thickness),
    }
);