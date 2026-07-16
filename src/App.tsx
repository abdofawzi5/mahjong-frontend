import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const GameplayPage = lazy(() => import('./pages/GameplayPage'));
const GameOverPage = lazy(() => import('./pages/GameOverPage'));

// A simple loading fallback
const PageLoader = () => (
  <div className="app-page-loader">
    Loading...
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/play" element={<GameplayPage />} />
            <Route path="/game-over" element={<GameOverPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
