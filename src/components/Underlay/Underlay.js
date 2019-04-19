import React from 'react';
import './Underlay.css';

export default function Underlay(props) {
    return (
        <div className="underlay" style={underlayStyling(props)}></div>
    );
}

const underlayStyling = ({ cellSize, origin: [x, y], width, height, color, filled, rounded }) => ({
    left: cellSize * x,
    top: cellSize * y,
    width: cellSize * width,
    height: cellSize * height,
    backgroundColor: filled ? color : 'initial',
    borderColor: color,
    borderRadius: rounded ? cellSize * Math.min(width, height) : 0
});