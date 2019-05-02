import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import UnderlaysEditForm from './UnderlaysEditForm';
import './EditForm.css';

const onUnderlaySelected = action('onUnderlaySelected');
const onUnderlayRemoved = action('onUnderlayRemoved');
const onUnderlayAdded = action('onUnderlayAdded');
const onOriginChanged = action('onOriginChanged');
const onWidthChanged = action('onWidthChanged');
const onHeightChanged = action('onHeightChanged');
const onBorderColorChanged = action('onBorderColorChanged');
const onBackgroundColorChanged = action('onBackgroundColorChanged');
const onRoundedChanged = action('onRoundedChanged');

const underlayDefaults = {
    type: 'UNDERLAY',
    borderColor: '#CFCFCF',
    backgroundColor: '#CFCFCF',
    rounded: false,
};

const singleCell = {
    ...underlayDefaults,
    origin: [4, 4],
    width: 1,
    height: 1,
};

const window = {
    ...underlayDefaults,
    origin: [1, 1],
    width: 3,
    height: 3,
};

const insetDuo = {
    ...underlayDefaults,
    origin: [3.1, 2.1],
    width: 1.8,
    height: 0.76,
};

const props = {
    underlays: [singleCell, window, insetDuo, {...insetDuo, backgroundColor: undefined}, {...singleCell, rounded: true}, {...insetDuo, rounded: true}, {...insetDuo, backgroundColor: undefined, rounded: true}],
    selectedUnderlayIdx: 0,
    onUnderlaySelected: onUnderlaySelected,
    onUnderlayRemoved: onUnderlayRemoved,
    onUnderlayAdded: onUnderlayAdded,
    onOriginChanged: onOriginChanged,
    onWidthChanged: onWidthChanged,
    onHeightChanged: onHeightChanged,
    onBorderColorChanged: onBorderColorChanged,
    onBackgroundColorChanged: onBackgroundColorChanged,
    onRoundedChanged: onRoundedChanged,
};

storiesOf('Edit/UnderlaysEditForm', module)
    .addDecorator(story => <div style={{width: '300px', padding: '8px', margin: '48px', backgroundColor: '#EEEEEE'}}>{story()}</div>)
    .add('default', () => <UnderlaysEditForm {...props}></UnderlaysEditForm>);