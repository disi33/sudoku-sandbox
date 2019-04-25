import React, {useState} from 'react';
import './EditForm.css';

import List from '../List/List';
import TextInput from '../TextInput/TextInput';
import PositionsInput from '../PositionsInput/PositionsInput';

export default function CagesEditForm({cages, onCageRemoved, onCageAdded, onCageValueChanged, onCageCellsChanged, onCellRemoved, onCellAdded}) {

    const [selectedCageIdx, setSelectedCageIdx] = useState(0);

    return (
        <div className="edit-form">
            <div className="edit-form__section">
                <div className="edit-form__section-title">Add/Remove Cages</div>
                <div className="edit-form__field">
                    <div className="edit-form__field-input">
                        <List items={cages} selectedIdx={selectedCageIdx} onItemSelected={setSelectedCageIdx} onItemAdded={onCageAdded} onItemRemoved={onCageRemoved} itemToText={cageToText}></List>
                    </div>
                </div>
            </div>
            {cages[selectedCageIdx] !== undefined &&
                <div className="edit-form__section">
                    <div className="edit-form__section-title">Edit Selected Cage</div>
                    <div className="edit-form__field">
                        <span className="edit-form__field-name">Value</span>
                        <div className="edit-form__field-input">
                            <TextInput label="" value={cages[selectedCageIdx].value} onValueChanged={value => onCageValueChanged(selectedCageIdx, value)}></TextInput>
                        </div>
                    </div>
                    <div className="edit-form__field">
                        <span className="edit-form__field-name">Cells</span>
                        <div className="edit-form__field-input">
                            <PositionsInput items={cages[selectedCageIdx].cells} onItemChanged={(idx, value) => onCageCellsChanged(selectedCageIdx, idx, value)} onItemRemoved={idx => onCellRemoved(selectedCageIdx, idx)} onItemAdded={value => onCellAdded(selectedCageIdx, value)}></PositionsInput> 
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

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