import React from 'react';
import '../ShapeText/ShapeText.css';

import ShapeText from '../ShapeText/ShapeText';

export default function Underlay({cellSize, origin, width, height, borderColor, backgroundColor, rounded}) {
    return (
        <ShapeText cellSize={cellSize} 
                   origin={origin}
                   width={width} height={height} 
                   borderColor={borderColor} backgroundColor={backgroundColor} 
                   rounded={rounded} overlaid={false}
                   fontSize={undefined} text={undefined}>
        </ShapeText>
    );
}