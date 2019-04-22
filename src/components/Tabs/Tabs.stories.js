import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Tabs from './Tabs';
import './Tabs.css';

const onItemSelected = action('onItemSelected');

const tabItems = [
    {
        key: 'FIRST',
        name: 'First item'
    },
    {
        key: 'SECOND',
        name: 'Second item'
    },
    {
        key: 'THIRD',
        name: 'Third item'
    },
];

storiesOf('Edit/Tabs', module)
    .addDecorator(story => <div style={{padding: '48px'}}>{story()}</div>)
    .add('first selected', () => <Tabs items={tabItems} selectedKey={'FIRST'} onItemSelected={onItemSelected}></Tabs>)
    .add('second selected', () => <Tabs items={tabItems} selectedKey={'SECOND'} onItemSelected={onItemSelected}></Tabs>)
    .add('third selected', () => <Tabs items={tabItems} selectedKey={'THIRD'} onItemSelected={onItemSelected}></Tabs>);