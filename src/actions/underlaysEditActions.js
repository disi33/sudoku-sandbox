export const selectUnderlay = idx => ({
    type: 'SELECT_UNDERLAY',
    idx: idx,
});

export const removeUnderlay = idx => ({
    type: 'REMOVE_UNDERLAY',
    idx: idx,
});

export const addUnderlay = () => ({
    type: 'ADD_UNDERLAY',
});

export const setUnderlayOrigin = (idx, origin) => ({
    type: 'SET_UNDERLAY_ORIGIN',
    idx: idx,
    origin: origin,
});

export const setUnderlayWidth = (idx, width) => ({
    type: 'SET_UNDERLAY_WIDTH',
    idx: idx,
    width: width,
});

export const setUnderlayHeight = (idx, height) => ({
    type: 'SET_UNDERLAY_HEIGHT',
    idx: idx,
    height: height,
});

export const setUnderlayBorderColor = (idx, borderColor) => ({
    type: 'SET_UNDERLAY_BORDER_COLOR',
    idx: idx,
    borderColor: borderColor,
});

export const setUnderlayBackgroundColor = (idx, backgroundColor) => ({
    type: 'SET_UNDERLAY_BACKGROUND_COLOR',
    idx: idx,
    backgroundColor: backgroundColor,
});

export const setUnderlayRounded = (idx, rounded) => ({
    type: 'SET_UNDERLAY_ROUNDED',
    idx: idx,
    rounded: rounded,
});

export const addAndSelectUnderlay = origin => ({
    type: 'ADD_AND_SELECT_UNDERLAY',
    origin: origin,
});
