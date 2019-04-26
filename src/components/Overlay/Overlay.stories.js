import React from 'react';
import { storiesOf } from '@storybook/react';

import Grid from '../Grid/Grid';

const emptyCell = { value: undefined, candidates: [], pencilMarks: []};

const cellSize = 45;

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

const withValue = (idx, jdx, value) => grid => ({
    ...grid,
    cells: grid.cells.map((row, i) => row.map((cell, j) => i === idx && j === jdx ? {...cell, value: value} : cell ))
});

const overlayDefaults = {
    type: 'OVERLAY',
    borderColor: '#CFCFCF',
    backgroundColor: '#CFCFCF',
    text: undefined,
    rounded: false,
};

const kropki = [
    {
        ...overlayDefaults,
        center: [1, 0.5],
        width: 0.25,
        height: 0.25,
        borderColor: '#000000',
        backgroundColor: '#000000',
        rounded: true,
    },
    {
        ...overlayDefaults,
        center: [2, 0.5],
        width: 0.25,
        height: 0.25,
        borderColor: '#000000',
        backgroundColor: '#FFFFFF',
        rounded: true,
    }
];

const consecutive = {
    ...overlayDefaults,
    center: [1, 0.5],
    width: 0.72,
    height: 0.2,
    borderColor: '#777777',
};

const mathrax = {
    ...overlayDefaults,
    center: [1, 1],
    width: 0.5,
    height: 0.5,
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
    rounded: true,
    text: 'x3',
    fontSize: 12,
};

const outsideText = [
    {
        ...overlayDefaults,
        center: [-0.4, 0.5],
        width: 1,
        height: 0.8,
        borderColor: undefined,
        backgroundColor: undefined,
        text: '24',
        fontSize: 20,
    },
    {
        ...overlayDefaults,
        center: [-0.4, 1.5],
        width: 1,
        height: 0.8,
        borderColor: undefined,
        backgroundColor: undefined,
        text: '7',
        fontSize: 20,
    },
    {
        ...overlayDefaults,
        center: [-0.4, 2.5],
        width: 1,
        height: 0.8,
        borderColor: undefined,
        backgroundColor: undefined,
        text: '14',
        fontSize: 20,
    }
];

const arrowWithCircle = [
    {
        type: 'ARROW',
        color: '#CFCFCF',
        thickness: 5,
        headLength: 0.3,
        wayPoints: [[4.5, 0.5], [4.5, 8.5]],
    },
    {
        ...overlayDefaults,
        center: [4.5, 0.5],
        width: 0.88,
        height: 0.92,
        backgroundColor: '#FFFFFF',
        rounded: true,
    }
];

storiesOf('Grid/Overlay', module)
    .add('kropki overlays', () => <Grid grid={{...emptyGrid, decorations: [...kropki]}} cellSize={cellSize}></Grid>)
    .add('consecutive overlay', () => <Grid grid={{...emptyGrid, decorations: [consecutive]}} cellSize={cellSize}></Grid>)
    .add('mathrax overlay', () => <Grid grid={{...emptyGrid, decorations: [mathrax]}} cellSize={cellSize}></Grid>)
    .add('outside text', () => <Grid grid={{...emptyGrid, decorations: [...outsideText]}} cellSize={cellSize}></Grid>)
    .add('arrow with circle', () => <Grid grid={{...withValue(4, 0, 5)(emptyGrid), decorations: [...arrowWithCircle]}} cellSize={cellSize}></Grid>);

