import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import TextInput from './TextInput';
import './TextInput.css';

const onValueChanged = action('onValueChanged');

storiesOf('Edit/TextInput', module)
    .addDecorator(story => <div style={{padding: '48px'}}>{story()}</div>)
    .add('default', () => <TextInput label="Label" value={5} onValueChanged={onValueChanged}></TextInput>);
