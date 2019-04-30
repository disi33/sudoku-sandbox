import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import SaveLoadEditForm from './SaveLoadEditForm';
import './EditForm.css';
import './SaveLoadEditForm.css';

const getContent = action('getContent');
const onContentLoaded = action('onContentLoaded');

storiesOf('Edit/SaveLoadEditForm', module)
    .addDecorator(story => <div style={{width: '300px', padding: '8px', margin: '48px', backgroundColor: '#EEEEEE'}}>{story()}</div>)
    .add('default', () => <SaveLoadEditForm getContent={getContent} onContentLoaded={onContentLoaded}></SaveLoadEditForm>);
