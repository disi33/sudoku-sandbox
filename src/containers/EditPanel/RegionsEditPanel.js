import { connect } from 'react-redux';

import { removeRegion, addRegion, setRegionCell, removeRegionCell, addRegionCell } from '../../actions/regionsEditActions';

import RegionsEditForm from '../../components/EditForm/RegionsEditForm';

const mapStateToProps = state => ({
    regions: state.puzzle.regions
});

const mapDispatchToProps = {
    onRegionRemoved: removeRegion,
    onRegionAdded: addRegion,
    onCellChanged: setRegionCell,
    onCellRemoved: removeRegionCell,
    onCellAdded: addRegionCell,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegionsEditForm);