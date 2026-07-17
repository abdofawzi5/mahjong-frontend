import { useState, useCallback } from 'react';
import type { LeaderboardEntry } from '../services/LeaderboardService';
import { useAsyncError } from '../../../hooks/useAsyncError';
import { useServices } from '../../../contexts/ServicesContext';

export const useLeaderboard = () => {
  const { leaderboardService } = useServices();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const throwError = useAsyncError();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    try {
      const data = await leaderboardService.getLeaderboard();
      setLeaderboard(data);
    } catch (err) {
      throwError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [throwError, leaderboardService]);

  const submitScore = useCallback(async (name: string, score: number) => {
    setSubmitting(true);
    try {
      await leaderboardService.submitScore(name, score);
      setSubmitted(true);
      return true;
    } catch (err) {
      throwError(err as Error);
      return false;
    } finally {
      setSubmitting(false);
    }
  }, [throwError, leaderboardService]);

  return {
    leaderboard,
    loading,
    submitting,
    submitted,
    fetchLeaderboard,
    submitScore
  };
};
