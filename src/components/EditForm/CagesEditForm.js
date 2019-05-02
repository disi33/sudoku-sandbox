import React from 'react';
import './EditForm.css';

import List from '../List/List';
import TextInput from '../TextInput/TextInput';
import PositionsInput from '../PositionsInput/PositionsInput';

export default function CagesEditForm({cages, selectedCageIdx, onCageSelected, onCageRemoved, onCageAdded, onValueChanged, onCellChanged, onCellRemoved, onCellAdded}) {

    const cage = cages[selectedCageIdx];

    return (
        <div className="edit-form">
            <div className="edit-form__section">
                <div className="edit-form__section-title">Add/Remove Cages</div>
                <div className="edit-form__field">
                    <div className="edit-form__field-input">
                        <List items={cages} selectedIdx={selectedCageIdx} onItemSelected={onCageSelected} onItemAdded={() => {onCageSelected(cages.length); onCageAdded();}} onItemRemoved={onCageRemoved} itemToText={cageToText}></List>
                    </div>
                </div>
            </div>
            {cage !== undefined &&
                <div className="edit-form__section">
                    <div className="edit-form__section-title">Edit Selected Cage</div>
                    <p>Click on cells in the grid to add and remove cells to/from this cage, or alternatively, use the form:</p>
                    <div className="edit-form__field">
                        <span className="edit-form__field-name">Value</span>
                        <div className="edit-form__field-input">
                            <TextInput label="" value={cage.value} onValueChanged={value => onValueChanged(selectedCageIdx, value)}></TextInput>
                        </div>
                    </div>
                    <div className="edit-form__field">
                        <span className="edit-form__field-name">Cells</span>
                        <div className="edit-form__field-input">
                            <PositionsInput items={oneBased(cage.cells)} onItemChanged={(idx, [row, col]) => onCellChanged(selectedCageIdx, idx, [row - 1, col - 1])} onItemRemoved={idx => onCellRemoved(selectedCageIdx, idx)} onItemAdded={([row, col]) => onCellAdded(selectedCageIdx, [row, col])}></PositionsInput> 
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

const oneBased = cells => cells.map(([row, col]) => [row + 1, col + 1]);

const cageToText = cage => {
    let sortedCells = [...cage.cells];
    sortedCells.sort(cellComparison);
    return `Value: ${cage.value} @ ` + sortedCells.slice(0, 3).map(cellToText).join(', ') + ', ...' ;
};

const cellToText = cell => `R${cell[0] + 1}C${cell[1] + 1}`;

const cellComparison = (a, b) => {
    if (a[0] < b[0]) return -1;
    else if (a[0] > b[0]) return 1;
    else if (a[1] < b[1]) return -1;
    else if (a[1] > b[1]) return 1;
    else return 0;
};