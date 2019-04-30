import React from 'react';
import { connect } from 'react-redux';

import Tabs from '../../components/Tabs/Tabs';

import { setInteractionsMode } from '../../actions/puzzleActions';
import { startPlayOver } from '../../actions/playActions';

const EditPlay = ({ isPlay, onEditSelected, onPlaySelected }) => {

    const tabItems = [
        {key: 'EDIT', name: 'Edit'},
        {key: 'PLAY', name: 'Play'},
    ];

    return (
        <Tabs items={tabItems} selectedKey={isPlay ? 'PLAY' : 'EDIT'} onItemSelected={value => value === 'PLAY' ? onPlaySelected() : onEditSelected()}></Tabs>
    );
};

const mapStateToProps = state => ({
    isPlay: state.interactions.mode === 'PLAY',
});

const mapDispatchToProps = dispatch => ({
    onEditSelected: () => {
        dispatch(startPlayOver());
        dispatch(setInteractionsMode('GIVENS'));
    },
    onPlaySelected: () => {
        dispatch(startPlayOver());
        dispatch(setInteractionsMode('PLAY'));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPlay);
