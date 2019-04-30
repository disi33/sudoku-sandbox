export default function saveLoad(state, action) {
    switch (action.type) {
        case 'LOAD_PUZZLE': return loadPuzzle(state, action);
        default: return state;
    }
}

const loadPuzzle = (state, {puzzle}) => ({
    ...state,
    puzzle: JSON.parse(puzzle),
    interactions: {
        mode: 'GIVENS',
    },
});