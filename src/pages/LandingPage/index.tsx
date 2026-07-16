import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLeaderboard } from '../../features/leaderboard/hooks/useLeaderboard';
import { useGame } from '../../features/game/hooks/useGame';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { startGame } = useGame();
  
  const { leaderboard, loading, fetchLeaderboard } = useLeaderboard();

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const handleStartGame = () => {
    startGame();
    navigate('/play');
  };

  return (
    <div className="page-container landing-page">
      <div className="glass-panel main-menu">
        <h1 className="title">Mahjong Hand Betting</h1>
        <p className="subtitle">Predict if the next hand is higher or lower!</p>
        
        <button className="btn start-btn" onClick={handleStartGame}>
          New Game
        </button>

        <div className="leaderboard-section">
          <h2>Top 5 High Scores</h2>
          {loading ? (
            <p>Loading...</p>
          ) : leaderboard.length === 0 ? (
            <p className="empty-state">No scores yet. Be the first!</p>
          ) : (
            <ul className="leaderboard-list">
              {leaderboard.map((entry, index) => (
                <li key={entry.id} className="leaderboard-item">
                  <span className="rank">#{index + 1}</span>
                  <span className="name">{entry.name}</span>
                  <span className="score">{entry.score} pts</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
