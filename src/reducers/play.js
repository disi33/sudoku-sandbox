export default function play(state, action) {
    switch (action.type) {
        case 'START_PLAY_OVER': return startPlayOver(state, action);
        case 'SET_USER_HIGHLIGHT': return setUserHighlight(state, action);
        case 'DELETE_USER_MARKS': return deleteUserMarks(state, action);
        case 'TOGGLE_USER_CANDIDATE': return toggleUserCandidate(state, action);
        case 'TOGGLE_USER_PENCIL_MARK': return toggleUserPencilMark(state, action);
        case 'SET_USER_VALUE': return setUserValue(state, action);
        default: return state;
    }
}

const startPlayOver = (state) => ({
    ...state,
    play: {
        cells: [...Array(state.puzzle.cells.length)].map(_ => [...Array(state.puzzle.cells.length)].map(_ => ({
            value: undefined, candidates: [], pencilMarks: [], highlight: undefined,
        })))
    }
});

const setUserHighlight = (state, {row, col, color}) => ({
    ...state,
    play: {
        ...state.play,
        cells: [
            ...state.play.cells.slice(0, row),
            [
                ...state.play.cells[row].slice(0, col),
                {
                    ...state.play.cells[row][col],
                    highlight: color,
                },
                ...state.play.cells[row].slice(col + 1),
            ],
            ...state.play.cells.slice(row + 1),
        ]
    }
});

const deleteUserMarks = (state, {row, col}) => ({
    ...state,
    play: {
        ...state.play,
        cells: [
            ...state.play.cells.slice(0, row),
            [
                ...state.play.cells[row].slice(0, col),
                deleteMarks(state.play.cells[row][col]),
                ...state.play.cells[row].slice(col + 1),
            ],
            ...state.play.cells.slice(row + 1),
        ]
    }
});

const toggleUserCandidate = (state, {row, col, value}) => ({
    ...state,
    play: {
        ...state.play,
        cells: [
            ...state.play.cells.slice(0, row),
            [
                ...state.play.cells[row].slice(0, col),
                {
                    ...state.play.cells[row][col],
                    candidates: toggleInList(state.play.cells[row][col].candidates, value),
                },
                ...state.play.cells[row].slice(col + 1),
            ],
            ...state.play.cells.slice(row + 1),
        ]
    }
});

const toggleUserPencilMark = (state, {row, col, value}) => ({
    ...state,
    play: {
        ...state.play,
        cells: [
            ...state.play.cells.slice(0, row),
            [
                ...state.play.cells[row].slice(0, col),
                {
                    ...state.play.cells[row][col],
                    pencilMarks: toggleInList(state.play.cells[row][col].pencilMarks, value),
                },
                ...state.play.cells[row].slice(col + 1),
            ],
            ...state.play.cells.slice(row + 1),
        ]
    }
});

const setUserValue = (state, {row, col, value}) => ({
    ...state,
    play: {
        ...state.play,
        cells: [
            ...state.play.cells.slice(0, row),
            [
                ...state.play.cells[row].slice(0, col),
                {
                    ...state.play.cells[row][col],
                    value: value,
                },
                ...state.play.cells[row].slice(col + 1),
            ],
            ...state.play.cells.slice(row + 1),
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
