import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import PlayForm from './PlayForm';
import '../EditForm/EditForm.css';
import './PlayForm.css';

const onStartOver = action('onStartOver');
const onColorSelected = action('onColorSelected');
const onUndo = action('onUndo');
const onRedo = action('onRedo');

const props = {
    onStartOver: onStartOver,
    onColorSelected: onColorSelected,
    onUndo: onUndo,
    onRedo: onRedo,
};

storiesOf('Play/PlayForm', module)
    .addDecorator(story => <div style={{width: '300px', padding: '8px', margin: '48px', backgroundColor: '#EEEEEE'}}>{story()}</div>)
    .add('with undo and redo', () => <PlayForm {...props} canUndo canRedo></PlayForm>)
    .add('with undo', () => <PlayForm {...props} canUndo></PlayForm>)
    .add('with redo', () => <PlayForm {...props} canRedo></PlayForm>);
