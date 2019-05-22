import React from 'react';
import { connect } from 'react-redux';

import { startPlayOver, setUserHighlight, undoPlay, redoPlay, markRepeats, setEntryMode } from '../../actions/playActions';

import PlayForm from '../../components/PlayForm/PlayForm';

import '../EditPanel/EditPanel.css';

const PlayPanel = ({interactionsConfig, onSetEntryMode, onStartOver, onColorSelected, onMarkRepeats, canUndo, onUndo, canRedo, onRedo}) => {
    return (
        <div className="edit-panel">
            <div className="edit-panel__title">Play Puzzle</div>
            <PlayForm entryMode={interactionsConfig.entry} onSetEntryMode={onSetEntryMode} onStartOver={onStartOver} onColorSelected={onColorSelected(interactionsConfig)} onMarkRepeats={onMarkRepeats} canUndo={canUndo} canRedo={canRedo} onUndo={onUndo} onRedo={onRedo}></PlayForm>
        </div>
    );
};

const isGrey = hex => hex.slice(1, 3) === hex.slice(3, 5) && hex.slice(3, 5) === hex.slice(5, 7);

const hexToRgba = (hex, alpha) => `rgba(${parseInt(hex.slice(1, 3), 16)}, ${parseInt(hex.slice(3, 5), 16)}, ${parseInt(hex.slice(5, 7), 16)}, ${alpha})`;

const mapStateToProps = state => ({
    interactionsConfig: state.interactions,
    canUndo: state.play.history.activeItem > 0,
    canRedo: state.play.history.activeItem < state.play.history.items.length - 1,
});

const mapDispatchToProps = dispatch => ({
    onStartOver: () => dispatch(startPlayOver()),
    onSetEntryMode: mode => dispatch(setEntryMode(mode)),
    onColorSelected: ({cellRow, cellCol}) => color => {
        if (cellRow !== undefined && cellCol !== undefined) {
            const trueColor = !!color ? isGrey(color) ? color : hexToRgba(color, 0.5) : color;
            dispatch(setUserHighlight(cellRow, cellCol, trueColor))
        }
    },
    onMarkRepeats: () => dispatch(markRepeats()),
    onUndo: () => dispatch(undoPlay()),
    onRedo: () => dispatch(redoPlay()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayPanel);
