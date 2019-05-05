export default function play(state, action) {
    switch (action.type) {
        case 'START_PLAY_OVER': return resetHistory(startPlayOver)(state, action);
        case 'SET_USER_HIGHLIGHT': return pushHistory(setUserHighlight)(state, action);
        case 'DELETE_USER_MARKS': return pushHistory(deleteUserMarks)(state, action);
        case 'TOGGLE_USER_CANDIDATE': return pushHistory(toggleUserCandidate)(state, action);
        case 'TOGGLE_USER_PENCIL_MARK': return pushHistory(toggleUserPencilMark)(state, action);
        case 'SET_USER_VALUE': return pushHistory(setUserValue)(state, action);
        case 'UNDO_PLAY': return undoPlay(state, action);
        case 'REDO_PLAY': return redoPlay(state, action);
        case 'MARK_REPEATS': return markRepeats(state, action);
        default: return state;
    }
}

const startPlayOver = (state) => ({
    ...state,
    play: {
        ...state.play,
        cells: [...Array(state.puzzle.cells.length)].map(_ => [...Array(state.puzzle.cells[0].length)].map(_ => ({
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

const undoPlay = state => ({
    ...state,
    play: {
        ...state.play,
        cells: state.play.history.items[state.play.history.activeItem - 1] || state.play.cells,
        history: {
            ...state.play.history,
            activeItem: Math.max(state.play.history.activeItem - 1, 0),
        }
    }
});

const redoPlay = state => ({
    ...state,
    play: {
        ...state.play,
        cells: state.play.history.items[state.play.history.activeItem + 1] || state.play.cells,
        history: {
            ...state.play.history,
            activeItem: Math.min(state.play.history.activeItem + 1, state.play.history.items.length - 1),
        }
    }
});

const markRepeats = state => {
    const [rows, cols] = [state.puzzle.cells.length, state.puzzle.cells[0].length];
    const cellValues = [...Array(rows).keys()].map(row => [...Array(cols).keys()].map(col => state.puzzle.cells[row][col].value || state.play.cells[row][col].value));
    let cellsToMark = [...Array(rows)].map(_ => [...Array(cols)].map(_ => false));
    
    // Rows
    for (let row = 0; row < rows; row++) {
        repeatedCoords([...Array(cols).keys()].map(col => [row, col]), cellValues).forEach(([row, col]) => cellsToMark[row][col] = true);
    }

    // Columns
    for (let col = 0; col < cols; col++) {
        repeatedCoords([...Array(rows).keys()].map(row => [row, col]), cellValues).forEach(([row, col]) => cellsToMark[row][col] = true);
    }

    // Regions
    for (let regionIdx = 0; regionIdx < state.puzzle.regions.length; regionIdx++) {
        repeatedCoords(state.puzzle.regions[regionIdx], cellValues).forEach(([row, col]) => cellsToMark[row][col] = true);
    }
    
    return {
        ...state,
        play: {
            ...state.play,
            cells: state.play.cells.map((_, row) =>
                state.play.cells[row].map((_, col) => ({
                    ...state.play.cells[row][col],
                    repeated: cellsToMark[row][col],
                }))
            )
        }
    };
};

const repeatedCoords = (coords, values) => {
    let seenValues = {};
    coords.forEach(([row, col]) => {
        const value = values[row][col];
        if (!!value && !!seenValues[value]) seenValues[value].push([row, col]);
        else if (!!value) seenValues[value] = [[row, col]];
    });
    return Object.values(seenValues).filter(x => x.length > 1).reduce((a, b) => a.concat(b), []);
};

const deleteMarks = cell => {
    if (cell.value !== undefined) {
        return {
            ...cell,
            value: undefined,
        };
    } else if (cell.candidates.length > 0 || cell.pencilMarks.length > 0) {
        return {
            ...cell,
            candidates: [],
            pencilMarks: [],
        };
    } else {
        return {
            ...cell,
            highlight: undefined,
        };
    }
};

const toggleInList = (list, value) => {
    const index = list.indexOf(value);
    if (index === -1) return [...list, value];
    else return [...list.slice(0, index), ...list.slice(index + 1)];
};


const resetHistory = reducer => (state, action) => {
  const newState = reducer(state, action);
  return {
      ...newState,
      play: {
          ...newState.play,
          history: {
              items: [newState.play.cells],
              activeItem: 0,
          }
      }
  };
};

const pushHistory = reducer => (state, action) => {
    const newState = reducer(state, action);
    return {
        ...newState,
        play: {
            ...newState.play,
            history: {
                items: [
                    ...state.play.history.items.slice(0, state.play.history.activeItem + 1),
                    newState.play.cells,
                ],
                activeItem: state.play.history.activeItem + 1,
            }
        }
    };
};
