import React from 'react';
import './List.css';

export default function List({items, selectedIdx, itemToText, onItemSelected}) {
    return (
        <ul className="list" onKeyDown={handleKeyDown(selectedIdx, onItemSelected, items.length)}>
            {items.map((item, idx) => 
                <li key={idx}
                    className={"list__item " + selectedClassName(idx, selectedIdx)}
                    onClick={() => onItemSelected(idx)}
                    tabIndex="0">
                    <span>{itemToText(item)}</span>
                </li>
            )}
        </ul>
    );
}

const selectedClassName = (idx, selectedIdx) => idx === selectedIdx ? "list__item--selected" : "";

const handleKeyDown = (selectedIdx, onItemSelected, numItems) => e => {
    if (e.key === 'ArrowDown' && selectedIdx < numItems - 1) {
        onItemSelected(selectedIdx + 1);
    } else if (e.key === 'ArrowUp' && selectedIdx > 0) {
        onItemSelected(selectedIdx - 1);
    }
};