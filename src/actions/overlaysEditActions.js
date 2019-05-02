export const selectOverlay = idx => ({
    type: 'SELECT_OVERLAY',
    idx: idx,
});

export const removeOverlay = idx => ({
    type: 'REMOVE_OVERLAY',
    idx: idx,
});

export const addOverlay = () => ({
    type: 'ADD_OVERLAY',
});

export const setOverlayCenter = (idx, center) => ({
    type: 'SET_OVERLAY_CENTER',
    idx: idx,
    center: center,
});

export const setOverlayWidth = (idx, width) => ({
    type: 'SET_OVERLAY_WIDTH',
    idx: idx,
    width: width,
});

export const setOverlayHeight = (idx, height) => ({
    type: 'SET_OVERLAY_HEIGHT',
    idx: idx,
    height: height,
});

export const setOverlayBorderColor = (idx, borderColor) => ({
    type: 'SET_OVERLAY_BORDER_COLOR',
    idx: idx,
    borderColor: borderColor,
});

export const setOverlayBackgroundColor = (idx, backgroundColor) => ({
    type: 'SET_OVERLAY_BACKGROUND_COLOR',
    idx: idx,
    backgroundColor: backgroundColor,
});

export const setOverlayRounded = (idx, rounded) => ({
    type: 'SET_OVERLAY_ROUNDED',
    idx: idx,
    rounded: rounded,
});

export const setOverlayFontSize = (idx, fontSize) => ({
    type: 'SET_OVERLAY_FONT_SIZE',
    idx: idx,
    fontSize: fontSize,
});

export const setOverlayText = (idx, text) => ({
    type: 'SET_OVERLAY_TEXT',
    idx: idx,
    text: text,
});

export const addAndSelectOverlay = center => ({
    type: 'ADD_AND_SELECT_OVERLAY',
    center: center,
});