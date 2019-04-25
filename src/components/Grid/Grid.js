import React from 'react';
import { createSelector } from 'reselect';

import Cell from '../Cell/Cell';
import Line from '../Line/Line';
import Arrow from '../Arrow/Arrow';
import ShapeText from '../ShapeText/ShapeText';

import './Grid.css';
import './zIndex.css';

export default function Grid({ grid: { cells, decorations }, cellSize, grid }) {
    const borders = bordersSelector(grid);
    const cageBorders = cageBordersSelector(grid);
    const cageValues = cageValuesSelector(grid);
    return (
        <div className="grid" style={{margin: cellSize * 1.5}}>
            {cells.map((row, idx) => 
                <div key={idx} className="grid__row">
                    {row.map((cell, jdx) =>
                        <Cell key={jdx} {...cell} size={cellSize} borders={borders[idx][jdx]} cageBorders={cageBorders[idx][jdx]} cageValue={cageValues[idx][jdx]}></Cell>
                    )}
                </div>
            )}
            {decorations.map((decoration, idx) =>
                renderDecoration(cellSize)(decoration, idx)
            )}
        </div>
    );
}

const renderDecoration = cellSize => (decoration, key) => {
    switch (decoration.type) {
        case 'LINE': return <Line key={key} {...decoration} cellSize={cellSize}></Line>;
        case 'ARROW': return <Arrow key={key} {...decoration} cellSize={cellSize}></Arrow>;
        case 'SHAPETEXT': return <ShapeText key={key} {...decoration} cellSize={cellSize}></ShapeText>;
    }
};

const sizeSelector = grid => grid.cells.length;
const regionsSelector = grid => grid.regions;
const cagesSelector = grid => grid.cages;

// Region border selectors

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

const bordersSelector = createSelector(
    sizeSelector, reverseRegionsSelector, (size, reverseRegions) =>
        [...Array(size).keys()].map(row =>
            [...Array(size).keys()].map(col =>
                bordersFor(row, col, reverseRegions)
        )
    )
);

// Cage border selectors

const cageRegionsSelector = createSelector(
    cagesSelector, cages => cages.map(c => c.cells)
);

const topLeftCell = cage => 
    cage.cells.reduce((acc, val) => acc[0] < val[0] ? acc : acc[1] < val[1] ? acc : val, cage.cells[0]);

const cageValuesSelector = createSelector(
    sizeSelector, cagesSelector, (size, cages) => {
        let cageValues = [...Array(size)].map(e => Array(size));
        cages.forEach(cage => {
            const [min_x, min_y] = topLeftCell(cage);
            cageValues[min_x][min_y] = cage.value;
        });
        return cageValues;
    }
);

const reverseCagesSelector = createSelector(
    sizeSelector, cageRegionsSelector, (size, cages) => {
        let reverseCages = [...Array(size)].map(e => Array(size));
        cages.forEach((cage, idx) =>
            cage.forEach(([row, col]) => reverseCages[row][col] = idx)
        );
        return reverseCages;
    }
);

const topCageBorder = (row, col, reverseCages) =>
    row === 0 || reverseCages[row][col] !== reverseCages[row - 1][col] ? 'U' : '';

const leftCageBorder = (row, col, reverseCages) =>
    col === 0 || reverseCages[row][col] !== reverseCages[row][col - 1] ? 'L' : '';

const bottomCageBorder = (row, col, reverseCages) =>
    row === reverseCages.length - 1 || reverseCages[row][col] !== reverseCages[row + 1][col] ? 'D' : '';

const rightCageBorder = (row, col, reverseCages) =>
    col === reverseCages[row].length - 1 || reverseCages[row][col] !== reverseCages[row][col + 1] ? 'R' : '';

const cageBordersFor = (row, col, reverseCages) => {
    const cageBorders = reverseCages[row][col] === undefined ? [] : [
        topCageBorder(row, col, reverseCages),
        leftCageBorder(row, col, reverseCages),
        bottomCageBorder(row, col, reverseCages),
        rightCageBorder(row, col, reverseCages),
    ];
    return cageBorders.filter(b => b !== '');
};

const cageBordersSelector = createSelector(
    sizeSelector, reverseCagesSelector, (size, reverseCages) =>
        [...Array(size).keys()].map(row =>
            [...Array(size).keys()].map(col =>
                cageBordersFor(row, col, reverseCages)
        )
    )
);