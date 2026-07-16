import React from 'react';
import type { HandData } from '../../types';
import { Tile } from '../Tile';
import { useGame } from '../../hooks/useGame';
import './Hand.css';

interface HandProps {
  hand: HandData;
  title?: string;
  hidden?: boolean;
}

export const Hand: React.FC<HandProps> = ({ hand, title, hidden = false }) => {
  const { dynamicValues } = useGame();
  
  return (
    <div className="hand-container">
      {title && <h3 className="hand-title">{title}</h3>}
      <div className="hand-tiles">
        {hand.tiles.map((tile, idx) => {
          if (hidden) {
            return (
              <div key={idx} className="tile tile-hidden" title="Hidden Tile" data-name="Hidden Tile">
                <div className="tile-face">?</div>
              </div>
            );
          }
          const val = tile.isDynamic ? dynamicValues[`${tile.category}_${tile.type}`] : tile.value;
          return <Tile key={tile.id || idx} tile={tile} currentValue={val} />;
        })}
      </div>
      {!hidden && (
        <div className="hand-total">
          Total: {hand.totalValue}
        </div>
      )}
    </div>
  );
};
