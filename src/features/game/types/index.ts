export interface Tile {
  id: string;
  category: string;
  type: string;
  isDynamic: boolean;
  value?: number;
  baseDynamicValue?: number;
  display?: string;
  faceClass?: string;
}

export interface HandData {
  tiles: Tile[];
  totalValue: number;
}

export interface RoundHistory {
  previousHand: HandData;
  revealedHand: HandData;
  bet: 'higher' | 'lower';
  result: 'win' | 'loss' | 'tie';
  scoreChange: number;
}
