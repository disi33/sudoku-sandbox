import React, {useState} from 'react';
import './EditForm.css';

import List from '../List/List';
import PositionsInput from '../PositionsInput/PositionsInput';

export default function RegionsEditForm({regions, onRegionSelected, onRegionRemoved, onRegionAdded, onCellChanged, onCellRemoved, onCellAdded}) {

    const [selectedRegionIdx, _setSelectedRegionIdx] = useState(0);

    const setSelectedRegionIdx = idx => {
        onRegionSelected(idx);
        _setSelectedRegionIdx(idx);
    };

    const region = regions[selectedRegionIdx];
    if (region !== undefined) onRegionSelected(selectedRegionIdx);
    else onRegionSelected(undefined);

    return (
        <div className="edit-form">
            <div className="edit-form__section">
                <div className="edit-form__section-title">Add/Remove Regions</div>
                <div className="edit-form__field">
                    <div className="edit-form__field-input">
                        <List items={regions} selectedIdx={selectedRegionIdx} onItemSelected={setSelectedRegionIdx} onItemAdded={() => {setSelectedRegionIdx(regions.length); onRegionAdded();}} onItemRemoved={onRegionRemoved} itemToText={regionToText}></List>
                    </div>
                </div>
            </div>
            {region !== undefined && 
                <div className="edit-form__section">
                    <div className="edit-form__section-title">Edit Selected Region</div>
                    <p>Click on cells in the grid to add and remove cells to/from this region, or alternatively, use the form:</p>
                    <div className="edit-form__field">
                        <span className="edit-form__field-name">Cells</span>
                        <div className="edit-form__field-input">
                            <PositionsInput items={oneBased(region)} onItemChanged={(idx, [row, col]) => onCellChanged(selectedRegionIdx, idx, [row - 1, col - 1])} onItemRemoved={idx => onCellRemoved(selectedRegionIdx, idx)} onItemAdded={([row, col]) => onCellAdded(selectedRegionIdx, [row - 1, col - 1])}></PositionsInput> 
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

const oneBased = region => region.map(([row, col]) => [row + 1, col + 1]);

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