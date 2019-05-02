import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import GeneralEditForm from './GeneralEditForm';
import './EditForm.css';

const onCellSizeChanged = action('onCellSizeChanged');
const onGridSizeChanged = action('onGridSizeChanged');

storiesOf('Edit/GeneralEditForm', module)
    .addDecorator(story => <div style={{width: '300px', padding: '8px', margin: '48px', backgroundColor: '#EEEEEE'}}>{story()}</div>)
    .add('default', () => <GeneralEditForm cellSize={45} gridSize={[9, 9]} onCellSizeChanged={onCellSizeChanged} onGridSizeChanged={onGridSizeChanged}></GeneralEditForm>);
