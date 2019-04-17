import React from 'react';
import './Line.css';

export default function Line({ cellSize, wayPoints, color, thickness }) {
    return (
        <div>
            {wayPoints.slice(1).map((wayPoint, idx) => 
                <div class="line" key={idx} style={styleAttributes({ cellSize, start: wayPoints[idx], end: wayPoint, color, thickness})}></div>
            )}
        </div>
    );
}

const positionStyleAttributes = ([start_x, start_y], [end_x, end_y], thickness) => {
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

const styleAttributes = ({ cellSize, start, end, color, thickness }) => (
    {
        ... positionStyleAttributes(start.map(x => x * cellSize), end.map(x => x * cellSize), thickness),
        backgroundColor: color,
        borderRadius: thickness,
    }
);