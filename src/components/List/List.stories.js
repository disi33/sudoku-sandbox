import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import List from './List';
import './List.css';

const onItemSelected = action('onItemSelected');
const onItemAdded = action('onItemAdded');
const onItemRemoved = action('onItemRemoved');

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

const defaultProps = {
    items: listItems,
    itemToText: itemToText,
    onItemSelected: onItemSelected,
    onItemAdded: onItemAdded,
    onItemRemoved: onItemRemoved,
};

storiesOf('Edit/List', module)
    .addDecorator(story => <div style={{width: '400px', padding: '48px'}}>{story()}</div>)
    .add('first selected', () => <List {...defaultProps} selectedIdx={0}></List>)
    .add('second selected', () =><List {...defaultProps} selectedIdx={1}></List>)
    .add('third selected', () => <List {...defaultProps} selectedIdx={2}></List>);
