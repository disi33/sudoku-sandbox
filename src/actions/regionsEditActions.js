export const selectRegion = idx => ({
    type: 'SELECT_REGION',
    idx: idx,
});

export const removeRegion = idx => ({
    type: 'REMOVE_REGION',
    idx: idx,
});

export const addRegion = () => ({
    type: 'ADD_REGION'
});

export const setRegionCell = (regionIdx, cellIdx, cell) => ({
    type: 'SET_REGION_CELL',
    regionIdx: regionIdx,
    cellIdx: cellIdx,
    cell: cell,
});

export const removeRegionCell = (regionIdx, cellIdx) => ({
    type: 'REMOVE_REGION_CELL',
    regionIdx: regionIdx,
    cellIdx: cellIdx,
});

export const addRegionCell = (regionIdx, cell) => ({
    type: 'ADD_REGION_CELL',
    regionIdx: regionIdx,
    cell: cell,
});