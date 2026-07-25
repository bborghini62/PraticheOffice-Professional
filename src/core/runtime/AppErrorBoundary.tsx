// React error boundary for unexpected rendering failures.

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { logger } from '../logging';
import { AppErrorFallback } from '../../shared/components/AppErrorFallback';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('React error boundary caught an error', { component: 'AppErrorBoundary' }, { error, errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return <AppErrorFallback error={this.state.error} onReload={this.handleReload} />;
    }

    return this.props.children;
  }
}
