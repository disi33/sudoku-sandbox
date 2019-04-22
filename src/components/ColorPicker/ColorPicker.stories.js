import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ColorPicker from './ColorPicker';
import './ColorPicker.css';

const onColorSelected = action('onColorSelected');

storiesOf('Edit/ColorPicker', module)
    .addDecorator(story => <div style={{padding: '48px'}}>{story()}</div>)
    .add('default', () => <ColorPicker selectedColor={'#2A4BD7'} onColorSelected={onColorSelected}></ColorPicker>);
