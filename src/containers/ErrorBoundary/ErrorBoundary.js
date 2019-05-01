import React from 'react';
import './ErrorBoundary.css';

export default class ErrorBoundary extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error(error, info);
    }

    render() {
        if (this.state.hasError) {
            return <div className="error-boundary">
                <h1>Whoops!</h1>
                <p>Something went wrong!</p>
            </div>;
        }

        return this.props.children;
    }

}