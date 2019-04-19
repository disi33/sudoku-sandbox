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
    cages: [],
    decorations: []
};

const rectangleDefaults = {
    type: 'RECTANGLE',
    color: '#CFCFCF',
    filled: true,
};

const singleCell = {
    ...rectangleDefaults,
    origin: [4, 4],
    width: 1,
    height: 1,
};

const window = {
    ...rectangleDefaults,
    origin: [1, 1],
    width: 3,
    height: 3,
};

const insetDuo = {
    ...rectangleDefaults,
    origin: [3.1, 2.1],
    width: 1.8,
    height: 0.76,
};

const wonkyRenbanGroup = [
    {
        ...rectangleDefaults,
        origin: [0.12, 0.12],
        width: 2.76,
        height: 0.78,
    },
    {
        ...rectangleDefaults,
        origin: [0.12, 0.12],
        width: 0.78,
        height: 2.76,
    },
];

const stainedGlassWindow = [
    {
        ...rectangleDefaults,
        origin: [2, 1],
        width: 5,
        height: 1,
        color: '#C3447A',
    },
    {
        ...rectangleDefaults,
        origin: [2, 1],
        width: 1,
        height: 7,
        color: '#C3447A',
    },
    {
        ...rectangleDefaults,
        origin: [2, 4],
        width: 4,
        height: 1,
        color: '#C3447A',
    },
];

storiesOf('Rectangle', module)
    .add('single cell', () => <Grid grid={{...emptyGrid, decorations: [singleCell]}} cellSize={cellSize}></Grid>)
    .add('window', () => <Grid grid={{...emptyGrid, decorations: [window]}} cellSize={cellSize}></Grid>)
    .add('inset duo', () => <Grid grid={{...emptyGrid, decorations: [insetDuo]}} cellSize={cellSize}></Grid>)
    .add('bent renban group', () => <Grid grid={{...emptyGrid, decorations: [...wonkyRenbanGroup]}} cellSize={cellSize}></Grid>)
    .add('stained glass window', () => <Grid grid={{...emptyGrid, decorations: [...stainedGlassWindow]}} cellSize={cellSize}></Grid>)
    .add('unfilled', () => <Grid grid={{...emptyGrid, decorations: [{...insetDuo, filled: false}]}} cellSize={cellSize}></Grid>);