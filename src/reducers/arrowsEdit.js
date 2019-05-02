export default function arrowsEdit(state, action) {
    switch (action.type) {
        case 'SELECT_ARROW': return selectArrow(state, action);
        case 'REMOVE_ARROW': return removeArrow(state, action);
        case 'ADD_ARROW': return addArrow(state, action);
        case 'SET_ARROW_THICKNESS': return setArrowThickness(state, action);
        case 'SET_ARROW_COLOR': return setArrowColor(state, action);
        case 'SET_ARROW_HEAD_LENGTH': return setArrowHeadLength(state, action);
        case 'REMOVE_ARROW_WAY_POINT': return removeArrowWayPoint(state, action);
        case 'ADD_ARROW_WAY_POINT': return addArrowWayPoint(state, action);
        case 'SET_ARROW_WAY_POINT': return setArrowWayPoint(state, action);
        default: return state;
    }
}

const selectArrow = (state, {idx}) => ({
    ...state,
    interactions: {
        ...state.interactions,
        arrowIdx: idx,
    }
});

const removeArrow = (state, {idx}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        arrows: [
            ...state.puzzle.arrows.slice(0, idx),
            ...state.puzzle.arrows.slice(idx + 1),
        ]
    }
});

const addArrow = (state) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        arrows: [
            ...state.puzzle.arrows,
            {
                wayPoints: [],
                color: state.edit.arrows.color,
                thickness: state.edit.arrows.thickness,
                headLength: state.edit.arrows.headLength,
            }
        ]
    }
});

const setArrowThickness = (state, {idx, thickness}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        arrows: [
            ...state.puzzle.arrows.slice(0, idx),
            {
                ...state.puzzle.arrows[idx],
                thickness: thickness,
            },
            ...state.puzzle.arrows.slice(idx + 1),
        ]
    },
    edit: {
        ...state.edit,
        arrows: {
            ...state.edit.arrows,
            thickness: thickness,
        }
    }
});

const setArrowColor = (state, {idx, color}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        arrows: [
            ...state.puzzle.arrows.slice(0, idx),
            {
                ...state.puzzle.arrows[idx],
                color: color,
            },
            ...state.puzzle.arrows.slice(idx + 1),
        ]
    },
    edit: {
        ...state.edit,
        arrows: {
            ...state.edit.arrows,
            color: color,
        }
    }
});

const setArrowHeadLength = (state, {idx, headLength}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        arrows: [
            ...state.puzzle.arrows.slice(0, idx),
            {
                ...state.puzzle.arrows[idx],
                headLength: headLength,
            },
            ...state.puzzle.arrows.slice(idx + 1),
        ]
    },
    edit: {
        ...state.edit,
        arrows: {
            ...state.edit.arrows,
            headLength: headLength,
        }
    }
});

const removeArrowWayPoint = (state, {arrowIdx, wayPointIdx}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        arrows: [
            ...state.puzzle.arrows.slice(0, arrowIdx),
            {
                ...state.puzzle.arrows[arrowIdx],
                wayPoints: [
                    ...state.puzzle.arrows[arrowIdx].wayPoints.slice(0, wayPointIdx),
                    ...state.puzzle.arrows[arrowIdx].wayPoints.slice(wayPointIdx + 1),
                ]
            },
            ...state.puzzle.arrows.slice(arrowIdx + 1),
        ]
    }
});

const addArrowWayPoint = (state, {arrowIdx, wayPoint}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        arrows: [
            ...state.puzzle.arrows.slice(0, arrowIdx),
            {
                ...state.puzzle.arrows[arrowIdx],
                wayPoints: [
                    ...state.puzzle.arrows[arrowIdx].wayPoints,
                    wayPoint,
                ]
            },
            ...state.puzzle.arrows.slice(arrowIdx + 1),
        ]
    }
});

const setArrowWayPoint = (state, {arrowIdx, wayPointIdx, wayPoint}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        arrows: [
            ...state.puzzle.arrows.slice(0, arrowIdx),
            {
                ...state.puzzle.arrows[arrowIdx],
                wayPoints: [
                    ...state.puzzle.arrows[arrowIdx].wayPoints.slice(0, wayPointIdx),
                    wayPoint,
                    ...state.puzzle.arrows[arrowIdx].wayPoints.slice(wayPointIdx + 1),
                ]
            },
            ...state.puzzle.arrows.slice(arrowIdx + 1),
        ]
    }
});
