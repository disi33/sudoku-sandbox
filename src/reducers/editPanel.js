export default function editPanel(state, action) {
    switch (action.type) {
        case 'SET_CLICKS_MODE': return setClicksMode(state, action);
        default: return state;
    }
}

const setClicksMode = (state, {mode}) => ({
    ...state,
    clicks: {
        mode: mode,
    }
});