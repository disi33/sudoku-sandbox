export const setInteractionsMode = mode => ({
    type: 'SET_INTERACTIONS_MODE',
    mode: mode,
});

export const toggleCellInRegion = (row, col, regionIdx) => ({
    type: 'TOGGLE_CELL_IN_REGION',
    row: row,
    col: col,
    regionIdx: regionIdx,
});

export const toggleCellInCage = (row, col, cageIdx) => ({
    type: 'TOGGLE_CELL_IN_CAGE',
    row: row,
    col: col,
    cageIdx: cageIdx,
});

export const selectCell = (row, col) => ({
    type: 'SELECT_CELL',
    row: row,
    col: col,
});

export const deleteGivenMarks = (row, col) => ({
    type: 'DELETE_GIVEN_MARKS',
    row: row,
    col: col,
});

export const toggleGivenCandidate = (row, col, value) => ({
    type: 'TOGGLE_GIVEN_CANDIDATE',
    row: row,
    col: col,
    value: value,
});

export const toggleGivenPencilMark = (row, col, value) => ({
    type: 'TOGGLE_GIVEN_PENCIL_MARK',
    row: row,
    col: col,
    value: value,
});

export const setGivenValue = (row, col, value) => ({
    type: 'SET_GIVEN_VALUE',
    row: row,
    col: col,
    value: value,
});