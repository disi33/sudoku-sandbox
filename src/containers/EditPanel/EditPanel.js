import React, { useState } from 'react';
import { connect } from 'react-redux';

import { setInteractionsMode } from '../../actions/puzzleActions';

import Select from 'react-select';

import GeneralEditPanel from '../EditPanel/GeneralEditPanel';
import RegionsEditPanel from '../EditPanel/RegionsEditPanel';
import CagesEditPanel from '../EditPanel/CagesEditPanel';
import LinesEditPanel from '../EditPanel/LinesEditPanel';
import ArrowsEditPanel from '../EditPanel/ArrowsEditPanel';
import UnderlaysEditPanel from '../EditPanel/UnderlaysEditPanel';
import OverlaysEditPanel from '../EditPanel/OverlaysEditPanel';
import SaveLoadEditPanel from './SaveLoadEditPanel';

import './EditPanel.css';

const EditPanel = ({onInteractionsModeChanged}) => {

    const options = [
        {value: 'GENERAL', label: 'General'},
        {value: 'REGIONS', label: 'Regions'},
        {value: 'CAGES', label: 'Cages'},
        {value: 'LINES', label: 'Lines'},
        {value: 'ARROWS', label: 'Arrows'},
        {value: 'UNDERLAYS', label: 'Underlays'},
        {value: 'OVERLAYS', label: 'Overlays'},
        {value: 'SAVE_LOAD', label: 'Save/Load'},
    ];

    const [selectedOption, _setSelectedOption] = useState(options[0]);
    const setSelectedOption = (option) => {
        if (option.value === 'REGIONS') onInteractionsModeChanged('REGIONS');
        else if (option.value === 'CAGES') onInteractionsModeChanged('CAGES');
        else if (option.value === 'LINES') onInteractionsModeChanged('LINES');
        else if (option.value === 'ARROWS') onInteractionsModeChanged('ARROWS');
        else if (option.value === 'UNDERLAYS') onInteractionsModeChanged('UNDERLAYS');
        else if (option.value === 'OVERLAYS') onInteractionsModeChanged('OVERLAYS');
        else onInteractionsModeChanged('GIVENS');
        _setSelectedOption(option);
    };

    return (
        <div className="edit-panel">
            <div className="edit-panel__title">Edit Puzzle</div>
            <Select className="edit-panel__select" options={options} value={selectedOption} onChange={option => setSelectedOption(option)}></Select>
            {selectedOption.value === 'GENERAL' && <GeneralEditPanel></GeneralEditPanel>}
            {selectedOption.value === 'REGIONS' && <RegionsEditPanel></RegionsEditPanel>}
            {selectedOption.value === 'CAGES' && <CagesEditPanel></CagesEditPanel>}
            {selectedOption.value === 'LINES' && <LinesEditPanel></LinesEditPanel>}
            {selectedOption.value === 'ARROWS' && <ArrowsEditPanel></ArrowsEditPanel>}
            {selectedOption.value === 'UNDERLAYS' && <UnderlaysEditPanel></UnderlaysEditPanel>}
            {selectedOption.value === 'OVERLAYS' && <OverlaysEditPanel></OverlaysEditPanel>}
            {selectedOption.value === 'SAVE_LOAD' && <SaveLoadEditPanel></SaveLoadEditPanel>}
        </div>
    );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
    onInteractionsModeChanged: setInteractionsMode
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPanel);
