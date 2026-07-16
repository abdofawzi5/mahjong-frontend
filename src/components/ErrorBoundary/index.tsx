import { Component, type ErrorInfo, type ReactNode } from 'react';
import './ErrorBoundary.css';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <h2>Oops, something went wrong!</h2>
          <p className="error-boundary-message">{this.state.error?.message}</p>
          <button 
            className="error-boundary-btn"
            onClick={() => window.location.href = '/'}
          >
            Return to Homepage
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
