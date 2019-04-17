import React from 'react';
import './Shade.css';

export default function Shade(props) {
    return (
        <div className="shade" style={shadeStyling(props)}></div>
    );
}

const shadeStyling = ({ cellSize, origin: [x, y], width, height, color }) => ({
    top: cellSize * x,
    left: cellSize * y,
    width: cellSize * width,
    height: cellSize * height,
    backgroundColor: color,
});