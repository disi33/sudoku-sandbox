import React from 'react';
import './Rectangle.css';

export default function Rectangle(props) {
    return (
        <div className="rectangle" style={rectangleStyling(props)}></div>
    );
}

const rectangleStyling = ({ cellSize, origin: [x, y], width, height, color, filled }) => ({
    left: cellSize * x,
    top: cellSize * y,
    width: cellSize * width,
    height: cellSize * height,
    backgroundColor: filled ? color : 'initial',
    borderColor: color,
});