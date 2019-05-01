import React, { useState } from 'react';
import { connect } from 'react-redux';

import { getPuzzleDownloadUrl } from '../../firebase/storePuzzle';
import { loadPuzzle } from '../../actions/saveLoadEditActions';

import EditPanel from '../EditPanel/EditPanel';
import EditPlay from '../EditPlay/EditPlay';
import PlayPanel from '../PlayPanel/PlayPanel';
import Puzzle from '../Puzzle/Puzzle';

import './App.css';

const App = ({isPlay, onPuzzleLoaded}) => {

    const [loadingPuzzle, setLoadingPuzzle] = useState(true);
    const key = lastUrlSegment(window.location.href);

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
                .catch(setLoadingPuzzle(false))
            )
            .catch(() => setLoadingPuzzle(false))
    }

    return (
        <div className="app">
            {loadingPuzzle && <div className="app__loading-spinner"></div>}
            {!loadingPuzzle &&
                <div className="app__puzzle">
                    <EditPlay></EditPlay>
                    <Puzzle></Puzzle>
                </div>
            }
            {!loadingPuzzle && 
                <div className="app__edit-panel">
                    {!isPlay && <EditPanel></EditPanel>}
                    {isPlay && <PlayPanel></PlayPanel>}
                </div>
            }
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

const mapDispatchToProps = {
    onPuzzleLoaded: loadPuzzle
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
