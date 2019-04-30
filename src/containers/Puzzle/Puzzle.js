import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { toggleCellInRegion, toggleCellInCage, selectCell, deleteGivenMarks, toggleGivenCandidate, toggleGivenPencilMark, setGivenValue } from '../../actions/puzzleActions';

import Grid from '../../components/Grid/Grid';

const selectedRegionExists = state => state.clicks.regionIdx !== undefined && state.clicks.regionIdx >= 0 && state.clicks.regionIdx < state.puzzle.regions.length;
const selectedCageExists = state => state.clicks.cageIdx !== undefined && state.clicks.cageIdx >= 0 && state.clicks.cageIdx < state.puzzle.cages.length;

const clicksModeSelector = state => state.clicks.mode;
const selectedRegionSelector = state => selectedRegionExists(state) ? state.puzzle.regions[state.clicks.regionIdx] : [];
const selectedCageSelector = state => selectedCageExists(state) ? state.puzzle.cages[state.clicks.cageIdx].cells : [];
const gridSizeSelector = state => state.puzzle.cells.length;

const regionHighlightsSelector = createSelector(
    selectedRegionSelector, gridSizeSelector, (region, gridSize) => {
        let highlights = [...Array(gridSize)].map(_ => [...Array(gridSize)].map(_ => undefined));
        region.forEach(([row, col]) => highlights[row][col] = '#CCFF00');
        return highlights;
    }
);

const cageHighlightsSelector = createSelector(
    selectedCageSelector, gridSizeSelector, (cage, gridSize) => {
        let highlights = [...Array(gridSize)].map(_ => [...Array(gridSize)].map(_ => undefined));
        cage.forEach(([row, col]) => highlights[row][col] = '#CCFF00');
        return highlights;
    }
);

const highlightsSelector = createSelector(
    clicksModeSelector, regionHighlightsSelector, cageHighlightsSelector, gridSizeSelector, (mode, regionHighlights, cageHighlights, gridSize) => {
        if (mode === 'REGIONS') return regionHighlights;
        else if (mode === 'CAGES') return cageHighlights;
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
    clickConfig: state.clicks,
});

const mapDispatchToProps = dispatch => ({
    onCellClicked: (row, col, clickConfig) => {
        if (clickConfig.mode === 'REGIONS' && clickConfig.regionIdx !== undefined) dispatch(toggleCellInRegion(row, col, clickConfig.regionIdx));
        else if (clickConfig.mode === 'CAGES' && clickConfig.cageIdx !== undefined) dispatch(toggleCellInCage(row, col, clickConfig.cageIdx));
        else if (clickConfig.mode === 'GIVENS') dispatch(selectCell(row, col));
    },
    onKeyDown: ({mode, cellRow, cellCol}, gridSize) => e => {
        if (mode !== 'GIVENS' || cellRow === undefined || cellCol === undefined) return;

        e.preventDefault();

        if (e.key === 'ArrowUp') dispatch(selectCell(cellRow === 0 ? gridSize - 1 : cellRow - 1, cellCol));
        else if (e.key === 'ArrowDown') dispatch(selectCell((cellRow + 1) % gridSize, cellCol));
        else if (e.key === 'ArrowLeft') dispatch(selectCell(cellRow, cellCol === 0 ? gridSize - 1 : cellCol - 1));
        else if (e.key === 'ArrowRight') dispatch(selectCell(cellRow, (cellCol + 1) % gridSize));
        else if (e.key === 'Backspace' || e.key === 'Delete') dispatch(deleteGivenMarks(cellRow, cellCol));
        else if (e.key === 'Escape') dispatch(selectCell(undefined, undefined));
        else if (e.ctrlKey && isAcceptableCellInput(e.key)) dispatch(toggleGivenCandidate(cellRow, cellCol, e.key));
        else if (e.altKey && isAcceptableCellInput(e.key)) dispatch(toggleGivenPencilMark(cellRow, cellCol, e.key));
        else if (isAcceptableCellInput(e.key)) dispatch(setGivenValue(cellRow, cellCol, e.key));
    }
});

const isAcceptableCellInput = key => key.match(/^[^\W_]$/g) !== null;

export default connect(mapStateToProps, mapDispatchToProps)(Grid);