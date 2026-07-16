import React from 'react';
import { useGame } from '../../hooks/useGame';
import { Hand } from '../Hand';
import { TrendingUp, TrendingDown } from 'lucide-react';
import './GameActionArea.css';

export const GameActionArea: React.FC = () => {
  const { nextHand, bet, isGameOver } = useGame();

  if (!nextHand || isGameOver) return null;

  return (
    <div className="game-action-container">
      <h3 className="game-action-title">Will the next hand be...</h3>
      <Hand hand={nextHand} hidden={true} />
      
      <div className="game-action-buttons">
        <button 
          className="btn-bet btn-higher" 
          onClick={() => bet('higher')}
        >
          <TrendingUp size={24} /> Higher
        </button>
        <button 
          className="btn-bet btn-lower" 
          onClick={() => bet('lower')}
        >
          <TrendingDown size={24} /> Lower
        </button>
      </div>
    </div>
  );
};
