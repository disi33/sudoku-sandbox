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