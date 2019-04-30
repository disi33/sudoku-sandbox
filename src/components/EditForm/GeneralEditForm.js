import React from 'react';
import './EditForm.css';

import PlusMinusInput from '../PlusMinusInput/PlusMinusInput';

export default function GeneralEditForm({cellSize, onCellSizeChanged, gridSize, onGridSizeChanged}) {
    return (
        <div className="edit-form">
            <div className="edit-form__section">
                <div className="edit-form__section-title">General</div>
                <div className="edit-form__field">
                    <span className="edit-form__field-name">Cell size</span>
                    <div className="edit-form__field-input">
                        <PlusMinusInput value={cellSize} minValue={1} maxValue={100} onValueChanged={onCellSizeChanged}></PlusMinusInput>
                    </div>
                </div>
                <div className="edit-form__field">
                    <span className="edit-form__field-name">Grid size</span>
                    <div className="edit-form__field-input">
                        <PlusMinusInput value={gridSize} minValue={4} maxValue={9} onValueChanged={onGridSizeChanged}></PlusMinusInput>
                    </div>
                </div>
            </div>
            <div className="edit-form__section">
                <div className="edit-form__section-title">Givens</div>
                <p>
                    To place givens in the grid, select a cell by clicking on it and then use the keyboard to enter values.
                    You can move between cells of the grid using the arrow keys.
                </p>
                <p>To place small numbers in the center of the cell (candidates), hold Ctrl.</p>
                <p>To place small numbers in the corners of the cell (pencil marks), hold Alt.</p>
            </div>
            <div className="edit-form__section">
                <div className="edit-form__section-title">Decorations</div>
                <p>
                    Use the other tabs of this edit panel to place decorations (cages, lines, arrows etc.) in the grid.
                </p>
                <p>
                    Some decorations ask for coordinates for where they should appear in the grid. 
                    These coordinates are always relative to the grid - (0, 0) is the top left corner of the grid, and one unit of length is equal to the size of a single cell.
                </p>
            </div>
        </div>
    );
}