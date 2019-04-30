import React from 'react';
import { connect } from 'react-redux';

import { startPlayOver, setUserHighlight } from '../../actions/playActions';

import PlayForm from '../../components/PlayForm/PlayForm';

import '../EditPanel/EditPanel.css';

const PlayPanel = ({interactionsConfig, onStartOver, onColorSelected}) => {
    return (
        <div className="edit-panel">
            <div className="edit-panel__title">Play Puzzle</div>
            <PlayForm onStartOver={onStartOver} onColorSelected={onColorSelected(interactionsConfig)}></PlayForm>
        </div>
    );
}

const mapStateToProps = state => ({
    interactionsConfig: state.interactions,
});

const mapDispatchToProps = dispatch => ({
    onStartOver: () => dispatch(startPlayOver()),
    onColorSelected: ({cellRow, cellCol}) => color => {
        if (cellRow !== undefined && cellCol !== undefined) {
            dispatch(setUserHighlight(cellRow, cellCol, color))
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayPanel);
