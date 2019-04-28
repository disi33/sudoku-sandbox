import React from 'react';

import EditPanel from '../EditPanel/EditPanel';
import Puzzle from '../Puzzle/Puzzle';

import './App.css';

export default function App() {
    return (
        <div className="app">
            <div className="app__puzzle">
                <Puzzle></Puzzle>
            </div>
            <div className="app__edit-panel">
                <EditPanel></EditPanel>
            </div>
        </div>
    );
}
