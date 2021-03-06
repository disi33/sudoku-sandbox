import React from 'react';
import './Line.css';

export default function Line({ cellSize, wayPoints, color, thickness, selected }) {
    const scaledUpWayPoints = wayPoints.map(([x, y]) => [x * cellSize, y * cellSize]);
    return (
        <div>
            {scaledUpWayPoints.slice(1).map((wayPoint, idx) => {
                const isStart = idx === 0;
                const isEnd = idx === wayPoints.length - 2;
                const [start, end] = calculateCoordinates(scaledUpWayPoints[idx], wayPoint, thickness, isStart || isEnd);
                return <div className={'line ' + (selected ? 'line--selected' : '')} key={idx} style={styleAttributes({ start, end, color, thickness})}></div>;
            })}
        </div>
    );
}

const calculateCoordinates = ([start_y, start_x], [end_y, end_x], thickness, isBoundary) => {
    
    const length = Math.sqrt((end_x - start_x) * (end_x - start_x) + (end_y - start_y) * (end_y - start_y));

    const start_dx = isBoundary ? 0 : (start_x - end_x) * thickness / length / 2.4;
    const start_dy = isBoundary ? 0 : (start_y - end_y) * thickness / length / 2.4;
    const end_dx = isBoundary ? 0 : (end_x - start_x) * thickness / length / 2.4;
    const end_dy = isBoundary ? 0 : (end_y - start_y) * thickness / length / 2.4;

    return [
        [start_x + start_dx, start_y + start_dy],
        [end_x + end_dx, end_y + end_dy],
    ];
}

const positionStyleAttributes = ([start_x, start_y], [end_x, end_y], thickness) => {
    const [centre_x, centre_y] = [(start_x + end_x) / 2, (start_y + end_y) / 2];
    const length = Math.sqrt((end_x - start_x) * (end_x - start_x) + (end_y - start_y) * (end_y - start_y));
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

const styleAttributes = ({ start, end, color, thickness }) => (
    {
        ...positionStyleAttributes(start, end, thickness),
        backgroundColor: color,
        borderRadius: thickness,
    }
);