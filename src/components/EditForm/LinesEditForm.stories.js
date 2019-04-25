import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import LinesEditForm from './LinesEditForm';
import './EditForm.css';

const onLineAdded = action('onLineAdded');
const onLineRemoved = action('onLineRemoved');
const onLineThicknessChanged = action('onLineThicknessChanged');
const onLineColorChanged = action('onLineColorChanged');
const onWayPointRemoved = action('onWayPointRemoved');
const onWayPointAdded = action('onWayPointAdded');
const onWayPointChanged = action('onWayPointChanged');

const lineDefaults = {
    type: 'LINE',
    color: '#CFCFCF',
    thickness: 5,
};

const horizontalLine = {
    ...lineDefaults,
    wayPoints: [[4.5, 0.5], [4.5, 8.5]],
};

const verticalLine = {
    ...lineDefaults,
    wayPoints: [[0.5, 4.5], [8.5, 4.5]],
};

const diagonalLine = {
    ...lineDefaults,
    wayPoints: [[0.5, 0.5], [8.5, 8.5]],
};

const zigZagLine = {
    ...lineDefaults,
    wayPoints: [[2.5, 4.5], [0.5, 2.5], [1.5, 2.5], [2.5, 1.5], [3.5, 1.5], [4.5, 0.5], [5.5, 1.5], [3.5, 3.5]],
};

const props = {
    lines: [horizontalLine, verticalLine, diagonalLine, zigZagLine],
    onLineAdded: onLineAdded,
    onLineRemoved: onLineRemoved,
    onLineColorChanged: onLineColorChanged,
    onLineThicknessChanged: onLineThicknessChanged,
    onWayPointAdded: onWayPointAdded,
    onWayPointRemoved: onWayPointRemoved,
    onWayPointChanged: onWayPointRemoved,
};

storiesOf('Edit/LinesEditForm', module)
    .addDecorator(story => <div style={{width: '300px', padding: '8px', margin: '48px', backgroundColor: '#EEEEEE'}}>{story()}</div>)
    .add('default', () => <LinesEditForm {...props}></LinesEditForm>);