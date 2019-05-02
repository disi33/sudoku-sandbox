import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ArrowsEditForm from './ArrowsEditForm';
import './EditForm.css';

const onArrowAdded = action('onArrowAdded');
const onArrowRemoved = action('onArrowRemoved');
const onThicknessChanged = action('onThicknessChanged');
const onHeadLengthChanged = action('onHeadLengthChanged');
const onColorChanged = action('onColorChanged');
const onWayPointRemoved = action('onWayPointRemoved');
const onWayPointAdded = action('onWayPointAdded');
const onWayPointChanged = action('onWayPointChanged');

const arrowDefaults = {
    type: 'ARROW',
    color: '#CFCFCF',
    thickness: 5,
    headLength: 0.3,
};

const horizontalArrow = {
    ...arrowDefaults,
    wayPoints: [[4.5, 0.5], [4.5, 8.5]],
};

const verticalArrow = {
    ...arrowDefaults,
    wayPoints: [[0.5, 4.5], [8.5, 4.5]],
};

const diagonalArrow = {
    ...arrowDefaults,
    wayPoints: [[0.5, 0.5], [8.5, 8.5]],
};

const zigZagArrow = {
    ...arrowDefaults,
    wayPoints: [[2.5, 4.5], [0.5, 2.5], [1.5, 2.5], [2.5, 1.5], [3.5, 1.5], [4.5, 0.5], [5.5, 1.5], [3.5, 3.5]],
};

const props = {
    arrows: [horizontalArrow, verticalArrow, diagonalArrow, zigZagArrow],
    selectedArrowIdx: 0,
    onArrowAdded: onArrowAdded,
    onArrowRemoved: onArrowRemoved,
    onColorChanged: onColorChanged,
    onThicknessChanged: onThicknessChanged,
    onHeadLengthChanged: onHeadLengthChanged,
    onWayPointAdded: onWayPointAdded,
    onWayPointRemoved: onWayPointRemoved,
    onWayPointChanged: onWayPointChanged,
};

storiesOf('Edit/ArrowsEditForm', module)
    .addDecorator(story => <div style={{width: '300px', padding: '8px', margin: '48px', backgroundColor: '#EEEEEE'}}>{story()}</div>)
    .add('default', () => <ArrowsEditForm {...props}></ArrowsEditForm>);