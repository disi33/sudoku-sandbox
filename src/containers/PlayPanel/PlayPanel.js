import React from 'react';
import { connect } from 'react-redux';

import { startPlayOver, setUserHighlight, undoPlay, redoPlay } from '../../actions/playActions';

import PlayForm from '../../components/PlayForm/PlayForm';

import '../EditPanel/EditPanel.css';

const PlayPanel = ({interactionsConfig, onStartOver, onColorSelected, canUndo, onUndo, canRedo, onRedo}) => {
    return (
        <div className="edit-panel">
            <div className="edit-panel__title">Play Puzzle</div>
            <PlayForm onStartOver={onStartOver} onColorSelected={onColorSelected(interactionsConfig)} canUndo={canUndo} canRedo={canRedo} onUndo={onUndo} onRedo={onRedo}></PlayForm>
        </div>
    );
};

const mapStateToProps = state => ({
    interactionsConfig: state.interactions,
    canUndo: state.play.history.activeItem > 0,
    canRedo: state.play.history.activeItem < state.play.history.items.length - 1,
});

const mapDispatchToProps = dispatch => ({
    onStartOver: () => dispatch(startPlayOver()),
    onColorSelected: ({cellRow, cellCol}) => color => {
        if (cellRow !== undefined && cellCol !== undefined) {
            dispatch(setUserHighlight(cellRow, cellCol, color))
        }
    },
    onUndo: () => dispatch(undoPlay()),
    onRedo: () => dispatch(redoPlay()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayPanel);
