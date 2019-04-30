export default function cagesEdit(state, action) {
    switch (action.type) {
        case 'SELECT_CAGE': return selectCage(state, action);
        case 'REMOVE_CAGE': return removeCage(state, action);
        case 'ADD_CAGE': return addCage(state, action);
        case 'SET_CAGE_VALUE': return setCageValue(state, action);
        case 'SET_CAGE_CELL': return setCageCell(state, action);
        case 'REMOVE_CAGE_CELL': return removeCageCell(state, action);
        case 'ADD_CAGE_CELL': return addCageCell(state, action);
        default: return state;
    }
}

const selectCage = (state, {idx}) => ({
    ...state,
    interactions: {
        ...state.interactions,
        cageIdx: idx,
    }
});

const removeCage = (state, {idx}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        cages: [
            ...state.puzzle.cages.slice(0, idx),
            ...state.puzzle.cages.slice(idx + 1),
        ]
    }
});

const addCage = (state) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        cages: [
            ...state.puzzle.cages,
            {
                cells: [],
                value: 0,
            }
        ]
    }
});

const setCageValue = (state, {idx, value}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        cages: [
            ...state.puzzle.cages.slice(0, idx),
            {
                ...state.puzzle.cages[idx],
                value: value,
            },
            ...state.puzzle.cages.slice(idx + 1),
        ]
    }
});

const setCageCell = (state, {cageIdx, cellIdx, cell}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        cages: [
            ...state.puzzle.cages.slice(0, cageIdx),
            {
                ...state.puzzle.cages[cageIdx],
                cells: [
                    ...state.puzzle.cages[cageIdx].cells.slice(0, cellIdx),
                    cell,
                    ...state.puzzle.cages[cageIdx].cells.slice(cellIdx + 1),
                ]
            },
            ...state.puzzle.cages.slice(cageIdx + 1),
        ]
    }
});

export const removeCageCell = (state, {cageIdx, cellIdx}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        cages: [
            ...state.puzzle.cages.slice(0, cageIdx),
            {
                ...state.puzzle.cages[cageIdx],
                cells: [
                    ...state.puzzle.cages[cageIdx].cells.slice(0, cellIdx),
                    ...state.puzzle.cages[cageIdx].cells.slice(cellIdx + 1),
                ]
            },
            ...state.puzzle.cages.slice(cageIdx + 1),
        ]
    }
});

export const addCageCell = (state, {cageIdx, cell}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        cages: [
            ...state.puzzle.cages.slice(0, cageIdx),
            {
                ...state.puzzle.cages[cageIdx],
                cells: [
                    ...state.puzzle.cages[cageIdx].cells,
                    cell
                ]
            },
            ...state.puzzle.cages.slice(cageIdx + 1),
        ]
    }
});