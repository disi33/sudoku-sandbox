export default function regionsEdit(state, action) {
    switch (action.type) {
        case 'REMOVE_REGION': return removeRegion(state, action);
        case 'ADD_REGION': return addRegion(state, action);
        case 'SET_REGION_CELL': return setRegionCell(state, action);
        case 'REMOVE_REGION_CELL': return removeRegionCell(state, action);
        case 'ADD_REGION_CELL': return addRegionCell(state, action);
        default: return state;
    }
}

const removeRegion = (state, {idx}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        regions: [
            ...state.puzzle.regions.slice(0, idx),
            ...state.puzzle.regions.slice(idx + 1),
        ]
    }
});

const addRegion = (state) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        regions: [
            ...state.puzzle.regions,
            [],
        ]
    }
});

const setRegionCell = (state, {regionIdx, cellIdx, cell}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        regions: [
            ...state.puzzle.regions.slice(0, regionIdx),
            [
                ...state.puzzle.regions[regionIdx].slice(0, cellIdx),
                cell,
                ...state.puzzle.regions[regionIdx].slice(cellIdx + 1),
            ],
            ...state.puzzle.regions.slice(regionIdx + 1),
        ]
    }
});

const removeRegionCell = (state, {regionIdx, cellIdx}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        regions: [
            ...state.puzzle.regions.slice(0, regionIdx),
            [
                ...state.puzzle.regions[regionIdx].slice(0, cellIdx),
                ...state.puzzle.regions[regionIdx].slice(cellIdx + 1),
            ],
            ...state.puzzle.regions.slice(regionIdx + 1),
        ]
    }
});

const addRegionCell = (state, {regionIdx, cell}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        regions: [
            ...state.puzzle.regions.slice(0, regionIdx),
            [
                ...state.puzzle.regions[regionIdx],
                cell,
            ],
            ...state.puzzle.regions.slice(regionIdx + 1),
        ]
    }
});