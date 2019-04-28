import React, {useState} from 'react';
import './EditForm.css';

import List from '../List/List';
import PositionsInput from '../PositionsInput/PositionsInput';

export default function RegionsEditForm({regions, onRegionRemoved, onRegionAdded, onCellChanged, onCellRemoved, onCellAdded}) {

    const [selectedRegionIdx, setSelectedRegionIdx] = useState(0);
    const region = regions[selectedRegionIdx];

    return (
        <div className="edit-form">
            <div className="edit-form__section-title">Add/Remove Regions</div>
            <div className="edit-form__field">
                <div className="edit-form__field-input">
                    <List items={regions} selectedIdx={selectedRegionIdx} onItemSelected={setSelectedRegionIdx} onItemAdded={() => {setSelectedRegionIdx(regions.length); onRegionAdded();}} onItemRemoved={onRegionRemoved} itemToText={regionToText}></List>
                </div>
            </div>
            {region !== undefined && 
                <div>
                    <div className="edit-form__section-title">Edit Selected Region</div>
                    <div className="edit-form__field">
                        <span className="edit-form__field-name">Cells</span>
                        <div className="edit-form__field-input">
                            <PositionsInput items={region} onItemChanged={(idx, value) => onCellChanged(selectedRegionIdx, idx, value)} onItemRemoved={idx => onCellRemoved(selectedRegionIdx, idx)} onItemAdded={value => onCellAdded(selectedRegionIdx, value)}></PositionsInput> 
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

const regionToText = region => {
    let sortedCells = [...region];
    sortedCells.sort(cellComparison);
    return sortedCells.slice(0, 3).map(cellToText).join(', ') + ', ...';
};

const cellToText = cell => `R${cell[0] + 1}C${cell[1] + 1}`;

const cellComparison = (a, b) => {
    if (a[0] < b[0]) return -1;
    else if (a[0] > b[0]) return 1;
    else if (a[1] < b[1]) return -1;
    else if (a[1] > b[1]) return 1;
    else return 0;
};