import { connect } from 'react-redux';

import { removeLine, addLine, setLineThickness, setLineColor, removeLineWayPoint, addLineWayPoint, setLineWayPoint } from '../../actions/linesEditActions';

import LinesEditForm from '../../components/EditForm/LinesEditForm';

const mapStateToProps = state => ({
    lines: state.puzzle.lines,
});

const mapDispatchToProps = {
    onLineRemoved: removeLine, 
    onLineAdded: addLine, 
    onThicknessChanged: setLineThickness, 
    onColorChanged: setLineColor, 
    onWayPointRemoved: removeLineWayPoint, 
    onWayPointAdded: addLineWayPoint, 
    onWayPointChanged: setLineWayPoint,
};

export default connect(mapStateToProps, mapDispatchToProps)(LinesEditForm);