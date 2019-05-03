import { connect } from 'react-redux';

import { convertOriginToCenter } from '../../compatibility/underlay';
import { selectUnderlay, removeUnderlay, addUnderlay, setUnderlayCenter, setUnderlayWidth, setUnderlayHeight, setUnderlayBorderColor, setUnderlayBackgroundColor, setUnderlayRounded } from '../../actions/underlaysEditActions';

import UnderlaysEditForm from '../../components/EditForm/UnderlaysEditForm';

const mapStateToProps = state => ({
    underlays: state.puzzle.underlays.map(convertOriginToCenter),
    selectedUnderlayIdx: state.interactions.underlayIdx,
});

const mapDispatchToProps = {
    onUnderlaySelected: selectUnderlay,
    onUnderlayRemoved: removeUnderlay, 
    onUnderlayAdded: addUnderlay, 
    onCenterChanged: setUnderlayCenter, 
    onWidthChanged: setUnderlayWidth, 
    onHeightChanged: setUnderlayHeight, 
    onBorderColorChanged: setUnderlayBorderColor, 
    onBackgroundColorChanged: setUnderlayBackgroundColor, 
    onRoundedChanged: setUnderlayRounded,
};

export default connect(mapStateToProps, mapDispatchToProps)(UnderlaysEditForm);