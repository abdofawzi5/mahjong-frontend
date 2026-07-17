import { useState } from 'react';
import { useGame } from '../../hooks/useGame';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { TILE_CONFIG } from '../../config/tiles.config';
import './RoundHistory.css';

const tileCharDict = TILE_CONFIG.allTiles.reduce((acc, tc) => {
  acc[`${tc.category}-${tc.type}`] = tc.character;
  return acc;
}, {} as Record<string, string>);

const getTileChar = (t: {category: string, type: string}) => {
  return tileCharDict[`${t.category}-${t.type}`] || '?';
};

export const RoundHistory = () => {
  const { history } = useGame();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="round-history-container">
      <div className="round-history-header">
        <h3 className="round-history-title">Round History</h3>
        {history.length > 0 && (
          <button 
            className="round-history-toggle"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="round-history-empty">No rounds played yet.</p>
      ) : (
        isExpanded && (
          <div className="round-history-list">
            {history.map((round, idx) => {
              const BetIcon = round.bet === 'higher' ? TrendingUp : TrendingDown;
              const resultClass = round.result === 'win' 
                ? 'round-history-win' 
                : round.result === 'loss' 
                  ? 'round-history-loss' 
                  : 'round-history-tie';
              const scoreClass = round.scoreChange > 0 
                ? 'round-history-score-win' 
                : 'round-history-score-loss';
              const ResultIcon = round.result === 'win' 
                ? TrendingUp 
                : round.result === 'loss' 
                  ? TrendingDown 
                  : Minus;

              return (
                <div key={idx} className="round-history-item">
                  <div className="round-history-info">
                    <span className={resultClass}>
                      Round {history.length - idx}: {round.result.toUpperCase()}
                    </span>
                    <span className={scoreClass}>
                      {round.scoreChange > 0 ? '+' : ''}{round.scoreChange} pts
                    </span>
                  </div>
                  <div className="round-history-details">
                    Bet: {round.bet} <BetIcon size={14} /> | 
                    Result: {round.revealedHand.totalValue > round.previousHand.totalValue 
                      ? 'higher' 
                      : round.revealedHand.totalValue < round.previousHand.totalValue 
                        ? 'lower' 
                        : 'tie'} <ResultIcon size={14} />
                  </div>
                  <div className="round-history-hands">
                    <div className="round-history-hand">
                      <div className="round-history-hand-title">
                        Previous ({round.previousHand.totalValue})
                      </div>
                      <div className="round-history-tiles">
                        {round.previousHand.tiles.map((t, i) => <span key={i} title={`${t.category} ${t.type}`}>{getTileChar(t)}</span>)}
                      </div>
                    </div>
                    <div className="round-history-hand">
                      <div className="round-history-hand-title">
                        Next ({round.revealedHand.totalValue})
                      </div>
                      <div className="round-history-tiles">
                        {round.revealedHand.tiles.map((t, i) => <span key={i} title={`${t.category} ${t.type}`}>{getTileChar(t)}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}
    </div>
  );
};
