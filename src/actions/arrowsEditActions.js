export const removeArrow = idx => ({
    type: 'REMOVE_ARROW',
    idx: idx,
});

export const addArrow = () => ({
    type: 'ADD_ARROW',
});

export const setArrowThickness = (idx, thickness) => ({
    type: 'SET_ARROW_THICKNESS',
    idx: idx,
    thickness: thickness,
});

export const setArrowColor = (idx, color) => ({
    type: 'SET_ARROW_COLOR',
    idx: idx,
    color: color,
});

export const setArrowHeadLength = (idx, headLength) => ({
    type: 'SET_ARROW_HEAD_LENGTH',
    idx: idx,
    headLength: headLength,
});

export const removeArrowWayPoint = (arrowIdx, wayPointIdx) => ({
    type: 'REMOVE_ARROW_WAY_POINT',
    arrowIdx: arrowIdx,
    wayPointIdx: wayPointIdx,
});

export const addArrowWayPoint = (arrowIdx, wayPoint) => ({
    type: 'ADD_ARROW_WAY_POINT',
    arrowIdx: arrowIdx,
    wayPoint: wayPoint,
});

export const setArrowWayPoint = (arrowIdx, wayPointIdx, wayPoint) => ({
    type: 'SET_ARROW_WAY_POINT',
    arrowIdx: arrowIdx,
    wayPointIdx: wayPointIdx,
    wayPoint: wayPoint,
});
