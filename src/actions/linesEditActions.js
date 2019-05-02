export const selectLine = idx => ({
    type: 'SELECT_LINE',
    idx: idx,
});

export const removeLine = idx => ({
    type: 'REMOVE_LINE',
    idx: idx,
});

export const addLine = () => ({
    type: 'ADD_LINE',
});

export const setLineThickness = (idx, thickness) => ({
    type: 'SET_LINE_THICKNESS',
    idx: idx,
    thickness: thickness,
});

export const setLineColor = (idx, color) => ({
    type: 'SET_LINE_COLOR',
    idx: idx,
    color: color,
});

export const removeLineWayPoint = (lineIdx, wayPointIdx) => ({
    type: 'REMOVE_LINE_WAY_POINT',
    lineIdx: lineIdx,
    wayPointIdx: wayPointIdx,
});

export const addLineWayPoint = (lineIdx, wayPoint) => ({
    type: 'ADD_LINE_WAY_POINT',
    lineIdx: lineIdx,
    wayPoint: wayPoint,
});

export const setLineWayPoint = (lineIdx, wayPointIdx, wayPoint) => ({
    type: 'SET_LINE_WAY_POINT',
    lineIdx: lineIdx,
    wayPointIdx: wayPointIdx,
    wayPoint: wayPoint,
});
