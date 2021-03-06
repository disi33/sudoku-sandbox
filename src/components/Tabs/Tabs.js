import React from 'react';
import './Tabs.css';

export default function Tabs({items, selectedKey, onItemSelected}) {
    return (
        <div className="tabs">
            {items.map(({key, name}) => 
                <div key={key} 
                        className={"tabs__button " + selectedClassName(key, selectedKey)}
                        onClick={() => onItemSelected(key)}>
                    {name}
                </div>
            )}
        </div>
    );
}

const selectedClassName = (key, selectedKey) => key === selectedKey ? "tabs__button--selected" : "";