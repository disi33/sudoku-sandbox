import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import PositionsInput from './PositionsInput';
import '../TextInput/TextInput.css';
import './PositionsInput.css';

const onItemAdded = action('onItemAdded');
const onItemRemoved = action('onItemRemoved');
const onItemChanged = action('onItemChanged');

const items = [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5]];

storiesOf('Edit/PositionsInput', module)
    .addDecorator(story => <div style={{padding: '48px', width: '250px'}}>{story()}</div>)
    .add('default', () => <PositionsInput items={items} onItemAdded={onItemAdded} onItemRemoved={onItemRemoved} onItemChanged={onItemChanged}></PositionsInput>);
