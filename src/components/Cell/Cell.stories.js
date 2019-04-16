import React from 'react';
import { storiesOf } from '@storybook/react';

import Cell from './Cell';
import './Cell.css';

const defaultCellProps = {
    coords: {row: 0, col: 0},
    value: undefined,
    borders: ['u', 'r', 'd', 'l'],
    candidates: [],
    pencilMarks: [],
}

const allThickBorders = ['U', 'R', 'D', 'L'];
const someCandidates = [1, 2, 3];
const somePencilMarks = [1, 2, 3, 4, 5, 6, 7, 8];

storiesOf('Cell', module)
    .addDecorator(story => <div style={{padding: '24px'}}>{story()}</div>)
    .add('empty', () => <Cell {...defaultCellProps}></Cell>)
    .add('with value', () => <Cell {...defaultCellProps} value={3}></Cell>)
    .add('with thick borders', () => <Cell {...defaultCellProps} borders={allThickBorders}></Cell>)
    .add('with candidates', () => <Cell {...defaultCellProps} candidates={someCandidates}></Cell>)
    .add('with pencil marks', () => <Cell {...defaultCellProps} pencilMarks={somePencilMarks}></Cell>);