import { addCageCell, removeCageCell } from './cagesEdit';
import { addRegionCell, removeRegionCell } from './regionsEdit';

export default function puzzle(state, action) {
    switch (action.type) {
        case 'SET_INTERACTIONS_MODE': return setInteractionsMode(state, action);
        case 'TOGGLE_CELL_IN_REGION': return toggleCellInRegion(state, action);
        case 'TOGGLE_CELL_IN_CAGE': return toggleCellInCage(state, action);
        case 'SELECT_CELL': return selectCell(state, action);
        case 'DELETE_GIVEN_MARKS': return deleteGivenMarks(state, action);
        case 'TOGGLE_GIVEN_CANDIDATE': return toggleGivenCandidate(state, action);
        case 'TOGGLE_GIVEN_PENCIL_MARK': return toggleGivenPencilMark(state, action);
        case 'SET_GIVEN_VALUE': return setGivenValue(state, action);
        default: return state;
    }
}

const setInteractionsMode = (state, {mode}) => ({
    ...state,
    interactions: {
        mode: mode,
        entry: 'NORMAL',
    }
});

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

const selectCell = (state, {row, col}) => ({
    ...state,
    interactions: {
        ...state.interactions,
        cellRow: row,
        cellCol: col,
    }
});

const deleteGivenMarks = (state, {row, col}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        cells: [
            ...state.puzzle.cells.slice(0, row),
            [
                ...state.puzzle.cells[row].slice(0, col),
                deleteMarks(state.puzzle.cells[row][col]),
                ...state.puzzle.cells[row].slice(col + 1),
            ],
            ...state.puzzle.cells.slice(row + 1),
        ]
    }
});

const toggleGivenCandidate = (state, {row, col, value}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        cells: [
            ...state.puzzle.cells.slice(0, row),
            [
                ...state.puzzle.cells[row].slice(0, col),
                {
                    ...state.puzzle.cells[row][col],
                    candidates: toggleInList(state.puzzle.cells[row][col].candidates, value),
                },
                ...state.puzzle.cells[row].slice(col + 1),
            ],
            ...state.puzzle.cells.slice(row + 1),
        ]
    }
});

const toggleGivenPencilMark = (state, {row, col, value}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        cells: [
            ...state.puzzle.cells.slice(0, row),
            [
                ...state.puzzle.cells[row].slice(0, col),
                {
                    ...state.puzzle.cells[row][col],
                    pencilMarks: toggleInList(state.puzzle.cells[row][col].pencilMarks, value),
                },
                ...state.puzzle.cells[row].slice(col + 1),
            ],
            ...state.puzzle.cells.slice(row + 1),
        ]
    }
});

const setGivenValue = (state, {row, col, value}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        cells: [
            ...state.puzzle.cells.slice(0, row),
            [
                ...state.puzzle.cells[row].slice(0, col),
                {
                    ...state.puzzle.cells[row][col],
                    value: value,
                },
                ...state.puzzle.cells[row].slice(col + 1),
            ],
            ...state.puzzle.cells.slice(row + 1),
        ]
    }
});

const deleteMarks = cell => {
    if (cell.value !== undefined) {
        return {
            ...cell,
            value: undefined,
        };
    } else {
        return {
            value: undefined,
            candidates: [],
            pencilMarks: [],
        };
    }
};

const toggleInList = (list, value) => {
    const index = list.indexOf(value);
    if (index === -1) return [...list, value];
    else return [...list.slice(0, index), ...list.slice(index + 1)];
};