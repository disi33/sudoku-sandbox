import React from 'react';
import { storiesOf } from '@storybook/react';

import Cell from './Cell';
import './Cell.css';

const defaultCellProps = {
    size: 45,
    givenValue: undefined,
    userValue: undefined,
    cageValue: undefined,
    borders: ['u', 'r', 'd', 'l'],
    cageBorders: [],
    givenCandidates: [],
    userCandidates: [],
    givenPencilMarks: [],
    userPencilMarks: [],
}

const allBorders = ['U', 'R', 'D', 'L'];
const someCandidates = [1, 2, 3];
const somePencilMarks = [1, 2, 3, 4, 5, 6, 7, 8];

storiesOf('Grid/Cell', module)
    .addDecorator(story => <div style={{padding: '24px'}}>{story()}</div>)
    .add('empty', () => <Cell {...defaultCellProps}></Cell>)
    .add('with value', () => <Cell {...defaultCellProps} givenValue={3}></Cell>)
    .add('with thick borders', () => <Cell {...defaultCellProps} borders={allBorders}></Cell>)
    .add('with candidates', () => <Cell {...defaultCellProps} userCandidates={someCandidates}></Cell>)
    .add('with pencil marks', () => <Cell {...defaultCellProps} givenPencilMarks={somePencilMarks}></Cell>)
    .add('with a killer cage', () => <Cell {...defaultCellProps} cageBorders={allBorders} cageValue={5}></Cell>)
    .add('with a killer cage and pencil marks', () => <Cell {...defaultCellProps} givenPencilMarks={somePencilMarks} cageBorders={allBorders} cageValue={5}></Cell>);