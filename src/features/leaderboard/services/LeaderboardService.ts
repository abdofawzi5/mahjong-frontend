import { apiClient } from '../../../api/client';

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  createdAt: string;
}

export class LeaderboardService {
  /**
   * Fetches the top scores from the backend API.
   */
  public async getLeaderboard(): Promise<LeaderboardEntry[]> {
    try {
      const response = await apiClient.get<LeaderboardEntry[]>('/leaderboard');
      return response.data;
    } catch (error) {
      console.error('Error fetching leaderboard', error);
      throw error;
    }
  }

  /**
   * Submits a new score to the backend API.
   */
  public async submitScore(name: string, score: number): Promise<LeaderboardEntry[]> {
    try {
      const response = await apiClient.post<LeaderboardEntry[]>('/leaderboard', { name, score });
      return response.data;
    } catch (error) {
      console.error('Error submitting score', error);
      throw error;
    }
  }
}

// Export a singleton instance for use across the application
export const leaderboardService = new LeaderboardService();
