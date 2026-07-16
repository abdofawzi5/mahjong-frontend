import React from 'react';
import type { Tile as TileType } from '../../types';
import './Tile.css';

interface TileProps {
  tile: TileType;
  currentValue?: number;
}

export const Tile: React.FC<TileProps> = ({ tile, currentValue }) => {
  const faceClass = tile.faceClass || 'tile-number';
  const display = tile.display || tile.type;

  return (
    <div className="tile" title={`${tile.category} ${tile.type}`} data-name={`${tile.category} ${tile.type}`}>
      <div className={`tile-face ${faceClass}`}>
        {display}
      </div>
      {tile.isDynamic && (
        <div className="tile-dynamic-value">
          Val: {currentValue ?? tile.value ?? '?'}
        </div>
      )}
    </div>
  );
};
