import { createStore } from 'redux';

import arrowsEdit from '../reducers/arrowsEdit';
import cagesEdit from '../reducers/cagesEdit';
import generalEdit from '../reducers/generalEdit';
import linesEdit from '../reducers/linesEdit';
import overlaysEdit from '../reducers/overlaysEdit';
import regionsEdit from '../reducers/regionsEdit';
import underlaysEdit from '../reducers/underlaysEdit';

const chainReducers = (...reducers) => (state, action) => 
    reducers.reduce((acc, reducer) => reducer(acc, action), state);

const initialState = () => ({
    puzzle: {
        cellSize: 45,
        cells: [...Array(9)].map(_ => [...Array(9)].map(_ => ({
            value: undefined, candidates: [], pencilMarks: []
        }))),
        regions: [
            [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]],
            [[3, 0], [3, 1], [3, 2], [4, 0], [4, 1], [4, 2], [5, 0], [5, 1], [5, 2]],
            [[6, 0], [6, 1], [6, 2], [7, 0], [7, 1], [7, 2], [8, 0], [8, 1], [8, 2]],
            [[0, 3], [0, 4], [0, 5], [1, 3], [1, 4], [1, 5], [2, 3], [2, 4], [2, 5]],
            [[3, 3], [3, 4], [3, 5], [4, 3], [4, 4], [4, 5], [5, 3], [5, 4], [5, 5]],
            [[6, 3], [6, 4], [6, 5], [7, 3], [7, 4], [7, 5], [8, 3], [8, 4], [8, 5]],
            [[0, 6], [0, 7], [0, 8], [1, 6], [1, 7], [1, 8], [2, 6], [2, 7], [2, 8]],
            [[3, 6], [3, 7], [3, 8], [4, 6], [4, 7], [4, 8], [5, 6], [5, 7], [5, 8]],
            [[6, 6], [6, 7], [6, 8], [7, 6], [7, 7], [7, 8], [8, 6], [8, 7], [8, 8]],
        ],
        cages: [],
        lines: [],
        arrows: [],
        underlays: [],
        overlays: [],
    },
    edit: {
        lines: {
            thickness: 5,
            color: '#CFCFCF',
        },
        arrows: {
            thickness: 5,
            color: '#CFCFCF',
            headLength: 0.3,
        },
        underlays: {
            width: 1,
            height: 1,
            borderColor: '#CFCFCF',
            backgroundColor: '#CFCFCF',
            rounded: false,
        },
        overlays: {
            width: 0.25,
            height: 0.25,
            borderColor: '#000000',
            backgroundColor: '#FFFFFF',
            rounded: false,
            fontSize: 12,
        }
    }
});

const configureStore = () => createStore(
    chainReducers(arrowsEdit, cagesEdit, generalEdit, linesEdit, overlaysEdit, regionsEdit, underlaysEdit),
    initialState(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default configureStore;