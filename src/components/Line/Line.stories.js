import React from 'react';
import { storiesOf } from '@storybook/react';

import Grid from '../Grid/Grid';

const emptyCell = { value: undefined, candidates: [], pencilMarks: []};

const cellSize = 50;

const emptyGrid = { 
    cells: [...Array(9)].map(_ =>
        [...Array(9)].map(_ => ({...emptyCell}))
    ),
    regions: [
        [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]],
        [[3, 0], [3, 1], [3, 2], [4, 0], [4, 1], [4, 2], [5, 0], [5, 1], [5, 2]],
        [[6, 0], [6, 1], [6, 2], [7, 0], [7, 1], [7, 2], [8, 0], [8, 1], [8, 2]],
        [[0, 3], [0, 4], [0, 5], [1, 3], [1, 4], [1, 5], [2, 3], [2, 4], [2, 5]],
        [[3, 3], [3, 4], [3, 5], [4, 3], [4, 4], [4, 5], [5, 3], [5, 4], [5, 5]],
        [[6, 3], [6, 4], [6, 5], [7, 3], [7, 4], [7, 5], [8, 3], [8, 4], [8, 5]],
        [[0, 6], [0, 7], [0, 8], [1, 6], [1, 7], [1, 8], [2, 6], [2, 7], [2, 8]],
        [[3, 6], [3, 7], [3, 8], [4, 6], [4, 7], [4, 8], [5, 6], [5, 7], [5, 8]],
        [[6, 6], [6, 7], [6, 8], [7, 6], [7, 7], [7, 8], [8, 6], [8, 7], [8, 8]],
    ],
    decorations: []
};

const lineDefaults = {
    type: 'LINE',
    color: '#CFCFCF',
    thickness: 5,
};

const horizontalLine = {
    ...lineDefaults,
    wayPoints: [[0.5, 4.5], [8.5, 4.5]],
};

const verticalLine = {
    ...lineDefaults,
    wayPoints: [[4.5, 0.5], [4.5, 8.5]],
};

const diagonalLine = {
    ...lineDefaults,
    wayPoints: [[0.5, 0.5], [8.5, 8.5]],
};

const zigZagLine = {
    ...lineDefaults,
    wayPoints: [[4.5, 2.5], [2.5, 0.5], [2.5, 1.5], [1.5, 2.5], [1.5, 3.5], [0.5, 4.5], [1.5, 5.5], [3.5, 3.5]],
};

storiesOf('Line', module)
    .add('horizontal', () => <Grid grid={{...emptyGrid, decorations: [horizontalLine]}} cellSize={cellSize}></Grid>)
    .add('vertical', () => <Grid grid={{...emptyGrid, decorations: [verticalLine]}} cellSize={cellSize}></Grid>)
    .add('diagonal', () => <Grid grid={{...emptyGrid, decorations: [diagonalLine]}} cellSize={cellSize}></Grid>)
    .add('zigzag', () => <Grid grid={{...emptyGrid, decorations: [zigZagLine]}} cellSize={cellSize}></Grid>);