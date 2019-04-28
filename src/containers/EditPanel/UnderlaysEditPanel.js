import { connect } from 'react-redux';

import { removeUnderlay, addUnderlay, setUnderlayOrigin, setUnderlayWidth, setUnderlayHeight, setUnderlayBorderColor, setUnderlayBackgroundColor, setUnderlayRounded } from '../../actions/underlaysEditActions';

import UnderlaysEditForm from '../../components/EditForm/UnderlaysEditForm';

const mapStateToProps = state => ({
    underlays: state.puzzle.underlays,
});

const mapDispatchToProps = {
    onUnderlayRemoved: removeUnderlay, 
    onUnderlayAdded: addUnderlay, 
    onOriginChanged: setUnderlayOrigin, 
    onWidthChanged: setUnderlayWidth, 
    onHeightChanged: setUnderlayHeight, 
    onBorderColorChanged: setUnderlayBorderColor, 
    onBackgroundColorChanged: setUnderlayBackgroundColor, 
    onRoundedChanged: setUnderlayRounded,
};

export default connect(mapStateToProps, mapDispatchToProps)(UnderlaysEditForm);