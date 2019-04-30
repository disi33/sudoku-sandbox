export const selectCage = idx => ({
    type: 'SELECT_CAGE',
    idx: idx,
});

export const removeCage = idx => ({
    type: 'REMOVE_CAGE',
    idx: idx,
});

export const addCage = () => ({
    type: 'ADD_CAGE',
});

export const setCageValue = (idx, value) => ({
    type: 'SET_CAGE_VALUE',
    idx: idx,
    value: value,
});

export const setCageCell = (cageIdx, cellIdx, cell) => ({
    type: 'SET_CAGE_CELL',
    cageIdx: cageIdx,
    cellIdx: cellIdx,
    cell: cell,
});

export const removeCageCell = (cageIdx, cellIdx) => ({
    type: 'REMOVE_CAGE_CELL',
    cageIdx: cageIdx,
    cellIdx: cellIdx,
});

export const addCageCell = (cageIdx, cell) => ({
    type: 'ADD_CAGE_CELL',
    cageIdx: cageIdx,
    cell: cell,
});
