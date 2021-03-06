import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Grid from './Grid';

const cellSize = 45;

const emptyCell = { value: undefined, candidates: [], pencilMarks: []};

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
    decorations: [],
    highlights: [...Array(9)].map(_ => [...Array(9)].map(_ => undefined)),
};

const irregularGrid = {
    ...emptyGrid,
    regions: [
        [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]],
        [[0, 3], [0, 4], [1, 3], [2, 3], [3, 0], [3, 1], [3, 2], [3, 3], [4, 0]],
        [[0, 5], [0, 6], [0, 7], [0, 8], [1, 5], [1, 6], [1, 7], [1, 8], [2, 8]],
        [[1, 4], [2, 4], [2, 5], [3, 4], [4, 1], [4, 2], [4, 3], [4, 4], [5, 2]],
        [[2, 6], [2, 7], [3, 5], [3, 6], [3, 7], [3, 8], [4, 5], [4, 7], [4, 8]],
        [[4, 6], [5, 5], [5, 6], [6, 4], [6, 5], [6, 6], [6, 7], [7, 6], [7, 7]],
        [[5, 0], [5, 1], [6, 0], [6, 1], [7, 0], [7, 1], [8, 0], [8, 1], [8, 2]],
        [[5, 3], [5, 4], [6, 2], [6, 3], [7, 2], [7, 3], [7, 4], [8, 3], [8, 4]],
        [[5, 7], [5, 8], [6, 8], [7, 5], [7, 8], [8, 5], [8, 6], [8, 7], [8, 8]],
    ],
};

const toroidalGrid = {
    ...emptyGrid,
    regions: [
        [[0, 0], [0, 1], [0, 8], [1, 0], [1, 7], [1, 8], [8, 0], [8, 1], [8, 2]],
        [[0, 2], [0, 3], [0, 4], [1, 1], [1, 2], [1, 3], [8, 3], [8, 4], [8, 5]],
        [[0, 5], [0, 6], [0, 7], [1, 4], [1, 5], [1, 6], [8, 6], [8, 7], [8, 8]],
        [[2, 0], [2, 1], [2, 2], [3, 1], [3, 2], [3, 3], [4, 2], [4, 3], [4, 4]],
        [[2, 3], [2, 4], [2, 5], [3, 4], [3, 5], [3, 6], [4, 5], [4, 6], [4, 7]],
        [[2, 6], [2, 7], [2, 8], [3, 0], [3, 7], [3, 8], [4, 8], [4, 0], [4, 1]],
        [[5, 0], [5, 1], [5, 2], [6, 0], [6, 1], [6, 8], [7, 0], [7, 7], [7, 8]],
        [[5, 3], [5, 4], [5, 5], [6, 2], [6, 3], [6, 4], [7, 1], [7, 2], [7, 3]],
        [[5, 6], [5, 7], [5, 8], [6, 5], [6, 6], [6, 7], [7, 4], [7, 5], [7, 6]],
    ]
};

const killerGrid = {
    ...emptyGrid,
    cages: [
        {
            cells: [[0, 0], [0, 1], [0, 2], [0, 3]],
            value: 12
        },
        {
            cells: [[0, 4], [1, 4], [2, 4], [2, 5], [2, 6]],
            value: 24
        },
        {
            cells: [[0, 5], [0, 6], [0, 7], [1, 5], [1, 6], [1, 7]],
            value: 22
        },
        {
            cells: [[0, 8], [1, 8], [2, 8], [3, 8]],
            value: 15
        },
        {
            cells: [[1, 0], [1, 1], [2, 0], [2, 1], [3, 0], [3, 1]],
            value: 34
        },
        {
            cells: [[1, 2], [1, 3], [2, 3], [3, 3]],
            value: 27
        },
        {
            cells: [[2, 2], [3, 2], [4, 2], [4, 1], [4, 0]],
            value: 26
        },
        {
            cells: [[2, 7], [3, 7], [3, 6], [3, 5]],
            value: 27
        },
        {
            cells: [[3, 4], [4, 4], [4, 3], [4, 5], [5, 4]],
            value: 34,
        },
        {
            cells: [[4, 6], [4, 7], [4, 8], [5, 6], [6, 6]],
            value: 15,
        },
        {
            cells: [[5, 0], [6, 0], [7, 0], [8, 0]],
            value: 15
        },
        {
            cells: [[5, 1], [5, 2], [5, 3], [6, 1]],
            value: 22
        },
        {
            cells: [[5, 5], [6, 5], [7, 5], [7, 6]],
            value: 25
        },
        {
            cells: [[5, 7], [5, 8], [6, 7], [6, 8], [7, 7], [7, 8]],
            value: 37
        },
        {
            cells: [[6, 2], [6, 3], [6, 4], [7, 4], [8, 4]],
            value: 24
        },
        {
            cells: [[7, 1], [7, 2], [7, 3], [8, 1], [8, 2], [8, 3]],
            value: 24
        },
        {
            cells: [[8, 5], [8, 6], [8, 7], [8, 8]],
            value: 22
        },
    ]
};

const partialKillerGrid = {
    ...emptyGrid,
    cages: [
        {
            cells: [[0, 2], [1, 2]],
            value: 5
        },
        {
            cells: [[0, 3], [0, 4]],
            value: 12
        },

        {
            cells: [[0, 7], [0, 8]],
            value: 6
        },
        {
            cells: [[1, 0], [2, 0]],
            value: 15
        },
        {
            cells: [[1, 8], [2, 8]],
            value: 5
        },
        {
            cells: [[2, 4], [3, 4]],
            value: 5
        },
        {
            cells: [[2, 5], [2, 6]],
            value: 5
        },
        {
            cells: [[3, 0], [3, 1]],
            value: 12
        },
        {
            cells: [[4, 4]],
            value: 6
        },
        {
            cells: [[5, 4], [6, 4]],
            value: 6
        },
        {
            cells: [[5, 7], [5, 8]],
            value: 8
        },
        {
            cells: [[6, 0], [7, 0]],
            value: 15
        },
        {
            cells: [[6, 2], [6, 3]],
            value: 7
        },
        {
            cells: [[6, 8], [7, 8]],
            value: 5
        },
        {
            cells: [[7, 6], [8, 6]],
            value: 14
        },
        {
            cells: [[8, 0], [8, 1]],
            value: 13
        },
        {
            cells: [[8, 4], [8, 5]],
            value: 14
        }
    ]
};

const defaultProps = {
    interactionsConfig: { mode: 'NONE' },
    onCellClicked: action('onCellClicked'),
    onKeyDown: () => action('onKeyDown'),
};

storiesOf('Grid/Grid', module)
    .addDecorator(story => <div style={{padding: '100px'}}>{story()}</div>)
    .add('classic', () => <Grid {...defaultProps} grid={emptyGrid} cellSize={cellSize}></Grid>)
    .add('irregular', () => <Grid {...defaultProps} grid={irregularGrid} cellSize={cellSize}></Grid>)
    .add('toroidal', () => <Grid {...defaultProps} grid={toroidalGrid} cellSize={cellSize}></Grid>)
    .add('killer with all cages', () => <Grid {...defaultProps} grid={killerGrid} cellSize={cellSize}></Grid>)
    .add('killer with some cages', () => <Grid {...defaultProps} grid={partialKillerGrid} cellSize={cellSize}></Grid>);