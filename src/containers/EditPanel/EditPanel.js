import React, { useState } from 'react';
import { connect } from 'react-redux';

import Select from 'react-select';

import GeneralEditPanel from '../EditPanel/GeneralEditPanel';
import RegionsEditPanel from '../EditPanel/RegionsEditPanel';
import CagesEditPanel from '../EditPanel/CagesEditPanel';
import LinesEditPanel from '../EditPanel/LinesEditPanel';
import ArrowsEditPanel from '../EditPanel/ArrowsEditPanel';
import UnderlaysEditPanel from '../EditPanel/UnderlaysEditPanel';
import OverlaysEditPanel from '../EditPanel/OverlaysEditPanel';

import './EditPanel.css';
import { setClicksMode } from '../../actions/puzzleActions';

const EditPanel = ({onClicksModeChanged}) => {

    const options = [
        {value: 'GENERAL', label: 'General'},
        {value: 'REGIONS', label: 'Regions'},
        {value: 'CAGES', label: 'Cages'},
        {value: 'LINES', label: 'Lines'},
        {value: 'ARROWS', label: 'Arrows'},
        {value: 'UNDERLAYS', label: 'Underlays'},
        {value: 'OVERLAYS', label: 'Overlays'},
    ];

    const [selectedOption, _setSelectedOption] = useState(options[0]);
    const setSelectedOption = (option) => {
        if (option.value === 'GENERAL') onClicksModeChanged('GIVENS');
        else if (option.value === 'REGIONS') onClicksModeChanged('REGIONS');
        else if (option.value === 'CAGES') onClicksModeChanged('CAGES');
        else onClicksModeChanged('NONE');
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
        </div>
    );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
    onClicksModeChanged: setClicksMode
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPanel);
