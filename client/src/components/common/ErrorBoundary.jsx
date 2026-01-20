import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import NeonButton from '../ui/NeonButton';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-dark flex items-center justify-center p-4 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 max-w-lg w-full bg-dark/80 backdrop-blur-xl border border-red-500/30 rounded-2xl p-8 sm:p-10 shadow-[0_0_50px_rgba(239,68,68,0.2)] text-center">
            
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 text-red-500 mb-6 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
              <AlertTriangle size={40} />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold font-display text-white mb-2">
              System Critical
            </h1>
            <p className="text-red-400 font-mono mb-6 uppercase tracking-widest text-sm">
              Runtime Exception Detected
            </p>

            <div className="bg-black/40 border border-white/5 rounded-lg p-4 mb-8 text-left overflow-auto max-h-40">
              <p className="font-mono text-xs text-white/60">
                <span className="text-red-500 mr-2">ERROR_CODE:</span> 
                {this.state.error?.toString() || 'Unknown Error'}
              </p>
              {this.state.errorInfo && (
                <pre className="font-mono text-[10px] text-white/40 mt-2 whitespace-pre-wrap">
                  {this.state.errorInfo.componentStack}
                </pre>
              )}
            </div>

            <p className="text-white/60 mb-8 leading-relaxed">
              We encountered an unexpected error properly rendering this section. 
              The system has contained the fault. Please try reloading or return to safety.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NeonButton 
                onClick={this.handleReload} 
                icon={RefreshCw}
                className="border-red-500 text-red-500 hover:bg-red-500/10"
              >
                Reboot System
              </NeonButton>
              
              <NeonButton 
                onClick={this.handleGoHome} 
                icon={Home}
                variant="ghost"
              >
                Safe Mode
              </NeonButton>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
