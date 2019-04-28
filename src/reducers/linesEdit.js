export default function linesEdit(state, action) {
    switch (action.type) {
        case 'REMOVE_LINE': return removeLine(state, action);
        case 'ADD_LINE': return addLine(state, action);
        case 'SET_LINE_THICKNESS': return setLineThickness(state, action);
        case 'SET_LINE_COLOR': return setLineColor(state, action);
        case 'REMOVE_LINE_WAY_POINT': return removeLineWayPoint(state, action);
        case 'ADD_LINE_WAY_POINT': return addLineWayPoint(state, action);
        case 'SET_LINE_WAY_POINT': return setLineWayPoint(state, action);
        default: return state;
    }
}

const removeLine = (state, {idx}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        lines: [
            ...state.puzzle.lines.slice(0, idx),
            ...state.puzzle.lines.slice(idx + 1),
        ]
    }
});

const addLine = (state) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        lines: [
            ...state.puzzle.lines,
            {
                wayPoints: [[0.5, 0.5], [1.5, 1.5]],
                color: state.edit.lines.color,
                thickness: state.edit.lines.thickness,
            }
        ]
    }
});

const setLineThickness = (state, {idx, thickness}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        lines: [
            ...state.puzzle.lines.slice(0, idx),
            {
                ...state.puzzle.lines[idx],
                thickness: thickness,
            },
            ...state.puzzle.lines.slice(idx + 1),
        ]
    },
    edit: {
        ...state.edit,
        lines: {
            ...state.edit.lines,
            thickness: thickness,
        }
    }
});

const setLineColor = (state, {idx, color}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        lines: [
            ...state.puzzle.lines.slice(0, idx),
            {
                ...state.puzzle.lines[idx],
                color: color,
            },
            ...state.puzzle.lines.slice(idx + 1),
        ]
    },
    edit: {
        ...state.edit,
        lines: {
            ...state.edit.lines,
            color: color,
        }
    }
});

const removeLineWayPoint = (state, {lineIdx, wayPointIdx}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        lines: [
            ...state.puzzle.lines.slice(0, lineIdx),
            {
                ...state.puzzle.lines[lineIdx],
                wayPoints: [
                    ...state.puzzle.lines[lineIdx].wayPoints.slice(0, wayPointIdx),
                    ...state.puzzle.lines[lineIdx].wayPoints.slice(wayPointIdx + 1),
                ]
            },
            ...state.puzzle.lines.slice(lineIdx + 1),
        ]
    }
});

const addLineWayPoint = (state, {lineIdx, wayPoint}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        lines: [
            ...state.puzzle.lines.slice(0, lineIdx),
            {
                ...state.puzzle.lines[lineIdx],
                wayPoints: [
                    ...state.puzzle.lines[lineIdx].wayPoints,
                    wayPoint,
                ]
            },
            ...state.puzzle.lines.slice(lineIdx + 1),
        ]
    }
});

const setLineWayPoint = (state, {lineIdx, wayPointIdx, wayPoint}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        lines: [
            ...state.puzzle.lines.slice(0, lineIdx),
            {
                ...state.puzzle.lines[lineIdx],
                wayPoints: [
                    ...state.puzzle.lines[lineIdx].wayPoints.slice(0, wayPointIdx),
                    wayPoint,
                    ...state.puzzle.lines[lineIdx].wayPoints.slice(wayPointIdx + 1),
                ]
            },
            ...state.puzzle.lines.slice(lineIdx + 1),
        ]
    }
});
