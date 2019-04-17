import React from 'react';
import { createSelector } from 'reselect';

import Cell from '../Cell/Cell';
import Line from '../Line/Line';
import Arrow from '../Arrow/Arrow';
import Shade from '../Shade/Shade';

import './Grid.css';

export default function Grid({ grid: { cells, decorations }, cellSize, grid }) {
    const borders = bordersSelector(grid);
    return (
        <div className="grid" style={{margin: cellSize * 1.5}}>
            {cells.map((row, idx) => 
                <div class="grid__row">
                    {row.map((cell, jdx) =>
                        <Cell {...cell} size={cellSize} borders={borders[idx][jdx]}></Cell>
                    )}
                </div>
            )}
            {decorations.map(decoration =>
                renderDecoration(cellSize)(decoration)
            )}
        </div>
    );
}

const renderDecoration = cellSize => decoration => {
    switch (decoration.type) {
        case 'LINE': return <Line {...decoration} cellSize={cellSize}></Line>
        case 'ARROW': return <Arrow {...decoration} cellSize={cellSize}></Arrow>
        case 'SHADE': return <Shade {...decoration} cellSize={cellSize}></Shade>
    }
};

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
);

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
};

export const bordersSelector = createSelector(
    sizeSelector, reverseRegionsSelector, (size, reverseRegions) =>
        [...Array(size).keys()].map(row =>
            [...Array(size).keys()].map(col =>
                bordersFor(row, col, reverseRegions)
        )
    )
)