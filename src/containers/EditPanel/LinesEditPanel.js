import { connect } from 'react-redux';

import { selectLine, removeLine, addLine, setLineThickness, setLineColor, removeLineWayPoint, addLineWayPoint, setLineWayPoint } from '../../actions/linesEditActions';

import LinesEditForm from '../../components/EditForm/LinesEditForm';

const mapStateToProps = state => ({
    lines: state.puzzle.lines,
    selectedLineIdx: state.interactions.lineIdx,
});

const mapDispatchToProps = {
    onLineSelected: selectLine,
    onLineRemoved: removeLine, 
    onLineAdded: addLine, 
    onThicknessChanged: setLineThickness, 
    onColorChanged: setLineColor, 
    onWayPointRemoved: removeLineWayPoint, 
    onWayPointAdded: addLineWayPoint, 
    onWayPointChanged: setLineWayPoint,
};

export default connect(mapStateToProps, mapDispatchToProps)(LinesEditForm);