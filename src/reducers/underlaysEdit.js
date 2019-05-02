export default function underlaysEdit(state, action) {
    switch (action.type) {
        case 'SELECT_UNDERLAY': return selectUnderlay(state, action);
        case 'REMOVE_UNDERLAY': return removeUnderlay(state, action);
        case 'ADD_UNDERLAY': return addUnderlay(state, action);
        case 'SET_UNDERLAY_ORIGIN': return setUnderlayOrigin(state, action);
        case 'SET_UNDERLAY_WIDTH': return setUnderlayWidth(state, action);
        case 'SET_UNDERLAY_HEIGHT': return setUnderlayHeight(state, action);
        case 'SET_UNDERLAY_BORDER_COLOR': return setUnderlayBorderColor(state, action);
        case 'SET_UNDERLAY_BACKGROUND_COLOR': return setUnderlayBackgroundColor(state, action);
        case 'SET_UNDERLAY_ROUNDED': return setUnderlayRounded(state, action);
        case 'ADD_AND_SELECT_UNDERLAY': return addAndSelectUnderlay(state, action);
        default: return state;
    }
}

const selectUnderlay = (state, {idx}) => ({
    ...state,
    interactions: {
        ...state.interactions,
        underlayIdx: idx,
    }
});

const removeUnderlay = (state, {idx}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        underlays: [
            ...state.puzzle.underlays.slice(0, idx),
            ...state.puzzle.underlays.slice(idx + 1),
        ]
    }
});

const addUnderlay = (state) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        underlays: [
            ...state.puzzle.underlays,
            {
                origin: [0, 0],
                width: state.edit.underlays.width,
                height: state.edit.underlays.height,
                borderColor: state.edit.underlays.borderColor,
                backgroundColor: state.edit.underlays.backgroundColor,
                rounded: state.edit.underlays.rounded,
            }
        ]
    }
});

const setUnderlayOrigin = (state, {idx, origin}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        underlays: [
            ...state.puzzle.underlays.slice(0, idx),
            {
                ...state.puzzle.underlays[idx],
                origin: origin,
            },
            ...state.puzzle.underlays.slice(idx + 1),

        ]
    }
});

const setUnderlayWidth = (state, {idx, width}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        underlays: [
            ...state.puzzle.underlays.slice(0, idx),
            {
                ...state.puzzle.underlays[idx],
                width: width,
            },
            ...state.puzzle.underlays.slice(idx + 1),

        ]
    },
    edit: {
        ...state.edit,
        underlays: {
            ...state.edit.underlays,
            width: width,
        }
    }
});

const setUnderlayHeight = (state, {idx, height}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        underlays: [
            ...state.puzzle.underlays.slice(0, idx),
            {
                ...state.puzzle.underlays[idx],
                height: height,
            },
            ...state.puzzle.underlays.slice(idx + 1),

        ]
    },
    edit: {
        ...state.edit,
        underlays: {
            ...state.edit.underlays,
            height: height,
        }
    }
});

const setUnderlayBorderColor = (state, {idx, borderColor}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        underlays: [
            ...state.puzzle.underlays.slice(0, idx),
            {
                ...state.puzzle.underlays[idx],
                borderColor: borderColor,
            },
            ...state.puzzle.underlays.slice(idx + 1),

        ]
    },
    edit: {
        ...state.edit,
        underlays: {
            ...state.edit.underlays,
            borderColor: borderColor,
        }
    }
});

const setUnderlayBackgroundColor = (state, {idx, backgroundColor}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        underlays: [
            ...state.puzzle.underlays.slice(0, idx),
            {
                ...state.puzzle.underlays[idx],
                backgroundColor: backgroundColor,
            },
            ...state.puzzle.underlays.slice(idx + 1),

        ]
    },
    edit: {
        ...state.edit,
        underlays: {
            ...state.edit.underlays,
            backgroundColor: backgroundColor,
        }
    }
});

const setUnderlayRounded = (state, {idx, rounded}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        underlays: [
            ...state.puzzle.underlays.slice(0, idx),
            {
                ...state.puzzle.underlays[idx],
                rounded: rounded,
            },
            ...state.puzzle.underlays.slice(idx + 1),

        ]
    },
    edit: {
        ...state.edit,
        underlays: {
            ...state.edit.underlays,
            rounded: rounded,
        }
    }
});

const addAndSelectUnderlay = (state, {origin}) => {
    const addedState = addUnderlay(state);
    const idx = addedState.puzzle.underlays.length - 1;
    const withOrigin = setUnderlayOrigin(addedState, {idx, origin});
    return selectUnderlay(withOrigin, {idx});
};
