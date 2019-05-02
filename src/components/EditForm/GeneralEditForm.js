import React, { useState } from 'react';
import './EditForm.css';

import PlusMinusInput from '../PlusMinusInput/PlusMinusInput';

export default function GeneralEditForm({cellSize, onCellSizeChanged, gridSize: [width, height], onGridSizeChanged}) {
    
    const [allowRectangles, setAllowRectangles] = useState(width !== height);
    
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
                {!allowRectangles &&
                    <div className="edit-form__field">
                        <span className="edit-form__field-name">Grid size</span>
                        <div className="edit-form__field-input">
                            <PlusMinusInput value={width} minValue={1} maxValue={99} onValueChanged={value => onGridSizeChanged([value, value])}></PlusMinusInput>
                        </div>
                    </div>
                }
                {!allowRectangles &&
                    <div className="edit-form__field">
                        <span className="edit-form__field-name">Rectangular grid</span>
                        <div className="edit-form__field-input">
                            <input type="checkbox" checked={allowRectangles} onChange={value => {console.log(value); setAllowRectangles(value);}}></input>
                        </div>
                    </div>
                }
                {allowRectangles &&
                    <div className="edit-form__field">
                        <span className="edit-form__field-name">Grid width</span>
                        <div className="edit-form__field-input">
                            <PlusMinusInput value={width} minValue={1} maxValue={99} onValueChanged={value => onGridSizeChanged([value, height])}></PlusMinusInput>
                        </div>
                    </div>
                }
                {allowRectangles &&
                    <div className="edit-form__field">
                        <span className="edit-form__field-name">Grid height</span>
                        <div className="edit-form__field-input">
                            <PlusMinusInput value={height} minValue={1} maxValue={99} onValueChanged={value => onGridSizeChanged([width, value])}></PlusMinusInput>
                        </div>
                    </div>
                }
            </div>
            <div className="edit-form__section">
                <div className="edit-form__section-title">Givens</div>
                <p>
                    To place givens in the grid, select a cell by clicking on it and then use the keyboard to enter values.
                    You can move between cells of the grid using the arrow keys.
                </p>
            </div>
            <div className="edit-form__section">
                <div className="edit-form__section-title">Decorations</div>
                <p>
                    Use the other tabs of this edit panel to place decorations (cages, lines, arrows, text etc.) in the grid.
                </p>
                <p>
                    Some decorations ask for coordinates for where they should appear in the grid. 
                    These coordinates are always relative to the grid - (0, 0) is the top left corner of the grid, and one unit of length is equal to the size of a single cell.
                </p>
            </div>
        </div>
    );
}