import { connect } from 'react-redux';

import { selectCage, removeCage, addCage, setCageValue, setCageCell, removeCageCell, addCageCell } from '../../actions/cagesEditActions';

import CagesEditForm from '../../components/EditForm/CagesEditForm';

const mapStateToProps = state => ({
    cages: state.puzzle.cages,
    selectedCageIdx: state.interactions.cageIdx,
});

const mapDispatchToProps = {
    onCageSelected: selectCage,
    onCageRemoved: removeCage, 
    onCageAdded: addCage, 
    onValueChanged: setCageValue, 
    onCellChanged: setCageCell, 
    onCellRemoved: removeCageCell,
    onCellAdded: addCageCell,
};

export default connect(mapStateToProps, mapDispatchToProps)(CagesEditForm);