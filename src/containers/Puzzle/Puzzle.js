import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { addLineWayPoint, moveLineWayPoint } from '../../actions/linesEditActions';
import { addArrowWayPoint, moveArrowWayPoint } from '../../actions/arrowsEditActions';
import { setUnderlayCenter, addAndSelectUnderlay } from '../../actions/underlaysEditActions';
import { setOverlayCenter, addAndSelectOverlay } from '../../actions/overlaysEditActions';
import { toggleCellInRegion, toggleCellInCage, selectCell, deleteGivenMarks, toggleGivenPencilMark, setGivenValue } from '../../actions/puzzleActions';
import { deleteUserMarks, toggleUserCandidate, toggleUserPencilMark, setUserValue, undoPlay, redoPlay } from '../../actions/playActions';

import Grid from '../../components/Grid/Grid';

import './Puzzle.css';

const Puzzle = props => {

    const [snappedCoords, setSnappedCoords] = useState(undefined);
    const gridRef = useRef(null);

    return (
        <div className="puzzle" tabIndex="-1" onMouseMove={handleMouseMove(props.interactionsConfig, gridRef, props.cellSize)(snappedCoords, setSnappedCoords)} onMouseLeave={() => setSnappedCoords(undefined)} onClick={props.onAreaClicked(props.interactionsConfig, gridRef, props.cellSize)}>
            <div className="puzzle__grid-area">
                {snappedCoords && <div className="puzzle__indicator" style={indicatorPosition(props.cellSize, snappedCoords)}></div>}
                <Grid {...props} forwardedRef={gridRef}></Grid>
            </div>
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
const gridSizeSelector = state => [state.puzzle.cells[0].length, state.puzzle.cells.length];

const regionHighlightsSelector = createSelector(
    selectedRegionSelector, gridSizeSelector, (region, [width, height]) => {
        let highlights = [...Array(height)].map(_ => [...Array(width)].map(_ => undefined));
        region.forEach(([row, col]) => highlights[row][col] = 'rgba(255, 215, 0, 0.5)');
        return highlights;
    }
);

const cageHighlightsSelector = createSelector(
    selectedCageSelector, gridSizeSelector, (cage, [width, height]) => {
        let highlights = [...Array(height)].map(_ => [...Array(width)].map(_ => undefined));
        cage.forEach(([row, col]) => highlights[row][col] = 'rgba(255, 215, 0, 0.5)');
        return highlights;
    }
);

const playHighlightsSelector = createSelector(
    playCellsSelector, playCells => playCells.map(row => row.map(cell => 
        cell.repeated ? '#B33A3A' : cell.highlight
    ))
);

const highlightsSelector = createSelector(
    interactionsModeSelector, regionHighlightsSelector, cageHighlightsSelector, playHighlightsSelector, gridSizeSelector, (mode, regionHighlights, cageHighlights, playHighlights, [width, height]) => {
        if (mode === 'REGIONS') return regionHighlights;
        else if (mode === 'CAGES') return cageHighlights;
        else if (mode === 'PLAY') return playHighlights;
        else return [...Array(height)].map(_ => [...Array(width)].map(_ => undefined));
    }
);

// Mouse move behaviour

const handleMouseMove = (interactionsConfig, gridRef, cellSize) => (snappedCoords, setSnappedCoords) => e => {

    const {mode} = interactionsConfig;

    if ((mode === 'LINES' && interactionsConfig.lineIdx !== undefined) || (mode === 'ARROWS' && interactionsConfig.arrowIdx !== undefined) || mode === 'UNDERLAYS' || mode === 'OVERLAYS') {
        const gridBoundingRect = gridRef.current.getBoundingClientRect();
        const [gridX, gridY] = [gridBoundingRect.left, gridBoundingRect.top];
        const [col, row] = [(e.clientX - gridX) / cellSize, (e.clientY - gridY) / cellSize].map(snappedOffset);

        if (snappedCoords === undefined || snappedCoords[0] !== row || snappedCoords[1] !== col) {
            setSnappedCoords([row, col]);
        }
    }
};

const indicatorPosition = (cellSize, [row, col]) => ({
    width: 12,
    height: 12,
    top: row * cellSize - 6,
    left: col * cellSize - 6,
});

// React-redux connectors

const mapStateToProps = state => ({
    cellSize: state.puzzle.cellSize,
    grid: {
        cells: state.puzzle.cells,
        regions: state.puzzle.regions,
        cages: state.puzzle.cages,
        highlights: highlightsSelector(state),
        decorations: [
            ...state.puzzle.lines.map((line, idx) => ({...line, type: 'LINE', selected: state.interactions.mode === 'LINES' && state.interactions.lineIdx === idx})),
            ...state.puzzle.arrows.map((arrow, idx) => ({...arrow, type: 'ARROW', selected: state.interactions.mode === 'ARROWS' && state.interactions.arrowIdx === idx})),
            ...state.puzzle.underlays.map((underlay, idx) => ({...underlay, type: 'UNDERLAY', selected: state.interactions.mode === 'UNDERLAYS' && state.interactions.underlayIdx === idx})),
            ...state.puzzle.overlays.map((overlay, idx) => ({...overlay, type: 'OVERLAY', selected: state.interactions.mode === 'OVERLAYS' && state.interactions.overlayIdx === idx})),
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
            if (e.shiftKey && interactionsConfig.lineIdx !== undefined) dispatch(moveLineWayPoint(interactionsConfig.lineIdx, [row, col]));
            else dispatch(addLineWayPoint(interactionsConfig.lineIdx, [row, col]));
        }

        if (interactionsConfig.mode === 'ARROWS' && interactionsConfig.arrowIdx !== undefined) {
            if (e.shiftKey && interactionsConfig.arrowIdx !== undefined) dispatch(moveArrowWayPoint(interactionsConfig.arrowIdx, [row, col]));
            else dispatch(addArrowWayPoint(interactionsConfig.arrowIdx, [row, col]));
        }

        if (interactionsConfig.mode === 'UNDERLAYS') {
            if (e.shiftKey && interactionsConfig.underlayIdx !== undefined) dispatch(setUnderlayCenter(interactionsConfig.underlayIdx, [row, col]));
            else dispatch(addAndSelectUnderlay([row, col]));
        }

        if (interactionsConfig.mode === 'OVERLAYS') {
            if (e.shiftKey && interactionsConfig.overlayIdx !== undefined) dispatch(setOverlayCenter(interactionsConfig.overlayIdx, [row, col]));
            else dispatch(addAndSelectOverlay([row, col]));
        }
    },

    onCellClicked: (row, col, interactionsConfig) => {
        if (interactionsConfig.mode === 'REGIONS' && interactionsConfig.regionIdx !== undefined && row !== undefined && col !== undefined) dispatch(toggleCellInRegion(row, col, interactionsConfig.regionIdx));
        else if (interactionsConfig.mode === 'CAGES' && interactionsConfig.cageIdx !== undefined && row !== undefined && col !== undefined) dispatch(toggleCellInCage(row, col, interactionsConfig.cageIdx));
        else if (interactionsConfig.mode === 'GIVENS' || interactionsConfig.mode === 'PLAY') dispatch(selectCell(row, col));
    },

    onKeyDown: ({mode, cellRow, cellCol}, [width, height]) => e => {
        if (cellRow === undefined || cellCol === undefined) return;

        e.preventDefault();
        
        if (mode === 'GIVENS' || mode === 'PLAY') {
            if (e.key === 'ArrowUp') dispatch(selectCell(cellRow === 0 ? height - 1 : cellRow - 1, cellCol));
            else if (e.key === 'ArrowDown') dispatch(selectCell((cellRow + 1) % height, cellCol));
            else if (e.key === 'ArrowLeft') dispatch(selectCell(cellRow, cellCol === 0 ? width - 1 : cellCol - 1));
            else if (e.key === 'ArrowRight') dispatch(selectCell(cellRow, (cellCol + 1) % width));
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
    } else if (fractional <= 0.3) {
        return Math.floor(offset) + 0.2;
    } else if (fractional >= 0.85) {
        return Math.ceil(offset);
    } else if (fractional >= 0.7) {
        return Math.ceil(offset) - 0.2;
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