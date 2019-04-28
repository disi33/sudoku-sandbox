import React, { useState } from 'react';

import Select from 'react-select';

import GeneralEditPanel from '../EditPanel/GeneralEditPanel';
import RegionsEditPanel from '../EditPanel/RegionsEditPanel';
import CagesEditPanel from '../EditPanel/CagesEditPanel';
import LinesEditPanel from '../EditPanel/LinesEditPanel';
import ArrowsEditPanel from '../EditPanel/ArrowsEditPanel';
import UnderlaysEditPanel from '../EditPanel/UnderlaysEditPanel';
import OverlaysEditPanel from '../EditPanel/OverlaysEditPanel';

import './EditPanel.css';

export default function EditPanel() {

    const options = [
        {value: 'GENERAL', label: 'General'},
        {value: 'REGIONS', label: 'Regions'},
        {value: 'CAGES', label: 'Cages'},
        {value: 'LINES', label: 'Lines'},
        {value: 'ARROWS', label: 'Arrows'},
        {value: 'UNDERLAYS', label: 'Underlays'},
        {value: 'OVERLAYS', label: 'Overlays'},
    ];

    const [selectedOption, setSelectedOption] = useState(options[0]);

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