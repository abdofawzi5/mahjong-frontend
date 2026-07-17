import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ServicesProvider } from './contexts/ServicesProvider';
import { GameStoreProvider } from './features/game/store/GameStoreProvider';
import { LeaderboardService } from './features/leaderboard/services/LeaderboardService';
import { apiClient } from './api/client';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const GameplayPage = lazy(() => import('./pages/GameplayPage'));
const GameOverPage = lazy(() => import('./pages/GameOverPage'));

const leaderboardService = new LeaderboardService(apiClient);
const services = { leaderboardService };

// A simple loading fallback
const PageLoader = () => (
  <div className="app-page-loader">
    Loading...
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <ServicesProvider services={services}>
        <GameStoreProvider>
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
        </GameStoreProvider>
      </ServicesProvider>
    </ErrorBoundary>
  );
}

export default App;
