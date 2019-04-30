import { addCageCell, removeCageCell } from './cagesEdit';
import { addRegionCell, removeRegionCell } from './regionsEdit';

export default function puzzle(state, action) {
    switch (action.type) {
        case 'TOGGLE_CELL_IN_REGION': return toggleCellInRegion(state, action);
        case 'TOGGLE_CELL_IN_CAGE': return toggleCellInCage(state, action);
        default: return state;
    }
}

const toggleCellInRegion = (state, {row, col, regionIdx}) => {
    const cellIdx = state.puzzle.regions[regionIdx].findIndex(([r, c]) => r === row && c === col);
    if (cellIdx === -1) return addRegionCell(state, {regionIdx, cell: [row, col]});
    else return removeRegionCell(state, {regionIdx, cellIdx});
};

const toggleCellInCage = (state, {row, col, cageIdx}) => {
    const cellIdx = state.puzzle.cages[cageIdx].cells.findIndex(([r, c]) => r === row && c === col);
    if (cellIdx === -1) return addCageCell(state, {cageIdx, cell: [row, col]});
    else return removeCageCell(state, {cageIdx, cellIdx});
};