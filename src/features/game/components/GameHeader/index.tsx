import React, { useState } from 'react';
import { useGame } from '../../hooks/useGame';
import { HelpCircle } from 'lucide-react';
import { HowToPlayModal } from '../../../../components/HowToPlayModal';
import './GameHeader.css';

export interface GameHeaderViewProps {
  score: number;
  drawPileLength: number;
  discardPileLength: number;
  exhaustionCount: number;
  round: number;
  onEndGame: (reason: string) => void;
}

export const GameHeaderView: React.FC<GameHeaderViewProps> = ({
  score,
  drawPileLength,
  discardPileLength,
  exhaustionCount,
  round,
  onEndGame,
}) => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <div className="game-header-container">
      <div className="game-header-top">
        <div className="game-header-score">
          Score: <span>{score}</span>
        </div>
        <div className="game-header-actions">
          <button className="btn-help" onClick={() => setIsHelpOpen(true)}>
            <HelpCircle size={18} /> Help
          </button>
          <button className="btn-end" onClick={() => onEndGame('User quit the game')}>
            End Game
          </button>
        </div>
      </div>
      
      <div className="game-header-stats">
        <div><strong>Tiles in Deck:</strong> {drawPileLength}</div>
        <div><strong>Discard Pile:</strong> {discardPileLength}</div>
        <div><strong>Deck Shuffles:</strong> {exhaustionCount}/3</div>
        <div><strong>Round:</strong> {round}</div>
      </div>

      <HowToPlayModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
};

export const GameHeader: React.FC = () => {
  const { score, drawPile, discardPile, exhaustionCount, history, endGame } = useGame();
  
  return (
    <GameHeaderView 
      score={score}
      drawPileLength={drawPile.length}
      discardPileLength={discardPile.length}
      exhaustionCount={exhaustionCount}
      round={history.length + 1}
      onEndGame={endGame}
    />
  );
};
