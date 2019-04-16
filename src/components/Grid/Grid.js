import React from 'react';
import { createSelector } from 'reselect';

import Cell from '../Cell/Cell';

import './Grid.css';

export default function Grid({ grid: { cells, regions, decorations }, grid }) {
    const borders = bordersSelector(grid);
    console.log(borders);
    return (
        <div className="grid">
            {cells.map((row, idx) => 
                <div class="grid__row">
                    {row.map((cell, jdx) =>
                        <Cell {...cell} coords={{ row: idx, col: jdx }} borders={borders[idx][jdx]}></Cell>
                    )}
                </div>
            )}
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
        console.log(reverseRegions);
        return reverseRegions;
    }
)

const topBorder = (row, col, reverseRegions) =>
    row === 0 ? reverseRegions[row][col] !== reverseRegions[reverseRegions.length - 1][col] ? 'U' : 'u' : '';

const leftBorder = (row, col, reverseRegions) =>
    col === 0 ? reverseRegions[row][col] !== reverseRegions[row][reverseRegions[row].length - 1] ? 'L' : 'l' : '';

const bottomBorder = (row, col, reverseRegions) =>
    reverseRegions[row][col] !== reverseRegions[(row + 1) % reverseRegions.length][col] ? 'D' : 'd';

const rightBorder = (row, col, reverseRegions) =>
    reverseRegions[row][col] !== reverseRegions[row][(col + 1) % reverseRegions[row].length] ? 'R' : 'r';

const bordersFor = (row, col, reverseRegions) => {
    const borders = [
        topBorder(row, col, reverseRegions),
        leftBorder(row, col, reverseRegions),
        bottomBorder(row, col, reverseRegions),
        rightBorder(row, col, reverseRegions),
    ];
    return borders.filter(b => b !== '');
}

export const bordersSelector = createSelector(
    sizeSelector, reverseRegionsSelector, (size, reverseRegions) =>
        [...Array(size).keys()].map(row =>
            [...Array(size).keys()].map(col =>
                bordersFor(row, col, reverseRegions)
        )
    )
)