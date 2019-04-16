import React from 'react';
import { createSelector } from 'reselect';

import Cell from '../Cell/Cell';

import './Grid.css';

export default function Grid({ grid: { cells, regions, decorations }, grid }) {
    const borders = bordersSelector(grid);
    console.log(borders);
    return (
        <div className="grid">
            {cells.map((row, idx) => row.map((cell, jdx) =>
                <Cell {...cell} coords={{ row: idx, col: jdx }} borders={borders[idx][jdx]}></Cell>
            ))}
        </div>
    );
}

const sizeSelector = grid => grid.cells.length;
const regionsSelector = grid => grid.regions;

const reverseRegionsSelector = createSelector(
    sizeSelector, regionsSelector, (size, regions) => {
        let reverseRegions = [...Array(size)].map(e => Array(size));
        regions.forEach((region, idx) =>
            region.forEach(([row, col]) => reverseRegions[row][col] = idx)
        );
        return reverseRegions;
    }
)

const shouldHaveTopBorder = (row, col, reverseRegions) =>
    row === 0 && reverseRegions[row][col] !== reverseRegions[reverseRegions.length - 1][col];

const shouldHaveLeftBorder = (row, col, reverseRegions) =>
    col === 0 && reverseRegions[row][col] !== reverseRegions[row][reverseRegions[row].length - 1];

const shouldHaveBottomBorder = (row, col, reverseRegions) =>
    row < reverseRegions.length - 1 && reverseRegions[row][col] !== reverseRegions[row + 1][col];

const shouldHaveRightBorder = (row, col, reverseRegions) =>
    row < reverseRegions[row].length - 1 && reverseRegions[row][col] !== reverseRegions[row][col + 1];

const bordersFor = (row, col, reverseRegions) => {
    let borders = [
        shouldHaveTopBorder(row, col, reverseRegions) && 'u',
        shouldHaveLeftBorder(row, col, reverseRegions) && 'l',
        shouldHaveBottomBorder(row, col, reverseRegions) && 'r',
        shouldHaveBottomBorder(row, col, reverseRegions) && 'd',
    ];
    return borders.filter(b => b !== false);
}

export const bordersSelector = createSelector(
    sizeSelector, reverseRegionsSelector, (size, reverseRegions) =>
        [...Array(size).keys()].map(row =>
            [...Array(size).keys()].map(col =>
                bordersFor(row, col, reverseRegions)
        )
    )
)