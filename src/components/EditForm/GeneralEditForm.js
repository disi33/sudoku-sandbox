import React from 'react';
import './EditForm.css';

import PlusMinusInput from '../PlusMinusInput/PlusMinusInput';

export default function GeneralEditForm({cellSize, onCellSizeChanged, gridSize, onGridSizeChanged}) {
    return (
        <div className="edit-form">
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
    );
}