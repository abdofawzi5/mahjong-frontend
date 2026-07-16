import React from 'react';
import './HowToPlayModal.css';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">How to Play</h2>
        
        <p>Welcome to <strong>Mahjong Higher or Lower</strong>! A unique betting game using Mahjong tiles.</p>
        
        <ul className="modal-list">
          <li><strong>The Goal:</strong> Guess if the total value of the next hand (5 tiles) will be <strong>Higher</strong> or <strong>Lower</strong> than your current hand.</li>
          <li><strong>Dynamic Tiles:</strong> Dragons and Winds have a starting value of 5. Every time you guess correctly, all dynamic tiles shown in the next hand will permanently gain +1 value. If you guess wrong, they lose -1 value.</li>
          <li><strong>Number Tiles:</strong> Number tiles have a fixed value equal to their number (1-9) and never change.</li>
          <li><strong>Scoring:</strong> Winning a bet increases your score by the total value of the drawn hand. Losing decreases it by the same amount.</li>
        </ul>

        <div className="modal-game-over-box">
          <h3 className="modal-game-over-title">Game Over Conditions</h3>
          <p className="modal-game-over-desc">The game ends automatically if:</p>
          <ol className="modal-game-over-list">
            <li>Any dynamic tile's value reaches 0.</li>
            <li>Any dynamic tile's value reaches 10.</li>
            <li>The draw pile is exhausted 3 times.</li>
          </ol>
        </div>

        <button className="btn modal-close-btn" onClick={onClose}>
          Got it!
        </button>
      </div>
    </div>
  );
};
