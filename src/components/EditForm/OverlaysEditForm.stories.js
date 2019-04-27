import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import OverlaysEditForm from './OverlaysEditForm';
import './EditForm.css';

const onOverlayRemoved = action('onOverlayRemoved');
const onOverlayAdded = action('onOverlayAdded');
const onCenterChanged = action('onCentreChanged');
const onWidthChanged = action('onWidthChanged');
const onHeightChanged = action('onHeightChanged');
const onBorderColorChanged = action('onBorderColorChanged');
const onBackgroundColorChanged = action('onBackgroundColorChanged');
const onRoundedChanged = action('onRoundedChanged');
const onTextChanged = action('onTextChanged');
const onFontSizeChanged = action('onFontSizeChanged');

const overlayDefaults = {
    type: 'OVERLAY',
    borderColor: '#CFCFCF',
    backgroundColor: '#CFCFCF',
    text: undefined,
    fontSize: 12,
    rounded: false,
};

const kropki = [
    {
        ...overlayDefaults,
        center: [1, 0.5],
        width: 0.25,
        height: 0.25,
        borderColor: '#000000',
        backgroundColor: '#000000',
        rounded: true,
    },
    {
        ...overlayDefaults,
        center: [2, 0.5],
        width: 0.25,
        height: 0.25,
        borderColor: '#000000',
        backgroundColor: '#FFFFFF',
        rounded: true,
    }
];

const consecutive = {
    ...overlayDefaults,
    center: [1, 0.5],
    width: 0.72,
    height: 0.2,
    borderColor: '#777777',
};

const mathrax = {
    ...overlayDefaults,
    center: [1, 1],
    width: 0.5,
    height: 0.5,
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
    rounded: true,
    text: 'x3',
    fontSize: 12,
};

const outsideText = [
    {
        ...overlayDefaults,
        center: [-0.4, 0.5],
        width: 1,
        height: 0.8,
        borderColor: undefined,
        backgroundColor: undefined,
        text: '24',
        fontSize: 20,
    },
    {
        ...overlayDefaults,
        center: [-0.4, 1.5],
        width: 1,
        height: 0.8,
        borderColor: undefined,
        backgroundColor: undefined,
        text: '7',
        fontSize: 20,
    },
    {
        ...overlayDefaults,
        center: [-0.4, 2.5],
        width: 1,
        height: 0.8,
        borderColor: undefined,
        backgroundColor: undefined,
        text: '14',
        fontSize: 20,
    }
];

const props = {
    overlays: [...kropki, consecutive, mathrax, ...outsideText],
    onOverlayRemoved: onOverlayRemoved,
    onOverlayAdded: onOverlayAdded,
    onCenterChanged: onCenterChanged,
    onWidthChanged: onWidthChanged,
    onHeightChanged: onHeightChanged,
    onBorderColorChanged: onBorderColorChanged,
    onBackgroundColorChanged: onBackgroundColorChanged,
    onRoundedChanged: onRoundedChanged,
    onTextChanged: onTextChanged,
    onFontSizeChanged: onFontSizeChanged,
};

storiesOf('Edit/OverlaysEditForm', module)
    .addDecorator(story => <div style={{width: '300px', padding: '8px', margin: '48px', backgroundColor: '#EEEEEE'}}>{story()}</div>)
    .add('default', () => <OverlaysEditForm {...props}></OverlaysEditForm>);