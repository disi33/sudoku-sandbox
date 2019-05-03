import React from 'react';
import '../ShapeText/ShapeText.css';

import ShapeText from '../ShapeText/ShapeText';

export default function Overlay({cellSize, center: [y, x], width, height, borderColor, backgroundColor, rounded, fontSize, text}) {
    const origin = [y - height / 2, x - width / 2];
    return (
        <ShapeText cellSize={cellSize} 
                   origin={origin} 
                   width={width} height={height} 
                   borderColor={borderColor} backgroundColor={backgroundColor} 
                   rounded={rounded} overlaid={true}
                   fontSize={fontSize} text={text}>
        </ShapeText>
    );
}