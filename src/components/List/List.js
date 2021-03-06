import React, { createRef } from 'react';
import './List.css';

export default function List({items, selectedIdx, itemToText, onItemSelected, onItemRemoved, onItemAdded}) {

    const itemRefs = items.map(createRef);

    return (
        <div className="list" onKeyDown={handleKeyDown(selectedIdx, itemRefs, items.length)}>
            <div className="list__items">
                {items.map((item, idx) => 
                    <div key={idx}
                        ref={itemRefs[idx]}
                        className={"list__item " + selectedClassName(idx, selectedIdx)}
                        onFocus={() => onItemSelected(idx)}
                        tabIndex="0">
                        <span>{itemToText(item)}</span>
                    </div>
                )}
            </div>
            <div className="list__buttons">
                <div className="list__button" onClick={onItemAdded}>{'\uFF0B'}</div>
                <div className="list__button" onClick={() => onItemRemoved(selectedIdx)}>{'\u2013'}</div>
            </div>
        </div>
    );
}

const selectedClassName = (idx, selectedIdx) => idx === selectedIdx ? "list__item--selected" : "";

const handleKeyDown = (selectedIdx, itemRefs, numItems) => e => {
    if (e.key === 'ArrowDown' && selectedIdx < numItems - 1) {
        e.preventDefault();
        itemRefs[selectedIdx + 1].current.focus();
    } else if (e.key === 'ArrowUp' && selectedIdx > 0) {
        e.preventDefault();
        itemRefs[selectedIdx - 1].current.focus();
    }
};