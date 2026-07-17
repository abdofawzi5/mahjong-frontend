export interface TileConfig {
  category: string;
  type: string;
  character: string;
  color: string;
  isDynamic: boolean;
  copies: number;
  value?: number;
  baseDynamicValue?: number;
  display?: string;
  faceClass?: string;
}

export const dragons: TileConfig[] = [
  { 
    category: 'dragon',
    type: 'red',
    character: '🀄',
    color: '#d32f2f',
    isDynamic: true,
    copies: 4,
    baseDynamicValue: 5,
    display: '中',
    faceClass: 'tile-dragon-red'
  },
  { 
    category: 'dragon', 
    type: 'green', 
    character: '🀅', 
    color: '#388e3c', 
    isDynamic: true, 
    copies: 4, 
    baseDynamicValue: 5, 
    display: '發', 
    faceClass: 'tile-dragon-green' 
  },
  { 
    category: 'dragon', 
    type: 'white', 
    character: '🀆', 
    color: '#1976d2', 
    isDynamic: true, 
    copies: 4, 
    baseDynamicValue: 5, 
    display: '白', 
    faceClass: 'tile-dragon-white' 
  },
];

export const winds: TileConfig[] = [
  { 
    category: 'wind', 
    type: 'east', 
    character: '🀀', 
    color: '#455a64', 
    isDynamic: true, 
    copies: 4, 
    baseDynamicValue: 5, 
    display: '東', 
    faceClass: 'tile-wind' 
  },
  { 
    category: 'wind', 
    type: 'south', 
    character: '🀁', 
    color: '#455a64', 
    isDynamic: true, 
    copies: 4, 
    baseDynamicValue: 5, 
    display: '南', 
    faceClass: 'tile-wind' 
  },
  { 
    category: 'wind', 
    type: 'west', 
    character: '🀂', 
    color: '#455a64', 
    isDynamic: true, 
    copies: 4, 
    baseDynamicValue: 5, 
    display: '西', 
    faceClass: 'tile-wind' 
  },
  { 
    category: 'wind', 
    type: 'north', 
    character: '🀃', 
    color: '#455a64', 
    isDynamic: true, 
    copies: 4, 
    baseDynamicValue: 5, 
    display: '北', 
    faceClass: 'tile-wind' 
  },
];

export const numbers: TileConfig[] = Array.from({ length: 9 }).map((_, i) => ({
  category: 'number',
  type: `${i + 1}`,
  character: `${i + 1}`,
  color: '#333',
  isDynamic: false,
  copies: 4,
  value: i + 1,
  display: `${i + 1}`,
  faceClass: 'tile-number',
}));

export const allTiles: TileConfig[] = [...numbers, ...dragons, ...winds];

export const TILE_CONFIG = {
  allTiles,
};
