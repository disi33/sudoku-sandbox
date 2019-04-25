import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CagesEditForm from './CagesEditForm';
import './EditForm.css';

const onCageAdded = action('onCageAdded');
const onCageRemoved = action('onCageRemoved');
const onCageCellsChanged = action('onCageCellsChanged');
const onCageValueChanged = action('onCageValueChanged');
const onCellRemoved = action('onCellRemoved');
const onCellAdded = action('onCellAdded');

const cages = [
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

const props = {
    cages: cages,
    onCageAdded: onCageAdded,
    onCageRemoved: onCageRemoved,
    onCageValueChanged: onCageValueChanged,
    onCageCellsChanged: onCageCellsChanged,
    onCellRemoved: onCellRemoved,
    onCellAdded: onCellAdded,
};

storiesOf('Edit/CagesEditForm', module)
    .addDecorator(story => <div style={{width: '300px', padding: '8px', margin: '48px', backgroundColor: '#EEEEEE'}}>{story()}</div>)
    .add('default', () => <CagesEditForm {...props}></CagesEditForm>);