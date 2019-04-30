export const startPlayOver = () => ({
    type: 'START_PLAY_OVER',
});

export const setUserHighlight = (row, col, color) => ({
    type: 'SET_USER_HIGHLIGHT',
    row: row,
    col: col,
    color: color,
});

export const deleteUserMarks = (row, col) => ({
    type: 'DELETE_USER_MARKS',
    row: row,
    col: col,
});

export const toggleUserCandidate = (row, col, value) => ({
    type: 'TOGGLE_USER_CANDIDATE',
    row: row,
    col: col,
    value: value,
});

export const toggleUserPencilMark = (row, col, value) => ({
    type: 'TOGGLE_USER_PENCIL_MARK',
    row: row,
    col: col,
    value: value,
});

export const setUserValue = (row, col, value) => ({
    type: 'SET_USER_VALUE',
    row: row,
    col: col,
    value: value,
});