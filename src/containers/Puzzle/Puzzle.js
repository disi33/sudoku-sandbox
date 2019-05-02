import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { addLineWayPoint } from '../../actions/linesEditActions';
import { addArrowWayPoint } from '../../actions/arrowsEditActions';
import { setUnderlayOrigin, addAndSelectUnderlay } from '../../actions/underlaysEditActions';
import { setOverlayCenter, addAndSelectOverlay } from '../../actions/overlaysEditActions';
import { toggleCellInRegion, toggleCellInCage, selectCell, deleteGivenMarks, toggleGivenPencilMark, setGivenValue } from '../../actions/puzzleActions';
import { deleteUserMarks, toggleUserCandidate, toggleUserPencilMark, setUserValue, undoPlay, redoPlay } from '../../actions/playActions';

import Grid from '../../components/Grid/Grid';

import './Puzzle.css';

const Puzzle = props => {

    const gridRef = useRef(null);

    return (
        <div className="puzzle" onClick={props.onAreaClicked(props.interactionsConfig, gridRef, props.cellSize)}>
            <Grid {...props} forwardedRef={gridRef}></Grid>
        </div>
    );
};

// Cell highlighting selectors

const selectedRegionExists = state => state.interactions.regionIdx !== undefined && state.interactions.regionIdx >= 0 && state.interactions.regionIdx < state.puzzle.regions.length;
const selectedCageExists = state => state.interactions.cageIdx !== undefined && state.interactions.cageIdx >= 0 && state.interactions.cageIdx < state.puzzle.cages.length;
const playCellsExist = state => state.play !== undefined && state.play.cells !== undefined;

const interactionsModeSelector = state => state.interactions.mode;
const selectedRegionSelector = state => selectedRegionExists(state) ? state.puzzle.regions[state.interactions.regionIdx] : [];
const selectedCageSelector = state => selectedCageExists(state) ? state.puzzle.cages[state.interactions.cageIdx].cells : [];
const playCellsSelector = state => playCellsExist(state) ? state.play.cells : []; 
const gridSizeSelector = state => state.puzzle.cells.length;

const regionHighlightsSelector = createSelector(
    selectedRegionSelector, gridSizeSelector, (region, gridSize) => {
        let highlights = [...Array(gridSize)].map(_ => [...Array(gridSize)].map(_ => undefined));
        region.forEach(([row, col]) => highlights[row][col] = 'rgba(255, 215, 0, 0.5)');
        return highlights;
    }
);

const cageHighlightsSelector = createSelector(
    selectedCageSelector, gridSizeSelector, (cage, gridSize) => {
        let highlights = [...Array(gridSize)].map(_ => [...Array(gridSize)].map(_ => undefined));
        cage.forEach(([row, col]) => highlights[row][col] = 'rgba(255, 215, 0, 0.5)');
        return highlights;
    }
);

const playHighlightsSelector = createSelector(
    playCellsSelector, playCells => playCells.map(row => row.map(cell => cell.highlight))
);

const highlightsSelector = createSelector(
    interactionsModeSelector, regionHighlightsSelector, cageHighlightsSelector, playHighlightsSelector, gridSizeSelector, (mode, regionHighlights, cageHighlights, playHighlights, gridSize) => {
        if (mode === 'REGIONS') return regionHighlights;
        else if (mode === 'CAGES') return cageHighlights;
        else if (mode === 'PLAY') return playHighlights;
        else return [...Array(gridSize)].map(_ => [...Array(gridSize)].map(_ => undefined));
    }
);

// React-redux connectors

const mapStateToProps = state => ({
    cellSize: state.puzzle.cellSize,
    grid: {
        cells: state.puzzle.cells,
        regions: state.puzzle.regions,
        cages: state.puzzle.cages,
        highlights: highlightsSelector(state),
        decorations: [
            ...state.puzzle.lines.map(line => ({...line, type: 'LINE'})),
            ...state.puzzle.arrows.map(arrow => ({...arrow, type: 'ARROW'})),
            ...state.puzzle.underlays.map(underlay => ({...underlay, type: 'UNDERLAY'})),
            ...state.puzzle.overlays.map(overlay => ({...overlay, type: 'OVERLAY'})),
        ]
    },
    interactionsConfig: state.interactions,
    user: state.play && state.play.cells,
});

const mapDispatchToProps = dispatch => ({

    onAreaClicked: (interactionsConfig, gridRef, cellSize) => e => {
        const gridBoundingRect = gridRef.current.getBoundingClientRect();
        const [gridX, gridY] = [gridBoundingRect.left, gridBoundingRect.top];
        const [col, row] = [(e.clientX - gridX) / cellSize, (e.clientY - gridY) / cellSize].map(snappedOffset);
        
        if (interactionsConfig.mode === 'LINES' && interactionsConfig.lineIdx !== undefined) {
            dispatch(addLineWayPoint(interactionsConfig.lineIdx, [row, col]));
        }

        if (interactionsConfig.mode === 'ARROWS' && interactionsConfig.arrowIdx !== undefined) {
            dispatch(addArrowWayPoint(interactionsConfig.arrowIdx, [row, col]));
        }

        if (interactionsConfig.mode === 'UNDERLAYS') {
            if (e.shiftKey) dispatch(addAndSelectUnderlay([row, col]));
            else if (interactionsConfig.underlayIdx !== undefined) dispatch(setUnderlayOrigin(interactionsConfig.underlayIdx, [row, col]));
        }

        if (interactionsConfig.mode === 'OVERLAYS') {
            if (e.shiftKey) dispatch(addAndSelectOverlay([row, col]));
            else if (interactionsConfig.overlayIdx !== undefined) dispatch(setOverlayCenter(interactionsConfig.overlayIdx, [row, col]));
        }
    },

    onCellClicked: (row, col, interactionsConfig) => {
        if (interactionsConfig.mode === 'REGIONS' && interactionsConfig.regionIdx !== undefined && row !== undefined && col !== undefined) dispatch(toggleCellInRegion(row, col, interactionsConfig.regionIdx));
        else if (interactionsConfig.mode === 'CAGES' && interactionsConfig.cageIdx !== undefined && row !== undefined && col !== undefined) dispatch(toggleCellInCage(row, col, interactionsConfig.cageIdx));
        else if (interactionsConfig.mode === 'GIVENS' || interactionsConfig.mode === 'PLAY') dispatch(selectCell(row, col));
    },

    onKeyDown: ({mode, cellRow, cellCol}, gridSize) => e => {
        if (cellRow === undefined || cellCol === undefined) return;

        e.preventDefault();
        
        if (mode === 'GIVENS' || mode === 'PLAY') {
            if (e.key === 'ArrowUp') dispatch(selectCell(cellRow === 0 ? gridSize - 1 : cellRow - 1, cellCol));
            else if (e.key === 'ArrowDown') dispatch(selectCell((cellRow + 1) % gridSize, cellCol));
            else if (e.key === 'ArrowLeft') dispatch(selectCell(cellRow, cellCol === 0 ? gridSize - 1 : cellCol - 1));
            else if (e.key === 'ArrowRight') dispatch(selectCell(cellRow, (cellCol + 1) % gridSize));
            else if (e.key === 'Escape') dispatch(selectCell(undefined, undefined));
        }

        if (mode === 'GIVENS') {
            if (e.key === 'Backspace' || e.key === 'Delete') dispatch(deleteGivenMarks(cellRow, cellCol));
            else if (e.shiftKey && isAcceptableCellInput(e)) dispatch(toggleGivenPencilMark(cellRow, cellCol, getCellInput(e)));
            else if (isAcceptableCellInput(e)) dispatch(setGivenValue(cellRow, cellCol, getCellInput(e)));
        }

        if (mode === 'PLAY') {
            if (e.key === 'Backspace' || e.key === 'Delete') dispatch(deleteUserMarks(cellRow, cellCol));
            else if ((e.ctrlKey || e.metaKey) && e.key.toUpperCase() === 'Z') dispatch(undoPlay());
            else if ((e.ctrlKey || e.metaKey) && e.key.toUpperCase() === 'Y') dispatch(redoPlay());
            else if ((e.ctrlKey || e.metaKey) && isAcceptableCellInput(e)) dispatch(toggleUserCandidate(cellRow, cellCol, getCellInput(e)));
            else if (e.shiftKey && isAcceptableCellInput(e)) dispatch(toggleUserPencilMark(cellRow, cellCol, getCellInput(e)));
            else if (isAcceptableCellInput(e)) dispatch(setUserValue(cellRow, cellCol, getCellInput(e)));
        }
    }
});

// Helper functions

const snappedOffset = offset => {
    const fractional = offset - Math.floor(offset);
    if (fractional <= 0.15) {
        return Math.floor(offset);
    } else if (fractional >= 0.85) {
        return Math.ceil(offset);
    } else {
        return Math.floor(offset) + 0.5;
    }
}

const isAcceptableCellInput = e => e.key.match(/^[^\W_]$/) !== null || (e.nativeEvent.code && e.nativeEvent.code.match(/^Digit[0-9]$/) !== null);

const getCellInput = e => {
    const singleCharMatch = e.key.match(/^[^\W_]$/);
    const digitCodeMatch = e.nativeEvent.code && e.nativeEvent.code.match(/^Digit([0-9])$/);

    if (!!singleCharMatch) {
        return e.key.toUpperCase();
    } else if (!!digitCodeMatch) {
        return digitCodeMatch[1];
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Puzzle);