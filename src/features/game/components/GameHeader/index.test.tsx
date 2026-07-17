import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GameHeaderView } from './index';

// Removed vi.mock to use real pure components

describe('GameHeaderView Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const defaultProps = {
    score: 0,
    drawPileLength: 40,
    discardPileLength: 12,
    exhaustionCount: 2,
    round: 5,
    onEndGame: vi.fn(),
  };

  const renderView = (props: Partial<typeof defaultProps> = {}) => {
    return render(<GameHeaderView {...defaultProps} {...props} />);
  };

  it('renders the correct score', () => {
    renderView({ score: 1200 });
    expect(screen.getByText('1200')).toBeInTheDocument();
  });

  it('renders correct draw pile length stat', () => {
    renderView({ drawPileLength: 40 });
    expect(screen.getByText('40')).toBeInTheDocument();
  });

  it('renders correct discard pile length stat', () => {
    renderView({ discardPileLength: 12 });
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('renders correct shuffles stat', () => {
    renderView({ exhaustionCount: 2 });
    expect(screen.getByText('2/3')).toBeInTheDocument();
  });

  it('renders correct round stat', () => {
    renderView({ round: 5 });
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls onEndGame when "End Game" button is clicked', () => {
    const onEndGameMock = vi.fn();
    renderView({ onEndGame: onEndGameMock });
    
    const endButton = screen.getByRole('button', { name: /end game/i });
    fireEvent.click(endButton);
    
    expect(onEndGameMock).toHaveBeenCalledTimes(1);
    expect(onEndGameMock).toHaveBeenCalledWith('User quit the game');
  });

  it('does not show HowToPlayModal initially', () => {
    renderView();
    expect(screen.queryByText('How to Play')).not.toBeInTheDocument();
  });

  it('opens the HowToPlayModal when Help button is clicked', () => {
    renderView();
    const helpButton = screen.getByRole('button', { name: /help/i });
    fireEvent.click(helpButton);
    expect(screen.getByText('How to Play')).toBeInTheDocument();
  });

  it('closes the HowToPlayModal when "Got it!" is clicked', () => {
    renderView();
    const helpButton = screen.getByRole('button', { name: /help/i });
    fireEvent.click(helpButton);
    
    const closeButton = screen.getByRole('button', { name: /got it!/i });
    fireEvent.click(closeButton);
    expect(screen.queryByText('How to Play')).not.toBeInTheDocument();
  });
});
