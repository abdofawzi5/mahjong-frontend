import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../features/game/hooks/useGame';
import { useLeaderboard } from '../../features/leaderboard/hooks/useLeaderboard';
import './GameOverPage.css';

const GameOverPage: React.FC = () => {
  const navigate = useNavigate();
  const { score, gameOverReason } = useGame();
  const [playerName, setPlayerName] = useState('');
  
  const { submitScore, submitting, submitted } = useLeaderboard();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return;

    await submitScore(playerName.trim(), score);
  };

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className="page-container game-over-page">
      <div className="glass-panel game-over-panel">
        <h1 className="title">Game Over</h1>
        <p className="reason-text">{gameOverReason || 'You ended the game.'}</p>
        
        <div className="final-score-box">
          <h2>Final Score</h2>
          <div className="score-display">{score}</div>
        </div>

        {!submitted ? (
          <form className="submit-form" onSubmit={handleSubmit}>
            <h3>Submit to Leaderboard</h3>
            <input 
              type="text" 
              placeholder="Enter your name" 
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              maxLength={20}
              required
            />
            <button 
              type="submit" 
              className="btn btn-success" 
              disabled={submitting || !playerName.trim()}
            >
              {submitting ? 'Submitting...' : 'Submit Score'}
            </button>
          </form>
        ) : (
          <div className="success-message">
            <p>Score submitted successfully!</p>
          </div>
        )}

        <button className="btn return-btn" onClick={handleReturnHome}>
          Return to Menu
        </button>
      </div>
    </div>
  );
};

export default GameOverPage;
