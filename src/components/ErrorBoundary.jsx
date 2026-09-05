import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

export function RouteErrorFallback() {
  const error = useRouteError();
  console.error("Route Error Caught:", error);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={32} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Oops! Something went wrong</h1>
        <p className="text-slate-600 text-sm mb-6">
          We encountered an unexpected error while loading this page. Please try refreshing or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
          <button 
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#e53a24] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#c42e1b] transition-colors cursor-pointer"
          >
            <RefreshCw size={16} /> Reload Page
          </button>
          <Link 
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors"
          >
            <Home size={16} /> Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Something went wrong</h1>
            <p className="text-slate-600 text-sm mb-6">
              An unexpected error occurred in this section.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center gap-2 bg-[#e53a24] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#c42e1b] transition-colors cursor-pointer"
            >
              <RefreshCw size={16} /> Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
