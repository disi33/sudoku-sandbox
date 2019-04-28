import { connect } from 'react-redux';

import { removeCage, addCage, setCageValue, setCageCell, removeCageCell, addCageCell } from '../../actions/cagesEditActions';

import CagesEditForm from '../../components/EditForm/CagesEditForm';

const mapStateToProps = state => ({
    cages: state.puzzle.cages,
});

const mapDispatchToProps = {
    onCageRemoved: removeCage, 
    onCageAdded: addCage, 
    onValueChanged: setCageValue, 
    onCellChanged: setCageCell, 
    onCellRemoved: removeCageCell,
    onCellAdded: addCageCell,
};

export default connect(mapStateToProps, mapDispatchToProps)(CagesEditForm);