export const convertOriginToCenter = decoration => {
    if (decoration.center === undefined && decoration.origin !== undefined) return {
        ...decoration,
        center: [
            decoration.origin[0] + decoration.height / 2,
            decoration.origin[1] + decoration.width / 2,
        ]
    };
    else return decoration;
};