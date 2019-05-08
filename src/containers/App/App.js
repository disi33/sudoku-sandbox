import React, { useState } from 'react';
import { connect } from 'react-redux';

import { getPuzzleDownloadUrl } from '../../firebase/storePuzzle';
import { loadPuzzle } from '../../actions/saveLoadEditActions';
import { setInteractionsMode } from '../../actions/puzzleActions';
import { startPlayOver } from '../../actions/playActions';

import useWindowWidth from '../../hooks/useWindowWidth';

import EditPanel from '../EditPanel/EditPanel';
import EditPlay from '../EditPlay/EditPlay';
import PlayPanel from '../PlayPanel/PlayPanel';
import Puzzle from '../Puzzle/Puzzle';

import './App.css';

const App = ({isPlay, onPuzzleLoaded}) => {

    const [loadingPuzzle, setLoadingPuzzle] = useState(true);
    const key = lastUrlSegment(window.location.href);
    const width = useWindowWidth();

    if (width < 1008) return (
        <div className="too-small">
            <span className="too-small__heading">Sorry!</span>
            <span className="too-small__body">This site requires a larger screen</span>
        </div>
    );

    if (loadingPuzzle && key === '') {
        setLoadingPuzzle(false);
    }

    else if (loadingPuzzle) {
        getPuzzleDownloadUrl(key)
            .then(url => fetch(url)
                .then(response => response.text())
                .then(content => {
                    onPuzzleLoaded(content);
                    setLoadingPuzzle(false);
                })
                .catch(() => setLoadingPuzzle(false))
            )
            .catch(() => setLoadingPuzzle(false))
    }

    if (loadingPuzzle) return (
        <div className="loading">
            <span className="loading__text">Preparing your puzzle...</span>
            <div className="loading__spinner"></div>
        </div>
    );

    else return (
        <div className="app">
            <div className="app__puzzle">
                <EditPlay></EditPlay>
                <Puzzle></Puzzle>
            </div>
            <div className="app__edit-panel">
                {!isPlay && <EditPanel></EditPanel>}
                {isPlay && <PlayPanel></PlayPanel>}
            </div>
        </div>
    );
}

const lastUrlSegment = url => {
    const slashIndex = url.lastIndexOf('/');
    return slashIndex === -1 ? '' : url.substr(slashIndex + 1);
};

const mapStateToProps = state => ({
    isPlay: state.interactions.mode === 'PLAY'
});

const mapDispatchToProps = dispatch => ({
    onPuzzleLoaded: content => {
        dispatch(loadPuzzle(content));
        dispatch(startPlayOver());
        dispatch(setInteractionsMode('PLAY'));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
