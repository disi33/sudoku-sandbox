export default function regionsEdit(state, action) {
    switch (action.type) {
        case 'SELECT_REGION': return selectRegion(state, action);
        case 'REMOVE_REGION': return removeRegion(state, action);
        case 'ADD_REGION': return addRegion(state, action);
        case 'SET_REGION_CELL': return setRegionCell(state, action);
        case 'REMOVE_REGION_CELL': return removeRegionCell(state, action);
        case 'ADD_REGION_CELL': return addRegionCell(state, action);
        default: return state;
    }
}

const selectRegion = (state, {idx}) => ({
    ...state,
    interactions: {
        ...state.interactions,
        regionIdx: idx,
    }
});

const removeRegion = (state, {idx}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        regions: [
            ...state.puzzle.regions.slice(0, idx),
            ...state.puzzle.regions.slice(idx + 1),
        ]
    },
    interactions: (state.interactions.mode !== 'REGIONS' || state.interactions.regionIdx === undefined) ? state.interactions : {
        ...state.interactions,
        regionIdx: state.interactions.regionIdx === state.puzzle.regions.length - 1 ? undefined : state.interactions.regionIdx,
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

export const removeRegionCell = (state, {regionIdx, cellIdx}) => ({
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

export const addRegionCell = (state, {regionIdx, cell}) => ({
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