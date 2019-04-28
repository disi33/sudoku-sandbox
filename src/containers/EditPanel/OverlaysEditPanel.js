import { connect } from 'react-redux';

import { removeOverlay, addOverlay, setOverlayCenter, setOverlayWidth, setOverlayHeight, setOverlayBorderColor, setOverlayBackgroundColor, setOverlayRounded, setOverlayFontSize, setOverlayText } from '../../actions/overlaysEditActions';

import OverlaysEditForm from '../../components/EditForm/OverlaysEditForm';

const mapStateToProps = state => ({
    overlays: state.puzzle.overlays,
});

const mapDispatchToProps = {
    onOverlayRemoved: removeOverlay, 
    onOverlayAdded: addOverlay, 
    onCenterChanged: setOverlayCenter, 
    onWidthChanged: setOverlayWidth, 
    onHeightChanged: setOverlayHeight, 
    onBorderColorChanged: setOverlayBorderColor, 
    onBackgroundColorChanged: setOverlayBackgroundColor, 
    onRoundedChanged: setOverlayRounded, 
    onTextChanged: setOverlayText, 
    onFontSizeChanged: setOverlayFontSize,
};

export default connect(mapStateToProps, mapDispatchToProps)(OverlaysEditForm);