import { connect } from 'react-redux';

import { setCellSize, setGridSize } from '../../actions/generalEditActions';

import GeneralEditForm from '../../components/EditForm/GeneralEditForm';

const mapStateToProps = state => ({
    cellSize: state.puzzle.cellSize,
    gridSize: [state.puzzle.cells[0].length, state.puzzle.cells.length],
});

const mapDispatchToProps = {
    onCellSizeChanged: setCellSize,
    onGridSizeChanged: setGridSize,
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralEditForm);
