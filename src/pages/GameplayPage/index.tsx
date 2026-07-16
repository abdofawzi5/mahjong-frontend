import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../features/game/hooks/useGame';
import { GameHeader } from '../../features/game/components/GameHeader';
import { Hand } from '../../features/game/components/Hand';
import { GameActionArea } from '../../features/game/components/GameActionArea';
import { RoundHistory } from '../../features/game/components/RoundHistory';
import './GameplayPage.css';

const GameplayPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentHand, isGameOver } = useGame();

  useEffect(() => {
    if (isGameOver) {
      navigate('/game-over');
    } else if (!currentHand) {
      // If there's no current hand and it's not game over, the user likely navigated here directly or cleared storage
      navigate('/');
    }
  }, [isGameOver, currentHand, navigate]);

  return (
    <div className="page-container gameplay-page">
      <div className="glass-panel gameplay-content-panel">
        <GameHeader />
        
        {currentHand ? (
          <>
            <Hand hand={currentHand} title="Current Hand" />
            <GameActionArea />
            <RoundHistory />
          </>
        ) : (
          <div className="gameplay-loading">
            <p>Loading game state...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameplayPage;
