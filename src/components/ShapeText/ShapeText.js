import React from 'react';
import './ShapeText.css';

export default function ShapeText(props) {
    return (
        <div className={`shapetext shapetext--${overUnder(props)} ` + (props.selected ? 'shapetext--selected' : '')} style={shapetextStyling(props)}>{props.text}</div>
    );
}

const overUnder = ({overlaid}) => overlaid ? 'overlay' : 'underlay';

const shapetextStyling = ({ cellSize, origin: [y, x], width, height, borderColor, backgroundColor, rounded, fontSize }) => ({
    left: cellSize * x,
    top: cellSize * y,
    width: cellSize * width,
    height: cellSize * height,
    borderColor: borderColor === undefined ? 'transparent' : borderColor,
    backgroundColor: backgroundColor === undefined ? 'initial' : backgroundColor,
    borderRadius: rounded ? cellSize * Math.min(width, height) : 0,
    fontSize: fontSize === undefined ? 'initial' : fontSize,
});