import { connect } from 'react-redux';

import Grid from '../../components/Grid/Grid';

const mapStateToProps = state => ({
    cellSize: state.puzzle.cellSize,
    grid: {
        cells: state.puzzle.cells,
        regions: state.puzzle.regions,
        cages: state.puzzle.cages,
        decorations: [
            ...state.puzzle.lines.map(line => ({...line, type: 'LINE'})),
            ...state.puzzle.arrows.map(arrow => ({...arrow, type: 'ARROW'})),
            ...state.puzzle.underlays.map(underlay => ({...underlay, type: 'UNDERLAY'})),
            ...state.puzzle.overlays.map(overlay => ({...overlay, type: 'OVERLAY'})),
        ]
    },
});

export default connect(mapStateToProps)(Grid);