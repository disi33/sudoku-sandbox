import { connect } from 'react-redux';

import { selectArrow, removeArrow, addArrow, setArrowThickness, setArrowColor, setArrowHeadLength, removeArrowWayPoint, addArrowWayPoint, setArrowWayPoint } from '../../actions/arrowsEditActions';

import ArrowsEditForm from '../../components/EditForm/ArrowsEditForm';

const mapStateToProps = state => ({
    arrows: state.puzzle.arrows,
    selectedArrowIdx: state.interactions.arrowIdx,
});

const mapDispatchToProps = {
    onArrowSelected: selectArrow,
    onArrowRemoved: removeArrow, 
    onArrowAdded: addArrow, 
    onThicknessChanged: setArrowThickness, 
    onColorChanged: setArrowColor,
    onHeadLengthChanged: setArrowHeadLength,
    onWayPointRemoved: removeArrowWayPoint, 
    onWayPointAdded: addArrowWayPoint, 
    onWayPointChanged: setArrowWayPoint,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArrowsEditForm);