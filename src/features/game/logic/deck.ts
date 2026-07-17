import type { Tile } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { TILE_CONFIG } from '../config/tiles.config';

export const generateDeck = (): Tile[] => {
  const deck: Tile[] = [];

  TILE_CONFIG.allTiles.forEach((config) => {
    for (let i = 0; i < config.copies; i++) {
      deck.push({
        id: uuidv4(),
        category: config.category,
        type: config.type,
        isDynamic: config.isDynamic,
        value: config.value,
        baseDynamicValue: config.baseDynamicValue,
        display: config.display,
        faceClass: config.faceClass,
      });
    }
  });

  return deck;
};

export const shuffleDeck = (deck: Tile[]): Tile[] => {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = newDeck[i] as Tile;
    newDeck[i] = newDeck[j] as Tile;
    newDeck[j] = temp;
  }
  return newDeck;
};

export const calculateHandTotal = (
  tiles: Tile[],
  dynamicValues: Record<string, number>
): number => {
  return tiles.reduce((total, tile) => {
    if (tile.isDynamic) {
      return total + (dynamicValues[`${tile.category}_${tile.type}`] ?? tile.baseDynamicValue ?? 5);
    } else {
      return total + (tile.value ?? 0);
    }
  }, 0);
};
