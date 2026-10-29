import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('KALAKOTE OVERLOOK ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[500px] flex items-center justify-center p-8 bg-[#080B09] text-[#F4F1E8]">
          <div className="max-w-lg w-full bg-[#111713] border border-[#C5A56A]/40 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A56A]">
                ARCHIVAL SYSTEM RECOVERY
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#F4F1E8]">
                {this.props.fallbackTitle || 'A Component Encountered a Render Exception'}
              </h2>
              <p className="text-xs text-[#A4ADA5] leading-relaxed">
                The platform encountered an unexpected hardware or graphics execution state. Your archival session has been preserved.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-black/50 border border-white/5 rounded font-mono text-[11px] text-red-300 text-left overflow-auto max-h-32">
                {this.state.error.message}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#C5A56A] text-black font-mono text-xs font-bold hover:bg-[#DFC38E] transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Archive</span>
              </button>

              <a
                href={import.meta.env.BASE_URL}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-mono text-xs border border-white/10 transition-all flex items-center justify-center gap-2"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return to Home</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
