import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useServices } from '../../../contexts/ServicesContext';
import { useAsyncError } from '../../../hooks/useAsyncError';

export const useLeaderboard = () => {
  const { leaderboardService } = useServices();
  const queryClient = useQueryClient();
  const throwError = useAsyncError();

  const { 
    data: leaderboard = [], 
    isLoading: loading, 
    refetch: fetchLeaderboard 
  } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: () => leaderboardService.getLeaderboard(),
  });

  const { 
    mutateAsync: submitScoreMutate, 
    isPending: submitting, 
    isSuccess: submitted 
  } = useMutation({
    mutationFn: ({ name, score }: { name: string; score: number }) => 
      leaderboardService.submitScore(name, score),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
    },
    onError: (err) => {
      throwError(err as Error);
    }
  });

  const submitScore = async (name: string, score: number) => {
    try {
      await submitScoreMutate({ name, score });
      return true;
    } catch {
      return false;
    }
  };

  return {
    leaderboard,
    loading,
    submitting,
    submitted,
    fetchLeaderboard,
    submitScore
  };
};
