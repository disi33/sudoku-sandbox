import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import PlusMinusInput from './PlusMinusInput';
import './PlusMinusInput.css';

const onValueChanged = action('onValueChanged');

storiesOf('Edit/PlusMinusInput', module)
    .addDecorator(story => <div style={{padding: '48px'}}>{story()}</div>)
    .add('default', () => <PlusMinusInput value={5} minValue={0} maxValue={10} onValueChanged={onValueChanged}></PlusMinusInput>)
    .add('at min value', () => <PlusMinusInput value={0} minValue={0} maxValue={10} onValueChanged={onValueChanged}></PlusMinusInput>)
    .add('at max value', () => <PlusMinusInput value={10} minValue={0} maxValue={10} onValueChanged={onValueChanged}></PlusMinusInput>)