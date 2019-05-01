import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { toggleCellInRegion, toggleCellInCage, selectCell, deleteGivenMarks, toggleGivenPencilMark, setGivenValue } from '../../actions/puzzleActions';
import { deleteUserMarks, toggleUserCandidate, toggleUserPencilMark, setUserValue } from '../../actions/playActions';

import Grid from '../../components/Grid/Grid';

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
    onCellClicked: (row, col, interactionsConfig) => {
        if (interactionsConfig.mode === 'REGIONS' && interactionsConfig.regionIdx !== undefined && row !== undefined && col !== undefined) dispatch(toggleCellInRegion(row, col, interactionsConfig.regionIdx));
        else if (interactionsConfig.mode === 'CAGES' && interactionsConfig.cageIdx !== undefined && row !== undefined && col !== undefined) dispatch(toggleCellInCage(row, col, interactionsConfig.cageIdx));
        else if (interactionsConfig.mode === 'GIVENS' || interactionsConfig.mode === 'PLAY') dispatch(selectCell(row, col));
    },
    onKeyDown: ({mode, cellRow, cellCol}, gridSize) => e => {
        if (cellRow === undefined || cellCol === undefined) return;

        if (mode === 'GIVENS' || mode === 'PLAY') {
            e.preventDefault();
            if (e.key === 'ArrowUp') dispatch(selectCell(cellRow === 0 ? gridSize - 1 : cellRow - 1, cellCol));
            else if (e.key === 'ArrowDown') dispatch(selectCell((cellRow + 1) % gridSize, cellCol));
            else if (e.key === 'ArrowLeft') dispatch(selectCell(cellRow, cellCol === 0 ? gridSize - 1 : cellCol - 1));
            else if (e.key === 'ArrowRight') dispatch(selectCell(cellRow, (cellCol + 1) % gridSize));
            else if (e.key === 'Escape') dispatch(selectCell(undefined, undefined));
        }

        if (mode === 'GIVENS') {
            if (e.key === 'Backspace' || e.key === 'Delete') dispatch(deleteGivenMarks(cellRow, cellCol));
            else if (e.altKey && isAcceptableCellInput(e.key)) dispatch(toggleGivenPencilMark(cellRow, cellCol, e.key));
            else if (isAcceptableCellInput(e.key)) dispatch(setGivenValue(cellRow, cellCol, e.key));
        }

        if (mode === 'PLAY') {
            if (e.key === 'Backspace' || e.key === 'Delete') dispatch(deleteUserMarks(cellRow, cellCol));
            else if (e.ctrlKey && isAcceptableCellInput(e.key)) dispatch(toggleUserCandidate(cellRow, cellCol, e.key));
            else if (e.altKey && isAcceptableCellInput(e.key)) dispatch(toggleUserPencilMark(cellRow, cellCol, e.key));
            else if (isAcceptableCellInput(e.key)) dispatch(setUserValue(cellRow, cellCol, e.key));
        }
    }
});

const isAcceptableCellInput = key => key.match(/^[^\W_]$/g) !== null;

export default connect(mapStateToProps, mapDispatchToProps)(Grid);