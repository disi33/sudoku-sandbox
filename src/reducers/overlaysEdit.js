export default function overlaysEdit(state, action) {
    switch (action.type) {
        case 'REMOVE_OVERLAY': return removeOverlay(state, action);
        case 'ADD_OVERLAY': return addOverlay(state, action);
        case 'SET_OVERLAY_CENTER': return setOverlayCenter(state, action);
        case 'SET_OVERLAY_WIDTH': return setOverlayWidth(state, action);
        case 'SET_OVERLAY_HEIGHT': return setOverlayHeight(state, action);
        case 'SET_OVERLAY_BORDER_COLOR': return setOverlayBorderColor(state, action);
        case 'SET_OVERLAY_BACKGROUND_COLOR': return setOverlayBackgroundColor(state, action);
        case 'SET_OVERLAY_ROUNDED': return setOverlayRounded(state, action);
        case 'SET_OVERLAY_FONT_SIZE': return setOverlayFontSize(state, action);
        case 'SET_OVERLAY_TEXT': return setOverlayText(state, action);
        default: return state;
    }
}

const removeOverlay = (state, {idx}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        overlays: [
            ...state.puzzle.overlays.slice(0, idx),
            ...state.puzzle.overlays.slice(idx + 1),
        ]
    }
});

const addOverlay = (state) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        overlays: [
            ...state.puzzle.overlays,
            {
                center: [1, 1],
                width: state.edit.overlays.width,
                height: state.edit.overlays.height,
                borderColor: state.edit.overlays.borderColor,
                backgroundColor: state.edit.overlays.backgroundColor,
                rounded: state.edit.overlays.rounded,
                fontSize: state.edit.overlays.fontSize,
                text: undefined,
            }
        ]
    }
});

const setOverlayCenter = (state, {idx, center}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        overlays: [
            ...state.puzzle.overlays.slice(0, idx),
            {
                ...state.puzzle.overlays[idx],
                center: center,
            },
            ...state.puzzle.overlays.slice(idx + 1),

        ]
    }
});

const setOverlayWidth = (state, {idx, width}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        overlays: [
            ...state.puzzle.overlays.slice(0, idx),
            {
                ...state.puzzle.overlays[idx],
                width: width,
            },
            ...state.puzzle.overlays.slice(idx + 1),

        ]
    },
    edit: {
        ...state.edit,
        overlays: {
            ...state.edit.overlays,
            width: width,
        }
    }
});

const setOverlayHeight = (state, {idx, height}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        overlays: [
            ...state.puzzle.overlays.slice(0, idx),
            {
                ...state.puzzle.overlays[idx],
                height: height,
            },
            ...state.puzzle.overlays.slice(idx + 1),

        ]
    },
    edit: {
        ...state.edit,
        overlays: {
            ...state.edit.overlays,
            height: height,
        }
    }
});

const setOverlayBorderColor = (state, {idx, borderColor}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        overlays: [
            ...state.puzzle.overlays.slice(0, idx),
            {
                ...state.puzzle.overlays[idx],
                borderColor: borderColor,
            },
            ...state.puzzle.overlays.slice(idx + 1),

        ]
    },
    edit: {
        ...state.edit,
        overlays: {
            ...state.edit.overlays,
            borderColor: borderColor,
        }
    }
});

const setOverlayBackgroundColor = (state, {idx, backgroundColor}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        overlays: [
            ...state.puzzle.overlays.slice(0, idx),
            {
                ...state.puzzle.overlays[idx],
                backgroundColor: backgroundColor,
            },
            ...state.puzzle.overlays.slice(idx + 1),

        ]
    },
    edit: {
        ...state.edit,
        overlays: {
            ...state.edit.overlays,
            backgroundColor: backgroundColor,
        }
    }
});

const setOverlayRounded = (state, {idx, rounded}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        overlays: [
            ...state.puzzle.overlays.slice(0, idx),
            {
                ...state.puzzle.overlays[idx],
                rounded: rounded,
            },
            ...state.puzzle.overlays.slice(idx + 1),

        ]
    },
    edit: {
        ...state.edit,
        overlays: {
            ...state.edit.overlays,
            rounded: rounded,
        }
    }
});

const setOverlayFontSize = (state, {idx, fontSize}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        overlays: [
            ...state.puzzle.overlays.slice(0, idx),
            {
                ...state.puzzle.overlays[idx],
                fontSize: fontSize,
            },
            ...state.puzzle.overlays.slice(idx + 1),

        ]
    },
    edit: {
        ...state.edit,
        overlays: {
            ...state.edit.overlays,
            fontSize: fontSize,
        }
    }
});

const setOverlayText = (state, {idx, text}) => ({
    ...state,
    puzzle: {
        ...state.puzzle,
        overlays: [
            ...state.puzzle.overlays.slice(0, idx),
            {
                ...state.puzzle.overlays[idx],
                text: text,
            },
            ...state.puzzle.overlays.slice(idx + 1),

        ]
    }
});