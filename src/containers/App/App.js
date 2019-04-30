import React from 'react';
import { connect } from 'react-redux';

import EditPanel from '../EditPanel/EditPanel';
import EditPlay from '../EditPlay/EditPlay';
import PlayPanel from '../PlayPanel/PlayPanel';
import Puzzle from '../Puzzle/Puzzle';

import './App.css';

const App = ({isPlay}) => {
    return (
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

const mapStateToProps = state => ({
    isPlay: state.interactions.mode === 'PLAY'
});

export default connect(mapStateToProps)(App);
