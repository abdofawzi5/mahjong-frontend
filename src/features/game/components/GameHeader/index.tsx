import React, { useState } from 'react';
import { useGame } from '../../hooks/useGame';
import { HelpCircle } from 'lucide-react';
import { HowToPlayModal } from '../../../../components/HowToPlayModal';
import './GameHeader.css';

export const GameHeader: React.FC = () => {
  const { score, drawPile, discardPile, exhaustionCount, history, endGame } = useGame();
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
          <button className="btn-end" onClick={() => endGame('User quit the game')}>
            End Game
          </button>
        </div>
      </div>
      
      <div className="game-header-stats">
        <div><strong>Tiles in Deck:</strong> {drawPile.length}</div>
        <div><strong>Discard Pile:</strong> {discardPile.length}</div>
        <div><strong>Deck Shuffles:</strong> {exhaustionCount}/3</div>
        <div><strong>Round:</strong> {history.length + 1}</div>
      </div>

      <HowToPlayModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
};
