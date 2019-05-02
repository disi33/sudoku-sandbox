export default function generalEdit(state, action) {
    switch (action.type) {
        case 'SET_CELL_SIZE': return setCellSize(state, action);
        case 'SET_GRID_SIZE': return setGridSize(state, action);
        default: return state;
    }
}

const setCellSize = (state, {cellSize}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        cellSize: cellSize
    }
});

const setGridSize = (state, {gridSize, gridSize: [width, height]}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        cells: [...Array(height)].map(_ => [...Array(width)].map(_ => ({ value: undefined, candidates: [], pencilMarks: []}))),
        regions: defaultRegions(gridSize),
        cages: [],
        lines: [],
        arrows: [],
        overlays: [],
        underlays: [],
    },
    interactions: {
        ...state.interactions,
        cellRow: undefined,
        cellCol: undefined,
    },
    play: undefined,
});

const defaultRegions = ([width, height]) => {

    if (width !== height) {
        return [];
    }

    let rows = Math.floor(Math.sqrt(width));
    while (width % rows !== 0) rows -= 1;
    const [rowsPerRegion, colsPerRegion] = [rows, width / rows];

    let regions = [];
    for (let idx = 0; idx < colsPerRegion; idx++) {
        for (let jdx = 0; jdx < rowsPerRegion; jdx++) {
            let region = [];
            for (let row = rowsPerRegion * idx; row < rowsPerRegion * (idx + 1); row++) {
                for (let col = colsPerRegion * jdx; col < colsPerRegion * (jdx + 1); col++) {
                    region.push([row, col]);
                }
            }
            regions.push(region);
        }
    }

    return regions;
}