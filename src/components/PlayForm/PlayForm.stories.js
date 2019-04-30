import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import PlayForm from './PlayForm';
import '../EditForm/EditForm.css';
import './PlayForm.css';

const onStartOver = action('onStartOver');
const onColorSelected = action('onColorSelected');

storiesOf('Play/PlayForm', module)
    .addDecorator(story => <div style={{width: '300px', padding: '8px', margin: '48px', backgroundColor: '#EEEEEE'}}>{story()}</div>)
    .add('default', () => <PlayForm onStartOver={onStartOver} onColorSelected={onColorSelected}></PlayForm>);
