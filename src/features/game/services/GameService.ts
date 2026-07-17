import type { Tile, HandData, RoundHistory } from '../types';
import { generateDeck, shuffleDeck, calculateHandTotal } from '../logic/deck';
import { TILE_CONFIG } from '../config/tiles.config';
import { GAME_CONFIG } from '../config/game.config';

export interface GameStateData {
  score: number;
  drawPile: Tile[];
  discardPile: Tile[];
  currentHand: HandData | null;
  nextHand: HandData | null;
  history: RoundHistory[];
  exhaustionCount: number;
  dynamicValues: Record<string, number>;
  isGameOver: boolean;
  gameOverReason: string | null;
}


export class GameService {
  /**
   * Initializes dynamic values for all dynamic tiles
   */
  public static getInitialDynamicValues(): Record<string, number> {
    const initial: Record<string, number> = {};
    TILE_CONFIG.allTiles.forEach(tile => {
      if (tile.isDynamic && tile.baseDynamicValue !== undefined) {
        initial[`${tile.category}_${tile.type}`] = tile.baseDynamicValue;
      }
    });
    return initial;
  }

  /**
   * Generates a fresh game state
   */
  public static initializeGame(): Partial<GameStateData> {
    let deck = shuffleDeck(generateDeck());
    const initialHandTiles = deck.slice(0, GAME_CONFIG.handSize);
    deck = deck.slice(GAME_CONFIG.handSize);
    const nextHandTiles = deck.slice(0, GAME_CONFIG.handSize);
    deck = deck.slice(GAME_CONFIG.handSize);

    const initialDynamicValues = this.getInitialDynamicValues();

    return {
      score: 0,
      drawPile: deck,
      discardPile: [],
      currentHand: {
        tiles: initialHandTiles,
        totalValue: calculateHandTotal(initialHandTiles, initialDynamicValues),
      },
      nextHand: {
        tiles: nextHandTiles,
        totalValue: calculateHandTotal(nextHandTiles, initialDynamicValues),
      },
      history: [],
      exhaustionCount: 0,
      dynamicValues: initialDynamicValues,
      isGameOver: false,
      gameOverReason: null,
    };
  }

  /**
   * Processes a user's bet and returns the next game state
   */
  public static processBet(
    state: GameStateData, 
    guess: 'higher' | 'lower'
  ): Partial<GameStateData> {
    if (state.isGameOver || !state.currentHand || !state.nextHand) return {};

    const currentTotal = state.currentHand.totalValue;
    const nextTotal = calculateHandTotal(state.nextHand.tiles, state.dynamicValues);
    
    let isCorrect = false;
    if (guess === 'higher' && nextTotal > currentTotal) isCorrect = true;
    if (guess === 'lower' && nextTotal < currentTotal) isCorrect = true;

    let newScore = isCorrect ? state.score + nextTotal : state.score - nextTotal;
    if (newScore < 0) newScore = 0;

    const newDynamicValues = { ...state.dynamicValues };
    let gameEndingReason: string | null = null;

    const uniqueDynamicKeys = new Set<string>();
    state.nextHand.tiles.forEach(tile => {
      if (tile.isDynamic) {
        uniqueDynamicKeys.add(`${tile.category}_${tile.type}`);
      }
    });

    uniqueDynamicKeys.forEach(key => {
      if (isCorrect) {
        newDynamicValues[key] += 1;
      } else {
        newDynamicValues[key] -= 1;
      }

      if (newDynamicValues[key] <= GAME_CONFIG.minDynamicValue) {
        const [category, type] = key.split('_');
        gameEndingReason = `Tile value reached ${GAME_CONFIG.minDynamicValue} for ${category} ${type}.`;
      } else if (newDynamicValues[key] >= GAME_CONFIG.maxDynamicValue) {
        const [category, type] = key.split('_');
        gameEndingReason = `Tile value reached ${GAME_CONFIG.maxDynamicValue} for ${category} ${type}.`;
      }
    });

    const roundHistory: RoundHistory = {
      previousHand: { ...state.currentHand },
      revealedHand: { tiles: state.nextHand.tiles, totalValue: nextTotal },
      bet: guess,
      result: isCorrect ? 'win' : (nextTotal === currentTotal ? 'tie' : 'loss'),
      scoreChange: isCorrect ? nextTotal : -nextTotal,
    };

    let newDiscardPile = [...state.discardPile, ...state.currentHand.tiles];
    let newDrawPile = [...state.drawPile];
    let newExhaustionCount = state.exhaustionCount;

    if (newDrawPile.length < GAME_CONFIG.handSize) {
      newExhaustionCount += 1;
      if (newExhaustionCount >= GAME_CONFIG.maxExhaustions) {
        gameEndingReason = `Draw pile exhausted ${GAME_CONFIG.maxExhaustions} times.`;
      }
      const combined = [...newDrawPile, ...newDiscardPile];
      newDrawPile = shuffleDeck(combined);
      newDiscardPile = [];
    }

    let newNextHandTiles: Tile[] = [];
    if (newDrawPile.length >= GAME_CONFIG.handSize && !gameEndingReason) {
      newNextHandTiles = newDrawPile.slice(0, GAME_CONFIG.handSize);
      newDrawPile = newDrawPile.slice(GAME_CONFIG.handSize);
    } else if (!gameEndingReason) {
       gameEndingReason = "Not enough tiles to draw.";
    }

    return {
      score: newScore,
      dynamicValues: newDynamicValues,
      history: [roundHistory, ...state.history],
      currentHand: { tiles: state.nextHand.tiles, totalValue: nextTotal },
      nextHand: newNextHandTiles.length > 0 
        ? { 
            tiles: newNextHandTiles, 
            totalValue: calculateHandTotal(newNextHandTiles, newDynamicValues) 
          } 
        : null,
      drawPile: newDrawPile,
      discardPile: newDiscardPile,
      exhaustionCount: newExhaustionCount,
      ...(gameEndingReason ? { isGameOver: true, gameOverReason: gameEndingReason } : {})
    };
  }
}
