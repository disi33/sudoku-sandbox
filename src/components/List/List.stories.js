import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import List from './List';
import './List.css';

const onItemSelected = action('onItemSelected');

const listItems = [
    {
        type: 'Example',
        detail: 'first details'
    },
    {
        type: 'Example',
        detail: 'second details'
    },
    {
        type: 'Example',
        detail: 'third details'
    },
];

const itemToText = ({type, detail}) => `${type} - ${detail}`;

storiesOf('Edit/List', module)
    .addDecorator(story => <div style={{width: '400px', padding: '48px'}}>{story()}</div>)
    .add('first selected', () => <List items={listItems} selectedIdx={0} itemToText={itemToText} onItemSelected={onItemSelected}></List>)
    .add('second selected', () => <List items={listItems} selectedIdx={1} itemToText={itemToText} onItemSelected={onItemSelected}></List>)
    .add('third selected', () => <List items={listItems} selectedIdx={2} itemToText={itemToText} onItemSelected={onItemSelected}></List>);
